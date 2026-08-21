import { z } from 'zod';

// Schema beda tergantung formStatus: password WAJIB diisi saat create,
// tapi OPSIONAL saat edit (boleh dikosongkan kalau gak mau ganti password).
export const getUserSchema = (formStatus: 'create' | 'edit') =>
    z
        .object({
            full_name: z.string().min(3, 'Nama minimal 3 karakter'),
            phone_number: z.string().max(20, 'Nomor telepon maksimal 20 karakter'),
            email: z.string().email('Format email tidak valid'),
            role: z.enum(['admin', 'finance', 'cs'], {
                message: 'Hak akses wajib dipilih',
            }),
            status: z.enum(['active', 'inactive'], {
                message: 'Status wajib dipilih',
            }),
            password: z.string().optional(),
            password_confirmation: z.string().optional(),
        })
        .refine(
            (data) =>
                formStatus === 'edit' ||
                (!!data.password && data.password.length >= 8),
            {
                message: 'Password minimal 8 karakter',
                path: ['password'],
            },
        )
        .refine(
            (data) => !data.password || data.password === data.password_confirmation,
            {
                message: 'Konfirmasi password tidak cocok',
                path: ['password_confirmation'],
            },
        );
