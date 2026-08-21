import { z } from 'zod';

export const getVendorTypeSchema = () =>
    z.object({
        vendor_type_name: z
            .string()
            .min(1, 'Nama tipe vendor wajib diisi')
            .max(100, 'Nama tipe vendor maksimal 100 karakter'),
    });
