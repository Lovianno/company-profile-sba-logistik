import type {
    JobsheetRouteStatus,
    JobsheetStatus,
    JobType,
} from '@/types/models';

export const JOB_TYPE_META = {
    DTD: { label: 'Door to Door' },
    PTD: { label: 'Port to Door' },
    PTP: { label: 'Port to Port' },
    CYCY: { label: 'CY to CY' },
    CYTP: { label: 'CY to Port' },
} satisfies Record<JobType, { label: string }>;

export const JOBSHEET_STATUS_META = {
    draft: { label: 'Draft', badgeVariant: 'secondary' },
    in_progress: { label: 'Dalam Proses', badgeVariant: 'outline' },
    completed: { label: 'Selesai', badgeVariant: 'default' },
} satisfies Record<
    JobsheetStatus,
    {
        label: string;
        badgeVariant: 'default' | 'secondary' | 'outline' | 'destructive';
    }
>;

export const JOBSHEET_ROUTE_STATUS_META = {
    pending: { label: 'Menunggu', badgeVariant: 'secondary' },
    in_transit: { label: 'Dalam Perjalanan', badgeVariant: 'outline' },
    completed: { label: 'Selesai', badgeVariant: 'default' },
} satisfies Record<
    JobsheetRouteStatus,
    {
        label: string;
        badgeVariant: 'default' | 'secondary' | 'outline' | 'destructive';
    }
>;
