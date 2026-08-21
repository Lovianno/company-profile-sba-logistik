import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil } from 'lucide-react';

import { DeleteCustomerDialog } from '@/components/dialogs/CustomerDialog';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';
import type { Customer } from '@/types/models';

export const getCustomerColumns = (): ColumnDef<Customer>[] => [
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
        accessorKey: 'company_name',
        header: 'Nama Perusahaan',
        cell: ({ row }) => {
            const name = row.original.company_name;

            return name.length > 30 ? `${name.substring(0, 30)}...` : name;
        },
    },
    {
        accessorKey: 'pic_name',
        header: 'Nama PIC',
    },
    {
        accessorKey: 'pic_phone_number',
        header: 'Telepon PIC',
    },
    {
        accessorKey: 'payment_term',
        header: 'Termin',
        cell: ({ row }) => row.original.payment_term ?? '-',
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
                    <Link href={admin.customers.show(row.original.id)}>
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-sba-secondary hover:bg-sba-secondary/15 hover:text-sba-secondary"
                    asChild
                >
                    <Link href={admin.customers.edit(row.original.id)}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
                <DeleteCustomerDialog customer={row.original} />
            </div>
        ),
    },
];
