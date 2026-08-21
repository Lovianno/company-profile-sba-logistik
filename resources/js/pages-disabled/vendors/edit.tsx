import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
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

function Edit({ vendor, vendorTypes }: Props) {
    return (
        <>
            <Head title={`Edit ${vendor.vendor_name}`} />

            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="border-l-4 border-sba-secondary pl-3">
                            <h2 className="text-lg font-semibold text-sba-primary dark:text-sba-secondary">
                                Edit Vendor
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Perbarui informasi vendor{' '}
                                <span className="font-medium text-foreground">
                                    {vendor.vendor_name}
                                </span>
                                .
                            </p>
                        </div>

                        <Button variant="outline" asChild className="w-full sm:w-auto">
                            <Link href={admin.vendors.index.url()}>
                                <ArrowLeft className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>

                    <VendorForm formStatus="edit" vendor={vendor} vendorTypes={vendorTypes} />
                </MainContent>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Vendor', href: admin.vendors.index.url() },
    { title: 'Edit Vendor', href: admin.vendors.index.url() },
];

Edit.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Edit;
