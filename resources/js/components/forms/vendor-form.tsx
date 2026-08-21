import { Link, useForm } from '@inertiajs/react';
import {
    Building2,
    LoaderCircle,
    Save,
} from 'lucide-react';
import type { FormEvent } from 'react';

import InputError from '@/components/input-error';
import { SearchableSelectField } from '@/components/searchable-select-field';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useZod } from '@/hooks/use-zod';
import admin from '@/routes/admin';
import type { Vendor, VendorStatus, VendorType } from '@/types/models';
import { getVendorSchema } from '@/validations/vendor-schema';

interface VendorFormProps {
    vendor?: Vendor;
    vendorTypes: Pick<VendorType, 'id' | 'vendor_type_name'>[];
    formStatus: 'create' | 'edit' | 'show';
}

interface VendorFormData {
    vendor_type_id: number;
    vendor_name: string;
    pic_name: string;
    phone_number: string;
    address: string;
    status: VendorStatus;
}

const STATUS_OPTIONS: { value: VendorStatus; label: string }[] = [
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Nonaktif' },
];

export default function VendorForm({ vendor, vendorTypes, formStatus }: VendorFormProps) {
    const isReadOnly = formStatus === 'show';

    const form = useForm<VendorFormData>({
        vendor_type_id: vendor?.vendor_type_id ?? 0,
        vendor_name: vendor?.vendor_name ?? '',
        pic_name: vendor?.pic_name ?? '',
        phone_number: vendor?.phone_number ?? '',
        address: vendor?.address ?? '',
        status: vendor?.status ?? 'active',
    });

    const { validate } = useZod(getVendorSchema());

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isReadOnly) {
            return;
        }

        const result = validate(form.data);

        if (!result.success) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                form.setError(field as keyof VendorFormData, messages[0]);
            });

            return;
        }

        if (formStatus === 'create') {
            form.post(admin.vendors.store.url());
        } else if (formStatus === 'edit' && vendor) {
            form.put(admin.vendors.update.url({ vendor: vendor }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)] lg:items-start">
                {/* ── Informasi Utama ── */}
                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                                <Building2 className="size-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-sba-primary dark:text-sba-secondary">
                                    Informasi Vendor
                                </CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">
                                    Data utama yang digunakan untuk mengenali dan menghubungi vendor.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 px-5 pb-6 sm:px-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            {/* Nama Vendor */}
                            <div className="space-y-2">
                                <Label htmlFor="vendor_name">
                                    Nama vendor <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="vendor_name"
                                    value={form.data.vendor_name}
                                    onChange={(e) => form.setData('vendor_name', e.target.value)}
                                    disabled={form.processing || isReadOnly}
                                    placeholder="Contoh: PT Maju Bersama"
                                    aria-invalid={Boolean(form.errors.vendor_name)}
                                />
                                <InputError message={form.errors.vendor_name} />
                            </div>

                            {/* Nama PIC */}
                            <div className="space-y-2">
                                <Label htmlFor="pic_name">
                                    Nama PIC <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="pic_name"
                                    value={form.data.pic_name}
                                    onChange={(e) => form.setData('pic_name', e.target.value)}
                                    disabled={form.processing || isReadOnly}
                                    placeholder="Contoh: Budi Santoso"
                                    aria-invalid={Boolean(form.errors.pic_name)}
                                />
                                <InputError message={form.errors.pic_name} />
                            </div>

                            {/* Nomor Telepon */}
                            <div className="space-y-2">
                                <Label htmlFor="phone_number">
                                    Nomor telepon <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="phone_number"
                                    type="tel"
                                    value={form.data.phone_number}
                                    onChange={(e) => form.setData('phone_number', e.target.value)}
                                    disabled={form.processing || isReadOnly}
                                    placeholder="Contoh: 0812 3456 7890"
                                    aria-invalid={Boolean(form.errors.phone_number)}
                                />
                                <InputError message={form.errors.phone_number} />
                            </div>
                        </div>

                        {/* Alamat */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                id="address"
                                value={form.data.address}
                                onChange={(e) => form.setData('address', e.target.value)}
                                disabled={form.processing || isReadOnly}
                                placeholder="Alamat lengkap vendor (opsional)"
                                rows={3}
                                aria-invalid={Boolean(form.errors.address)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Opsional. Digunakan untuk kebutuhan pengiriman atau referensi operasional.
                            </p>
                            <InputError message={form.errors.address} />
                        </div>
                    </CardContent>
                </Card>

                {/* ── Kategori & Status ── */}
                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                                <Building2 className="size-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-sba-primary dark:text-sba-secondary">
                                    Kategori & Status
                                </CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">
                                    Tentukan tipe dan status aktif vendor.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5 px-5 pb-6 sm:px-6">
                        {/* Tipe Vendor */}
                        <div className="space-y-2">
                            <Label htmlFor="vendor_type_id">
                                Tipe vendor <span className="text-destructive">*</span>
                            </Label>
                            <SearchableSelectField
                                id="vendor_type_id"
                                value={form.data.vendor_type_id > 0 ? String(form.data.vendor_type_id) : ''}
                                onValueChange={(value) => form.setData('vendor_type_id', Number(value))}
                                options={vendorTypes.map((vt) => ({
                                    value: String(vt.id),
                                    label: vt.vendor_type_name,
                                }))}
                                placeholder="Pilih tipe vendor"
                                searchPlaceholder="Cari tipe vendor..."
                                emptyMessage="Tipe vendor tidak ditemukan."
                                disabled={form.processing || isReadOnly}
                                aria-invalid={Boolean(form.errors.vendor_type_id)}
                            />
                            <InputError message={form.errors.vendor_type_id} />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">
                                Status <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={form.data.status}
                                onValueChange={(value) =>
                                    form.setData('status', value as VendorStatus)
                                }
                                disabled={form.processing || isReadOnly}
                            >
                                <SelectTrigger id="status" className="w-full">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Vendor nonaktif tidak dapat digunakan pada jobsheet baru.
                            </p>
                            <InputError message={form.errors.status} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {!isReadOnly && (
                <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={form.processing}
                        asChild
                        className="w-full sm:w-auto"
                    >
                        <Link href={admin.vendors.index.url()}>Batal</Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={form.processing}
                        variant="sbaPrimary"
                        className="w-full sm:w-auto sm:min-w-36"
                    >
                        {form.processing ? (
                            <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                            <Save className="size-4" />
                        )}
                        {form.processing ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>
            )}
        </form>
    );
}
