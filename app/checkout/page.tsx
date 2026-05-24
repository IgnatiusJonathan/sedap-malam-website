"use client";
import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import KartBelanja, { ItemKeranjang } from '@/components/KartBelanja';
import FormPembayaran from '@/components/FormPembayaran';
import Content from '@/components/content';
import { Product } from '@prisma/client';
import Header from '@/components/Header';

export default function CheckoutPage() {
  const [barangs, setBarangs] = useState<Product[]>([]);
  const [filteredBarangs, setFilteredBarangs] = useState<Product[]>([]);
  const [keranjang, setKeranjang] = useState<ItemKeranjang[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/product?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setBarangs(data);
          setFilteredBarangs(data);
        } else {
          console.error("Data yang diambil bukan array:", data);
        }
      } else {
        console.error("Gagal mengambil produk");
      }
    }
    fetchProducts();
  }, []);

  const tambahKeKeranjang = (barang: Product) => {
    const existingItem = keranjang.find(item => item.id === barang.id);

    if (existingItem) {
      if (existingItem.jumlah + 1 > barang.stok) {
        alert(`Stok tidak mencukupi! Stok tersisa: ${barang.stok}`);
        return;
      }
      setKeranjang(prev =>
        prev.map(item =>
          item.id === barang.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        )
      );
    } else {
      if (1 > barang.stok) {
        alert(`Stok tidak mencukupi! Stok tersisa: ${barang.stok}`);
        return;
      }
      setKeranjang(prev => [...prev, { ...barang, jumlah: 1 }]);
    }
  };

  const totalHarga = keranjang.reduce((total, item) => total + (item.harga * item.jumlah), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Navbar />

      <Content>
        <div className="checkout-container flex flex-col lg:flex-row gap-5 h-full p-2.5 relative overflow-visible flex-1">
          <div className="kiri flex-3 bg-white rounded-lg p-5 shadow-md flex flex-col relative overflow-visible w-full lg:w-2/3">
            <SearchBar
              data={barangs}
              onSearch={setFilteredBarangs}
              keySearch="nama"
              placeholder="Cari produk di sini..."
            />

            <div className="daftar-item grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 overflow-y-auto flex-1 p-2.5 relative">
              {filteredBarangs.map(barang => (
                <Card
                  key={barang.id}
                  barang={barang}
                  onClick={tambahKeKeranjang}
                  showQty={false}
                />
              ))}
            </div>
          </div>

          <div className="kanan flex-1 flex flex-col gap-5 w-full lg:w-1/3">
            <KartBelanja
              keranjang={keranjang}
              setKeranjang={setKeranjang}
            />

            <FormPembayaran
              keranjang={keranjang}
              totalHarga={totalHarga}
            />
          </div>
        </div>
      </Content>
    </div>
  );
}
