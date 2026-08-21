import { Link, useForm } from '@inertiajs/react';
import { CirclePlus, LoaderCircle, Save, Trash2 } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

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
import { JOB_TYPE_META } from '@/lib/constants/jobsheet';
import admin from '@/routes/admin';
import type { JobType } from '@/types/models';
import { getJobsheetSchema } from '@/validations/jobsheet-schema';

type CustomerOption = { id: number; company_name: string };
type VendorOption = { id: number; vendor_name: string };
type VehicleTypeOption = { id: number; vehicle_type_name: string };

type JobsheetCostFormData = {
    vendor_id: number;
    bank_name: string;
    account_number: string;
    vehicle_type_id: number | null;
    cost_name: string;
    description: string;
    vendor_unit_price: number;
    quantity: number;
    license_plate: string;
    driver_name: string;
    driver_phone_number: string;
};

type JobsheetRouteFormData = {
    loading_city: string;
    loading_address: string;
    unloading_city: string;
    unloading_address: string;
    pic_receipt_name: string;
    pic_receipt_phone_number: string;
};

type CreateJobsheetFormData = {
    customer_id: number;
    job_date: string;
    job_type: JobType | '';
    jobsheet_note: string;
    total_vendor_price: number;
    total_customer_price: number;
    payment_note: string;
    invoice: {
        invoice_date: string;
        due_date: string;
    };
    routes: JobsheetRouteFormData[];
    costs: JobsheetCostFormData[];
};

interface Props {
    customerOptions: CustomerOption[];
    vendorOptions: VendorOption[];
    vehicleTypeOptions: VehicleTypeOption[];
}

const emptyCost = (): JobsheetCostFormData => ({
    vendor_id: 0,
    bank_name: '',
    account_number: '',
    vehicle_type_id: null,
    cost_name: '',
    description: '',
    vendor_unit_price: 0,
    quantity: 1,
    license_plate: '',
    driver_name: '',
    driver_phone_number: '',
});

const emptyRoute = (): JobsheetRouteFormData => ({
    loading_city: '',
    loading_address: '',
    unloading_city: '',
    unloading_address: '',
    pic_receipt_name: '',
    pic_receipt_phone_number: '',
});

const today = new Date().toISOString().slice(0, 10);
const currency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);

