"use client";
import { useState, useEffect } from "react";
import { Product } from "@prisma/client";
import { useNavbar } from "@/context/NavbarContext";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/SearchBar";

import CategoryTabs from "./components/category";
import InventoryCard from "./components/InventoryCard";
import ProductDetailModal from "./components/DetailProduk";
import CategoryNavigation from "./components/CategoryNavigation";

export default function InventoryPage() {
  const { isCollapsed } = useNavbar();
  const [selectedCategory, setSelectedCategory] = useState("makanan");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    "Makanan",
    "Minuman",
    "Snack",
    "Susu",
    "Bahan Pembersih",
    "Fresh Food",
    "Rumah Tangga ",
    "Pangan",
    "Lainnya"
  ];


  function nextCategory() {
    const index = categories.findIndex(
      (c) => c.toLowerCase() === selectedCategory
    );
    const nextIndex = (index + 1) % categories.length;
    setSelectedCategory(categories[nextIndex].toLowerCase());
  }

  function prevCategory() {
    const index = categories.findIndex(
      (c) => c.toLowerCase() === selectedCategory
    );
    const prevIndex = (index - 1 + categories.length) % categories.length;
    setSelectedCategory(categories[prevIndex].toLowerCase());
  }


  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);


  const filteredProducts = products.filter(
    (item) => (item.jenis || "").toLowerCase() === selectedCategory
  );

  return (
    <>
      <Header />
      <div className="flex">
        <div className="fixed top-0 left-0 h-full z-30">
          <Navbar />
        </div>

        <div
          className="flex-1 h-screen overflow-y-auto bg-white transition-all duration-300"
          style={{ marginLeft: isCollapsed ? "80px" : "220px" }}
        >
          <div className="pt-[80px] px-8 pb-4 bg-white sticky top-0 z-20">
            <SearchBar
              data={products}
              onSearch={() => { }}
              keySearch="nama"
              placeholder="Cari barang..."
            />
          </div>


          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="border border-t-0 border-[#800000] rounded-b-lg p-8 bg-white relative z-0 shadow-sm mx-6 -mt-10">
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500 text-center text-sm py-20">
                Inventori kosong
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredProducts.map((item) => (
                  <InventoryCard
                    key={item.id}
                    item={item}
                    onSelectProduct={setSelectedProduct}
                  />
                ))}
              </div>
            )}

            <CategoryNavigation
              onNext={nextCategory}
              onPrev={prevCategory}
            />
          </div>


          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
