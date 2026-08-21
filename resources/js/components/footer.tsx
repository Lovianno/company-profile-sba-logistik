import {
    ArrowUp,
    ChevronRight,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Youtube,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceLinks = [
    { label: 'Transportasi Darat', href: '#transportasi-darat' },
    { label: 'Distribusi Logistik', href: '#distribusi-logistik' },
    { label: 'Pergudangan', href: '#pergudangan' },
];

const companyLinks = [
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Layanan', href: '#layanan-kami' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Hubungi Kami', href: '#hubungi-kami' },
];

const socialMediaLinks = [
    {
        label: 'Instagram SBA Logistik',
        href: 'https://www.instagram.com/',
        icon: Instagram,
    },
    {
        label: 'Facebook SBA Logistik',
        href: 'https://www.facebook.com/',
        icon: Facebook,
    },
    {
        label: 'YouTube SBA Logistik',
        href: 'https://www.youtube.com/',
        icon: Youtube,
    },
    {
        label: 'LinkedIn SBA Logistik',
        href: 'https://www.linkedin.com/',
        icon: Linkedin,
    },
];

function FooterLink({ label, href }: { label: string; href: string }) {
    return (
        <a
            href={href}
            className="group inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-sba-secondary focus-visible:text-sba-secondary focus-visible:outline-none"
        >
            <ChevronRight
                className="size-4 text-sba-secondary transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
            />
            <span>{label}</span>
        </a>
    );
}

export default function Footer() {
    return (
        <footer className="bg-sba-primary text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 xl:grid-cols-[1.45fr_0.9fr_0.9fr_1.1fr] xl:gap-12">
                <section aria-label="Tentang SBA Logistik">
                    <a
                        href="/"
                        aria-label="SBA Logistik - Beranda"
                        className="inline-block bg-white px-3 py-2"
                    >
                        <img
                            src="/assets/logo/logo-sba-full.png"
                            alt="SBA Logistik"
                            className="h-14 w-auto object-contain"
                        />
                    </a>
                    <p className="mt-6 max-w-sm text-sm leading-7 text-white/75">
                        PT Semesta Bangkit Abadi Logistik hadir untuk mendukung
                        kebutuhan transportasi dan distribusi logistik Anda.
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                        {socialMediaLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Button
                                    key={item.label}
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    className="size-9 rounded-full bg-white/15 text-white hover:bg-sba-secondary hover:text-white focus-visible:border-white focus-visible:ring-white/50"
                                >
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={item.label}
                                    >
                                        <Icon
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    </a>
                                </Button>
                            );
                        })}
                    </div>
                </section>

                <section aria-labelledby="footer-services">
                    <h2
                        id="footer-services"
                        className="text-base font-bold uppercase"
                    >
                        Layanan
                    </h2>
                    <ul className="mt-5 space-y-4">
                        {serviceLinks.map((item) => (
                            <li key={item.label}>
                                <FooterLink {...item} />
                            </li>
                        ))}
                    </ul>
                </section>

                <section aria-labelledby="footer-company">
                    <h2
                        id="footer-company"
                        className="text-base font-bold uppercase"
                    >
                        Perusahaan
                    </h2>
                    <ul className="mt-5 space-y-4">
                        {companyLinks.map((item) => (
                            <li key={item.label}>
                                <FooterLink {...item} />
                            </li>
                        ))}
                    </ul>
                </section>

                <section aria-labelledby="footer-contact">
                    <h2
                        id="footer-contact"
                        className="text-base font-bold uppercase"
                    >
                        Kontak
                    </h2>
                    <address className="mt-5 not-italic">
                        <a
                            href="mailto:semestabangkitabadi@gmail.com"
                            className="inline-flex items-start gap-3 text-sm leading-6 text-white/75 transition-colors hover:text-sba-secondary focus-visible:text-sba-secondary focus-visible:outline-none"
                        >
                            <Mail
                                className="mt-1 size-4 shrink-0 text-sba-secondary"
                                aria-hidden="true"
                            />
                            <span>semestabangkitabadi@gmail.com</span>
                        </a>
                    </address>
                    <a
                        href="#hubungi-kami"
                        className="mt-5 inline-flex text-sm font-semibold text-sba-secondary transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                    >
                        Kirim pesan kepada kami
                    </a>
                </section>
            </div>

            <div className="border-t border-white/15 bg-[#06294c]">
                <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
                    <p className="text-sm text-white/80">
                        &copy; {new Date().getFullYear()} PT Semesta Bangkit
                        Abadi Logistik. Seluruh hak cipta dilindungi.
                    </p>
                    <Button
                        type="button"
                        variant="sbaSecondary"
                        size="icon"
                        className="size-10 shrink-0 rounded-md"
                        aria-label="Kembali ke atas"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                    >
                        <ArrowUp className="size-5" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
