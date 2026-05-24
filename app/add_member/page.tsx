"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
    name: string;
    email: string;
    noTelp: string;
}

export default function AddMembershipPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        noTelp: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    noTelp: formData.noTelp
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || 'Failed to add member');
            }

            router.push('/membership');
        } catch (error) {
            console.error('Error adding member:', error);
            alert(`Gagal menambahkan member: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`);
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="flex bg-white">

                <div className="fixed top-0 left-0 h-full z-30">
                    <Navbar />
                </div>

                <div className="flex-1 ml-[220px] min-h-screen bg-white transition-all duration-300">


                    <div className="pt-[80px] px-8 pb-4 bg-white sticky top-0 z-20">

                        <h1 className="text-2xl font-bold text-[#800000]">
                            Tambah Member Baru 👤
                        </h1>
                        <p className="text-sm text-gray-500">
                            Masukkan detail member baru ke dalam sistem.
                        </p>
                    </div>

                    <div className="px-6 mb-10">

                        <div className="bg-[#800000] rounded-t-lg px-6 flex items-center h-[50px] shadow-sm">
                            <span className="text-white font-bold text-sm tracking-wide">
                                FORMULIR MEMBER
                            </span>

                            <Link href="/membership" className="ml-auto text-white text-xs px-3 py-1 bg-red-800/80 rounded hover:bg-red-700 transition">
                                Kembali ke Membership
                            </Link>
                        </div>


                        <div className="border border-t-0 border-[#800000] rounded-b-lg p-8 bg-white relative z-0 shadow-lg">

                            <form onSubmit={handleSubmit} className="space-y-6">


                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Member
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000]"
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                </div>


                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000]"
                                        placeholder="Contoh: budi@example.com"
                                    />
                                </div>


                                <div>
                                    <label htmlFor="noTelp" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        type="tel"
                                        id="noTelp"
                                        value={formData.noTelp}
                                        onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000]"
                                        placeholder="Contoh: 081234567890"
                                    />
                                </div>



                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="button_add_item bg-[#800000] text-white py-3 px-6 rounded-lg text-md font-semibold transition duration-150 hover:bg-red-900 shadow-md w-full sm:w-auto disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Menyimpan...' : 'Simpan Member Baru'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}