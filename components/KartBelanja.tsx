import React from 'react';
import { Product } from '@prisma/client';

export interface ItemKeranjang extends Product {
    jumlah: number;
}

interface KartBelanjaProps {
    keranjang: ItemKeranjang[];
    setKeranjang: React.Dispatch<React.SetStateAction<ItemKeranjang[]>>;
}

export default function KartBelanja({
    keranjang,
    setKeranjang
}: KartBelanjaProps) {
    const updateJumlahItem = (id: number, newJumlah: number) => {
        if (newJumlah <= 0) {
            hapusDariKeranjang(id);
            return;
        }

        const item = keranjang.find(item => item.id === id);
        if (item && newJumlah > item.stok) {
            alert(`Stok tidak mencukupi! Stok tersisa: ${item.stok}`);
            return;
        }

        setKeranjang(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, jumlah: newJumlah }
                    : item
            )
        );
    };

    const hapusDariKeranjang = (id: number) => {
        setKeranjang(prev => prev.filter(item => item.id !== id));
    };

    const totalHarga = keranjang.reduce((total, item) => total + (item.harga * item.jumlah), 0);
    const totalItem = keranjang.reduce((total, item) => total + item.jumlah, 0);

    return (
        <div className="tampilan-stroke rounded-lg p-5 shadow-md border border-gray-300 flex-1 flex flex-col"
            style={{
                background: "linear-gradient(to bottom right, #b91010, #840505)"
            }}>
            <h3 className="texte text-lg mb-4 border-b-2 border-[#800000] pb-2 font-bold"
                style={{
                    color: "#FFBA01"
                }}>
                Keranjang Belanja
            </h3>

            <div className="daftar-pembelian flex-1 overflow-y-auto pr-2.5 max-h-[400px]">
                {keranjang.length === 0 ? (
                    <p className="text-center text-gray-200 py-4">Silahkan klik item pada tampilan sebelah kiri.</p>
                ) : (
                    keranjang.map(item => (
                        <div key={item.id} className="item-pembelian flex justify-between items-center p-3 border-b bg-white rounded mb-2 border-l-4"
                            style={{ borderLeftColor: "#FFBA01" }}>
                            <div className="info-item flex-1">
                                <p className="font-bold text-gray-800 text-sm mb-1">{item.nama}</p>
                                <p className="text-[#800000] font-medium text-xs"
                                    style={{
                                        color: "black"
                                    }}>
                                    Rp {item.harga.toLocaleString()} x {item.jumlah}
                                </p>
                                <p className="font-bold text-gray-800 text-sm">
                                    = Rp {(item.harga * item.jumlah).toLocaleString()}
                                </p>
                            </div>
                            <div className="kontrol-jumlah flex items-center gap-2">
                                <button
                                    onClick={() => updateJumlahItem(item.id, item.jumlah - 1)}
                                    className="w-7 h-7 border-none bg-[#800000] text-white rounded-full cursor-pointer font-bold text-xs transition-colors duration-300 hover:bg-red-700"
                                >
                                    -
                                </button>
                                <span className="font-bold text-gray-800 text-sm min-w-6 text-center">{item.jumlah}</span>
                                <button
                                    onClick={() => updateJumlahItem(item.id, item.jumlah + 1)}
                                    className="w-7 h-7 border-none bg-[#014718] text-white rounded-full cursor-pointer font-bold text-xs transition-colors duration-300 hover:bg-green-700"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => hapusDariKeranjang(item.id)}
                                    className="w-7 h-7 border-none bg-red-600 text-white rounded-full cursor-pointer text-xs transition-colors duration-300 hover:bg-red-700"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="total-info mt-auto p-4 bg-gray-50 rounded-lg border-l-4"
                style={{ borderLeftColor: "#FFBA01" }}>
                <p className="my-2 font-bold text-gray-800 text-sm">
                    Total Item: <span className="text-[#800000]">{totalItem}</span>
                </p>
                <p className="my-2 font-bold text-gray-800 text-sm">
                    Total Harga: <span className="text-[#800000]">Rp {totalHarga.toLocaleString()}</span>
                </p>
            </div>
        </div>
    );
}
