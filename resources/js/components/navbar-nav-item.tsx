import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export function NavbarNavItem({
    item,
    isOpen,
    onOpenChange,
    onSelect,
    className,
}: NavbarNavItemProps) {
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
            className="relative"
            onPointerEnter={() => onOpenChange(item.label)}
            onPointerLeave={() => onOpenChange(null)}
            onFocus={() => onOpenChange(item.label)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    onOpenChange(null);
                }
            }}
        >
            <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-expanded={isOpen}
                aria-controls={`desktop-submenu-${item.label}`}
                onClick={() => onOpenChange(isOpen ? null : item.label)}
                className={className}
            >
                {item.label}
                <ChevronDown
                    className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </Button>
            {isOpen && (
                <div className="absolute top-full left-0 z-50 pt-3">
                    <ul
                        id={`desktop-submenu-${item.label}`}
                        className="min-w-52 border border-slate-200 bg-white p-1 shadow-lg"
                    >
                        {item.children.map((child) => (
                            <li key={child.label}>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="h-auto w-full justify-start rounded-none px-3 py-2.5 font-medium text-slate-700 hover:bg-sba-primary hover:text-white"
                                >
                                    <a
                                        href={child.href}
                                        onClick={() => onSelect(child.href)}
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
