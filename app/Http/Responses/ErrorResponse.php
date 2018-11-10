<?php


namespace App\Http\Responses;


use Illuminate\Http\JsonResponse;

class ErrorResponse extends JsonResponse
{

    /**
     * ErrorResponse constructor.
     * @param int $code
     * @param string $message
     */
    public function __construct(int $code, string $message)
    {
        parent::__construct(['error' => [
            'code' => $code,
            'message' => $message
        ]]);
    }
}
