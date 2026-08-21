import { z } from 'zod';

export const getVendorSchema = () =>
    z.object({
        vendor_type_id: z
            .number({ message: 'Tipe vendor wajib dipilih' })
            .int()
            .positive('Tipe vendor wajib dipilih'),
        vendor_name: z
            .string()
            .min(1, 'Nama vendor wajib diisi')
            .max(150, 'Nama vendor maksimal 150 karakter'),
        pic_name: z
            .string()
            .min(1, 'Nama PIC wajib diisi')
            .max(100, 'Nama PIC maksimal 100 karakter'),
        phone_number: z
            .string()
            .min(1, 'Nomor telepon wajib diisi')
            .max(20, 'Nomor telepon maksimal 20 karakter'),
        address: z.string().max(500, 'Alamat maksimal 500 karakter').optional(),
        status: z.enum(['active', 'inactive'], {
            message: 'Status wajib dipilih',
        }),
    });