export default function CreateJobsheetForm({
    customerOptions,
    vendorOptions,
    vehicleTypeOptions,
}: Props) {
    const form = useForm<CreateJobsheetFormData>({
        customer_id: 0,
        job_date: today,
        job_type: '',
        jobsheet_note: '',
        total_vendor_price: 0,
        total_customer_price: 0,
        payment_note: '',
        invoice: {
            invoice_date: today,
            due_date: today,
        },
        routes: [emptyRoute()],
        costs: [emptyCost()],
    });
    const { validate } = useZod(getJobsheetSchema());

    const setCosts = (costs: JobsheetCostFormData[]) => {
        const totalVendor = costs.reduce(
            (total, cost) => total + cost.vendor_unit_price * cost.quantity,
            0,
        );
        form.setData((data) => ({
            ...data,
            costs,
            total_vendor_price: totalVendor,
        }));
    };

    const updateCost = <K extends keyof JobsheetCostFormData>(
        index: number,
        key: K,
        value: JobsheetCostFormData[K],
    ) => {
        setCosts(
            form.data.costs.map((cost, currentIndex) =>
                currentIndex === index ? { ...cost, [key]: value } : cost,
            ),
        );
    };

    const setRoutes = (routes: JobsheetRouteFormData[]) =>
        form.setData('routes', routes);

    const updateRoute = <K extends keyof JobsheetRouteFormData>(
        index: number,
        key: K,
        value: JobsheetRouteFormData[K],
    ) => {
        setRoutes(
            form.data.routes.map((route, currentIndex) =>
                currentIndex === index ? { ...route, [key]: value } : route,
            ),
        );
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        form.clearErrors();
        const result = validate(form.data);

        if (!result.success) {
            Object.entries(result.errors).forEach(([field, messages]) =>
                form.setError(field as never, messages[0]),
            );

            return;
        }

        form.post(admin.jobsheets.store.url());
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] xl:items-start">
                <Card className="overflow-hidden rounded-md py-0">
                    <CardHeader className="border-b bg-muted/40 px-5 py-5">
                        <CardTitle>Informasi Jobsheet</CardTitle>
                        <CardDescription>
                            Data pekerjaan dan catatan operasional.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 px-5 pb-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                label="Tanggal pekerjaan"
                                required
                                error={form.errors.job_date}
                            >
                                <Input
                                    type="date"
                                    placeholder="Pilih tanggal jobsheet"
                                    value={form.data.job_date}
                                    onChange={(e) =>
                                        form.setData('job_date', e.target.value)
                                    }
                                />
                            </Field>
                            <Field
                                label="Kondisi pekerjaan"
                                required
                                error={form.errors.job_type}
                            >
                                <Select
                                    value={form.data.job_type}
                                    onValueChange={(value) =>
                                        form.setData(
                                            'job_type',
                                            value as JobType,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih jenis pekerjaan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(JOB_TYPE_META).map(
                                            ([value, meta]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {meta.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                        <Field
                            label="Deskripsi pekerjaan"
                            required
                            error={form.errors.jobsheet_note}
                        >
                            <Textarea
                                value={form.data.jobsheet_note}
                                onChange={(e) =>
                                    form.setData(
                                        'jobsheet_note',
                                        e.target.value,
                                    )
                                }
                                rows={3}
                                placeholder="Contoh: Pengiriman barang elektronik"
                            />
                        </Field>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="rounded-md py-0">
                        <CardHeader className="border-b bg-muted/40 px-5 py-5">
                            <CardTitle>Customer</CardTitle>
                            <CardDescription>
                                Pihak yang akan ditagihkan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-5 pb-6">
                            <Field
                                label="Customer"
                                required
                                error={form.errors.customer_id}
                            >
                                <SearchableSelectField
                                    value={
                                        form.data.customer_id
                                            ? String(form.data.customer_id)
                                            : ''
                                    }
                                    onValueChange={(value) =>
                                        form.setData(
                                            'customer_id',
                                            Number(value),
                                        )
                                    }
                                    options={customerOptions.map(
                                        (customer) => ({
                                            value: String(customer.id),
                                            label: customer.company_name,
                                        }),
                                    )}
                                    placeholder="Pilih customer"
                                    searchPlaceholder="Cari customer..."
                                />
                            </Field>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="rounded-md py-0">
                <CardHeader className="border-b bg-muted/40 px-5 py-5">
                    <CardTitle>Rute Pengiriman</CardTitle>
                    <CardDescription>
                        Minimal satu rute wajib diisi. Tanggal muat dan bongkar
                        dicatat saat operasional berjalan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 px-5 pb-6">
                    <InputError message={form.errors.routes} />
                    {form.data.routes.map((route, index) => (
                        <RouteItem
                            key={index}
                            index={index}
                            route={route}
                            errors={form.errors}
                            onChange={updateRoute}
                            onRemove={() =>
                                setRoutes(
                                    form.data.routes.filter(
                                        (_, currentIndex) =>
                                            currentIndex !== index,
                                    ),
                                )
                            }
                            canRemove={form.data.routes.length > 1}
                        />
                    ))}
                    <div className="border-t pt-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setRoutes([...form.data.routes, emptyRoute()])
                            }
                        >
                            <CirclePlus className="size-4" />
                            Tambah Rute
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-md py-0">
                <CardHeader className="border-b bg-muted/40 px-5 py-5">
                    <CardTitle>Rincian Biaya Jobsheet</CardTitle>
                    <CardDescription>
                        Minimal satu biaya wajib diisi. Tambahkan item untuk
                        setiap vendor atau kendaraan yang digunakan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 px-5 pb-6">
                    <InputError message={form.errors.costs} />
                    {form.data.costs.map((cost, index) => (
                        <CostItem
                            key={index}
                            index={index}
                            cost={cost}
                            vendorOptions={vendorOptions}
                            vehicleTypeOptions={vehicleTypeOptions}
                            errors={form.errors}
                            onChange={updateCost}
                            onRemove={() =>
                                setCosts(
                                    form.data.costs.filter(
                                        (_, currentIndex) =>
                                            currentIndex !== index,
                                    ),
                                )
                            }
                            canRemove={form.data.costs.length > 1}
                        />
                    ))}
                    <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setCosts([...form.data.costs, emptyCost()])
                            }
                        >
                            <CirclePlus className="size-4" />
                            Tambah Pengeluaran
                        </Button>
                        <p className="text-sm font-semibold text-sba-primary dark:text-sba-secondary">
                            Total Biaya Vendor:{' '}
                            {currency(form.data.total_vendor_price)}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div>
                <Card className="rounded-md py-0">
                    <CardHeader className="border-b bg-muted/40 px-5 py-5">
                        <CardTitle>Pembuatan Invoice</CardTitle>
                        <CardDescription>
                            Data invoice dibuat saat jobsheet disimpan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 px-5 pb-6">
                        <div className="grid gap-5 sm:grid-cols-3">
                            <Field
                                label="Harga jual"
                                required
                                error={form.errors.total_customer_price}
                            >
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="Contoh: 5000000"
                                    value={form.data.total_customer_price}
                                    onChange={(e) =>
                                        form.setData(
                                            'total_customer_price',
                                            Number(e.target.value),
                                        )
                                    }
                                />
                            </Field>
                            <Field
                                label="Tanggal invoice"
                                required
                                error={form.errors['invoice.invoice_date']}
                            >
                                <Input
                                    type="date"
                                    placeholder="Pilih tanggal invoice"
                                    value={form.data.invoice.invoice_date}
                                    onChange={(e) =>
                                        form.setData('invoice', {
                                            ...form.data.invoice,
                                            invoice_date: e.target.value,
                                        })
                                    }
                                />
                            </Field>
                            <Field
                                label="Tanggal jatuh tempo"
                                required
                                error={form.errors['invoice.due_date']}
                            >
                                <Input
                                    type="date"
                                    placeholder="Pilih tanggal jatuh tempo"
                                    value={form.data.invoice.due_date}
                                    onChange={(e) =>
                                        form.setData('invoice', {
                                            ...form.data.invoice,
                                            due_date: e.target.value,
                                        })
                                    }
                                />
                            </Field>
                        </div>
                        <Field
                            label="Catatan pembayaran"
                            error={form.errors.payment_note}
                        >
                            <Textarea
                                rows={3}
                                value={form.data.payment_note}
                                onChange={(e) =>
                                    form.setData('payment_note', e.target.value)
                                }
                                placeholder="Contoh: Termin 14 hari setelah invoice"
                            />
                        </Field>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    asChild
                    disabled={form.processing}
                >
                    <Link href={admin.jobsheets.index.url()}>Batal</Link>
                </Button>
                <Button
                    type="submit"
                    variant="sbaPrimary"
                    disabled={form.processing}
                >
                    {form.processing ? (
                        <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                        <Save className="size-4" />
                    )}
                    {form.processing ? 'Menyimpan...' : 'Simpan Draft'}
                </Button>
            </div>
        </form>
    );
}

function Field({
    label,
    required = false,
    error,
    children,
    className,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={className ? `space-y-2 ${className}` : 'space-y-2'}>
            <Label>
                {label}
                {required && <span className="text-destructive"> *</span>}
                {!required && (
                    <span className="text-muted-foreground"> (opsional)</span>
                )}
            </Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

function RouteItem({
    index,
    route,
    errors,
    onChange,
    onRemove,
    canRemove,
}: {
    index: number;
    route: JobsheetRouteFormData;
    errors: Record<string, string>;
    onChange: <K extends keyof JobsheetRouteFormData>(
        index: number,
        key: K,
        value: JobsheetRouteFormData[K],
    ) => void;
    onRemove: () => void;
    canRemove: boolean;
}) {
    const error = (field: keyof JobsheetRouteFormData) =>
        errors[`routes.${index}.${field}`];

    return (
        <section className="overflow-hidden rounded-md border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b bg-muted/40 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sba-primary text-sm font-semibold text-white">
                        {index + 1}
                    </span>
                    <div className="min-w-0">
                        <p className="font-medium">Rute Pengiriman</p>
                        <p className="truncate text-xs text-muted-foreground">
                            Lokasi muat, tujuan, dan PIC penerima.
                        </p>
                    </div>
                </div>
                {canRemove && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={onRemove}
                        aria-label={`Hapus rute ${index + 1}`}
                        title="Hapus rute"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                )}
            </div>
            <div className="grid gap-5 p-4 md:grid-cols-2">
                <Field label="Kota muat" required error={error('loading_city')}>
                    <Input
                        value={route.loading_city}
                        placeholder="Contoh: Jakarta"
                        onChange={(e) =>
                            onChange(index, 'loading_city', e.target.value)
                        }
                    />
                </Field>
                <Field
                    label="Kota bongkar"
                    required
                    error={error('unloading_city')}
                >
                    <Input
                        value={route.unloading_city}
                        placeholder="Contoh: Bandung"
                        onChange={(e) =>
                            onChange(index, 'unloading_city', e.target.value)
                        }
                    />
                </Field>
                <Field
                    label="Alamat muat"
                    required
                    error={error('loading_address')}
                >
                    <Textarea
                        rows={3}
                        value={route.loading_address}
                        placeholder="Alamat lengkap lokasi muat"
                        onChange={(e) =>
                            onChange(index, 'loading_address', e.target.value)
                        }
                    />
                </Field>
                <Field
                    label="Alamat bongkar"
                    required
                    error={error('unloading_address')}
                >
                    <Textarea
                        rows={3}
                        value={route.unloading_address}
                        placeholder="Alamat lengkap lokasi bongkar"
                        onChange={(e) =>
                            onChange(index, 'unloading_address', e.target.value)
                        }
                    />
                </Field>
                <Field
                    label="Nama PIC penerima"
                    error={error('pic_receipt_name')}
                >
                    <Input
                        value={route.pic_receipt_name}
                        placeholder="Contoh: Budi Santoso"
                        onChange={(e) =>
                            onChange(index, 'pic_receipt_name', e.target.value)
                        }
                    />
                </Field>
                <Field
                    label="Nomor telepon PIC penerima"
                    error={error('pic_receipt_phone_number')}
                >
                    <Input
                        type="tel"
                        value={route.pic_receipt_phone_number}
                        placeholder="Contoh: 0812 3456 7890"
                        onChange={(e) =>
                            onChange(
                                index,
                                'pic_receipt_phone_number',
                                e.target.value,
                            )
                        }
                    />
                </Field>
            </div>
        </section>
    );
}

function CostItem({
    index,
    cost,
    vendorOptions,
    vehicleTypeOptions,
    errors,
    onChange,
    onRemove,
    canRemove,
}: {
    index: number;
    cost: JobsheetCostFormData;
    vendorOptions: VendorOption[];
    vehicleTypeOptions: VehicleTypeOption[];
    errors: Record<string, string>;
    onChange: <K extends keyof JobsheetCostFormData>(
        index: number,
        key: K,
        value: JobsheetCostFormData[K],
    ) => void;
    onRemove: () => void;
    canRemove: boolean;
}) {
    const error = (field: keyof JobsheetCostFormData) =>
        errors[`costs.${index}.${field}`];
    const total = cost.vendor_unit_price * cost.quantity;

    return (
        <section className="overflow-hidden rounded-md border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b bg-muted/40 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sba-primary text-sm font-semibold text-white">
                        {index + 1}
                    </span>
                    <div className="min-w-0">
                        <p className="font-medium">Rincian Biaya</p>
                        <p className="truncate text-xs text-muted-foreground">
                            Biaya operasional untuk vendor dan kendaraan
                            terkait.
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden text-right text-sm font-semibold text-sba-primary sm:block dark:text-sba-secondary">
                        {currency(total)}
                    </span>
                    {canRemove && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={onRemove}
                            aria-label={`Hapus biaya ${index + 1}`}
                            title="Hapus rincian biaya"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    )}
                </div>
            </div>
            <div className="space-y-5 p-4">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
                    <Field
                        label="Vendor"
                        required
                        error={error('vendor_id')}
                        className="xl:col-span-3"
                    >
                        <SearchableSelectField
                            value={cost.vendor_id ? String(cost.vendor_id) : ''}
                            onValueChange={(value) =>
                                onChange(index, 'vendor_id', Number(value))
                            }
                            options={vendorOptions.map((vendor) => ({
                                value: String(vendor.id),
                                label: vendor.vendor_name,
                            }))}
                            placeholder="Pilih vendor"
                            searchPlaceholder="Cari vendor..."
                        />
                    </Field>
                    <Field
                        label="Tipe kendaraan"
                        error={error('vehicle_type_id')}
                        className="xl:col-span-3"
                    >
                        <SearchableSelectField
                            value={
                                cost.vehicle_type_id
                                    ? String(cost.vehicle_type_id)
                                    : ''
                            }
                            onValueChange={(value) =>
                                onChange(
                                    index,
                                    'vehicle_type_id',
                                    Number(value),
                                )
                            }
                            options={vehicleTypeOptions.map((type) => ({
                                value: String(type.id),
                                label: type.vehicle_type_name,
                            }))}
                            placeholder="Pilih tipe"
                            searchPlaceholder="Cari tipe kendaraan..."
                        />
                    </Field>
                    <Field
                        label="Nama biaya"
                        required
                        error={error('cost_name')}
                        className="xl:col-span-3"
                    >
                        <Input
                            value={cost.cost_name}
                            onChange={(e) =>
                                onChange(index, 'cost_name', e.target.value)
                            }
                            placeholder="Contoh: Ongkos kirim"
                        />
                    </Field>
                    <Field
                        label="Harga satuan vendor"
                        required
                        error={error('vendor_unit_price')}
                        className="xl:col-span-2"
                    >
                        <Input
                            type="number"
                            min="0"
                            placeholder="Contoh: 500000"
                            value={cost.vendor_unit_price}
                            onChange={(e) =>
                                onChange(
                                    index,
                                    'vendor_unit_price',
                                    Number(e.target.value),
                                )
                            }
                        />
                    </Field>
                    <Field
                        label="Jumlah"
                        required
                        error={error('quantity')}
                        className="xl:col-span-1"
                    >
                        <Input
                            type="number"
                            min="1"
                            placeholder="1"
                            value={cost.quantity}
                            onChange={(e) =>
                                onChange(
                                    index,
                                    'quantity',
                                    Number(e.target.value),
                                )
                            }
                        />
                    </Field>
                    <Field
                        label="Nomor polisi"
                        error={error('license_plate')}
                        className="xl:col-span-3"
                    >
                        <Input
                            value={cost.license_plate}
                            placeholder="Contoh: B 1234 ABC"
                            onChange={(e) =>
                                onChange(index, 'license_plate', e.target.value)
                            }
                        />
                    </Field>
                    <Field
                        label="Nama driver"
                        error={error('driver_name')}
                        className="xl:col-span-5"
                    >
                        <Input
                            value={cost.driver_name}
                            placeholder="Contoh: Andi Pratama"
                            onChange={(e) =>
                                onChange(index, 'driver_name', e.target.value)
                            }
                        />
                    </Field>
                    <Field
                        label="Telepon driver"
                        error={error('driver_phone_number')}
                        className="xl:col-span-4"
                    >
                        <Input
                            value={cost.driver_phone_number}
                            placeholder="Contoh: 0812 3456 7890"
                            onChange={(e) =>
                                onChange(
                                    index,
                                    'driver_phone_number',
                                    e.target.value,
                                )
                            }
                        />
                    </Field>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Nama bank vendor" error={error('bank_name')}>
                        <Input
                            value={cost.bank_name}
                            placeholder="Contoh: BCA"
                            onChange={(e) =>
                                onChange(index, 'bank_name', e.target.value)
                            }
                        />
                    </Field>
                    <Field
                        label="Nomor rekening vendor"
                        error={error('account_number')}
                    >
                        <Input
                            value={cost.account_number}
                            placeholder="Contoh: 1234567890"
                            onChange={(e) =>
                                onChange(
                                    index,
                                    'account_number',
                                    e.target.value,
                                )
                            }
                        />
                    </Field>
                </div>
                <Field label="Deskripsi biaya" error={error('description')}>
                    <Textarea
                        rows={2}
                        value={cost.description}
                        placeholder="Keterangan tambahan biaya"
                        onChange={(e) =>
                            onChange(index, 'description', e.target.value)
                        }
                    />
                </Field>
            </div>
        </section>
    );
}
