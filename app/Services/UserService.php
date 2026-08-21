<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function getFilteredUsers(Request $request, int $perPage = 10)
    {
        $search = $request->input('search');
        $filters = $request->input('filters', []);

        $query = User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        foreach ($filters as $key => $value) {
            if ($value !== null && $value !== '') {
                $query->where($key, $value);
            }
        }

        return $query->orderByDesc('updated_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Create a new user.
     */
    public function create(array $data): User
    {
        DB::beginTransaction();
        try {
            $data['password'] = bcrypt($data['password']);
            $user = User::query()->create($data);
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Update an existing user.
     * Hapus session login jika password diubah atau status dinonaktifkan.
     */
    public function update(User $user, array $data): bool
    {
        DB::beginTransaction();
        try {
            $passwordChanged   = ! empty($data['password']);
            $statusDeactivated = ($data['status'] ?? null) === 'inactive' && $user->status !== 'inactive';

            // Only update password if provided
            if ($passwordChanged) {
                $data['password'] = bcrypt($data['password']);
            } else {
                unset($data['password']);
            }

            $result = $user->update($data);

            // Invalidasi semua session user jika password diubah atau status dinonaktifkan
            if ($passwordChanged || $statusDeactivated) {
                DB::table('sessions')
                    ->where('user_id', $user->id)
                    ->delete();
            }

            DB::commit();

            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Delete a user.
     */
    public function delete(User $user): ?bool
    {
        return $user->delete();
    }
}
