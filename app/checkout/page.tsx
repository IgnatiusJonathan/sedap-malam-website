"use client";

import { useState, useEffect } from "react"

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<any[]>([])

    useEffect(() => {
        const savedData = localStorage.getItem('cartData')
        if (savedData) {
            try {
                setCartItems(JSON.parse(savedData))

            }
            catch(e){
                console.error("Error parsing data keranjang", e)
            }
        }
    }, [])

    const updateQuantity = (id: string | number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }))
    }

    const rupiah = (angka: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(angka)
    }

    const totalHarga = cartItems.reduce((total, item) => total + item.harga * item.quantity, 0)

    return (
        <main>
            <header>
                <h1>Checkout Pesanan</h1>
            </header>
            <div>
                <section>
                    <h2>Ringkasan Pesanan</h2>
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id}>
                                <img src={item.image} alt={item.nama} />
                                <div>
                                    <div>{item.nama}</div>
                                    <div>{rupiah(item.harga)}</div>
                                </div>
                                <div>
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <span>Total Harga:</span>
                        <strong>{rupiah(totalHarga)}</strong>
                    </div>
                </section>
            </div>
        </main>
    )
}

