import { NavLink } from 'react-router-dom'
import { 
  BarChart3, 
  Gauge, 
  Droplets, 
  Leaf, 
  Users, 
  MapPin, 
  AlertTriangle, 
  Settings,
  LayoutDashboard,
  UserCircle,
  Award
} from 'lucide-react'

const navigation = [
  {
    name: 'PRINCIPAL',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Processos', href: '/processes', icon: BarChart3 },
      { name: 'Monitoramento', href: '/monitoring', icon: Gauge },
      { name: 'Recursos Hídricos', href: '/water-resources', icon: Droplets },
      { name: 'Flora & Fauna', href: '/flora-fauna', icon: Leaf },
    ]
  },
  {
    name: 'GESTÃO',
    items: [
      { name: 'Clientes', href: '/clients', icon: UserCircle },
      { name: 'Técnicos', href: '/technicians', icon: Award },
      { name: 'Equipe', href: '/team', icon: Users },
      { name: 'Localizações', href: '/locations', icon: MapPin },
      { name: 'Alertas', href: '/alerts', icon: AlertTriangle },
      { name: 'Configurações', href: '/settings', icon: Settings },
    ]
  }
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 min-h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">EcoManager</span>
        </div>
      </div>
      
      <nav className="mt-8">
        {navigation.map((section) => (
          <div key={section.name} className="mb-6">
            <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {section.name}
            </h3>
            <div className="mt-2">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
