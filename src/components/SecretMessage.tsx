'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SecretMessage() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [particles, setParticles] = useState<{ id: number; x: number; y: number; duration: number }[]>([]);

    useEffect(() => {
        // Use window dimensions if available, otherwise defaults
        const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const h = typeof window !== 'undefined' ? window.innerHeight : 800;

        const temp: { id: number; x: number; y: number; duration: number }[] = [];
        for (let i = 0; i < 20; i++) {
            // eslint-disable-next-line
            temp.push({
                id: i,
                x: Math.random() * w,
                y: Math.random() * (h * 0.6),
                duration: Math.random() * 3 + 2,
            });
        }
        setParticles(temp);
    }, []);

    // Trigger heart rain
    const triggerHeartRain = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const skew = 1;

        (function frame() {
            const timeLeft = animationEnd - Date.now();
            const ticks = Math.max(200, 500 * (timeLeft / duration));
            if (timeLeft > 0) {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: ticks,
                    origin: {
                        x: Math.random(),
                        // since particles fall down, start a bit higher than random
                        y: (Math.random() * skew) - 0.2
                    },
                    colors: ['#ff0000', '#ff69b4', '#ffffff'],
                    shapes: ['heart'],
                    gravity: 0.5,
                    scalar: 2,
                    drift: 0,
                });
                requestAnimationFrame(frame);
            }
        }());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Mock check for faster interaction or use API. API is safer.
            // But for cinematic feel, let's delay slightly.
            const res = await fetch('/api/secret', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            await res.json();

            if (res.ok) {
                setMessage("Tu sirf meri girlfriend nahi… meri har dua ka jawab hai ❤️"); // Override with cinematic text or use DB
                triggerHeartRain();
            } else {
                setError("Oops! Wrong password meri jaan 😜 Try again!");
                // Shake effect on error input could be added here
            }
        } catch {
            setError("Something went wrong. Maybe network issue?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden min-h-[60vh]">
            {/* Cinematic Spotlight Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black z-0"></div>

            {/* Floating particles/stars background */}
            <div className="absolute inset-0 z-0 opacity-30">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute bg-white rounded-full w-1 h-1"
                        initial={{ x: p.x, y: p.y, opacity: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                        transition={{ duration: p.duration, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="z-10 text-center max-w-lg w-full px-6 relative">
                <h2 className="text-3xl md:text-5xl font-bold mb-10 text-pink-500 font-handwriting tracking-wide drop-shadow-lg glow-text">
                    🔒 Secret Message
                </h2>

                <AnimatePresence mode='wait'>
                    {!message ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-6"
                        >
                            <div className="relative group">
                                <input
                                    type="password"
                                    placeholder="Enter the magic word..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-6 py-4 rounded-full bg-gray-800/50 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-white text-center text-xl tracking-[0.5em] transition-all backdrop-blur-sm group-hover:bg-gray-800/80 placeholder:tracking-normal"
                                />
                                <div className="absolute inset-0 rounded-full bg-pink-500/10 blur-xl -z-10 group-hover:bg-pink-500/20 transition-all duration-500"></div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={loading || !password}
                                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-bold text-lg shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Unlocking...' : 'Unlock My Heart 🔓'}
                            </motion.button>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-400 mt-2 text-sm font-medium"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </motion.form>
                    ) : (
                        <motion.div
                            key="message"
                            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-10 relative overflow-hidden border-pink-500/30"
                        >
                            <div className="absolute inset-0 bg-pink-500/5 mix-blend-overlay"></div>
                            <div className="absolute -top-6 -left-6 text-6xl rotate-12 animate-pulse">💌</div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-3xl md:text-5xl font-handwriting text-pink-100 leading-tight italic glow-text font-bold"
                            >
                                &quot;{message}&quot;
                            </motion.p>

                            <div className="mt-8 text-sm text-pink-300/70 font-mono tracking-widest uppercase">
                                - Only for your eyes -
                            </div>

                            <button
                                onClick={() => { setMessage(''); setPassword(''); }}
                                className="mt-8 text-xs text-gray-400 hover:text-white underline transition-colors"
                            >
                                Lock again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
