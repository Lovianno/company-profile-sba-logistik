import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="absolute -top-40 -right-32 size-96 rounded-full bg-sba-secondary/15 blur-3xl" />
            <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-sba-primary/10 blur-3xl" />

            <main className="relative flex min-h-svh items-center justify-center p-4 sm:p-5 lg:p-6">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[1.05fr_0.95fr] dark:border-slate-800 dark:bg-slate-900">
                    <section className="relative hidden overflow-hidden bg-sba-primary p-10 text-white lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute -top-28 -right-28 size-80 rounded-full border-[50px] border-white/5" />
                        <div className="absolute -bottom-32 -left-24 size-96 rounded-full bg-sba-secondary/10 blur-2xl" />

                        <Link href={home()} className="relative z-10 w-fit">
                            <div className="rounded-2xl bg-white px-6 py-4 shadow-lg shadow-black/10">
                                <img
                                    src="/assets/logo/logo-sba-full.png"
                                    alt="SBA Logistik"
                                    className="h-14 w-auto object-contain"
                                />
                            </div>
                        </Link>

                        <div className="relative z-10 max-w-lg space-y-5 py-12">
                            <div className="h-1 w-16 rounded-full bg-sba-secondary" />
                            <div className="space-y-3">
                                <p className="text-sm font-semibold tracking-[0.22em] text-sba-secondary uppercase">
                                    Sistem Informasi Logistik
                                </p>
                                <h2 className="text-3xl leading-tight font-semibold tracking-tight">
                                    Kelola operasional dengan lebih cepat dan
                                    terarah.
                                </h2>
                                <p className="max-w-md text-base leading-relaxed text-white/70">
                                    Satu ruang kerja untuk mendukung aktivitas
                                    dan pengelolaan data SBA Logistik.
                                </p>
                            </div>
                        </div>

                        <p className="relative z-10 text-xs text-white/45">
                            &copy; {new Date().getFullYear()} SBA Logistik.
                            Seluruh hak dilindungi.
                        </p>
                    </section>

                    <section className="flex items-center justify-center px-6 py-8 sm:px-10 lg:px-12">
                        <div className="w-full max-w-md">
                            <Link
                                href={home()}
                                className="mx-auto mb-8 flex w-fit justify-center lg:hidden"
                            >
                                <div className="rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-slate-200">
                                    <img
                                        src="/assets/logo/logo-sba-full.png"
                                        alt="SBA Logistik"
                                        className="h-12 w-auto object-contain"
                                    />
                                </div>
                            </Link>

                            <div className="mb-8 space-y-2">
                                <div className="mb-5 h-1 w-12 rounded-full bg-sba-secondary" />
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                    {title}
                                </h1>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </div>

                            {children}

                            <p className="mt-6 text-center text-xs text-muted-foreground lg:hidden">
                                &copy; {new Date().getFullYear()} SBA Logistik
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
