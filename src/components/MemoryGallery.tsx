'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Memory = {
    id: number;
    image_url: string;
    caption: string;
};

export default function MemoryGallery() {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newImage, setNewImage] = useState<string>('');
    const [newCaption, setNewCaption] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/memories')
            .then(res => res.json())
            .then(data => setMemories(data))
            .catch(err => console.error(err));
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                alert("File too large! Max 5MB please.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImage || !newCaption) return;

        setLoading(true);
        try {
            const res = await fetch('/api/memories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_url: newImage, caption: newCaption }),
            });
            if (res.ok) {
                const memory = await res.json();
                setMemories([memory, ...memories]);
                setShowForm(false);
                setNewImage('');
                setNewCaption('');
            } else {
                alert('Failed to save memory.');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving memory.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 px-4 bg-pink-50">
            <h2 className="text-5xl md:text-6xl font-bold text-center text-rose-600 mb-12 drop-shadow-sm font-handwriting">
                Humari Kuch Yaadein 📸
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {memories.map((memory) => (
                    <motion.div
                        key={memory.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden relative group border-2 border-pink-100"
                    >
                        <div className="relative h-64 w-full">
                            <Image
                                src={memory.image_url}
                                alt={memory.caption}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white font-bold text-center italic text-xl md:text-2xl">{memory.caption}</p>
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex items-center justify-center h-64 bg-pink-100/50 rounded-xl border-2 border-dashed border-pink-300 cursor-pointer hover:bg-pink-100 transition-colors"
                    onClick={() => setShowForm(true)}
                >
                    <div className="text-center text-pink-500">
                        <span className="text-5xl">+</span>
                        <p className="text-xl md:text-2xl font-bold mt-2">Ek nayi yaad jodo</p>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
                        >
                            <h3 className="text-3xl font-bold text-rose-500 mb-6">Add a Memory</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">Photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full text-lg text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-lg file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">Caption (kuch romantic likho)</label>
                                    <input
                                        type="text"
                                        value={newCaption}
                                        onChange={(e) => setNewCaption(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-lg p-3 border"
                                        placeholder="Woh pehli mulakat..."
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-6 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || !newImage || !newCaption}
                                        className="px-6 py-3 text-lg font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-md disabled:bg-rose-300"
                                    >
                                        {loading ? 'Saving...' : 'Save Memory ❤️'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
