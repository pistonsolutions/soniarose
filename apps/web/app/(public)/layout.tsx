import { PublicNavbar } from '@/components/layout/public-navbar';
import { PublicFooter } from '@/components/layout/public-footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicNavbar />
            <main className="flex-grow pt-28">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
}
