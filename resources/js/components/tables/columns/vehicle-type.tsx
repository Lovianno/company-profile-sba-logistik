import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil } from 'lucide-react';

import { DeleteVehicleTypeDialog } from '@/components/dialogs/VehicleTypeDialog';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';
import type { UserRole } from '@/types/models';
import type { VehicleType } from '@/types/models';

export const getVehicleTypeColumns = (role: UserRole): ColumnDef<VehicleType>[] => [
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
        accessorKey: 'vehicle_type_name',
        header: 'Nama Tipe Kendaraan',
        cell: ({ row }) => {
            const name = row.original.vehicle_type_name;

            return name.length > 30 ? `${name.substring(0, 30)}...` : name;
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
                    <Link href={admin.vehicleTypes.show(row.original.id)}>
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
                  {role === 'admin' &&  <Button
                    variant="ghost"
                    size="icon"
                    className="text-sba-secondary hover:bg-sba-secondary/15 hover:text-sba-secondary"
                    asChild
                >
                    <Link href={admin.vehicleTypes.edit(row.original.id)}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>}
               
                {role === 'admin' && <DeleteVehicleTypeDialog vehicleType={row.original} />}
            </div>
        ),
    },
];
