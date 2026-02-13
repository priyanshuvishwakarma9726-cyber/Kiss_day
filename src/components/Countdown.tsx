'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Next Kiss Countdown - e.g., until the actual date or a random cinematic timer
export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        // Just a placeholder goal: 12 AM on the next day, or any arbitrary goal
        // Let's set it to some "next kiss" moment, say 2 hours from now for excitement
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 2); // 2 hours from now

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                setTimeLeft({ days, hours, minutes });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center">
            <h3 className="text-3xl md:text-5xl font-handwriting text-rose-800 mb-8 tracking-wide drop-shadow-sm text-center px-4">
                Next Kiss in... 💋
            </h3>

            <div className="flex gap-4 md:gap-8 font-mono text-pink-600">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <span className="text-4xl md:text-6xl self-center animate-pulse">:</span>
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <span className="text-4xl md:text-6xl self-center animate-pulse">:</span>
                <CountdownUnit value={timeLeft.minutes} label="Mins" />
            </div>
        </section>
    );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <motion.div
                key={value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="text-4xl md:text-6xl font-black bg-white/50 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg border border-pink-200 min-w-[80px] md:min-w-[120px] text-center"
            >
                {String(value).padStart(2, '0')}
            </motion.div>
            <span className="text-lg md:text-xl mt-2 font-bold tracking-widest text-pink-500 uppercase">{label}</span>
        </div>
    );
}
