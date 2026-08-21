import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle, Save, Truck } from 'lucide-react';
import type { FormEvent } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useZod } from '@/hooks/use-zod';
import admin from '@/routes/admin';
import type { VehicleType } from '@/types/models';
import { getVehicleTypeSchema } from '@/validations/vehicle-type-schema';

interface VehicleTypeFormProps {
    vehicleType?: VehicleType;
    formStatus: 'create' | 'edit' | 'show';
}

interface VehicleTypeFormData {
    vehicle_type_name: string;
}

export default function VehicleTypeForm({ vehicleType, formStatus }: VehicleTypeFormProps) {
    const isReadOnly = formStatus === 'show';
    const form = useForm<VehicleTypeFormData>({
        vehicle_type_name: vehicleType?.vehicle_type_name ?? '',
    });

    const { validate } = useZod(getVehicleTypeSchema());

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isReadOnly) {
            return;
        }

        const result = validate(form.data);

        if (!result.success) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                form.setError(field as keyof VehicleTypeFormData, messages[0]);
            });

            return;
        }

        if (formStatus === 'create') {
            form.post(admin.vehicleTypes.store.url());
        } else if (formStatus === 'edit' && vehicleType) {
            form.put(admin.vehicleTypes.update.url({ vehicle_type: vehicleType }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <Card className="overflow-hidden py-0">
                <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                    <div className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                            <Truck className="size-4" />
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-sba-primary dark:text-sba-secondary">
                                Informasi Tipe Kendaraan
                            </CardTitle>
                            <CardDescription className="text-gray-500 dark:text-gray-400">
                                Nama kategori yang digunakan untuk mengelompokkan kendaraan.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 px-5 pb-6 sm:px-6">
                    <div className="space-y-2">
                        <Label htmlFor="vehicle_type_name">
                            Nama tipe kendaraan <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="vehicle_type_name"
                            value={form.data.vehicle_type_name}
                            onChange={(e) => form.setData('vehicle_type_name', e.target.value)}
                            disabled={form.processing || isReadOnly}
                            placeholder="Contoh: CDD, Fuso, Tronton"
                            aria-invalid={Boolean(form.errors.vehicle_type_name)}
                        />
                        <InputError message={form.errors.vehicle_type_name} />
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
                        <Link href={admin.vehicleTypes.index.url()}>Batal</Link>
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
