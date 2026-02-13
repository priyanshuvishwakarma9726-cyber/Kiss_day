'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoveMeter() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 px-8 bg-gradient-to-tr from-pink-50 to-rose-100/50 flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-handwriting text-rose-600 mb-8">
                Hamari Love Power ❤️
            </h3>

            <div className="w-full max-w-2xl bg-white/50 backdrop-blur-sm h-8 rounded-full shadow-inner overflow-hidden relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center pr-4"
                >
                    <span className="text-white text-lg md:text-2xl font-bold drop-shadow-md">
                        {progress}%
                    </span>
                </motion.div>
            </div>

            {progress === 100 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mt-8 text-3xl md:text-5xl text-purple-600 font-bold text-center glow-text font-handwriting"
                >
                    Infinity tak jayega! 🚀♾️
                </motion.div>
            )}
        </section>
    );
}
