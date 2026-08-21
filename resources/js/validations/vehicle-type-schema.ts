import { z } from 'zod';

export const getVehicleTypeSchema = () =>
    z.object({
        vehicle_type_name: z
            .string()
            .min(1, 'Nama tipe kendaraan wajib diisi')
            .max(50, 'Nama tipe kendaraan maksimal 50 karakter'),
    });
