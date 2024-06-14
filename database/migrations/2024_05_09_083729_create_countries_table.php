<?php

use App\Models\City;
use App\Models\Continent;
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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Continent::class)->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('name')->unique();
            $table->decimal('latitude', 8, 6)->default(0); // Ширина
            $table->decimal('longitude', 9, 6)->default(0); // Долгота
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
