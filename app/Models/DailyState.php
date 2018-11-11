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

    public static function getUserPerLastThreeDays($userId, $timestamp)
    {
        $date = Carbon::createFromTimestamp($timestamp);
        $states = DailyState::where('user_id', $userId)
            ->whereBetween('state_date', [($date->copy())->subDays(3)->startOfDay(), $date->copy()->endOfDay()])
            ->take(4)
            ->get();
        $response = [];
        foreach ($states as $state) {
            if ($state instanceof DailyState) {
                $response[Carbon::createFromTimestamp($state->state_date)->day] = $state->toUserView();
            } else {
                $response[Carbon::createFromTimestamp($state->state_date)->day] = null;
            }
        }
        return $response;
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
                    "Спокойная",
                    "Радосная",
                    "Энергичная",
                    "Игривая",
                    "Перепады настроения",
                    "Радражена",
                    "Грусная",
                    "Встревоженная",
                    "Чувство вины",
                    "Навязчивые мысли",
                    "Апатичная",
                    "Растерянная",
                    "Жесткая самокритика",
                ]
            ],
            [
                "name" => "sign",
                "items" => [
                    "Все в порядке",
                    "Тянет живот",
                    "Чувсвительная грудь",
                    "Головная боль",
                    "Прыщи",
                    "Тошнота",
                    "Усталость",
                    "Вздутие живота",
                    "Бессоница",
                    "Запор",
                    "Диарея",
                ]],
            [
                "name" => "fill",
                "items" => [
                    "Выделений нет",
                    "Кровомажущие",
                    "Липкие",
                    "Кремообразные",
                    "Слизистые",
                    "Водянистые",
                    "Нетипичные",
                ]],
            [
                "name" => "events",
                "items" => [
                    "Путешествие",
                    "Стресс",
                    "Болезнь или травма",
                    "Алкоголь",
                ]]
        ];
    }
}
