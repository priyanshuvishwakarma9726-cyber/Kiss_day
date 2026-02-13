'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import confetti from 'canvas-confetti';

export default function VirtualKiss() {
    const [kissed, setKissed] = useState(false);

    const handleKiss = () => {
        // 1. Screen Shake (done via CSS class trigger on body or main, but let's keep it simple here with motion)
        // We already have animate-shake utility.

        // 2. Confetti Explosion
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        // 3. Set State for Modal
        setKissed(true);

        // 4. Sound Effect (User interaction required first, usually works on click)
        const audio = new Audio('/kiss-sound.mp3'); // Need to ensure file exists or use a generic sound
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed", e));
    };

    return (
        <section className="py-24 flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-rose-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/hearts-bg.svg')] opacity-10 animate-pulse"></div>

            <motion.button
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={handleKiss}
                className="px-12 py-6 bg-gradient-to-r from-red-500 to-pink-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all z-10 animate-float"
            >
                Click for a Kiss 💋
            </motion.button>

            <p className="mt-4 text-pink-400 text-sm animate-pulse tracking-widest uppercase font-semibold">
                Warning: Highly Addictive 😉
            </p>

            <AnimatePresence>
                {kissed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-pink-900/60 backdrop-blur-sm"
                        onClick={() => setKissed(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 100 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="bg-white/30 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl p-10 max-w-md text-center relative overflow-hidden m-4 border-2 border-pink-300 shadow-pink-500/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-400 rounded-full blur-3xl opacity-30"></div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl opacity-30"></div>

                            <motion.div
                                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-9xl mb-6 relative z-10 drop-shadow-xl"
                            >
                                😘
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-4 font-handwriting"
                            >
                                Muuuahhh! 💋
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-xl text-gray-800 font-medium italic leading-relaxed"
                            >
                                &quot;Is kiss ke baad duniya ruk jaye to bhi chalega…&quot;
                            </motion.p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setKissed(false)}
                                className="mt-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
                            >
                                Blushing... ☺️
                            </motion.button>
                        </motion.div>

                        {/* Floating text elements */}
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: [0, 1, 0], y: -200 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-pink-200 pointer-events-none z-0 font-handwriting"
                        >
                            Love You!
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
