'use client';

import React, { useState, useEffect } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import { getWorkers, createWorker, deleteWorker, getHistory, getProducts, getLastUpdate } from './actions';

interface Worker {
  id: number;
  nama: string;
  email: string;
}

export default function WorkerManagementPage() {
  const [mounted, setMounted] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [lastUpdateDate, setLastUpdateDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const [workersData, historyData, productsData, lastUpdate] = await Promise.all([
          getWorkers(),
          getHistory(),
          getProducts(),
          getLastUpdate()
        ]);
        
        setWorkers(workersData);
        setHistory(historyData);
        setProducts(productsData);
        setLastUpdateDate(lastUpdate);
      } catch (error) {
        console.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createWorker({
        nama: formData.name,
        email: formData.email,
        password: formData.password
      });

      const updatedList = await getWorkers();
      setWorkers(updatedList);

      setFormData({ name: '', email: '', password: '' });
      alert('Akun berhasil dibuat!');
    } catch (error) {
      alert('Error: Failed to create worker.');
    }
  };

  const removeWorker = async (id: number) => {
    if (confirm(`Apakah Anda yakin ingin menghapus karyawan dengan ID ${id}?`)) {
      try {
        await deleteWorker(id);
        setWorkers(workers.filter(w => w.id !== id));
      } catch (error) {
        alert("Failed to delete worker");
      }
    }
  };

  const filteredWorkers = workers.filter(w =>
    w.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.id.toString().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date | null) => {
    if (!date) return "No Data";
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--";
    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      <Header />

      <Navbar />

      <main className="content pt-20 p-6 ml-[200px] transition-all duration-300">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Team Overview</h2>
            <p className="text-gray-500 mt-1">Manage staff and create accounts.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Jumlah Karyawan" value={workers.length} sub="Active Staff" />
          <StatCard label="Barang Terjual" value={history.length} sub="Total Items" />
          <StatCard label="Total Produk" value={products.length} sub="In Stock" />
          <StatCard 
            label="Last Update" 
            value={formatDate(lastUpdateDate)} 
            sub={formatTime(lastUpdateDate)} 
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center gap-4">
              <h3 className="text-xl font-semibold whitespace-nowrap text-gray-900">Staff Roster</h3>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Nama atau ID..."
                className="px-4 py-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-[var(--maroon)]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredWorkers.map((worker, index) => (
                <div key={index} className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">

                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{worker.nama}</h4>
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">ID: {worker.id}</span>
                      <p className="text-sm text-gray-500 mt-1">{worker.email}</p>
                    </div>
                    <button onClick={() => removeWorker(worker.id)} className="text-xs text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition-colors">REMOVE</button>
                  </div>

                </div>
              ))}
              {filteredWorkers.length === 0 && <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">No workers found.</div>}
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-[var(--maroon)]">Create Account</h3>

              <form onSubmit={handleAddWorker} className="space-y-4">

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Password</label>
                  <input required type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]" />
                </div>

                <button type="submit" className="w-full bg-[var(--maroon)] text-white font-bold py-3 rounded-lg hover:bg-[var(--hover)] transition-opacity mt-4 shadow-md">Submit</button>
              </form>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string, value: string | number, sub: string }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-2">{sub}</p>
    </div>
  );
}