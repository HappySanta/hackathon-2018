<?php

Route::resource('v1/bootstrap', 'Api\V1\BootstrapController', ['only' => 'index']);


Route::resource('v1/friends', 'FriendController', ['only' => ['index', 'store', 'show', 'destroy']]);
