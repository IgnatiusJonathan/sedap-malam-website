import React, { useState, useEffect } from 'react';

interface IsiSearchBar<T> {
    data: T[];
    onSearch: (hasil: T[]) => void;
    keySearch: keyof T;
    placeholder: string;
}

export default function SearchBar<T>({ data, onSearch, keySearch, placeholder = "Cari produk..." }: IsiSearchBar<T>) {
    const [hurufSearch, setHurufSearch] = useState('');

    const hurufSearchSmall = hurufSearch.toLowerCase();
    const terfilter = data.filter(item => {
        const val = item[keySearch];
        return String(val).toLowerCase().includes(hurufSearchSmall);
    });

    useEffect(() => {
        onSearch(terfilter);
    }, [hurufSearch, data, keySearch]);

    const noData = data.length === 0;
    const noResult = !noData && terfilter.length === 0;

    return (
        <>
            <div className="search-bar flex items-center gap-2.5 mb-5 p-2.5 rounded-lg"
                style={{
                    backgroundColor: '#9E172F',
                    borderRadius: '10px',
                    border: '1px solid #9E172F',
                }}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={hurufSearch}
                    onChange={(e) => setHurufSearch(e.target.value)}
                    className="flex-1 p-2.5 rounded text-sm text-black"
                    style={{
                        backgroundColor: 'white',
                    }}
                />
                <button
                    className="bg-maroon text-white cursor-pointer font-bold"
                >
                    Cari
                </button>
            </div>

            {noData && (
                <div className="no-results text-center text-gray-500 italic p-10 col-span-full mb-4">
                    Tidak ada barang yang dijual. Silahkan tambahkan barang di halaman Tambah Item.
                </div>
            )}

            {noResult && (
                <div className="no-results text-center text-gray-500 italic p-10 col-span-full mb-4">
                    Tidak ada barang yang sesuai
                </div>
            )}
        </>
    );
}
