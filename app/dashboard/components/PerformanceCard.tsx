'use client'

import { useEffect, useState } from 'react'

export default function PerformanceCard() {
  const [workTime, setWorkTime] = useState('00:00:00')

  useEffect(() => {
    const startTime = new Date()

    const updateWorkTime = () => {
      const now = new Date()
      const elapsed = new Date(now.getTime() - startTime.getTime())
      const hours = String(elapsed.getUTCHours()).padStart(2, "0")
      const minutes = String(elapsed.getUTCMinutes()).padStart(2, "0")
      const seconds = String(elapsed.getUTCSeconds()).padStart(2, "0")
      setWorkTime(`${hours}:${minutes}:${seconds}`)
    }

    updateWorkTime()
    const interval = setInterval(updateWorkTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animasi untuk performance card
    const card = document.querySelector('.performance-card')
    if (card) {
      ;(card as HTMLElement).style.opacity = "0"
      ;(card as HTMLElement).style.transform = "translateY(30px)"
      setTimeout(() => {
        ;(card as HTMLElement).style.transition = "all 0.6s ease"
        ;(card as HTMLElement).style.opacity = "1"
        ;(card as HTMLElement).style.transform = "translateY(0)"
      }, 600)
    }
  }, [])

  return (
    <div className="performance-card">
      <div className="performance-info">
        <p><strong>Nama Karyawan:</strong> Vina</p>
        <p><strong>Total Pelanggan:</strong> 48</p>
        <p><strong>Jumlah Produk Terjual:</strong> 173</p>
        <p><strong>Waktu Kerja Hari Ini:</strong> <span id="workTime">{workTime}</span></p>
        <p><strong>Absensi:</strong> 27/30</p>
        <p><strong>ID Karyawan:</strong> KSR-01</p>
      </div>
      <img src="/img/Lexa.jpg" alt="Foto Karyawan" className="performance-photo" />
    </div>
  )
}