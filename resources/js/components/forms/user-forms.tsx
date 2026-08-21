import { Link, useForm } from '@inertiajs/react';
import {
    LoaderCircle,
    Save,
    ShieldCheck,
    UserRound,
} from 'lucide-react';
import type { FormEvent } from 'react';

import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { useZod } from '@/hooks/use-zod';
import { USER_ROLE_META, USER_STATUS_META } from '@/lib/constants';
import admin from '@/routes/admin';
import type { User } from '@/types/auth';
import type { UserRole, UserStatus } from '@/types/models';
import { getUserSchema } from '@/validations/user-schema';

interface UserFormProps {
    user?: User;
    formStatus: 'create' | 'edit' | 'show';
}

interface UserFormData {
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: UserRole;
    status: UserStatus;
}

export default function UserForm({ user, formStatus }: UserFormProps) {
    const isReadOnly = formStatus === 'show';
    const form = useForm<UserFormData>({
        full_name: user?.full_name ?? '',
        phone_number: user?.phone_number ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',
        role: user?.role ?? 'cs',
        status: user?.status ?? 'active',
    });

    const validationMode = formStatus === 'create' ? 'create' : 'edit';
    const { validate } = useZod(getUserSchema(validationMode));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isReadOnly) {
            return;
        }

        const result = validate(form.data);

        if (!result.success) {
            Object.entries(result.errors).forEach(([field, messages]) => {
                form.setError(field as keyof UserFormData, messages[0]);
            });

            return;
        }

        if (formStatus === 'create') {
            form.post(admin.users.store.url());
        } else if (formStatus === 'edit' && user) {
            form.put(admin.users.update.url({ user: user }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)] lg:items-start">
                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                                <UserRound className="size-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-sba-primary dark:text-sba-secondary">Informasi pengguna</CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">
                                    Data utama yang digunakan untuk mengenali
                                    dan menghubungi pengguna.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8 px-5 pb-6 sm:px-6">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">
                                    Nama lengkap{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="full_name"
                                    value={form.data.full_name}
                                    onChange={(e) =>
                                        form.setData(
                                            'full_name',
                                            e.target.value,
                                        )
                                    }
                                    disabled={form.processing || isReadOnly}
                                    placeholder="Contoh: Budi Santoso"
                                    autoComplete="name"
                                    aria-invalid={Boolean(
                                        form.errors.full_name,
                                    )}
                                />
                                <InputError message={form.errors.full_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Alamat email{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) =>
                                        form.setData('email', e.target.value)
                                    }
                                    disabled={form.processing || isReadOnly}
                                    placeholder="nama@perusahaan.com"
                                    autoComplete="email"
                                    aria-invalid={Boolean(form.errors.email)}
                                />
                                <InputError message={form.errors.email} />
                            </div>

                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="phone_number">
                                    Nomor telepon
                                </Label>
                                <Input
                                    id="phone_number"
                                    type="tel"
                                    value={form.data.phone_number}
                                    onChange={(e) =>
                                        form.setData(
                                            'phone_number',
                                            e.target.value,
                                        )
                                    }
                                    disabled={form.processing || isReadOnly}
                                    placeholder="Contoh: 0812 3456 7890"
                                    autoComplete="tel"
                                    aria-invalid={Boolean(
                                        form.errors.phone_number,
                                    )}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Opsional. Digunakan untuk kebutuhan
                                    komunikasi operasional.
                                </p>
                                <InputError
                                    message={form.errors.phone_number}
                                />
                            </div>
                        </div>

                        {!isReadOnly && (
                            <div className="border-t pt-6">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            Kata sandi
                                            {formStatus === 'create' && (
                                                <span className="text-destructive">
                                                    {' '}
                                                    *
                                                </span>
                                            )}
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            value={form.data.password}
                                            onChange={(e) =>
                                                form.setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={form.processing}
                                            placeholder="Minimal 8 karakter"
                                            autoComplete="new-password"
                                            aria-invalid={Boolean(
                                                form.errors.password,
                                            )}
                                        />
                                        <InputError
                                            message={form.errors.password}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">
                                            Konfirmasi kata sandi
                                            {formStatus === 'create' && (
                                                <span className="text-destructive">
                                                    {' '}
                                                    *
                                                </span>
                                            )}
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            value={
                                                form.data.password_confirmation
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={form.processing}
                                            placeholder="Ulangi kata sandi"
                                            autoComplete="new-password"
                                            aria-invalid={Boolean(
                                                form.errors
                                                    .password_confirmation,
                                            )}
                                        />
                                        <InputError
                                            message={
                                                form.errors
                                                    .password_confirmation
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="overflow-hidden py-0">
                    <CardHeader className="border-b bg-gray-50 px-5 py-5 sm:px-6 dark:bg-gray-800/50">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sba-primary text-white">
                                <ShieldCheck className="size-4" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-sba-primary dark:text-sba-secondary">Akses akun</CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">
                                    Tentukan peran dan status akun pengguna.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-5 px-5 pb-6 sm:px-6">
                        <div className="space-y-2">
                            <Label htmlFor="role">
                                Hak akses{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={form.data.role}
                                onValueChange={(value) =>
                                    form.setData('role', value as UserRole)
                                }
                                disabled={form.processing || isReadOnly}
                            >
                                <SelectTrigger id="role" className="w-full">
                                    {USER_ROLE_META[form.data.role].label}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">
                                        {USER_ROLE_META.admin.label}
                                    </SelectItem>
                                    <SelectItem value="finance">
                                        {USER_ROLE_META.finance.label}
                                    </SelectItem>
                                    <SelectItem value="cs">
                                        {USER_ROLE_META.cs.label}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Hak akses mengatur menu dan tindakan yang dapat
                                digunakan.
                            </p>
                            <InputError message={form.errors.role} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">
                                Status akun{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={form.data.status}
                                onValueChange={(value) =>
                                    form.setData('status', value as UserStatus)
                                }
                                disabled={form.processing || isReadOnly}
                            >
                                <SelectTrigger id="status" className="w-full">
                                    {USER_STATUS_META[form.data.status].label}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">
                                        {USER_STATUS_META.active.label}
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        {USER_STATUS_META.inactive.label}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Akun nonaktif tidak diperbolehkan mengakses
                                aplikasi.
                            </p>
                            <InputError message={form.errors.status} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {!isReadOnly && (
                <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={form.processing}
                        asChild
                        className="w-full sm:w-auto"
                    >
                        <Link href={admin.users.index.url()}>Batal</Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={form.processing}
                        variant="sbaPrimary"
                        className="w-full sm:w-auto sm:min-w-36"
                    >
                        {form.processing ? (
                            <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                            <Save className="size-4" />
                        )}
                        {form.processing ? 'Menyimpan...' : 'Simpan Data'}
                    </Button>
                </div>
            )}
        </form>
    );
}
