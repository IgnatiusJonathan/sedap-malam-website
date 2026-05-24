import React from "react";
import { Product } from "@prisma/client";

interface InventoryCardProps {
    item: Product;
    onSelectProduct: (product: Product) => void;
}

export default function InventoryCard({ item, onSelectProduct }: InventoryCardProps) {
    return (
        <div className="bg-white border border-[#800000] rounded shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <div className="w-full h-32 flex items-center justify-center bg-gray-50 relative">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.nama}
                        className="object-contain w-full h-full"
                    />
                ) : (
                    <span className="text-gray-300 text-xs font-medium">
                        No Image
                    </span>
                )}
            </div>


            <div className="bg-[#800000] p-3 relative min-h-[60px]">

                <div
                    className="absolute top-0 left-0 bg-[#800000] text-white text-[10px] px-3 py-1 font-bold tracking-wider shadow-sm truncate w-[60%] text-left"
                    style={{
                        clipPath: "polygon(0% 100%, 100% 100%, 85% 0%, 0% 0%)",
                        transform: "translateY(-95%)",
                    }}
                >
                    {item.nama.toUpperCase()}
                </div>


                <div className="mt-2 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-300 font-medium">Harga</span>
                        <span className="text-white text-sm font-bold">
                            Rp {item.harga.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-300 font-medium">Stok</span>
                        <span
                            className={`text-sm font-bold ${item.stok < 5 ? "text-red-500" : "text-white"
                                }`}
                        >
                            {item.stok}
                        </span>
                    </div>
                </div>


                <button
                    onClick={() => onSelectProduct(item)}
                    className="mt-2 text-xs bg-white text-[#800000] w-full py-1 rounded font-bold
                     transition-all duration-300 transform
                     hover:bg-[#800000] hover:text-white hover:scale-[1.03] active:scale-[0.97]"
                >
                    Detail
                </button>
            </div>
        </div>
    );
}
