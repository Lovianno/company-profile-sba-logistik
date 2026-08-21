import { z } from 'zod';

export const getCustomerSchema = () =>
    z.object({
        company_name: z
            .string()
            .min(1, 'Nama perusahaan wajib diisi')
            .max(100, 'Nama perusahaan maksimal 100 karakter'),
        pic_name: z
            .string()
            .min(1, 'Nama PIC wajib diisi')
            .max(100, 'Nama PIC maksimal 100 karakter'),
        pic_phone_number: z
            .string()
            .min(1, 'Nomor telepon PIC wajib diisi')
            .max(20, 'Nomor telepon PIC maksimal 20 karakter'),
        address: z
            .string()
            .min(1, 'Alamat wajib diisi')
            .max(500, 'Alamat maksimal 500 karakter'),
        payment_term: z
            .string()
            .max(100, 'Termin pembayaran maksimal 100 karakter')
            .optional()
            .or(z.literal('')),
    });
