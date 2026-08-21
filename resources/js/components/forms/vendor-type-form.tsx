import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle, Save, Tag } from 'lucide-react';
import type { FormEvent } from 'react';

import InputError from '@/components/input-error';
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
import { useZod } from '@/hooks/use-zod';
import admin from '@/routes/admin';
import type { VendorType } from '@/types/models';
import { getVendorTypeSchema } from '@/validations/vendor-type-schema';

interface VendorTypeFormProps {
    vendorType?: VendorType;
    formStatus: 'create' | 'edit' | 'show';
}

interface VendorTypeFormData {
    vendor_type_name: string;
}

export default function VendorTypeForm({ vendorType, formStatus }: VendorTypeFormProps) {
    const isReadOnly = formStatus === 'show';
    const form = useForm<VendorTypeFormData>({
        vendor_type_name: vendorType?.vendor_type_name ?? '',
    });

    const { validate } = useZod(getVendorTypeSchema());

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isReadOnly) {
            return;
        }

        const result = validate(form.data);

        if (!result.success) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                form.setError(field as keyof VendorTypeFormData, messages[0]);
            });

            return;
        }

        if (formStatus === 'create') {
            form.post(admin.vendorTypes.store.url());
        } else if (formStatus === 'edit' && vendorType) {
            form.put(admin.vendorTypes.update.url({ vendor_type: vendorType }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <Card className="overflow-hidden py-0">
                <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                    <div className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                            <Tag className="size-4" />
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-sba-primary dark:text-sba-secondary">
                                Informasi Tipe Vendor
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400">
                                Nama kategori yang digunakan untuk mengelompokkan vendor.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 px-5 pb-6 sm:px-6">
                    <div className="space-y-2">
                        <Label htmlFor="vendor_type_name">
                            Nama tipe vendor{' '}
                            <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="vendor_type_name"
                            value={form.data.vendor_type_name}
                            onChange={(e) =>
                                form.setData('vendor_type_name', e.target.value)
                            }
                            disabled={form.processing || isReadOnly}
                            placeholder="Contoh: Ekspedisi, Supplier, Bengkel"
                            aria-invalid={Boolean(form.errors.vendor_type_name)}
                        />
                        <InputError message={form.errors.vendor_type_name} />
                    </div>
                </CardContent>
            </Card>

            {!isReadOnly && (
                <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={form.processing}
                        asChild
                        className="w-full sm:w-auto"
                    >
                        <Link href={admin.vendorTypes.index.url()}>Batal</Link>
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
