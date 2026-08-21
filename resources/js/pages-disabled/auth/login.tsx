import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle } from 'lucide-react';
import { store } from '@/routes/login';

type Props = {
    status?: string;
    inactiveUser?: boolean;
};

export default function Login({ status, inactiveUser }: Props) {
    return (
        <>
            <Head title="Masuk" />

            {inactiveUser && (
                <Alert variant="destructive" className="mb-5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Akun Anda tidak aktif</AlertTitle>
                    <AlertDescription>
                        Hubungi administrator untuk mengaktifkan akun Anda agar dapat mengakses sistem.
                    </AlertDescription>
                </Alert>
            )}

            {status && (
                <div className="mb-5 rounded-xl border px-4 py-3 text-sm font-medium text-foreground">
                    {status}
                </div>
            )}
            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Masukkan alamat email"
                                    className="h-11 rounded-xl"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2.5">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Kata sandi</Label>
                                  
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Masukkan kata sandi"
                                    className="h-11 rounded-xl"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Ingat saya</Label>
                            </div>

                            <Button
                                type="submit"
                                variant="sbaPrimary"
                                className="mt-2 h-11 w-full rounded-xl font-semibold shadow-lg shadow-sba-primary/15"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Masuk
                            </Button>
                        </div>

                       
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Selamat datang kembali',
    description: 'Masukkan email dan kata sandi untuk mengakses akun Anda.',
};
