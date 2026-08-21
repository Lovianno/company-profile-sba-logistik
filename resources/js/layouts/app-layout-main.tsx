import type { PropsWithChildren } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Navbar */}
            <Navbar />

            {/* Konten */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="mt-5">
                <Footer />
            </footer>
        </div>
    );
}
