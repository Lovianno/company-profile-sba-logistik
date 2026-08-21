<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'guest/home')->name('home');
// Route::get('/login', fn () => redirect()->to(url('/')))->name('login');

/*
|--------------------------------------------------------------------------
| Disabled while company profile is static
|--------------------------------------------------------------------------
|
| Aktifkan kembali route berikut saat fase admin/login sudah diperlukan
| untuk CRUD berita, user, settings, dan fitur dinamis lainnya.
|
*/
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

// require __DIR__.'/roles/admin.php';
// require __DIR__.'/settings.php';
