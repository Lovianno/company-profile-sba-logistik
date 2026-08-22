import { usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Facebook,
    Instagram,
    Linkedin,
    Menu,
    X,
    Youtube,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavbarNavItem } from '@/components/navbar-nav-item';
import type { NavbarNavigationItem } from '@/components/navbar-nav-item';
import { NavbarTopBar } from '@/components/navbar-top-bar';
import { Button } from '@/components/ui/button';

const COMPANY_EMAIL = 'semestabangkitabadi@gmail.com';

// NOTE: dropdown "Layanan" belum diaktifkan — nav-nya masih flat sampai
// halaman/section detail masing-masing layanan siap.
const navigationItems: NavbarNavigationItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Layanan', href: '#layanan-kami', children: [{ label: 'Transportasi Darat', href: '#transportasi-darat' }, { label: 'Distribusi Logistik', href: '#distribusi-logistik' }, { label: 'Pergudangan', href: '#pergudangan' }] },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Hubungi Kami', href: '#hubungi-kami' },
];

const socialMediaItems = [
    { label: 'Instagram SBA Logistik', href: 'https://www.instagram.com/', icon: Instagram },
    { label: 'Facebook SBA Logistik', href: 'https://www.facebook.com/', icon: Facebook },
    { label: 'YouTube SBA Logistik', href: 'https://www.youtube.com/', icon: Youtube },
    { label: 'LinkedIn SBA Logistik', href: 'https://www.linkedin.com/', icon: Linkedin },
];

function getNavigationItemClassName(isActive: boolean) {
    return `h-auto rounded-none px-0 py-0 text-sm font-semibold uppercase hover:bg-transparent hover:text-sba-secondary focus-visible:border-sba-secondary focus-visible:ring-sba-secondary/30 has-[>svg]:px-0 ${
        isActive ? 'text-sba-secondary' : 'text-slate-800'
    }`;
}

export default function Navbar() {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
    const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);

    useEffect(() => {
        const updateActiveHash = () => setActiveHash(window.location.hash);

        updateActiveHash();
        window.addEventListener('hashchange', updateActiveHash);

        return () => window.removeEventListener('hashchange', updateActiveHash);
    }, []);

    const isNavigationItemActive = (item: NavbarNavigationItem) => {
        if (item.href === '/') {
            return url.split('?')[0] === '/' && !activeHash;
        }

        return (
            activeHash === item.href ||
            item.children?.some((child) => activeHash === child.href) === true
        );
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b-4 border-sba-secondary bg-white shadow-sm">
            <NavbarTopBar email={COMPANY_EMAIL} socialMediaItems={socialMediaItems} />

            <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">
                <a href="/" aria-label="SBA Logistik - Beranda" className="shrink-0">
                    <img
                        src="/assets/logo/logo-sba-full.png"
                        alt="SBA Logistik"
                        className="h-16 w-auto object-contain"
                    />
                </a>

                <nav aria-label="Navigasi utama" className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        {navigationItems.map((item) => (
                            <NavbarNavItem
                                key={item.href}
                                item={item}
                                isOpen={openDesktopDropdown === item.label}
                                onOpenChange={setOpenDesktopDropdown}
                                onSelect={() => {}}
                                className={getNavigationItemClassName(
                                    isNavigationItemActive(item),
                                )}
                            />
                        ))}
                    </ul>
                </nav>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
                    onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                    className="size-10 rounded-none text-slate-800 hover:bg-transparent hover:text-sba-secondary focus-visible:border-sba-secondary focus-visible:ring-sba-secondary/30 lg:hidden"
                >
                    {isMobileMenuOpen ? (
                        <X className="size-6" aria-hidden="true" />
                    ) : (
                        <Menu className="size-6" aria-hidden="true" />
                    )}
                </Button>
            </div>

            {isMobileMenuOpen && (
                <nav
                    id="mobile-navigation"
                    aria-label="Navigasi utama mobile"
                    className="border-t border-slate-200 bg-white px-5 py-3 lg:hidden"
                >
                    <ul className="mx-auto max-w-7xl divide-y divide-slate-100">
                        {navigationItems.map((item) => {
                            const isExpanded = expandedMobileItem === item.label;
                            const isActive = isNavigationItemActive(item);

                            return (
                                <li key={item.href}>
                                    {item.children ? (
                                        <>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className={`h-auto w-full justify-between rounded-none px-0 py-3 text-sm font-semibold uppercase hover:bg-transparent hover:text-sba-secondary has-[>svg]:px-0 ${
                                                    isActive ? 'text-sba-secondary' : 'text-slate-800'
                                                }`}
                                                aria-expanded={isExpanded}
                                                aria-controls={`mobile-submenu-${item.label}`}
                                                onClick={() =>
                                                    setExpandedMobileItem(
                                                        isExpanded ? null : item.label,
                                                    )
                                                }
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                            {isExpanded && (
                                                <ul
                                                    id={`mobile-submenu-${item.label}`}
                                                    className="border-t border-slate-100 bg-slate-50 px-4"
                                                >
                                                    {item.children.map((child) => (
                                                        <li key={child.href}>
                                                            <Button
                                                                asChild
                                                                variant="ghost"
                                                                className="h-auto w-full justify-start rounded-none px-0 py-3 text-sm font-medium text-slate-700 hover:bg-transparent hover:text-sba-secondary"
                                                            >
                                                                <a
                                                                    href={child.href}
                                                                    onClick={() => {
                                                                        setIsMobileMenuOpen(false);
                                                                        setExpandedMobileItem(null);
                                                                    }}
                                                                >
                                                                    {child.label}
                                                                </a>
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className={`h-auto w-full justify-start rounded-none px-0 py-3 text-sm font-semibold uppercase hover:bg-transparent hover:text-sba-secondary ${
                                                isActive ? 'text-sba-secondary' : 'text-slate-800'
                                            }`}
                                        >
                                            <a
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </a>
                                        </Button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
        </header>
    );
}
