import { z } from 'zod';

const requiredId = (label: string) =>
    z.number().int().positive(`${label} wajib dipilih`);

const costSchema = z.object({
    vendor_id: requiredId('Vendor'),
    bank_name: z.string().trim().max(100, 'Nama bank maksimal 100 karakter'),
    account_number: z
        .string()
        .trim()
        .max(50, 'Nomor rekening maksimal 50 karakter'),
    vehicle_type_id: z.number().int().positive().nullable(),
    cost_name: z
        .string()
        .trim()
        .min(1, 'Nama biaya wajib diisi')
        .max(100, 'Nama biaya maksimal 100 karakter'),
    description: z.string().max(1000, 'Deskripsi maksimal 1000 karakter'),
    vendor_unit_price: z
        .number()
        .min(0, 'Harga vendor tidak boleh kurang dari 0'),
    quantity: z.number().int().min(1, 'Jumlah minimal 1'),
    license_plate: z.string().max(20, 'Nomor polisi maksimal 20 karakter'),
    driver_name: z.string().max(100, 'Nama driver maksimal 100 karakter'),
    driver_phone_number: z
        .string()
        .max(20, 'Nomor telepon driver maksimal 20 karakter'),
});

const routeSchema = z.object({
    loading_city: z.string().trim().min(1, 'Kota muat wajib diisi').max(50),
    loading_address: z
        .string()
        .trim()
        .min(1, 'Alamat muat wajib diisi')
        .max(1000),
    unloading_city: z
        .string()
        .trim()
        .min(1, 'Kota bongkar wajib diisi')
        .max(50),
    unloading_address: z
        .string()
        .trim()
        .min(1, 'Alamat bongkar wajib diisi')
        .max(1000),
    pic_receipt_name: z.string().max(100, 'Nama PIC maksimal 100 karakter'),
    pic_receipt_phone_number: z
        .string()
        .max(20, 'Nomor telepon PIC maksimal 20 karakter'),
});

export const getJobsheetSchema = () =>
    z.object({
        customer_id: requiredId('Customer'),
        job_date: z.string().min(1, 'Tanggal jobsheet wajib diisi'),
        job_type: z.enum(['DTD', 'PTD', 'PTP', 'CYCY', 'CYTP']),
        jobsheet_note: z
            .string()
            .trim()
            .min(1, 'Catatan jobsheet wajib diisi')
            .max(1000, 'Catatan maksimal 1000 karakter'),
        total_vendor_price: z.number().min(0),
        total_customer_price: z
            .number()
            .positive('Harga jual harus lebih dari 0'),
        payment_note: z
            .string()
            .max(255, 'Catatan pembayaran maksimal 255 karakter'),
        invoice: z
            .object({
                invoice_date: z.string().min(1, 'Tanggal invoice wajib diisi'),
                due_date: z.string().min(1, 'Tanggal jatuh tempo wajib diisi'),
            })
            .refine((invoice) => invoice.due_date >= invoice.invoice_date, {
                path: ['due_date'],
                message:
                    'Tanggal jatuh tempo tidak boleh lebih awal dari tanggal invoice',
            }),
        routes: z.array(routeSchema).min(1, 'Minimal satu rute wajib diisi'),
        costs: z
            .array(costSchema)
            .min(1, 'Minimal satu rincian biaya wajib diisi'),
    });
