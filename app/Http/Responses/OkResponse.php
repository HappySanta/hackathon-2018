<?php


namespace App\Http\Responses;


use Illuminate\Http\JsonResponse;

class OkResponse extends JsonResponse
{

    /**
     * OkResponse constructor.
     * @param $data
     */
    public function __construct($data)
    {
        parent::__construct(['response' => $data]);
    }
}
