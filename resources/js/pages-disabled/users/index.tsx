import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import { DataTable } from '@/components/data-table';
import MainContent from '@/components/main-content';
import { getUserColumns } from '@/components/tables/columns/user';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { USER_ROLE_META, USER_STATUS_META } from '@/lib/constants';
import admin from '@/routes/admin';
import type { DataTableLinks, DataTableMeta } from '@/types';
import type { User } from '@/types/auth';
import type { BreadcrumbItem } from '@/types/navigation';

interface Props {
    users: User[];
    meta: DataTableMeta;
    links: DataTableLinks;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna',
        href: admin.users.index.url(),
    },
];

const filtersSchema = [
    {
        key: 'role',
        label: 'Hak Akses',
        values: Object.entries(USER_ROLE_META).map(([value, meta]) => ({
            value,
            label: meta.label,
        })),
    },
    {
        key: 'status',
        label: 'Status',
        values: Object.entries(USER_STATUS_META).map(([value, meta]) => ({
            value,
            label: meta.label,
        })),
    },
];

function Index({ users, meta, links }: Props) {
    return (
        <>
            <Head title="Pengguna" />

            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 border-l-4 border-sba-secondary pl-3">
                        <h2 className="text-lg font-semibold text-sba-primary dark:text-sba-secondary">
                            Daftar Pengguna
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Kelola akun dan hak akses pengguna sistem.
                        </p>
                    </div>

                    <DataTable
                        routeUrl={admin.users.index.url()}
                        columns={getUserColumns()}
                        data={users}
                        meta={meta}
                        links={links}
                        filtersSchema={filtersSchema}
                        palette="sba"
                        extraActions={
                            <Button variant="sbaPrimary" asChild>
                                <Link href={admin.users.create()}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah User
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
