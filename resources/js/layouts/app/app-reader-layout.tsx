import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types/navigation';

interface AppReaderLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
}

const navigation = [
    { title: 'Beranda', href: '/' },
    { title: 'Kategori', href: '/categories' },
];

export default function AppReaderLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<AppReaderLayoutProps>) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                    <Link href="/" className="text-lg font-bold tracking-tight">
                        NET100NEWS
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {navigation.map((item) => (
                            <Button key={item.href} variant="ghost" asChild>
                                <Link href={item.href}>{item.title}</Link>
                            </Button>
                        ))}
                    </nav>
                </div>

                {breadcrumbs.length > 1 && (
                    <div className="border-t border-sidebar-border/70">
                        <div className="mx-auto flex h-10 max-w-5xl items-center gap-2 px-4 text-sm text-muted-foreground">
                            {breadcrumbs.map((item, index) => (
                                <span key={item.href} className="flex items-center gap-2">
                                    {index > 0 && <span>/</span>}
                                    <Link href={item.href} className="hover:text-foreground">
                                        {item.title}
                                    </Link>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
                {children}
            </main>
        </div>
    );
}