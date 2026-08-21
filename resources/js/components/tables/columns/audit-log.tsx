import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/formatters';
import admin from '@/routes/admin';
import type { AuditLog } from '@/types/models';

export const getAuditLogColumns = (): ColumnDef<AuditLog>[] => [
    {
        id: 'no',
        header: 'No',
        cell: ({ row, table }) => {
            const currentPage = table.options.meta?.current_page ?? 1;
            const perPage = table.options.meta?.per_page ?? 10;
            const number = (currentPage - 1) * perPage + (row.index + 1);

            return <span>{number}</span>;
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => <Badge variant="secondary" className="capitalize">{row.original.action}</Badge>,
    },
    {
        accessorKey: 'user',
        header: 'User',
        cell: ({ row }) => row.original.user?.full_name ?? '-',
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const desc = row.original.description;

            return desc.length > 60 ? `${desc.substring(0, 60)}...` : desc;
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Waktu',
        cell: ({ row }) => formatDateTime(row.original.created_at),
    },
   {
        id: 'actions',
        header: () => <div className="text-center">Aksi</div>,
        cell: ({ row }) => (
            <div className="flex items-center justify-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-sba-primary hover:bg-sba-primary/10 hover:text-sba-primary dark:text-sba-secondary"
                    asChild
                >
                    <Link href={admin.audits.show(row.original.id)}>
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        ),
    },
];
