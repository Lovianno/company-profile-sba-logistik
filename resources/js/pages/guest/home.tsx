import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    Box,
    Clock3,
    MapPinned,
    ShieldCheck,
    Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
    {
        title: 'Transportasi Darat',
        description:
            'Pengiriman antarkota dengan armada yang siap mendukung kebutuhan bisnis.',
        icon: Truck,
    },
    {
        title: 'Distribusi Logistik',
        description:
            'Pengelolaan distribusi yang terencana dari titik pengambilan hingga tujuan.',
        icon: MapPinned,
    },
    {
        title: 'Pergudangan',
        description:
            'Ruang penyimpanan yang membantu proses logistik tetap terorganisasi.',
        icon: Box,
    },
];

const highlights = [
    { value: '10+', label: 'Tahun pengalaman' },
    { value: '250+', label: 'Mitra pengiriman' },
    { value: '34', label: 'Wilayah layanan' },
    { value: '24/7', label: 'Dukungan operasional' },
];

export default function HomePage() {
    return (
        <>
            <Head title="Beranda" />

            <section className="relative isolate min-h-150 overflow-hidden bg-sba-primary text-white">
                <img
                    src="/assets/images/logistics-hero.png"
                    alt="Armada truk dan kontainer di area logistik"
                    className="absolute inset-0 -z-20 size-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-sba-primary/80" />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-sba-primary via-sba-primary/80 to-sba-primary/20" />

                <div className="mx-auto flex min-h-150 max-w-7xl items-center px-5 py-20 sm:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-[0.18em] text-sba-secondary uppercase">
                            Solusi logistik terpercaya
                        </p>
                        <h1 className="mt-5 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
                            SBA Logistik
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                            Menghubungkan bisnis Anda dengan layanan
                            transportasi dan distribusi yang terukur, aman, dan
                            tepat waktu.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button
                                asChild
                                variant="sbaSecondary"
                                size="lg"
                                className="rounded-md"
                            >
                                <a href="#hubungi-kami">
                                    Hubungi Kami
                                    <ArrowRight aria-hidden="true" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="rounded-md border-white/50 bg-transparent text-white hover:border-white hover:bg-white hover:text-sba-primary"
                            >
                                <a href="#layanan-kami">Lihat Layanan</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="tentang-kami" className="bg-white py-18">
                <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold tracking-[0.18em] text-sba-secondary uppercase">
                            Tentang kami
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-sba-primary sm:text-4xl">
                            Logistik yang bergerak bersama bisnis Anda.
                        </h2>
                    </div>
                    <div className="border-l-4 border-sba-secondary pl-6">
                        <p className="text-base leading-8 text-slate-600">
                            Ini adalah konten dummy untuk melihat komposisi
                            halaman. Nantinya bagian ini dapat berisi profil,
                            nilai perusahaan, dan pendekatan layanan SBA
                            Logistik.
                        </p>
                        <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-sba-primary">
                            <ShieldCheck
                                className="size-5 text-sba-secondary"
                                aria-hidden="true"
                            />
                            Mitra operasional yang dapat diandalkan
                        </div>
                    </div>
                </div>
            </section>

            <section id="layanan-kami" className="bg-slate-50 py-18">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-[0.18em] text-sba-secondary uppercase">
                            Layanan kami
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-sba-primary sm:text-4xl">
                            Dukungan di setiap tahap perjalanan logistik.
                        </h2>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.title}
                                    id={service.title
                                        .toLowerCase()
                                        .replaceAll(' ', '-')}
                                    className="border border-slate-200 bg-white p-7 transition-shadow hover:shadow-lg"
                                >
                                    <div className="flex size-11 items-center justify-center bg-sba-primary text-white">
                                        <Icon
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-sba-primary">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {service.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-sba-primary py-14 text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
                    {highlights.map((highlight) => (
                        <div key={highlight.label}>
                            <p className="text-3xl font-bold text-sba-secondary">
                                {highlight.value}
                            </p>
                            <p className="mt-2 text-sm text-white/75">
                                {highlight.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="galeri" className="bg-white py-18">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.18em] text-sba-secondary uppercase">
                                Galeri
                            </p>
                            <h2 className="mt-4 text-3xl font-bold text-sba-primary sm:text-4xl">
                                Aktivitas operasional kami.
                            </h2>
                        </div>
                        <p className="max-w-md text-sm leading-7 text-slate-600">
                            Area ini disiapkan untuk dokumentasi armada,
                            fasilitas, dan proses pengiriman.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr]">
                        <img
                            src="/assets/images/logistics-hero.png"
                            alt="Area operasional logistik"
                            className="h-80 w-full object-cover"
                        />
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                            <div className="flex min-h-37 items-end bg-sba-primary p-6 text-white">
                                <div>
                                    <Clock3
                                        className="size-5 text-sba-secondary"
                                        aria-hidden="true"
                                    />
                                    <p className="mt-4 text-lg font-bold">
                                        Operasional terpantau
                                    </p>
                                </div>
                            </div>
                            <div className="flex min-h-37 items-end bg-sba-secondary p-6 text-sba-primary">
                                <p className="text-lg font-bold">
                                    Ruang untuk dokumentasi layanan berikutnya
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="hubungi-kami" className="bg-slate-50 py-18">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold tracking-[0.18em] text-sba-secondary uppercase">
                            Hubungi kami
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-sba-primary sm:text-4xl">
                            Mari diskusikan kebutuhan logistik Anda.
                        </h2>
                    </div>
                    <Button
                        asChild
                        variant="sbaPrimary"
                        size="lg"
                        className="rounded-md"
                    >
                        <a href="mailto:semestabangkitabadi@gmail.com">
                            Kirim Email
                            <ArrowRight aria-hidden="true" />
                        </a>
                    </Button>
                </div>
            </section>
        </>
    );
}
