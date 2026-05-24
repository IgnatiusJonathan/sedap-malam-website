import React from 'react';
import Image from 'next/image';
import { Product } from '@prisma/client';

interface DetailKartu {
    barang: Product;
    onClick?: (barang: Product) => void;
    className?: string;
    showQty?: boolean;
    isActive?: boolean;
}

export default function Kartu({
    barang,
    onClick,
    className = '',
    showQty = false,
    isActive = false
}: DetailKartu) {
    const handleClick = () => {
        if (onClick) {
            onClick(barang);
        }
    };

    const itemLabelShape = {
        clipPath: 'polygon(0% 100%, 100% 100%, 85% 0%, 0% 0%)',
    };

    return (
        <div
            className={`card-container bg-white border border-[#800000] rounded shadow-sm overflow-hidden group 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col
                        cursor-pointer active:scale-95 h-50 w-full
                        
                        ${className}`}
            onClick={handleClick}
        >
            <div className="w-full flex-1 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                {barang.image ? (
                    <div className="relative w-full h-full p-2">
                        <Image
                            src={barang.image}
                            alt={barang.nama}
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <span className="text-gray-500 text-xs font-medium">Tidak ada gambar</span>
                )}
            </div>

            <div
                className="p-3 relative min-h-[60px] flex-shrink-0"
                style={{
                    background: "linear-gradient(to bottom right, #b91010, #840505)"
                }}
            >
                <div
                    className="absolute top-0 left-0 text-white text-[10px] px-4 py-1 font-bold tracking-wider shadow-sm"
                    style={{
                        ...itemLabelShape,
                        transform: 'translateY(-100%)',
                        background: "linear-gradient(to bottom right, #b91010, #840505)"
                    }}
                >
                    {barang.id ? `ID: ${barang.id}` : 'ITEM'}
                </div>
                <div className="mt-1">
                    <p className="text-white text-xs font-bold truncate">{barang.nama}</p>
                    <p className="text-gray-200 text-[10px]">Rp {barang.harga.toLocaleString()}</p>
                </div>

                {showQty && barang.stok !== undefined && (
                    <div className="mt-1 pt-1 border-t border-white/20">
                        <p className="text-white/80 text-[10px]">Stok: {barang.stok}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
