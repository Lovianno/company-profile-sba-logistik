import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JOBSHEET_STATUS_META, JOB_TYPE_META } from '@/lib/constants/jobsheet';
import admin from '@/routes/admin';
import type { Jobsheet } from '@/types/models';

const date = (value: string | null) =>
    value
        ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(
              new Date(value),
          )
        : '-';

export const getJobsheetColumns = (): ColumnDef<Jobsheet>[] => [
    {
        id: 'no',
        header: 'No',
        cell: ({ row, table }) => {
            const currentPage = table.options.meta?.current_page ?? 1;
            const perPage = table.options.meta?.per_page ?? 10;

            return (currentPage - 1) * perPage + row.index + 1;
        },
    },
    {
        accessorKey: 'jobsheet_number',
        header: 'Jobsheet',
        cell: ({ row }) => (
            <div className="min-w-44">
                <p className="font-medium whitespace-nowrap">
                    {row.original.jobsheet_number}
                </p>
                <p className="text-xs text-muted-foreground">
                    {date(row.original.job_date)} ·{' '}
                    {JOB_TYPE_META[row.original.job_type]?.label ??
                        row.original.job_type}
                </p>
            </div>
        ),
    },
    {
        id: 'customer',
        header: 'Customer',
        cell: ({ row }) => row.original.customer?.company_name ?? '-',
    },
    {
        id: 'route',
        header: 'Rute',
        cell: ({ row }) => {
            const routes = row.original.routes ?? [];
            const firstRoute = routes[0];

            return (
                <div className="min-w-44">
                    <div>
                        {firstRoute
                            ? `${firstRoute.loading_city} -> ${firstRoute.unloading_city}`
                            : '-'}
                    </div>
                    {routes.length > 1 && (
                        <div className="text-xs text-muted-foreground">
                            +{routes.length - 1} rute lainnya
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const meta = JOBSHEET_STATUS_META[row.original.status];

            return <Badge variant={meta.badgeVariant}>{meta.label}</Badge>;
        },
    },
    {
        id: 'actions',
        header: () => <div className="text-center">Aksi</div>,
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-sba-primary hover:bg-sba-primary/10 hover:text-sba-primary dark:text-sba-secondary"
                    asChild
                >
                    <Link
                        href={admin.jobsheets.show(row.original.id)}
                        aria-label="Lihat jobsheet"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        ),
    },
];
