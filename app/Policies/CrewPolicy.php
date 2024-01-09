<?php

namespace App\Policies;

use App\Models\Crew;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CrewPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Crew $crew): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Crew $crew_upload): bool
    {
        return $crew_upload->user()->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Crew $crew_upload): bool
    {
        return $this->update($user, $crew_upload);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Crew $crew): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Crew $crew): bool
    {
        //
    }
}