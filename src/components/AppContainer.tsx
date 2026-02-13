'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const LoveLetter = dynamic(() => import('@/components/LoveLetter'), { ssr: false });
const MemoryGallery = dynamic(() => import('@/components/MemoryGallery'), { ssr: false });
const VirtualKiss = dynamic(() => import('@/components/VirtualKiss'), { ssr: false });
const SecretMessage = dynamic(() => import('@/components/SecretMessage'), { ssr: false });
const PromiseSection = dynamic(() => import('@/components/Promise'), { ssr: false });
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), { ssr: false });
const LoveMeter = dynamic(() => import('@/components/LoveMeter'), { ssr: false });
const Countdown = dynamic(() => import('@/components/Countdown'), { ssr: false });

export default function AppContainer() {
    return (
        <main className="min-h-screen bg-pink-50 relative selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
            <Hero />
            <Countdown />
            <LoveMeter />
            <LoveLetter />
            <MemoryGallery />
            <VirtualKiss />
            <SecretMessage />
            <PromiseSection />

            <MusicPlayer />

            <footer className="py-12 bg-gradient-to-t from-pink-200 to-pink-100 text-center text-pink-800 font-medium relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/footer-pattern.png')] opacity-5"></div>
                <p className="text-lg font-handwriting text-3xl mb-2">Made with lots of ❤️ by Priyanshu</p>
                <p className="text-sm opacity-70">© {new Date().getFullYear()} Kiss Day Special</p>
            </footer>
        </main>
    );
}
