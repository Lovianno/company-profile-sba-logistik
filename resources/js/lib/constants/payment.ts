import type { PaymentMethod, PaymentStatus, PaymentType } from '@/types/models';

export const PAYMENT_STATUS_META = {
    unpaid: { label: 'Belum Dibayar', badgeVariant: 'destructive' },
    partially_paid: {
        label: 'Dibayar Sebagian',
        badgeVariant: 'secondary',
    },
    paid: { label: 'Lunas', badgeVariant: 'default' },
} satisfies Record<
    PaymentStatus,
    {
        label: string;
        badgeVariant: 'default' | 'secondary' | 'destructive';
    }
>;

export const PAYMENT_TYPE_META = {
    down_payment: { label: 'Uang Muka' },
    settlement: { label: 'Pelunasan' },
    installment: { label: 'Cicilan' },
} satisfies Record<PaymentType, { label: string }>;

export const PAYMENT_METHOD_META = {
    cash: { label: 'Tunai' },
    transfer: { label: 'Transfer Bank' },
} satisfies Record<PaymentMethod, { label: string }>;
