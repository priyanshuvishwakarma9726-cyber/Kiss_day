'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2; // Very soft volume
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.error("Playback prevented:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Using a different song example that might be softer, or keep original if acceptable. 
                SoundHelix-Song-1 is techno-ish. Song-3 or Song-8 are often piano-ish. 
                Let's try Song-8. This is still a placeholder. 
            */}
            <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" />

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/90 backdrop-blur-xl p-4 rounded-full shadow-2xl border border-pink-300 text-pink-500 hover:text-pink-600 transition-all flex items-center gap-3 group"
                title={isPlaying ? "Pause Music" : "Play Romantic Music"}
            >
                <span className={`text-2xl ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    {isPlaying ? '🎶' : '🔇'}
                </span>
                <span className="text-sm font-bold font-handwriting pr-2 text-pink-800 hidden md:group-hover:inline-block transition-all">
                    {isPlaying ? 'Romantic Vibes On' : 'Play Music'}
                </span>
            </motion.button>
        </div>
    );
}
