import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SocialMediaItem = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
};

type NavbarTopBarProps = {
    email: string;
    socialMediaItems: SocialMediaItem[];
};

export function NavbarTopBar({ email, socialMediaItems }: NavbarTopBarProps) {
    return (
        <div className="bg-sba-primary text-white">
            <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 lg:px-8">
                <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    <Mail className="size-4" aria-hidden="true" />
                    <span>{email}</span>
                </a>

                <div className="flex items-center gap-1">
                    {socialMediaItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Button
                                key={item.href}
                                asChild
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-none text-white hover:bg-white/10 hover:text-white focus-visible:border-white focus-visible:ring-white/50"
                            >
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={item.label}
                                >
                                    <Icon className="size-4" aria-hidden="true" />
                                </a>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
