import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

import VendorForm from '@/components/forms/vendor-form';
import MainContent from '@/components/main-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { VendorType } from '@/types/models';
import type { BreadcrumbItem } from '@/types/navigation';

interface Props {
    vendorTypes: Pick<VendorType, 'id' | 'vendor_type_name'>[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Vendor', href: admin.vendors.index.url() },
    { title: 'Tambah Vendor', href: admin.vendors.create.url() },
];

function Create({ vendorTypes }: Props) {
    return (
        <>
            <Head title="Tambah Vendor" />

            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="border-l-4 border-sba-secondary pl-3">
                            <h2 className="text-lg font-semibold text-sba-primary dark:text-sba-secondary">
                                Tambah Vendor Baru
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Lengkapi informasi vendor yang akan digunakan dalam sistem SBA Logistik.
                            </p>
                        </div>

                        <Button variant="outline" asChild className="w-full sm:w-auto">
                            <Link href={admin.vendors.index.url()}>
                                <ArrowLeft className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>

                    <VendorForm formStatus="create" vendorTypes={vendorTypes} />
                </MainContent>
            </div>
        </>
    );
}

Create.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Create;
