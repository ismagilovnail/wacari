<?php

use App\Models\BasicBiography;
use App\Models\DynamicField;
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
        Schema::create('basic_biography_dynamic_field', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(BasicBiography::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(DynamicField::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('basic_biography_dynamic_field');
    }
};
