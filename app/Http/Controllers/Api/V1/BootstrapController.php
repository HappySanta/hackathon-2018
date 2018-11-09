<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\SignRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class BootstrapController extends Controller
{
    public function index(SignRequest $request)
    {
        $user = User::find($request->userId);
        return new JsonResponse(['response' => [
            'user' => $user,
        ]]);
    }
}
