import type { Auth } from '@/types/auth';
import type { FlashToast } from '@/types/ui';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            flash: FlashToast | null;
            [key: string]: unknown;
        };
    }
}

// Extend TableMeta bawaan @tanstack/react-table (defaultnya interface kosong)
// supaya `table.options.meta?.current_page` dan `.per_page` dikenali
// TypeScript. Ini yang dipakai di data-table.tsx & columns/user.tsx untuk
// menghitung nomor urut baris di kolom "No".
declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        current_page?: number;
        per_page?: number;
    }
}