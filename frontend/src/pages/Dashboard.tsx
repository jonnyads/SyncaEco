import { useQuery } from '@tanstack/react-query'
import { Plus, FileText, TrendingUp, TrendingDown, Eye } from 'lucide-react'
import { dashboardService } from '../services/api'
import { DashboardData, ProcessStatus, AlertType } from '../types'

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboardData,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!dashboardData) return null

  const getStatusColor = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.APPROVED:
        return 'bg-green-100 text-green-800'
      case ProcessStatus.IN_ANALYSIS:
        return 'bg-yellow-100 text-yellow-800'
      case ProcessStatus.PENDING:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAlertColor = (type: AlertType) => {
    switch (type) {
      case AlertType.SUCCESS:
        return 'bg-green-500'
      case AlertType.WARNING:
        return 'bg-yellow-500'
      case AlertType.ERROR:
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend.includes('+')) {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    }
    return <TrendingDown className="w-4 h-4 text-red-600" />
  }

  return (
    <div className="space-y-6">
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sistema de Gestão Ambiental</h1>
            <p className="text-primary-100">
              Monitore, analise e gerencie processos ambientais com eficiência e precisão.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-primary-500 hover:bg-primary-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Novo Processo</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Relatórios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Qualidade do Ar */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Qualidade do Ar</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.air_quality}</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrendIcon(dashboardData.metrics.air_quality_trend)}
                <span className="text-sm text-gray-600">{dashboardData.metrics.air_quality_trend}</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Recursos Hídricos */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Recursos Hídricos</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.water_resources}</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrendIcon(dashboardData.metrics.water_resources_trend)}
                <span className="text-sm text-gray-600">{dashboardData.metrics.water_resources_trend}</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Cobertura Vegetal */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Cobertura Vegetal</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.vegetation_cover}</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrendIcon(dashboardData.metrics.vegetation_cover_trend)}
                <span className="text-sm text-gray-600">{dashboardData.metrics.vegetation_cover_trend}</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Alertas Ativos */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertas Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.metrics.active_alerts}</p>
              <div className="flex items-center space-x-1 mt-1">
                {getTrendIcon(dashboardData.metrics.active_alerts_trend)}
                <span className="text-sm text-gray-600">{dashboardData.metrics.active_alerts_trend}</span>
              </div>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processos Recentes */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Processos Recentes</h3>
              <p className="text-sm text-gray-600">Acompanhe o status dos seus processos ambientais</p>
            </div>
            <button className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Ver Todos</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {dashboardData.recent_processes.map((process) => (
              <div key={process.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{process.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                        {process.status === ProcessStatus.IN_ANALYSIS ? 'Em Análise' : 
                         process.status === ProcessStatus.APPROVED ? 'Aprovado' : 
                         process.status === ProcessStatus.PENDING ? 'Pendente' : process.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        Vence em {new Date(process.due_date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500">{process.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas e Notificações */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Alertas e Notificações</h3>
              <p className="text-sm text-gray-600">Fique por dentro das últimas atualizações</p>
            </div>
            <button className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Ver Todos</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {dashboardData.recent_alerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getAlertColor(alert.alert_type)}`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(alert.created_at).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
