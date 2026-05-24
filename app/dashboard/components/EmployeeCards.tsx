'use client'

import { useEffect } from 'react'

interface Employee {
  rank: 'gold' | 'silver' | 'bronze'
  name: string
  photo: string
  sales: number
  attendance: number
  workHours: number
}

const employees: Employee[] = [
  {
    rank: 'gold',
    name: 'Lisa',
    photo: '/img/employee1.jpg',
    sales: 120,
    attendance: 98,
    workHours: 83.8
  },
  {
    rank: 'silver',
    name: 'Sharon',
    photo: '/img/employee2.jpg',
    sales: 100,
    attendance: 95,
    workHours: 81.4
  },
  {
    rank: 'bronze',
    name: 'Citra',
    photo: '/img/employee3.jpg',
    sales: 90,
    attendance: 90,
    workHours: 79.2
  }
]

export default function EmployeeCards() {
  useEffect(() => {
    // Animasi progress bars
    const bars = document.querySelectorAll(".fill")
    bars.forEach((bar) => {
      const targetWidth = (bar as HTMLElement).style.width || "80%"
        ; (bar as HTMLElement).style.width = "0%"
      setTimeout(() => {
        ; (bar as HTMLElement).style.transition = "width 1.8s ease-in-out"
          ; (bar as HTMLElement).style.width = targetWidth
      }, 500)
    })

    // Animasi muncul untuk card
    const cards = document.querySelectorAll(".employee-card")
    cards.forEach((card, i) => {
      ; (card as HTMLElement).style.opacity = "0"
        ; (card as HTMLElement).style.transform = "translateY(30px)"
      setTimeout(() => {
        ; (card as HTMLElement).style.transition = "all 0.6s ease"
          ; (card as HTMLElement).style.opacity = "1"
          ; (card as HTMLElement).style.transform = "translateY(0)"
      }, i * 150)
    })

    // Efek hover card
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        ; (card as HTMLElement).style.transform = "translateY(-5px) scale(1.02)"
          ; (card as HTMLElement).style.boxShadow = "0 8px 18px rgba(0,0,0,0.15)"
      })
      card.addEventListener("mouseleave", () => {
        ; (card as HTMLElement).style.transform = "translateY(0) scale(1)"
          ; (card as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
      })
    })
  }, [])

  return (
    <div className="employee-cards">
      {employees.map((employee, index) => (
        <div key={index} className={`employee-card ${employee.rank} text-black`}>
          <h2>{index === 0 ? '1st Place' : index === 1 ? '2nd Place' : '3rd Place'}</h2>
          <img
            src={employee.photo}
            alt={employee.name}
            className="employee-photo"
          />
          <div className="employee-info">
            <p><strong>Nama:</strong> {employee.name}</p>
            <p>Produk Terjual: <span>{employee.sales}</span></p>
            <div className="progress">
              <div
                className="fill"
                style={{ width: `${(employee.sales / 120) * 90}%` }}
              ></div>
            </div>
            <p>Absensi: <span>{employee.attendance}%</span></p>
            <div className="progress">
              <div
                className="fill"
                style={{ width: `${employee.attendance}%` }}
              ></div>
            </div>
            <p>Rasio Waktu Kerja/hari: <span>{employee.workHours} Jam</span></p>
            <div className="progress">
              <div
                className="fill"
                style={{ width: `${(employee.workHours / 83.8) * 80}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}