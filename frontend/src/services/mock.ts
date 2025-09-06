import { DashboardData, Process, Alert, ProcessStatus, AlertType } from '../types';

// Dados mockados para o dashboard
export const mockDashboardData: DashboardData = {
  metrics: {
    air_quality: "Boa",
    air_quality_trend: "+5% desde último mês",
    water_resources: "87%",
    water_resources_trend: "-2% desde último mês",
    vegetation_cover: "94%",
    vegetation_cover_trend: "+1% desde último mês",
    active_alerts: 3,
    active_alerts_trend: "-40% desde último mês"
  },
  recent_processes: [
    {
      id: 1,
      title: "Licenciamento Ambiental - Área Industrial",
      description: "Processo de licenciamento para nova área industrial",
      status: ProcessStatus.IN_ANALYSIS,
      priority: "alta",
      due_date: "2024-01-15T00:00:00Z",
      location_id: 1,
      created_by_id: 1,
      created_at: "2023-12-15T10:30:00Z",
      updated_at: "2023-12-20T14:15:00Z"
    },
    {
      id: 2,
      title: "Monitoramento de Qualidade da Água",
      description: "Monitoramento contínuo da qualidade da água",
      status: ProcessStatus.APPROVED,
      priority: "média",
      due_date: "2024-01-12T00:00:00Z",
      location_id: 2,
      created_by_id: 1,
      created_at: "2023-12-10T09:45:00Z",
      updated_at: "2023-12-18T11:20:00Z"
    },
    {
      id: 3,
      title: "Relatório de Impacto Ambiental",
      description: "Relatório de impacto ambiental para nova construção",
      status: ProcessStatus.PENDING,
      priority: "alta",
      due_date: "2024-01-20T00:00:00Z",
      location_id: 3,
      created_by_id: 2,
      created_at: "2023-12-05T14:20:00Z",
      updated_at: "2023-12-12T16:30:00Z"
    }
  ],
  recent_alerts: [
    {
      id: 1,
      title: "Níveis de PM2.5 acima do normal",
      message: "Detectados níveis elevados de partículas PM2.5 na zona industrial",
      alert_type: AlertType.WARNING,
      location_id: 1,
      user_id: 1,
      is_read: false,
      created_at: "2023-12-22T08:15:00Z"
    },
    {
      id: 2,
      title: "Manutenção programada - Estação de Monitoramento",
      message: "Manutenção programada na estação de monitoramento do centro de controle",
      alert_type: AlertType.INFO,
      location_id: 2,
      user_id: 1,
      is_read: false,
      created_at: "2023-12-21T10:30:00Z"
    },
    {
      id: 3,
      title: "Relatório mensal enviado com sucesso",
      message: "Relatório mensal de monitoramento foi enviado com sucesso",
      alert_type: AlertType.SUCCESS,
      location_id: 3,
      user_id: 2,
      is_read: false,
      created_at: "2023-12-20T16:45:00Z"
    }
  ]
};
