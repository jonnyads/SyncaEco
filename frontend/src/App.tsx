import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Processes from './pages/Processes'
import Monitoring from './pages/Monitoring'
import WaterResources from './pages/WaterResources'
import FloraFauna from './pages/FloraFauna'
import Team from './pages/Team'
import Locations from './pages/Locations'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import Clients from './pages/Clients'
import Technicians from './pages/Technicians'

function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }
  
  // Se o usuário estiver na página de login e já estiver autenticado, redirecionar para o dashboard

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/processes" element={<Processes />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/water-resources" element={<WaterResources />} />
        <Route path="/flora-fauna" element={<FloraFauna />} />
        <Route path="/team" element={<Team />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/technicians" element={<Technicians />} />
      </Routes>
    </Layout>
  )
}

export default App
