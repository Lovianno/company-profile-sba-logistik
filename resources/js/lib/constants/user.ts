import type { UserRole, UserStatus } from '@/types/models';

export const USER_ROLE_META = {
    admin: { label: 'Admin' },
    finance: { label: 'Finance' },
    cs: { label: 'Customer Service' },
} satisfies Record<UserRole, { label: string }>;

export const USER_STATUS_META = {
    active: {
        label: 'Aktif',
        badgeVariant: 'default',
    },
    inactive: {
        label: 'Nonaktif',
        badgeVariant: 'destructive',
    },
} satisfies Record<
    UserStatus,
    {
        label: string;
        badgeVariant: 'default' | 'destructive';
    }
>;
