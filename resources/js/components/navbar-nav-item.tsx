import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/slugify';

export type NavbarNavigationItem = {
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
};

type NavbarNavItemProps = {
    item: NavbarNavigationItem;
    isOpen: boolean;
    onOpenChange: (label: string | null) => void;
    onSelect: (href: string) => void;
    className: string;
};

const CLOSE_DELAY_MS = 150;

export function NavbarNavItem({
    item,
    isOpen,
    onOpenChange,
    onSelect,
    className,
}: NavbarNavItemProps) {
    const itemRef = useRef<HTMLLIElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const submenuId = `desktop-submenu-${slugify(item.label)}`;

    const cancelScheduledClose = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const scheduleClose = () => {
        cancelScheduledClose();
        closeTimeoutRef.current = setTimeout(() => {
            onOpenChange(null);
        }, CLOSE_DELAY_MS);
    };

    // Tutup saat klik di luar atau tekan Escape (tetap dibutuhkan untuk
    // kasus dropdown terbuka lewat keyboard focus, bukan cuma hover).
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (!itemRef.current?.contains(event.target as Node)) {
                onOpenChange(null);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onOpenChange]);

    // Bersihkan timeout yang masih pending kalau komponen unmount.
    useEffect(() => cancelScheduledClose, []);

    if (!item.children) {
        return (
            <li>
                <Button asChild variant="ghost" size="sm" className={className}>
                    <a href={item.href} onClick={() => onSelect(item.href)}>
                        {item.label}
                    </a>
                </Button>
            </li>
        );
    }

    return (
        <li
            ref={itemRef}
            className="relative"
            onPointerEnter={() => {
                cancelScheduledClose();
                onOpenChange(item.label);
            }}
            onPointerLeave={scheduleClose}
        >
            <Button asChild variant="ghost" size="sm" className={className}>
                <a
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={submenuId}
                    onFocus={() => {
                        cancelScheduledClose();
                        onOpenChange(item.label);
                    }}
                    onClick={() => onSelect(item.href)}
                >
                    {item.label}
                    <ChevronDown
                        className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                    />
                </a>
            </Button>
            {isOpen && (
                <div
                    className="absolute top-full left-0 z-50 pt-3"
                    onPointerEnter={cancelScheduledClose}
                    onPointerLeave={scheduleClose}
                >
                    <ul
                        id={submenuId}
                        className="min-w-52 border border-slate-200 bg-white p-1 shadow-lg"
                    >
                        {item.children.map((child) => (
                            <li key={child.href}>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="h-auto w-full justify-start rounded-none px-3 py-2.5 font-medium text-slate-700 hover:bg-sba-primary hover:text-white"
                                >
                                    <a
                                        href={child.href}
                                        onClick={() => {
                                            onSelect(child.href);
                                            onOpenChange(null);
                                        }}
                                    >
                                        {child.label}
                                    </a>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}
