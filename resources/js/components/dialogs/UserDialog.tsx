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
import type { User } from '@/types/auth';

interface DeleteUserDialogProps {
    user: User;
}

export function DeleteUserDialog({ user }: DeleteUserDialogProps) {
    // Dialog di-kontrol manual (`open`/`onOpenChange`) supaya bisa ditutup
    // otomatis setelah delete berhasil — beda dari <AlertDialog> yang
    // biasanya nutup sendiri begitu tombol aksi diklik.
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(admin.users.destroy(user.id), {
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
                    <DialogTitle>Hapus user ini?</DialogTitle>
                    <DialogDescription>
                        User <span className="font-medium">{user.full_name}</span>{' '}
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
