'use client';
import { motion } from 'framer-motion';

export default function PromiseSection() {
    return (
        <section className="py-20 relative bg-white overflow-hidden text-center">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-pink-100 to-transparent"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-serif text-rose-800 font-bold mb-8 leading-tight drop-shadow-sm"
                >
                    My Promise to You ✨
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 bg-rose-50 rounded-lg shadow-inner mx-4 inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-500"
                >
                    <p className="text-3xl md:text-5xl font-handwriting text-rose-600 leading-relaxed italic font-bold">
                        &quot;Har Kiss Day hi nahi,<br />
                        har din tera hi din hoga… <br />
                        Aur main hamesha tere saath rahunga! ❤️&quot;
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 text-sm text-gray-500 uppercase tracking-widest font-semibold"
                >
                    Forever & Always
                </motion.div>
            </div>
        </section>
    );
}
