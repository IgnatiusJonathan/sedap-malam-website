"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import { useNavbar } from "@/context/NavbarContext";
import { useRouter } from "next/navigation";

interface FormData {
    nama: string;
    jenis: string;
    stok: number;
    harga: number;
    image: string;
}

export default function AddItemPage() {
    const { isCollapsed } = useNavbar();
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        nama: '',
        jenis: 'makanan',
        stok: 0,
        harga: 0,
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const categories = [
        "Makanan",
        "Minuman",
        "Snack",
        "Susu",
        "Bahan Pembersih",
        "Fresh Food",
        "Rumah Tangga ",
        "Pangan",
        "Lainnya"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        if (formData.stok <= 0) {
            setErrorMessage("Stok tidak boleh kurang dari 1.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Gagal menambahkan produk");

            setSuccessMessage("Item berhasil ditambahkan!");
            setFormData({
                nama: '',
                jenis: 'makanan',
                stok: 0,
                harga: 0,
                image: '',
            });


            router.push("/inventory");
        } catch (err: any) {
            setErrorMessage(err.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="flex">
                <div className="fixed top-0 left-0 h-full z-30">
                    <Navbar />
                </div>

                <div
                    className="flex-1 min-h-screen bg-white transition-all duration-300"
                    style={{ marginLeft: isCollapsed ? "80px" : "220px" }}
                >
                    <div className="pt-[80px] px-8 pb-4 bg-white sticky top-0 z-20 max-w-6xl">
                        <h1 className="text-2xl font-bold text-[#800000]">
                            Tambah Item Baru
                        </h1>
                        <p className="text-sm text-gray-500">
                            Masukkan detail produk baru ke dalam inventaris.
                        </p>
                    </div>

                    <div className="px-6 mb-10 max-w-6xl">
                        <div className="bg-[#800000] rounded-t-lg px-6 flex items-center h-[50px] shadow-sm">
                            <span className="text-white font-bold text-sm tracking-wide">
                                DETAIL PRODUK
                            </span>


                        </div>

                        <div className="border border-t-0 border-[#800000] rounded-b-lg p-8 bg-white relative z-0 shadow-lg">
                            {successMessage && (
                                <p className="text-green-600 mb-4">{successMessage}</p>
                            )}
                            {errorMessage && (
                                <p className="text-red-600 mb-4">{errorMessage}</p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div>
                                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Barang
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        value={formData.nama}
                                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000] hover:border-[#800000] outline-none transition-colors duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="jenis" className="block text-sm font-medium text-gray-700 mb-1">
                                        Kategori
                                    </label>
                                    <select
                                        id="jenis"
                                        value={formData.jenis}
                                        onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-[#800000] focus:border-[#800000] hover:border-[#800000] outline-none transition-colors duration-200"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="stok" className="block text-sm font-medium text-gray-700 mb-1">
                                            Stok Awal
                                        </label>
                                        <input
                                            type="number"
                                            id="stok"
                                            value={isNaN(formData.stok) ? '' : formData.stok}
                                            onChange={(e) => setFormData({ ...formData, stok: parseInt(e.target.value) })}
                                            required
                                            min="1"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000] hover:border-[#800000] outline-none transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="harga" className="block text-sm font-medium text-gray-700 mb-1">
                                            Harga Jual (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            id="harga"
                                            value={isNaN(formData.harga) ? '' : formData.harga}
                                            onChange={(e) => setFormData({ ...formData, harga: parseInt(e.target.value) })}
                                            required
                                            min="0"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000] hover:border-[#800000] outline-none transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                        URL Gambar (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        id="image"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Contoh: https://example.com/image.jpg"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000] hover:border-[#800000] outline-none transition-colors duration-200"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#800000] text-white py-3 px-6 rounded-lg text-md font-semibold transition duration-150 hover:bg-red-900 shadow-md w-full sm:w-auto"
                                    >
                                        {loading ? "Menyimpan..." : "Simpan Item Baru"}
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
