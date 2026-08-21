import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil } from 'lucide-react';

import { DeleteVendorDialog } from '@/components/dialogs/VendorDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { VENDOR_STATUS_META } from '@/lib/constants/vendor';
import admin from '@/routes/admin';
import type { Vendor } from '@/types/models';

export const getVendorColumns = (): ColumnDef<Vendor>[] => [
    {
        id: 'no',
        header: 'No',
        cell: ({ row, table }) => {
            const currentPage = table.options.meta?.current_page ?? 1;
            const perPage     = table.options.meta?.per_page ?? 10;
            const number      = (currentPage - 1) * perPage + (row.index + 1);

            return <span>{number}</span>;
        },
    },
    {
        accessorKey: 'vendor_name',
        header: 'Nama Vendor',
        cell: ({ row }) => {
            const name = row.original.vendor_name;

            return name.length > 25 ? `${name.substring(0, 25)}...` : name;
        },
    },
    {
        accessorKey: 'vendor_type',
        header: 'Tipe Vendor',
        cell: ({ row }) => row.original.vendor_type?.vendor_type_name ?? '-',
    },
    {
        accessorKey: 'pic_name',
        header: 'Nama PIC',
    },
    {
        accessorKey: 'phone_number',
        header: 'Telepon',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status ?? 'active';
            const meta   = VENDOR_STATUS_META[status];

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
                    <Link href={admin.vendors.show(row.original.id)}>
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-sba-secondary hover:bg-sba-secondary/15 hover:text-sba-secondary"
                    asChild
                >
                    <Link href={admin.vendors.edit(row.original.id)}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
                <DeleteVendorDialog vendor={row.original} />
            </div>
        ),
    },
];
