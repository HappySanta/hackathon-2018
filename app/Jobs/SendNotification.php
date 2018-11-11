<?php

namespace App\Jobs;

use App\Http\Controllers\FriendController;
use App\Models\DailyState;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Vk\ApiResponse;
use Vk\Executor;

class SendNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const MAX_RETRY = 10;

    protected $userIds;
    protected $message;
    protected $fragment;
    protected $retry = 0;

    public static function UserWantKnowNotification($userId, $name)
    {
        $msg = "{$name} хочет знать когда что";

        return new self([$userId], $msg, "requests");
    }

    public function __construct(array $userIds, string $message, string $fragment = "", int $retry = 0)
    {
        $this->userIds = $userIds;
        $this->message = $message;
        $this->fragment = $fragment;
        $this->retry = $retry;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->message === 'SUPER_HACK_NOTIFY') {
            $this->createNotify($this->userIds[0]);
            return;
        }
        $result = $this->send($this->userIds, $this->message, $this->fragment);
        if ($result->isSuccess()) {
            \Log::info("Notification", [
                "user_ids" => implode(",", $this->userIds),
                "message" => $this->message,
                "fragment" => $this->fragment
            ]);
        } else {
            $code = $result->getCode();
            $message = $result->getMessage();
            \Log::error("FAIL Notification: #" . $code . " " . $message, [
                "user_ids" => implode(",", $this->userIds),
                "message" => $this->message,
                "fragment" => $this->fragment,
                "retry" => $this->retry . " of " . self::MAX_RETRY
            ]);

            if (Executor::isSoftErrorCode($code)) {
                if ($this->retry < self::MAX_RETRY) {
                    sleep(1);
                    self::dispatch(new self($this->userIds, $this->message, $this->fragment, $this->retry + 1));
                }
            }
        }
    }

    public function send(array $userIds, string $message, string $fragment = "from_notify"): ApiResponse
    {
        return Executor::api("notifications.sendMessage", [
            "user_ids" => implode(",", $userIds),
            "message" => $message,
            "fragment" => $fragment,
            "v" => "5.87",
            "access_token" => config("app.service")
        ]);
    }

    public function createNotify($userId)
    {
        $userIds = \DB::table('t_friend_relation')->where('user_id', $userId)->get();
        $userIds = $userIds->map(function ($x) {
            return $x->friend_id;
        })->all();

        if (count($userIds) === 0) {
            return;
        }
        $user = Executor::api('users.get', [
            'user_ids' => $userId,
            'v' => "5.85",
            'fields' => 'photo_200,sex',
            'access_token' => config('app.service')
        ]);

        if ($user->isSuccess()) {
            $u = $user->getData()[0];

            $state = DailyState::where('user_id', $userId)->orderBy('state_date', 'DESC')->first();

            if ($state instanceof DailyState) {

                $tags = FriendController::stateToTags(json_decode($state->state, true));

                if (count($tags)) {
                    if ($u['sex'] === 1) {
                        $message = $u['first_name'] . ' обновила свое состояние: ' . mb_strtolower(implode(', ', $tags));
                    } else {
                        $message = $u['first_name'] . ' обновил свое состояние: ' . mb_strtolower(implode(', ', $tags));
                    }
                    if ($state->comment) {
                        $message = $u['first_name'] . ': '.$state->comment;
                    }

                    if (count($userIds)) {
                        $result = $this->send($userIds, $message);
                        if (!$result->isSuccess()) {
                            $code = $result->getCode();
                            $message = $result->getMessage();
                            \Log::error("FAIL Notification: #" . $code . " " . $message, [
                                "user_ids" => implode(",", $this->userIds),
                                "message" => $this->message,
                                "fragment" => $this->fragment,
                                "retry" => $this->retry . " of " . self::MAX_RETRY
                            ]);
                        }
                    }
                }

            }

        } else {
            $code = $user->getCode();
            $message = $user->getMessage();
            \Log::error("FAIL user get: #" . $code . " " . $message, [
                "user_ids" => implode(",", $this->userIds),
                "message" => $this->message,
                "fragment" => $this->fragment,
                "retry" => $this->retry . " of " . self::MAX_RETRY
            ]);
        }

    }
}
