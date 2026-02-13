'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const letterText = [
    "Jab bhi tu paas hoti hai,",
    "lagta hai waqt ruk sa gaya hai…",
    "Bas tu aur main, aur ye pal,",
    "jo kabhi khatam na ho.",
    "Teri har ada pe mujhe pyaar aata hai,",
    "Teri muskaan meri subah hai,",
    "Teri aankhein meri raat ki chandni.",
    "Har lamha tujhse juda hai,",
    "Har saans mein tera hi naam hai.",
    "Happy Kiss Day my love!",
    "Forever yours,",
    "❤️"
];

export default function LoveLetter() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section
            ref={containerRef}
            className="py-20 bg-gradient-to-tr from-rose-50 to-pink-50 min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            <div className="max-w-3xl w-full mx-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-pink-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <h2 className="text-4xl md:text-5xl font-serif text-rose-600 mb-10 text-center italic border-b-2 border-rose-200 pb-4 font-bold">
                    Ek chhota sa letter...
                </h2>

                <div className="space-y-6 font-handwriting text-3xl md:text-5xl text-gray-900 font-bold leading-loose text-center tracking-wide">
                    {letterText.map((line, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="hover:text-rose-500 transition-colors cursor-default drop-shadow-sm"
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <span className="text-4xl animate-pulse">💌</span>
                </div>
            </div>
        </section>
    );
}
