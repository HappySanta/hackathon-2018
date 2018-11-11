<?php

Route::resource('v1/bootstrap', 'Api\V1\BootstrapController', ['only' => 'index']);


Route::resource('v1/friends', 'FriendController', ['only' => ['index', 'store', 'show', 'destroy']]);
Route::resource('v1/user', 'Api\V1\UserController', ['only' => ['store', 'update']]);
Route::resource('v1/state', 'Api\V1\DailyStateController', ['only' => ['store', 'show']]);
