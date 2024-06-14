<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->string('name', 50)->nullable();
            $table->string('surname', 100)->nullable();
            $table->string('patronymic', 100)->nullable();
            $table->dateTime('birth')->nullable();
            $table->string('avatar')->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('mailing_address')->nullable();
            $table->string('notes', 500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
