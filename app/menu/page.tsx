"use client"

import { useState } from "react"
import "./menu.css"

const makanan = [
{
nama:"Indomie Goreng",
harga:"Rp 15.000",
poin:"15 Poin",
image:"/images/indomie_goreng.jpg"
},
{
nama:"Indomie Kuah",
harga:"Rp 14.000",
poin:"14 Poin",
image:"/images/indomie_kuah.jpg"
}
]

const minuman = [
{
nama:"Es Teh",
harga:"Rp 8.000",
poin:"8 Poin",
image:"/images/es_teh.jpg"
},
{
nama:"Teh Botol Sosro",
harga:"Rp 10.000",
poin:"10 Poin",
image:"/images/teh_botol_sosro.jpg"
},
{
nama:"S-Tee",
harga:"Rp 9.000",
poin:"9 Poin",
image:"/images/s-tee.jpg"
}
]

export default function MenuPage(){

const [cart,setCart]=useState(3)

const renderSection=(title:string,data:any[])=>(
<section className="menu-section">

<div className="category-tab">
{title}
</div>

<div className="menu-box">

{data.map((item,index)=>(

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
className="plus-btn"
onClick={()=>setCart(cart+1)}
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

return(

<main className="menu-page">

<header className="menu-header">

<h1>MENU</h1>

<button className="cart-btn">

<img
src="/images/cart.png"
alt="cart"
/>

<div className="cart-count">

{cart}

</div>

</button>

</header>

{renderSection("Makanan",makanan)}

{renderSection("Minuman",minuman)}

</main>

)

}