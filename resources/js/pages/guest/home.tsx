import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    Box,
    Clock3,
    MapPinned,
    Plane,
    Ship,
    Truck,
} from 'lucide-react';
import HeroCarousel from '@/components/hero-carousel';
import HighlightsSection from '@/components/highlights-section';
import ServicesCarousel from '@/components/services-carousel';
import { Button } from '@/components/ui/button';

const services = [
    {
        title: 'Freight Darat',
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
        title: 'Freight Laut',
        description:
            'Pengiriman kargo melalui jalur laut untuk kebutuhan antarpulau dan volume besar.',
        icon: Ship,
    },
    {
        title: 'Freight Udara',
        description:
            'Solusi pengiriman cepat untuk barang prioritas dengan waktu tempuh lebih singkat.',
        icon: Plane,
    },
    {
        title: 'Pergudangan',
        description:
            'Ruang penyimpanan yang membantu proses logistik tetap terorganisasi.',
        icon: Box,
    },
];

const highlights = [
    { value: '5+', label: 'Tahun pengalaman' },
    { value: '250+', label: 'Mitra pengiriman' },
    { value: '34', label: 'Wilayah layanan' },
    { value: '24/7', label: 'Dukungan operasional' },
];

export default function HomePage() {
    return (
        <>
            <Head title="Beranda" />

            <HeroCarousel />

            <section id="tentang-kami" className="bg-white py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.2fr] lg:items-start">
                    <div className="lg:sticky lg:top-36">
                        <p className="text-sm font-semibold tracking-[0.18em] text-sba-secondary uppercase">
                            Tentang kami
                        </p>
                        <h2 className="mt-4 max-w-xl text-3xl leading-tight font-bold text-sba-primary sm:text-4xl">
                            Solusi Logistik Terpadu untuk Mendukung Akselerasi
                            Bisnis Anda.
                        </h2>

                        <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                            Kami menangani seluruh proses pengiriman Anda, serta
                            memastikan setiap tahapan berjalan lancar dengan
                            dijemput tepat waktu, disimpan dengan aman, hingga
                            tiba di tujuan
                        </p>
                    </div>

                    <div className="border-l-4 border-sba-secondary bg-sba-primary px-6 py-7 sm:px-8 sm:py-9">
                        <p className="text-lg leading-9 text-white">
                            Layanan terintegrasi mulai dari freight forwarding
                            laut, darat dan udara yang didukung oleh pilihan
                            lengkap armada transportasi darat dan spesialisasi
                            dalam menangani kargo yang membutuhkan penanganan
                            khusus.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {[
                                { label: 'Darat', icon: Truck },
                                { label: 'Laut', icon: Ship },
                                { label: 'Udara', icon: Plane },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className="flex items-center gap-3 border border-slate-200 bg-white px-4 py-3 md:justify-center lg:justify-center"
                                    >
                                        <Icon
                                            className="size-5 shrink-0 text-sba-secondary"
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm font-semibold text-sba-primary">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="layanan-kami" className="bg-slate-50 py-18">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-semibold tracking-[0.18em] text-sba-secondary uppercase">
                            Layanan kami
                        </p>
                        <h2 className="mt-4 text-3xl leading-tight font-bold text-sba-primary sm:text-4xl">
                            Dukungan di setiap tahap perjalanan logistik.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
                            Pilih layanan yang sesuai dengan kebutuhan
                            pengiriman, distribusi, dan penyimpanan barang
                            bisnis Anda.
                        </p>
                    </div>
                    <ServicesCarousel services={services} />
                </div>
            </section>

            <HighlightsSection highlights={highlights} />

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
