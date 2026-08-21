import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin from '@/routes/admin';
import type { NavItem } from '@/types';

const dashboardItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard.url(),
        icon: LayoutGrid,
    },
];

const masterDataItems: NavItem[] = [
    {
        title: 'Pengguna',
        href: admin.users.index(),
        icon: Users,
        roles: ['admin'],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="data-[size=lg]:h-20 data-[size=lg]:justify-center data-[size=lg]:px-3 group-data-[collapsible=icon]:data-[size=lg]:h-10 group-data-[collapsible=icon]:data-[size=lg]:px-1"
                        >
                            <Link href={admin.dashboard.url()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={dashboardItems} />
                <NavMain items={masterDataItems} label="Master Data" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
