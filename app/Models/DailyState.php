<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class DailyState extends Model
{
    protected $table = 't_daily_state';

    protected $casts = [
        'state_date' => 'timestamp',
    ];

    public static function getUserStatePerDay($userId, $timestamp)
    {
        $date = Carbon::createFromTimestamp($timestamp);
        $state = DailyState::where('user_id', $userId)
            ->whereBetween('state_date', [($date->copy())->startOfDay(), $date->copy()->endOfDay()])
            ->first();
        if ($state instanceof DailyState) {
            return $state->toUserView();
        } else {
            return null;
        }
    }

    public function toUserView()
    {
        return [
            'id' => $this->id,
            'date' => $this->state_date,
            'state' => json_decode($this->state, true),
        ];
    }

    public static function getSchema()
    {
        return [
            [
                "name" => "mood",
                "items" => [
                    "asdasd",
                    "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd",
                ]
            ],
            [
                "name" => "sign",
                "items" => [
                    "asdasd",
                    "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd",
                ]],
            [
                "name" => "fill",
                "items" => [
                    "asdasd",
                    "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd",
                ]],
            [
                "name" => "events",
                "items" => [
                    "asdasd",
                    "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd",
                ]]
        ];
    }
}
