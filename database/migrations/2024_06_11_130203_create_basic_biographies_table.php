<?php

use App\Models\City;
use App\Models\Country;
use App\Models\Religion;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('basic_biographies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('patronymic');
            $table->foreignIdFor(City::class)->constrained()->cascadeOnDelete();
            $table->string('place_birth');
            $table->dateTime('birth');
            $table->string('nicknames', 500);
            $table->dateTime('death');
            $table->string('place_death');
            $table->string('cause_death', 500);
            $table->string('height');
            $table->string('weight');
            $table->foreignIdFor(Religion::class)->constrained()->cascadeOnDelete();
            $table->string('hobby', 1000);
            $table->string('associate', 500);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('basic_biographies');
    }
};
