import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ItemKeranjang } from './KartBelanja';

interface FormPembayaranProps {
    keranjang: ItemKeranjang[];
    totalHarga: number;
}

export default function FormPembayaran({
    keranjang,
    totalHarga
}: FormPembayaranProps) {
    const router = useRouter();
    const [namaPembeli, setNamaPembeli] = useState('');
    const [metodePembayaran, setMetodePembayaran] = useState('tunai');
    const [nominalTunai, setNominalTunai] = useState('');
    const [namaKasir, setNamaKasir] = useState('Kasir');

    useEffect(() => {
        const storedNama = localStorage.getItem('nama');
        if (storedNama) {
            setNamaKasir(storedNama);
        }
    }, []);

    const kembalian = metodePembayaran === 'tunai' ? Math.max(0, (parseFloat(nominalTunai) || 0) - totalHarga) : 0;
    const isKeranjangKosong = keranjang.length === 0;

    const handleCheckout = async () => {
        if (keranjang.length === 0) {
            alert('Keranjang belanja kosong!');
            return;
        }

        if (metodePembayaran === 'tunai' && (parseFloat(nominalTunai) || 0) < totalHarga) {
            alert('Nominal tunai tidak mencukupi!');
            return;
        }

        const now = new Date();
        const nomor = `TRX-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

        const transaksi = {
            nomor,
            items: keranjang.map(item => ({
                id: item.id,
                nama: item.nama,
                jumlah: item.jumlah,
                hargaSatuan: item.harga,
                hargaTotalBarang: item.harga * item.jumlah
            })),
            totalHarga,
            nominalTunai: parseFloat(nominalTunai) || 0,
            kembalian,
            metodePembayaran,
            namaPembeli: namaPembeli || 'Umum',
            namaKasir,
            tanggal: now.toLocaleString()
        };

        localStorage.setItem('transaksiTerakhir', JSON.stringify(transaksi));

        await fetch('/api/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: keranjang,
                namaKasir,
                namaPembeli: namaPembeli || 'Umum',
            }),
        });


        router.push('/print');
    };

    return (
        <div className="checkouty bg-gray-200 rounded-lg p-5 shadow-md border-l-4"
            style={{
                borderLeftColor: "#FFBA01",
                background: "linear-gradient(to bottom right, #d31616, #7C0922)"
            }}>
            <h3 className="texte text-maroon text-lg mb-4 border-b-2 pb-2 font-bold"
                style={{
                    color: "#FFBA01"
                }}>
                Informasi Pembayaran
            </h3>

            <div className="input-pembeli mb-4">
                <label className="block mb-2 font-bold text-gray-200 text-sm">
                    Nama Pembeli
                </label>
                <input
                    type="text"
                    value={namaPembeli}
                    onChange={(e) => setNamaPembeli(e.target.value)}
                    placeholder="Masukkan nama pembeli..."
                    className="w-full p-2.5 border border-gray-300 text-gray-800 rounded text-sm focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-opacity-30 bg-white"
                />
            </div>

            <div className="metode-pembayaran mb-4">
                <label className="block mb-2 font-bold text-gray-800 text-sm"
                    style={{
                        color: "#FFBA01"
                    }}>
                    Metode Pembayaran
                </label>
                <select
                    value={metodePembayaran}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 text-gray-800 rounded text-sm focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-opacity-30 bg-white"
                >
                    <option value="tunai">Tunai</option>
                    <option value="nontunai">Non-Tunai</option>
                </select>
            </div>

            <div className="input-tunai mb-4">
                <label className="block mb-2 font-bold text-gray-800 text-sm"
                    style={{
                        color: "#FFBA01"
                    }}>
                    Nominal {metodePembayaran === 'tunai' ? 'Tunai' : 'Pembayaran'}
                </label>
                <input
                    type="number"
                    value={nominalTunai}
                    onChange={(e) => setNominalTunai(e.target.value)}
                    placeholder="Masukkan nominal"
                    disabled={metodePembayaran === 'nontunai'}
                    className={`w-full p-2.5 border border-gray-300 text-gray-800 rounded text-sm 
                                focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-opacity-30 
                                ${metodePembayaran === 'nontunai' ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                />
            </div>

            {metodePembayaran === 'tunai' && nominalTunai && (
                <div className="kembalian mb-4 p-3 bg-green-50 rounded border-l-4 border-l-green-500">
                    <p className="font-bold text-gray-800 text-sm">
                        Kembalian: <span className="text-green-700">Rp {kembalian.toLocaleString()}</span>
                    </p>
                </div>
            )}

            <button
                onClick={handleCheckout}
                disabled={isKeranjangKosong || (metodePembayaran === 'tunai' && (parseFloat(nominalTunai) || 0) < totalHarga)}
                className="tombol-input w-full p-3 text-center rounded font-bold text-base mt-4 
                            cursor-pointer transition-all duration-300 hover:-translate-y-0.5 
                            hover:shadow-md disabled:cursor-not-allowed disabled:transform-none"
                style={{
                    background: "#d50f0fff",
                    color: "#FFBA01"
                }}
            >
                Proses Checkout
            </button>
        </div>
    );
}
