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
import type { Customer } from '@/types/models';

interface DeleteCustomerDialogProps {
    customer: Customer;
}

export function DeleteCustomerDialog({ customer }: DeleteCustomerDialogProps) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(admin.customers.destroy(customer.id), {
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
                    <DialogTitle>Hapus customer ini?</DialogTitle>
                    <DialogDescription>
                        Customer <span className="font-medium">{customer.company_name}</span>{' '}
                        akan dihapus permanen. Aksi ini tidak bisa dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isDeleting}>
                            Batal
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? 'Menghapus...' : 'Hapus'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
