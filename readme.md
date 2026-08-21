# Company Profile SBA Logistik

Company profile berbasis Laravel, Inertia, React, TypeScript, dan Tailwind CSS untuk profil perusahaan SBA Logistik.

<!-- Saat ini aplikasi difokuskan sebagai website statis terlebih dahulu. Fitur login, dashboard, settings, dan CRUD user/admin sengaja dinonaktifkan sementara agar halaman utama langsung menampilkan company profile.

## Status Saat Ini

- Route default `/` langsung menampilkan halaman `welcome`.
- Fitur auth/Fortify dinonaktifkan sementara.
- Route admin, dashboard, settings, dan CRUD user dinonaktifkan sementara.
- Halaman fitur dinamis masih disimpan di `resources/js/pages-disabled` agar mudah dikembalikan saat fase pengembangan berikutnya.

## Tech Stack

- Laravel 13
- Inertia.js
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Vite
- MySQL/MariaDB

## Struktur Penting

- `routes/web.php` - route publik dan route dinamis yang sedang dikomentari.
- `resources/js/pages/welcome.tsx` - halaman utama company profile.
- `resources/js/pages-disabled/` - arsip halaman auth/admin/settings/user/vendor yang sedang tidak aktif.
- `app/Providers/AppServiceProvider.php` - tempat `Fortify::ignoreRoutes()` dipasang untuk mematikan route auth sementara.
- `bootstrap/providers.php` - `FortifyServiceProvider` sedang dikomentari.

## Menjalankan Project Lokal

Install dependency backend:

```bash
composer install
```

Install dependency frontend:

```bash
npm install
```

Salin environment jika belum ada:

```bash
cp .env.example .env
php artisan key:generate
```

Jalankan server Laravel:

```bash
php artisan serve
```

Jalankan Vite untuk development:

```bash
npm run dev
```

Di Windows PowerShell, jika `npm run dev` diblokir execution policy, gunakan:

```bash
npm.cmd run dev
```

Default URL saat menggunakan `php artisan serve`:

```txt
http://localhost:8000/
```

Jika menggunakan Laragon tanpa virtual host, akses melalui:

```txt
http://localhost/Company%20Profile%20SBA%20Logistik/public/
```

Lebih disarankan membuat virtual host Laragon dengan document root mengarah ke folder `public`.

## Mode Statis

Untuk mode company profile statis, pastikan kondisi berikut tetap seperti sekarang:

```php
// routes/web.php
Route::inertia('/', 'welcome')->name('home');
```

Route dinamis tetap dikomentari:

```php
// require __DIR__.'/roles/admin.php';
// require __DIR__.'/settings.php';
```

Fortify route tetap diabaikan:

```php
// app/Providers/AppServiceProvider.php
Fortify::ignoreRoutes();
```

Dan provider Fortify tetap tidak didaftarkan:

```php
// bootstrap/providers.php
// FortifyServiceProvider::class,
```

## Mengaktifkan Kembali Login/Admin Nanti

Saat project sudah masuk fase CRUD berita, user, atau admin panel:

1. Pindahkan kembali folder dari `resources/js/pages-disabled` ke `resources/js/pages`.
2. Aktifkan kembali route dashboard/admin/settings di `routes/web.php`.
3. Aktifkan kembali `FortifyServiceProvider::class` di `bootstrap/providers.php`.
4. Hapus atau komentari `Fortify::ignoreRoutes()` di `AppServiceProvider.php`.
5. Jalankan:

```bash
php artisan optimize:clear
npm run build
```

## Command Berguna

Cek route aktif:

```bash
php artisan route:list
```

Bersihkan cache Laravel:

```bash
php artisan optimize:clear
```

Build asset frontend:

```bash
npm run build
```

Jalankan test:

```bash
php artisan test
```

## Catatan

Jika browser masih mengarah ke `/login`, bersihkan cache Laravel dan hard refresh browser. Pastikan juga URL yang dibuka mengarah ke project ini, bukan root Laragon atau project lain. -->
