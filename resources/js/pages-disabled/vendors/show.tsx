import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';
import type { ReactNode } from 'react';

import VendorForm from '@/components/forms/vendor-form';
import MainContent from '@/components/main-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { Vendor, VendorType } from '@/types/models';
import type { BreadcrumbItem } from '@/types/navigation';

interface Props {
    vendor: Vendor;
    vendorTypes: Pick<VendorType, 'id' | 'vendor_type_name'>[];
    [key: string]: unknown;
}

function Show({ vendor, vendorTypes }: Props) {
    return (
        <>
            <Head title={`Detail ${vendor.vendor_name}`} />

            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="border-l-4 border-sba-secondary pl-3">
                            <h2 className="text-lg font-semibold text-sba-primary dark:text-sba-secondary">
                                Detail Vendor
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Informasi{' '}
                                <span className="font-medium text-foreground">
                                    {vendor.vendor_name}
                                </span>{' '}
                                ditampilkan dalam mode hanya-baca.
                            </p>
                        </div>

                        <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
                            <Button variant="outline" asChild>
                                <Link href={admin.vendors.index.url()}>
                                    <ArrowLeft className="size-4" />
                                    Kembali
                                </Link>
                            </Button>
                            <Button variant="sbaPrimary" asChild>
                                <Link href={admin.vendors.edit.url({ vendor: vendor })}>
                                    <Pencil className="size-4" />
                                    Edit
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <VendorForm
                        formStatus="show"
                        vendor={vendor}
                        vendorTypes={vendorTypes}
                    />
                </MainContent>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Vendor', href: admin.vendors.index.url() },
    { title: 'Detail Vendor', href: admin.vendors.index.url() },
];

Show.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Show;
