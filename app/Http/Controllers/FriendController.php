<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignRequest;
use App\Http\Responses\OkResponse;
use App\Jobs\SendNotification;
use App\Models\User;
use Illuminate\Database\QueryException;
use Vk\Executor;

class FriendController extends Controller
{
    public function getUserFriendList(int $userId) {
        $list = [];

        $result = Executor::api("friends.get", [
            'user_id' => $userId,
            'v' => "5.85",
            'fields' => 'photo_200',
            'access_token' => config('app.service')
        ]);

        if ($result->isSuccess()) {
            $list = $result->getData()['items'];
        } else {
            \Log::error("VK ERROR", [
                'method' => $result->getRequest()->getMethod(),
                'code' => $result->getCode(),
                'message' => $result->getMessage()
            ]);
        }

        return $list;
    }

    public function getUserSelectIds(int $userId) {

        $statuses = \DB::table('t_friend_relation')
            ->where('user_id', $userId)
            ->where('status', 1)
            ->get();

        return $statuses->map( function ($s) { return $s->friend_id; } )->all();
    }

    public function index(SignRequest $request) {

        $fields = $this->getUserFriendList($request->userId);

        $selected = $this->getUserSelectIds($request->userId);

        return new OkResponse([
            'friends' => $fields,
            'selected_id' => $selected
        ]);
    }

    public function index_OLD(SignRequest $request)
    {

        $friendList = [];

        $statuses = \DB::table('t_friend_relation')
            ->where('user_id', $request->userId)->get();

        $skipIds = [];
        foreach ($statuses as $status) {
            $friendList[] = [
                'id' => $status->friend_id,
                'status' => $status->status
            ];
            $skipIds[] = $status->friend_id;
        }

        if (!in_array(-1, $skipIds)) {
            $friendList[] = [
                'id' => -1,
                'status' => -1,
            ];
        }

        if (!in_array(-2, $skipIds)) {
            $friendList[] = [
                'id' => -2,
                'status' => -1,
            ];
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

        $vkUserIds = array_filter($vkUserIds, function($id) {return $id > 0;});
        $vkUserIds[] = 1;

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
                    'photo_200' => "https://pp.userapi.com/c638616/v638616376/4b71e/f3BQaQsgqQ0.jpg?ava=1",
                    'last_name' => ""
                ],
                -2 => [
                    'first_name' => "Шишка",
                    'photo_200' => "https://pp.userapi.com/c851228/v851228980/3e08f/By4YsTDHamk.jpg?ava=1",
                    'last_name' => "Братишка"
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

        if ($user instanceof User || $friendId<0) {
            try {
                \DB::table('t_friend_relation')->insert([
                    'user_id' => $request->userId,
                    'friend_id' => $friendId,
                    'status' => 0
                ]);
                $this->dispatch(SendNotification::UserWantKnowNotification($friendId, $name));
            } catch (QueryException $e) {
                // It's ok
            } catch (\Exception $e) {
                \Log::error($e);
            }

        }

        return new OkResponse(1);
    }
}
