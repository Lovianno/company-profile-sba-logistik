import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

import UserForm from '@/components/forms/user-forms';
import MainContent from '@/components/main-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types/navigation';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengguna', href: admin.users.index.url() },
    { title: 'Tambah User', href: admin.users.create.url() },
];

function Create() {
    return (
        <>
            <Head title="Tambah User" />

            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="border-l-4 border-sba-secondary pl-3">
                            <h2 className="text-lg font-semibold text-sba-primary dark:text-sba-secondary">
                                Tambah Pengguna Baru
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Lengkapi identitas, hak akses, dan kata sandi untuk membuat akun pengguna SBA Logistik.
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            asChild
                            className="w-full sm:w-auto"
                        >
                            <Link href={admin.users.index.url()}>
                                <ArrowLeft className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>

                    <UserForm formStatus="create" />
                </MainContent>
            </div>
        </>
    );
}

// Static .layout assignment - supaya resolve() di app.tsx (yang cek
// `page.default.layout ?? default`) gak nambahin AppLayout kedua kalinya.
Create.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Create;
