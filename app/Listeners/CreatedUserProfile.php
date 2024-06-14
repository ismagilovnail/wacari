<?php

namespace App\Listeners;

use App\Models\Profile;
use App\Models\User;

class CreatedUserProfile
{
    public $user;

    /**
     * Полчение пользователя
     *
     * @param \App\Models\User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Handle the event.
     */
    public function handle(CreatedUserProfile $event): void
    {
        Profile::create([
            'user_id' => $event->user->id
        ]);
    }
}
