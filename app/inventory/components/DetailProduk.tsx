import React from "react";
import { Product } from "@prisma/client";

interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
                <h2 className="font-bold text-lg mb-3">Detail Produk</h2>

                <p className="text-sm">
                    <strong>Nama:</strong> {product.nama}
                </p>

                <p className="text-sm">
                    <strong>Harga:</strong> Rp {product.harga.toLocaleString()}
                </p>

                <p className="text-sm">
                    <strong>Stok:</strong>{" "}
                    <span
                        className={
                            product.stok < 5
                                ? "text-red-500 font-bold"
                                : "font-bold"
                        }
                    >
                        {product.stok}
                    </span>
                </p>

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-[#800000] text-white py-2 rounded hover:bg-[#700000]"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}
