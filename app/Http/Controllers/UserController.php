<?php

namespace App\Http\Controllers;

use App\Http\Concerns\HasPaginationResponse;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    use HasPaginationResponse;

    /**
     * Tampilkan daftar semua user.
     */
    public function __construct(protected UserService $userService) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', User::class);

        $users = $this->userService->getFilteredUsers($request);

        return Inertia::render('users/index', [
            'users' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'last_page' => $users->lastPage(),
            ],
            'links' => [
                'prev' => $users->previousPageUrl(),
                'next' => $users->nextPageUrl(),
                'pages' => $this->paginationPages($users),
            ],
        ]);
    }

    /**
     * Tampilkan detail 1 user.
     */
    public function show(User $user): Response
    {
        $this->authorize('view', $user);

        return Inertia::render('users/show', [
            'user' => $user->only([
                'id',
                'full_name',
                'phone_number',
                'email',
                'role',
                'status',
                'created_at',
                'updated_at',
            ]),
        ]);
    }

    /**
     * Tampilkan form untuk tambah user baru.
     */
    public function create(): Response
    {
        $this->authorize('create', User::class);

        return Inertia::render('users/create');
    }

    /**
     * Simpan user baru ke database.
     */
    public function store(UserRequest $request): RedirectResponse
    {
        $this->authorize('create', User::class);

        $this->userService->create($request->validated());

        return redirect()
            ->route('admin.users.index')
            ->with('flash', ['type' => 'success', 'message' => 'User berhasil ditambahkan.']);
    }

    /**
     * Tampilkan form edit, sudah terisi data user terkait.
     */
    public function edit(User $user): Response
    {
        $this->authorize('update', $user);

        return Inertia::render('users/edit', [
            'user' => $user->only(['id', 'full_name', 'phone_number', 'email', 'role', 'status']),
        ]);
    }

    /**
     * Update data user yang sudah ada.
     */
    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        $this->userService->update($user, $request->validated());

        return redirect()
            ->route('admin.users.index')
            ->with('flash', ['type' => 'success', 'message' => 'User berhasil diperbarui.']);
    }

    /**
     * Hapus user.
     */
    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('delete', $user);

        $this->userService->delete($user);

        return redirect()
            ->route('admin.users.index')
            ->with('flash', ['type' => 'success', 'message' => 'User berhasil dihapus.']);
    }
}
