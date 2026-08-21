import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Newspaper } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BreadcrumbItem } from '@/types/navigation';

interface AppAdminLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
}

const navigation = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Posts', href: '/posts', icon: Newspaper },
];

export default function AppAdminLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<AppAdminLayoutProps>) {
    const { auth } = usePage().props;

    return (
        <div className="flex min-h-screen bg-background">
            <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border/80">
                <div className="flex h-16 items-center border-b border-sidebar-border/80 px-4">
                    <Link href="/dashboard" className="text-lg font-bold tracking-tight">
                        NET100NEWS
                    </Link>
                </div>

                <nav className="flex flex-1 flex-col gap-1 p-3">
                    {navigation.map((item) => (
                        <Button
                            key={item.href}
                            variant="ghost"
                            className="justify-start gap-2"
                            asChild
                        >
                            <Link href={item.href}>
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </nav>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-sidebar-border/80 px-6">
                    {breadcrumbs.length > 1 ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {breadcrumbs.map((item, index) => (
                                <span key={item.href} className="flex items-center gap-2">
                                    {index > 0 && <span>/</span>}
                                    <Link href={item.href} className="hover:text-foreground">
                                        {item.title}
                                    </Link>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div />
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-9 rounded-full p-0">
                                <Avatar className="size-8">
                                    <AvatarFallback>
                                        {auth.user?.full_name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href="/settings/profile">Profil</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/logout" method="post" as="button">
                                    Keluar
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
