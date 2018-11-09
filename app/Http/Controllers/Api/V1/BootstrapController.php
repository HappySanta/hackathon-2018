<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\SignRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BootstrapController extends Controller
{
    public function index(SignRequest $request)
    {
        return new JsonResponse(['response' => 1]);
    }
}
