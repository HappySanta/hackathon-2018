<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Vk\ApiResponse;

class SendNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const MAX_RETRY = 10;

    protected $userIds;
    protected $message;
    protected $fragment;
    protected $retry = 0;
    public function __construct(array $userIds, string $message, string $fragment = "from_notify", int $retry = 0)
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
        $result = $this->send($this->userIds, $this->message, $this->fragment);
        if ($result->isSuccess()) {
            \Log::info("Notification", [
                "user_ids"=>implode(",", $this->userIds),
                "message"=>$this->message,
                "fragment"=>$this->fragment
            ]);
        } else {
            $code = $result->getCode();
            $message = $result->getMessage();
            \Log::error("FAIL Notification: #".$code." ".$message, [
                "user_ids"=>implode(",", $this->userIds),
                "message"=>$this->message,
                "fragment"=>$this->fragment,
                "retry" => $this->retry . " of ".self::MAX_RETRY
            ]);

            if (\VK\Executor::isSoftErrorCode($code)) {
                if ($this->retry < self::MAX_RETRY) {
                    sleep(1);
                    self::dispatch(new self($this->userIds, $this->message, $this->fragment, $this->retry + 1));
                }
            }
        }
    }

    public function send(array $userIds, string $message, string $fragment = "from_notify") : ApiResponse {
        return \Vk\Executor::api("notifications.sendMessage", [
            "user_ids" => implode(",", $userIds),
            "message" => $message,
            "fragment" => $fragment,
            "v" => "5.87",
            "access_token" => config("app.service")
        ]);
    }
}
