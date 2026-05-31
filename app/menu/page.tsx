"use client"

import { useState } from "react"
import "./menu.css"
import { useRouter } from "next/navigation"

const makanan = [
  {
    nama: "Indomie Goreng",
    harga: "Rp 15.000",
    poin: "15 Poin",
    image: "/images/indomie_goreng.jpg"
  },
  {
    nama: "Indomie Kuah",
    harga: "Rp 14.000",
    poin: "14 Poin",
    image: "/images/indomie_kuah.jpg"
  }
]

const minuman = [
  {
    nama: "Es Teh",
    harga: "Rp 8.000",
    poin: "8 Poin",
    image: "/images/es_teh.jpg"
  },
  {
    nama: "Teh Botol Sosro",
    harga: "Rp 10.000",
    poin: "10 Poin",
    image: "/images/teh_botol_sosro.jpg"
  },
  {
    nama: "S-Tee",
    harga: "Rp 9.000",
    poin: "9 Poin",
    image: "/images/s-tee.jpg"
  }
]

export default function MenuPage() {

  const [cart, setCart] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const groupedItems: any[] = [];
    cart.forEach(item => {
      const ada = groupedItems.find(i => i.nama === item.nama);
      if (ada) {
        ada.quantity += 1;
      }
      else {
        const numberHarga = parseInt(item.harga.replace(/[^0-9]/g, ''), 10);
        groupedItems.push({
          id: item.nama,
          nama: item.nama,
          harga: numberHarga,
          quantity: 1,
          image: item.image,
        });
      }
    });

    localStorage.setItem('cartData', JSON.stringify(groupedItems));
    router.push('/checkout');
  }

  const addToCart = (item: any) => {
    setCart(prev => [...prev, item])
  }

  const removeFromCart = (indexToRemove: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== indexToRemove))
  }

  const renderSection = (title: string, data: any[]) => (
    <section className="menu-section">

      <div className="category-tab">
        {title}
      </div>

      <div className="menu-box">

        {data.map((item, index) => (

          <div
            className="menu-row"
            key={index}
          >

            <img
              src={item.image}
              alt={item.nama}
              className="menu-image"
            />

            <div className="menu-name">
              {item.nama}
            </div>

            <div className="menu-price">
              <span>Harga</span>

              <strong>
                {item.harga}
              </strong>
            </div>

            <div className="menu-point">

              <span>Poin Didapat</span>

              <div className="point-badge">
                ⭐ {item.poin}
              </div>

            </div>

            <button
              type="button"
              className="plus-btn"
              onClick={() => addToCart(item)}
              aria-label={`Tambah ${item.nama} ke keranjang`}
            >
              <img
                src="/images/plus.png"
                alt="add"
              />
            </button>

          </div>

        ))}

      </div>

    </section>
  )

  return (

    <main className="menu-page">

      <header className="menu-header">

        <h1>MENU</h1>

        <button
          type="button"
          className="cart-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label="Buka keranjang"
        >

          <img
            src="/images/cart.png"
            alt="cart"
          />

          <div className="cart-count">
            {cart.length}
          </div>

        </button>

      </header>

      {renderSection("Makanan", makanan)}

      {renderSection("Minuman", minuman)}

      {isCartOpen && (

        <>

          <div
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="cart-sidebar">

            <div className="cart-sidebar-header">

              <h2>Keranjang</h2>

              <button
                type="button"
                className="cart-close"
                onClick={() => setIsCartOpen(false)}
                aria-label="Tutup keranjang"
              >
                ×
              </button>

            </div>

            <div className="cart-list">

              {cart.length === 0 ? (

                <p>Belum ada pesanan.</p>

              ) : (

                cart.map((item, index) => (

                  <div
                    key={`${item.nama}-${index}`}
                    className="cart-product"
                  >

                    <div>
                      <span className="cart-product-name">
                        {item.nama}
                      </span>

                      <span className="cart-product-price">
                        {item.harga}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(index)}
                      aria-label={`Hapus ${item.nama} dari keranjang`}
                    >
                      <img
                        src="/images/minus.png"
                        alt="hapus"
                      />
                    </button>

                  </div>

                ))

              )}

            </div>

            <div className="cart-sidebar-footer">

              <div className="cart-total">
                Jumlah Item : {cart.length}
              </div>

              <button type="button" className="checkout-btn" aria-label="Checkout pesanan" onClick={handleCheckout}>
                Checkout
              </button>

            </div>

          </div>

        </>

      )}

    </main>

  )
}
