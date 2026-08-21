import { Link, useForm } from '@inertiajs/react';
import { Building2, LoaderCircle, Save } from 'lucide-react';
import type { FormEvent } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useZod } from '@/hooks/use-zod';
import admin from '@/routes/admin';
import type { Customer } from '@/types/models';
import { getCustomerSchema } from '@/validations/customer-schema';

interface CustomerFormProps {
    customer?: Customer;
    formStatus: 'create' | 'edit' | 'show';
}

interface CustomerFormData {
    company_name: string;
    pic_name: string;
    pic_phone_number: string;
    address: string;
    payment_term: string;
}

export default function CustomerForm({ customer, formStatus }: CustomerFormProps) {
    const isReadOnly = formStatus === 'show';
    const form = useForm<CustomerFormData>({
        company_name: customer?.company_name ?? '',
        pic_name: customer?.pic_name ?? '',
        pic_phone_number: customer?.pic_phone_number ?? '',
        address: customer?.address ?? '',
        payment_term: customer?.payment_term ?? '',
    });

    const { validate } = useZod(getCustomerSchema());

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isReadOnly) {
            return;
        }

        const result = validate(form.data);

        if (!result.success) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                form.setError(field as keyof CustomerFormData, messages[0]);
            });

            return;
        }

        if (formStatus === 'create') {
            form.post(admin.customers.store.url());
        } else if (formStatus === 'edit' && customer) {
            form.put(admin.customers.update.url({ customer }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)] lg:items-start">
                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                                <Building2 className="size-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-sba-primary dark:text-sba-secondary">
                                    Informasi Customer
                                </CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">
                                    Data utama customer yang dipakai untuk kebutuhan operasional dan penagihan.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 px-5 pb-6 sm:px-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="company_name">
                                    Nama perusahaan <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="company_name"
                                    value={form.data.company_name}
                                    onChange={(e) => form.setData('company_name', e.target.value)}
                                    disabled={form.processing || isReadOnly}
                                    placeholder="Contoh: PT Maju Bersama"
                                    aria-invalid={Boolean(form.errors.company_name)}
                                />
                                <InputError message={form.errors.company_name} />
                            </div>

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

                            <div className="space-y-2">
                                <Label htmlFor="pic_phone_number">
                                    Nomor telepon PIC <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="pic_phone_number"
                                    type="tel"
                                    value={form.data.pic_phone_number}
                                    onChange={(e) => form.setData('pic_phone_number', e.target.value)}
                                    disabled={form.processing || isReadOnly}
                                    placeholder="Contoh: 0812 3456 7890"
                                    aria-invalid={Boolean(form.errors.pic_phone_number)}
                                />
                                <InputError message={form.errors.pic_phone_number} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">
                                Alamat <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="address"
                                value={form.data.address}
                                onChange={(e) => form.setData('address', e.target.value)}
                                disabled={form.processing || isReadOnly}
                                placeholder="Alamat lengkap customer"
                                rows={4}
                                aria-invalid={Boolean(form.errors.address)}
                            />
                            <InputError message={form.errors.address} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                                <Building2 className="size-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-sba-primary dark:text-sba-secondary">
                                    Termin Pembayaran
                                </CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">
                                    Informasi tambahan yang membantu tim finance saat memproses invoice.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5 px-5 pb-6 sm:px-6">
                        <div className="space-y-2">
                            <Label htmlFor="payment_term">Termin pembayaran</Label>
                            <Input
                                id="payment_term"
                                value={form.data.payment_term}
                                onChange={(e) => form.setData('payment_term', e.target.value)}
                                disabled={form.processing || isReadOnly}
                                placeholder="Contoh: 14 hari setelah invoice"
                                aria-invalid={Boolean(form.errors.payment_term)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Opsional. Isi jika customer punya ketentuan pembayaran tertentu.
                            </p>
                            <InputError message={form.errors.payment_term} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {!isReadOnly && (
                <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
                    <Button type="button" variant="outline" disabled={form.processing} asChild className="w-full sm:w-auto">
                        <Link href={admin.customers.index.url()}>Batal</Link>
                    </Button>
                    <Button type="submit" disabled={form.processing} variant="sbaPrimary" className="w-full sm:w-auto sm:min-w-36">
                        {form.processing ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
                        {form.processing ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>
            )}
        </form>
    );
}
