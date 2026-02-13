import Hero from '@/components/Hero';
import LoveLetter from '@/components/LoveLetter';
import MemoryGallery from '@/components/MemoryGallery';
import VirtualKiss from '@/components/VirtualKiss';
import SecretMessage from '@/components/SecretMessage';
import PromiseSection from '@/components/Promise';
import MusicPlayer from '@/components/MusicPlayer';
import LoveMeter from '@/components/LoveMeter';
import Countdown from '@/components/Countdown';

export default function Home() {
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
