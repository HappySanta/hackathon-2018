<?php

use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('test-notification', function () {

    $accessToken = 'de3b7b53de3b7b53de3b7b533fde5d8fd4dde3bde3b7b5385dd6d3151ee7b85043eae39';

    $res = \Vk\Executor::api("notifications.sendMessage", [
        "user_ids" => implode(",", [19039187]),
        "message" => "Hello world",
        "fragment" => "test",
        "v" => "5.87",
        "access_token" => $accessToken
    ]);

    if ($res->isSuccess()) {
        $this->info($res->getRawResponse());
    } else {
        $this->info($res->getCode().' '.$res->getMessage());
    }
})->describe('Display an inspiring quote');


