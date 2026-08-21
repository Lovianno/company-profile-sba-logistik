import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Eye } from 'lucide-react';
import { DeleteUserDialog } from '@/components/dialogs/UserDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { USER_ROLE_META, USER_STATUS_META } from '@/lib/constants';
import admin from '@/routes/admin';
import type { User } from '@/types/auth';

export const getUserColumns = (): ColumnDef<User>[] => [
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
        accessorKey: 'full_name',
        header: 'Nama',
        cell: ({ row }) => {
            const name = row.original.full_name;

            return name.length > 20 ? `${name.substring(0, 20)}...` : name;
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Hak Akses',
        cell: ({ row }) => {
            const role = row.original.role ?? 'cs';
            const meta = USER_ROLE_META[role];

            return (
                <span className="font-medium">
                    {meta.label}
                </span>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status ?? 'active';
            const meta = USER_STATUS_META[status];

            return <Badge variant={meta.badgeVariant}>{meta.label}</Badge>;
        },
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
                    <Link href={admin.users.show(row.original.id)}>
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-sba-secondary hover:bg-sba-secondary/15 hover:text-sba-secondary"
                    asChild
                >
                    <Link href={admin.users.edit(row.original.id)}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
                <DeleteUserDialog user={row.original} />
            </div>
        ),
    },
];
