import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import admin from '@/routes/admin';
import type { VehicleType } from '@/types/models';

interface DeleteVehicleTypeDialogProps {
    vehicleType: VehicleType;
}

export function DeleteVehicleTypeDialog({ vehicleType }: DeleteVehicleTypeDialogProps) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(admin.vehicleTypes.destroy(vehicleType.id), {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus tipe kendaraan ini?</DialogTitle>
                    <DialogDescription>
                        Tipe kendaraan{' '}
                        <span className="font-medium">{vehicleType.vehicle_type_name}</span>{' '}
                        akan dihapus permanen. Aksi ini tidak bisa dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isDeleting}>
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Menghapus...' : 'Hapus'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
