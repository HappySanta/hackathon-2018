<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\SignRequest;
use App\Http\Controllers\Controller;
use App\Http\Responses\ErrorResponse;
use App\Http\Responses\OkResponse;
use App\Models\DailyState;
use Carbon\Carbon;

class DailyStateController extends Controller
{
    public function show(SignRequest $request, $date)
    {
        $stateDate = (int) $date;
        if (empty($stateDate)) {
            return new ErrorResponse(400, 'Invalid params');
        }
        return new OkResponse(DailyState::getUserStatePerDay($request->userId, $stateDate));
    }

    public function store(SignRequest $request)
    {
        $stateDate = (int) $request->input('date', 0);
        $state = $request->input('state');
        $comment = (string) $request->input('comment', null);
        if (empty($stateDate) || empty($state)) {
            return new ErrorResponse(400, 'Invalid params');
        }
        $dailyState = new DailyState();
        $dailyState->user_id = $request->userId;
        $date = Carbon::createFromTimestamp($stateDate);
        $dailyState->state_date = $date;
        $dailyState->state = json_encode($state);
        if ($comment) {
            $dailyState->comment = $comment;
        }
        \DB::beginTransaction();
        DailyState::where('user_id', $request->userId)
            ->whereBetween('state_date', [($date->copy())->startOfDay(), $date->copy()->endOfDay()])
            ->delete();
        $dailyState->save();
        \DB::commit();
        return new OkResponse(DailyState::getUserPerLastThreeDays($request->userId, Carbon::now()->getTimestamp()));
    }
}
