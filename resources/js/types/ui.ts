import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types/navigation';

export type AppLayoutProps = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export type AppVariant = 'header' | 'sidebar';

export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
};

export type AuthLayoutProps = {
    children?: ReactNode;
    name?: string;
    title?: string;
    description?: string;
};

export type DataTableMeta = {
    current_page: number;
    per_page: number;
    total: number;
    last_page?: number;
};

export type DataTableLinks = {
    prev: string | null;
    next: string | null;
    pages?: { page: number; url: string }[];
};
