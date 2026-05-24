import EmployeeCards from './components/EmployeeCards'
import PerformanceCard from './components/PerformanceCard'
import './dashboard.css'

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <h1>🏆 Top Employees of The Week</h1>
      
      <EmployeeCards />
      
      {/* My Performance */}
      <div className="my-performance">
        <h2>My Performance</h2>
        <PerformanceCard />
      </div>
    </div>
  )
}