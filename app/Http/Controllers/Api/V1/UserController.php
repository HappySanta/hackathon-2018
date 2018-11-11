<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\SignRequest;
use App\Http\Controllers\Controller;
use App\Http\Responses\ErrorResponse;
use App\Http\Responses\OkResponse;
use App\Models\User;
use Carbon\Carbon;

class UserController extends Controller
{
    public function store(SignRequest $request)
    {
        $user = User::find($request->userId);
        if (!empty($user)) {
            return new OkResponse($user->toUserView());
        }
        $user = new User();
        $user = $this->fill($user, $request);
        if (!$user->isValid()) {
            return new ErrorResponse(400, 'Invalid params');
        }
        $user->save();
        return new OkResponse($user->toUserView());

    }

    protected function fill(User $user, SignRequest $request)
    {
        if (!$user->id) {
            $user->id = $request->userId;
        }
        $user->cycle_length = (int) $request->input('cycle_length', 0);
        $user->menstruation_length = (int) $request->input('menstruation_length', 0);
        $menstruated_at = (int) $request->input('menstruated_at', 0);
        $user->menstruated_at = $menstruated_at ? Carbon::createfromTimestamp($menstruated_at) : null;
        $bdate = (int) $request->input('bdate', 0);
        $user->bdate = $bdate ? Carbon::createfromTimestamp($bdate) : null;
        return $user;
    }

    public function update(SignRequest $request)
    {
        $user = User::find($request->userId);
        if (empty($user)) {
            return new ErrorResponse(400, 'User not found');
        }
        $user = $this->fill($user, $request);
        if (!$user->isValid()) {
            return new ErrorResponse(400, 'Invalid params');
        }
        $user->save();
        return new OkResponse($user->toUserView());
    }
}
