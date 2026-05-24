"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Content from '@/components/content';

interface HistoryItem {
    id: number;
    product: string;
    jumlah: number;
    harga: number;
    tanggal: string;
    pembeli: string;
    kasier: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch('/api/history');
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                } else {
                    const errorData = await res.json();
                    console.error('Failed to fetch history:', errorData);
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <Navbar />

            <Content>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2" style={{ borderColor: "#FFBA01" }}>
                        Riwayat Transaksi
                    </h2>

                    {loading ? (
                        <p className="text-center text-gray-500 py-8">Memuat data...</p>
                    ) : history.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Belum ada riwayat transaksi.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                                        <th className="p-3 font-semibold">No</th>
                                        <th className="p-3 font-semibold">Tanggal</th>
                                        <th className="p-3 font-semibold">Produk</th>
                                        <th className="p-3 font-semibold text-center">Jumlah</th>
                                        <th className="p-3 font-semibold text-right">Total Harga</th>
                                        <th className="p-3 font-semibold">Pembeli</th>
                                        <th className="p-3 font-semibold">Kasir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, index) => (
                                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-3 text-gray-600">{index + 1}</td>
                                            <td className="p-3 text-gray-600">
                                                {new Date(item.tanggal).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="p-3 font-medium text-gray-800">{item.product}</td>
                                            <td className="p-3 text-center text-gray-600">{item.jumlah}</td>
                                            <td className="p-3 text-right font-medium text-green-600">
                                                Rp {item.harga.toLocaleString('id-ID')}
                                            </td>
                                            <td className="p-3 text-gray-600">{item.pembeli}</td>
                                            <td className="p-3 text-gray-600">{item.kasier}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </Content>
        </div>
    );
}
