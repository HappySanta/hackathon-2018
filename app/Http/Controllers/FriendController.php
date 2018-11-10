<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignRequest;
use App\Http\Responses\OkResponse;
use App\Jobs\SendNotification;
use App\Models\User;
use Vk\Executor;

class FriendController extends Controller
{
    public function index(SignRequest $request)
    {

        $friendList = [];

        $statuses = \DB::table('t_friend_relation')
            ->where('user_id', $request->userId)->get();

        if ($statuses->count() === 0) {
            \DB::table('t_friend_relation')->insert([
                [
                    'user_id' => $request->userId,
                    'friend_id' => -1,
                    'status' => -1
                ],
                [
                    'user_id' => $request->userId,
                    'friend_id' => -2,
                    'status' => -1
                ]
            ]);

            $friendList[] = [
                'id' => -1,
                'status' => -1,
            ];

            $friendList[] = [
                'id' => -2,
                'status' => -1,
            ];
        }


        $skipIds = [];
        foreach ($statuses as $status) {
            $friendList[] = [
                'id' => $status->friend_id,
                'status' => $status->status
            ];
            $skipIds[] = $status->friend_id;
        }

        $result = Executor::api("friends.get", [
            'user_id' => $request->userId,
            'v' => "5.85",
            'access_token' => config('app.service')
        ]);

        if ($result->isSuccess()) {
            $userIds = $result->getData()['items'];

            if (count($userIds)) {
                $users = User::whereIn('id', $userIds)
                    ->whereNotIn('id', $skipIds)
                    ->get();

                $userIds = $users->map(function (User $user) {
                    return $user->id;
                })->all();


                $statuses = \DB::table('t_friend_relation')
                    ->where('user_id', $request->userId)
                    ->whereIn('friend_id', $userIds)->get();

                $statusIndex = [];
                foreach ($statuses as $status) {
                    $statusIndex[$status->friend_id] = $status;
                }

                foreach ($userIds as $id) {
                    $data = [
                        'id' => $id,
                        'status' => -1,
                    ];
                    if (isset($statusIndex[$id])) {
                        $data['status'] = $statusIndex[$id]->status;

                    }
                    $friendList[] = $data;
                }
            }
        } else {
            \Log::error("VK ERROR", [
                'method' => $result->getRequest()->getMethod(),
                'code' => $result->getCode(),
                'message' => $result->getMessage()
            ]);
        }

        $vkUserIds = array_map(function ($data) {
            return $data['id'];
        }, $friendList);

        $userDataResult = Executor::api('users.get', [
            'user_ids' => implode(',', $vkUserIds),
            'fields' => 'photo_200',
            'v' => "5.85",
            'access_token' => config('app.service')
        ]);

        if ($userDataResult->isSuccess()) {
            $userDataIndex = [
                -1 => [
                    'first_name' => "Гаечка",
                    'photo_200' => "http://",
                    'last_name' => ""
                ],
                -2 => [
                    'first_name' => "Гаечка",
                    'photo_200' => "http://",
                    'last_name' => ""
                ]
            ];
            foreach ($userDataResult->getData() as $user) {
                $userDataIndex[(int)$user['id']] = $user;
            }

            $friendList = array_map(function ($data) use ($userDataIndex) {
                return array_merge($userDataIndex[$data['id']], $data);
            }, $friendList);
            return new OkResponse($friendList);
        } else {
            \Log::error("VK ERROR", [
                'method' => $userDataResult->getRequest()->getMethod(),
                'code' => $userDataResult->getCode(),
                'message' => $userDataResult->getMessage()
            ]);
            return new OkResponse([]);
        }
    }

    public function show(SignRequest $request, $id)
    {
        $allow = \DB::table('t_friend_relation')
            ->where('user_id', $request->userId)
            ->where('friend_id', (int)$id)->count();

        if ($allow) {
            return new OkResponse(User::find((int)$id));
        } else {
            return new OkResponse(null);
        }
    }

    public function destroy(SignRequest $request, $id)
    {
        \DB::table('t_friend_relation')
            ->where('user_id', $request->userId)
            ->where('friend_id', (int)$id)->delete();

        return new OkResponse(1);
    }

    public function store(SignRequest $request)
    {
        $friendId = (int)$request->get('friend_id', 0);
        $name = (string)$request->get('name', "");
        $user = User::find($friendId);

        if ($user instanceof User) {

            try {
                \DB::table('t_friend_relation')->insert([
                    'user_id' => $request->userId,
                    'friend_id' => $friendId,
                    'status' => 0
                ]);
                $this->dispatch(SendNotification::UserWantKnowNotification($friendId, $name));
            } catch (\Exception $e) {
                \Log::error($e);
            }

        }

        return new OkResponse(1);
    }
}
