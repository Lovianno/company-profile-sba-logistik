# 🚚 SBA Logistics Smart System

![Laravel 13](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-v2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Component_Library-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**SBA Logistics Smart System** adalah sistem ERP (*Enterprise Resource Planning*) manajemen logistik B2B (*Business-to-Business*) berbasis web modern. Aplikasi ini dirancang khusus untuk menangani kompleksitas pengiriman barang pihak ketiga (3PL/Agregator), mulai dari pengelolaan armada truk internal dan mitra vendor, alokasi biaya dinamis, pelacakan siklus hidup manifes (*State Machine*), hingga pembukuan arus kas riwayat dua arah (*Double-Ledger Payments*).

---

## ✨ Fitur Utama (Key Features)

### 1. 🔄 Linear State-Machine Order Lifecycle
Menangani siklus pengiriman secara berurutan dan terstruktur:
* **Draft State:** Sandbox persiapan order tanpa risiko lompatan nomor invoice legal.
* **Muat State:** Pemicu terbitnya nomor *Invoice* otomatis dan awal pencairan DP customer.
* **Dikirim & Diterima State:** Pelacakan titik awal pengiriman hingga konfirmasi penerima di lokasi bongkar.
* **Selesai State:** Penutupan status operasional secara absolut untuk proses pelunasan akhir.

### 2. 🔒 Lock & Unlock State-Control Mechanism
* **Auto-Lock:** Sistem secara otomatis mengunci form edit (*is_locked = TRUE*) begitu *Invoice* diterbitkan pada status *Muat*.
* **Bypass Approval Admin:** Apabila terjadi interupsi biaya tak terduga di lapangan, staf wajib mengajukan pembukaan kunci ke Admin.
* **Automatic Recalculation:** Perubahan biaya akan menghitung ulang (*recalculate*) nilai tagihan secara presisi sebelum terkunci kembali secara otomatis.

### 3. 💰 Pembukuan Riwayat Dua Arah (Double-Ledger Payments)
* **Account Receivable (`invoice_payments`):** Melacak riwayat pembayaran masuk (DP, Cicilan, Pelunasan) dari *Customer* terikat pada *Invoice ID* dengan relasi 1-to-Many.
* **Account Payable (`vendor_payments`):** Melacak riwayat pengeluaran kas perusahaan (DP/Pelunasan ongkos truk) ke *Vendor* mitra terikat pada *Jobsheet Cost ID*.

### 4. 👥 Role-Based Access Control (RBAC) & Separation of Duty
Menerapkan 3 tingkatan otorisasi pengguna untuk menjaga integritas data:
* **Admin:** Akses *superuser*, manajemen akun pengguna, master tipe kendaraan, dan kontrol tombol *Unlock Bypass*.
* **Finance:** Pengelolaan invoice tagihan, input pencatatan kas masuk *Customer*, dan kas keluar *Vendor*.
* **Customer Service (CS):** Input master customer/vendor, pembuatan *Jobsheet*, dan pembaruan status operasional pengiriman.

### 5. 🚛 Multi-Fleet & Normalized Schema (1NF)
Pemisahan entitas spesifik antara armada internal dan vendor. Plat nomor serta identitas supir tersimpan secara ter-normalisasi pada tabel detail (`jobsheet_costs`), memungkinkan 1 order *Jobsheet* menampung banyak kendaraan (*multi-fleet*) dan komponen biaya non-truk (forklift & asuransi) secara rapi.

---

## 🛠️ Tech Stack & Technologies

* **Backend Framework:** Laravel 13.x
* **Frontend Adapter:** Inertia.js v2.0 (Single Page Application UX)
* **Frontend Library:** React 19.x & TypeScript
* **Styling & Components:** TailwindCSS v4.0 & shadcn/ui
* **Database Management:** MySQL 8.0 / MariaDB
* **Build Tool:** Vite

---

## 🚀 Panduan Instalasi Lokal (Getting Started)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di lingkungan pengembangan lokal:

### Prasyarat
* PHP >= 8.3
* Composer
* Node.js >= 20.x & NPM
* MySQL Database

### 1. Clone Repository
```bash
git clone [https://github.com/username-kamu/sba-logistics-smart-system.git](https://github.com/username-kamu/sba-logistics-smart-system.git)
cd sba-logistics-smart-system