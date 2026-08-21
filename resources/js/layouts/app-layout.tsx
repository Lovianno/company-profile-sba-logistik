import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types/navigation';

interface AppLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<AppLayoutProps>) {
    const { auth, flash } = usePage().props;

    useEffect(() => {
        if (!flash?.message) {
            return;
        }

        switch (flash.type) {
            case 'success':
                toast.success(flash.message);
                break;
            case 'error':
                toast.error(flash.message);
                break;
            case 'warning':
                toast.warning(flash.message);
                break;
            default:
                toast(flash.message);
                break;
        }
    }, [flash]);

    return (
        <>
            <Toaster position="top-right" richColors />
            <AppSidebarLayout breadcrumbs={breadcrumbs}>{children}</AppSidebarLayout>
        </>
    );
}