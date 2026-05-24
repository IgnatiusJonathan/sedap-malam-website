"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PrintPage() {
  const router = useRouter();
  const [transaksi, setTransaksi] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('transaksiTerakhir');
    if (data) {
      setTransaksi(JSON.parse(data));
    }
  }, []);

  if (!transaksi) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #d31616, #7C0922)"
        }}
      >
        <div className="text-center p-8 rounded-lg shadow-lg border-l-4"
          style={{
            background: "linear-gradient(to bottom right, #d31616, #7C0922)",
            borderLeftColor: "#FFBA01",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
          }}
        >
          <p className="text-gray-200 mb-4">Memuat data transaksi...</p>
          <button
            onClick={() => router.push('/checkout')}
            className="text-blue-300 hover:text-blue-100 hover:underline transition-colors"
          >
            Kembali ke Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 flex flex-col items-center print:bg-white print:p-0"
      style={{
        background: "linear-gradient(to bottom right, #d31616, #7C0922)"
      }}
    >
      <div className="rounded-lg shadow-lg w-full max-w-md print:shadow-none print:w-full print:max-w-none print:p-0 print:rounded-none"
        style={{
          background: "white",
          borderLeft: "4px solid #FFBA01"
        }}
      >
        <div
          className="text-center mb-6 border-b-2 pb-4"
          style={{
            borderBottomColor: "#7C0922"
          }}
        >
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#d31616" }}>
            TARUMART
          </h1>
          <p className="text-sm" style={{ color: "#7C0922" }}>
            Jl. TaruMart No. 5, Kota Jakarta
          </p>
          <p className="text-sm" style={{ color: "#7C0922" }}>
            Telp: 0821-5352-4014
          </p>
        </div>
        <div
          className="p-6"
          style={{
            background: "linear-gradient(to bottom right, #d31616, #7C0922)"
          }}
        >
          <div className="mb-4 text-sm text-gray-200">
            <div className="flex justify-between mb-2">
              <span>No. Transaksi:</span>
              <span className="font-mono font-bold text-white">{transaksi.nomor}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tanggal:</span>
              <span className="text-white">{transaksi.tanggal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Kasir:</span>
              <span className="text-white">{transaksi.namaKasir}</span>
            </div>
            <div className="flex justify-between">
              <span>Pembeli:</span>
              <span className="text-white">{transaksi.namaPembeli}</span>
            </div>
          </div>
          <div
            className="py-4 mb-4 border-t-2"
            style={{ borderTopColor: "#FFBA01" }}
          >
            <h3
              className="text-lg mb-4 pb-2 font-bold border-b-2"
              style={{
                color: "#FFBA01",
                borderBottomColor: "#7C0922"
              }}
            >
              Daftar Belanja
            </h3>
            <table className="w-full text-sm text-gray-200">
              <thead>
                <tr>
                  <th className="pb-2 text-left font-semibold" style={{ color: "#FFBA01" }}>Item</th>
                  <th className="pb-2 text-right font-semibold" style={{ color: "#FFBA01" }}>Jml</th>
                  <th className="pb-2 text-right font-semibold" style={{ color: "#FFBA01" }}>Harga</th>
                  <th className="pb-2 text-right font-semibold" style={{ color: "#FFBA01" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.items.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b last:border-0"
                    style={{ borderBottomColor: "rgba(255, 186, 1, 0.3)" }}
                  >
                    <td className="py-2 align-top text-white">{item.nama}</td>
                    <td className="py-2 text-right align-top text-white">{item.jumlah}</td>
                    <td className="py-2 text-right align-top text-white">
                      Rp {item.hargaSatuan.toLocaleString()}
                    </td>
                    <td className="py-2 text-right font-medium align-top text-white">
                      Rp {(item.hargaTotalBarang || item.hargaSatuan * item.jumlah).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="pt-4 mb-6 border-t-2"
            style={{ borderTopColor: "#FFBA01" }}
          >
            <div className="flex justify-between text-lg font-bold mb-3">
              <span style={{ color: "#FFBA01" }}>Total</span>
              <span className="text-white">Rp {transaksi.totalHarga.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-200">Pembayaran ({transaksi.metodePembayaran})</span>
              <span className="text-white">Rp {transaksi.nominalTunai.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-200">Kembalian</span>
              <span className="text-white">Rp {transaksi.kembalian.toLocaleString()}</span>
            </div>
          </div>
          <div
            className="text-center text-sm p-3 rounded border-l-4"
            style={{
              color: "#FFBA01",
              background: "rgba(124, 9, 34, 0.3)",
              borderLeftColor: "#d50f0f"
            }}
          >
            <p className="mb-1 font-bold">Terima kasih atas kunjungan Anda!</p>
            <p className="text-xs opacity-90">
              Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.
            </p>
          </div>
        </div>
        <div className="mt-8 flex gap-4 p-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 px-4 rounded font-bold shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "#d50f0f",
              color: "#FFBA01"
            }}
          >
            Cetak Struk
          </button>
          <button
            onClick={() => router.push('/checkout')}
            className="flex-1 py-3 px-4 rounded font-bold shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "#7C0922",
              color: "#FFBA01"
            }}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
