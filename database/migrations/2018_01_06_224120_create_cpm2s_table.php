<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCpm2sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cpm2s', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('location_id');
            $table->string('name');
            $table->integer('type_id');
            $table->string('comment')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->integer('created_by')->default(0);
            $table->integer('updated_by')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cpm2s');
    }
}
