import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { DataTable } from '@/components/data-table';
import MainContent from '@/components/main-content';
import { getVendorColumns } from '@/components/tables/columns/vendor';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { DataTableLinks, DataTableMeta } from '@/types';
import type { Vendor, VendorType } from '@/types/models';
import type { BreadcrumbItem } from '@/types/navigation';

interface Props {
    vendors: Vendor[];
    vendorTypes: Pick<VendorType, 'id' | 'vendor_type_name'>[];
    meta: DataTableMeta;
    links: DataTableLinks;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vendor',
        href: admin.vendors.index.url(),
    },
];

function filtersSchema(vendorTypes: Pick<VendorType, 'id' | 'vendor_type_name'>[]) {
    return [
        {
            key: 'status',
            label: 'Status',
            values: [
                { value: 'active', label: 'Aktif' },
                { value: 'inactive', label: 'Nonaktif' },
            ],
        },
        {
            key: 'vendor_type_id',
            label: 'Tipe Vendor',
            values: vendorTypes.map((vt) => ({
                value: String(vt.id),
                label: vt.vendor_type_name,
            })),
        },
    ];
}

function Index({ vendors, vendorTypes, meta, links }: Props) {
    return (
        <>
            <Head title="Vendor" />

            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 border-l-4 border-sba-secondary pl-3">
                        <h2 className="text-lg font-semibold text-sba-primary dark:text-sba-secondary">
                            Daftar Vendor
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Kelola data vendor yang digunakan dalam operasional SBA Logistik.
                        </p>
                    </div>

                    <DataTable
                        routeUrl={admin.vendors.index.url()}
                        columns={getVendorColumns()}
                        data={vendors}
                        meta={meta}
                        links={links}
                        filtersSchema={filtersSchema(vendorTypes)}
                        palette="sba"
                        extraActions={
                            <Button variant="sbaPrimary" asChild>
                                <Link href={admin.vendors.create()}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Vendor
                                </Link>
                            </Button>
                        }
                    />
                </MainContent>
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Index;
