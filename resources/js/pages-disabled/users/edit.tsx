import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

import UserForm from '@/components/forms/user-forms';
import MainContent from '@/components/main-content';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import type { User } from '@/types/auth';
import type { BreadcrumbItem } from '@/types/navigation';

interface Props {
    user: User;
    [key: string]: unknown;
}

function Edit({ user }: Props) {
    return (
        <>
            <Head title={`Edit ${user.full_name}`} />

            <div className="flex flex-col gap-4 p-4">
                <MainContent>
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="border-l-4 border-sba-secondary pl-3">
                            <h2 className="text-lg font-semibold text-sba-primary dark:text-sba-secondary">
                                Edit Pengguna
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Perbarui informasi, hak akses, atau keamanan akun{' '}
                                <span className="font-medium text-foreground">
                                    {user.full_name}
                                </span>
                                .
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

                    <UserForm formStatus="edit" user={user} />
                </MainContent>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pengguna', href: admin.users.index.url() },
    { title: 'Edit User', href: admin.users.index.url() },
];

Edit.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Edit;
