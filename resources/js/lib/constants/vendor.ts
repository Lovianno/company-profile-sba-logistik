import type { VendorStatus } from '@/types/models';

export const VENDOR_STATUS_META = {
    active: {
        label: 'Aktif',
        badgeVariant: 'default',
    },
    inactive: {
        label: 'Nonaktif',
        badgeVariant: 'destructive',
    },
} satisfies Record<
    VendorStatus,
    {
        label: string;
        badgeVariant: 'default' | 'destructive';
    }
>;
