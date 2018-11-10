<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTDailyStateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('t_daily_state', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->timestamp('state_date');
            $table->text('comment')->nullable();
            $table->json('state');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('t_daily_state');
    }
}
