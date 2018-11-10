<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\SignRequest;
use App\Http\Controllers\Controller;
use App\Http\Responses\OkResponse;
use App\Models\DailyState;
use App\Models\User;

class BootstrapController extends Controller
{
    public function index(SignRequest $request)
    {
        $user = User::find($request->userId);
        return new OkResponse([
            'user' => $user,
            'schema' => DailyState::getSchema(),
        ]);
    }
}
