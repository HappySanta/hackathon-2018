<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 't_user';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'menstruated_at' => 'timestamp',
        'bdate' => 'timestamp',
    ];

    public function toUserView()
    {
        return [
            'id' => $this->id,
            'cycle_length' => $this->cycle_length,
            'menstruation_length' => $this->menstruation_length,
            'menstruated_at' => $this->menstruated_at,
            'bdate' => $this->bdate,
        ];
    }

    public function isValid()
    {
        return !empty($this->cycle_length)
            && !empty($this->menstruation_length) && !empty($this->menstruated_at)
            && !empty($this->bdate);
    }
}
