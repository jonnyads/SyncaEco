import axios from 'axios'
import { User, LoginForm, RegisterForm } from '../types'

const API_BASE_URL = 'http://localhost:8000/api'

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  async login(username: string, password: string) {
    // Modo demo: Simular login sem backend
    console.log('Login simulado para:', username);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Armazenar token simulado
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwicm9sZSI6ImFkbWluIn0.8BQmUZ9LCD7QcSxHYLOREyXUUCJiUJaD2WZKPeUUAY0';
    localStorage.setItem('token', fakeToken);
    
    // Simular usuário para teste
    const user = {
      id: 1,
      email: 'admin@ecomanager.com',
      username: username,
      full_name: 'Administrador',
      role: 'admin',
      is_active: true,
      created_at: new Date().toISOString()
    }
    
    return { access_token: fakeToken, user }
  },

  async register(userData: RegisterForm) {
    // Modo demo: Simular registro sem backend
    console.log('Registro simulado para:', userData);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Retornar usuário simulado
    return {
      id: Math.floor(Math.random() * 1000),
      email: userData.email,
      username: userData.username,
      full_name: userData.full_name,
      role: userData.role,
      is_active: true,
      created_at: new Date().toISOString()
    };
  },

  async getCurrentUser(): Promise<User> {
    // Simular resposta para teste
    return {
      id: 1,
      email: 'admin@ecomanager.com',
      username: 'admin',
      full_name: 'Administrador',
      role: 'admin',
      is_active: true,
      created_at: new Date().toISOString()
    } as User
  },
}

import { mockDashboardData } from './mock';

export const dashboardService = {
  async getDashboardData() {
    // Usar dados mockados para evitar erros de API
    return mockDashboardData;
  },
}

export const processService = {
  async getProcesses() {
    // Retornar processos mockados
    return mockDashboardData.recent_processes;
  },

  async createProcess(processData: any) {
    // Simular criação
    console.log("Processo criado:", processData);
    return { ...processData, id: Math.floor(Math.random() * 1000) };
  },

  async getProcess(id: number) {
    // Retornar processo mockado
    return mockDashboardData.recent_processes.find(p => p.id === id) || mockDashboardData.recent_processes[0];
  },

  async updateProcess(id: number, processData: any) {
    // Simular atualização
    console.log("Processo atualizado:", id, processData);
    return { ...processData, id };
  },
}

export const alertService = {
  async getAlerts() {
    // Retornar alertas mockados
    return mockDashboardData.recent_alerts;
  },

  async getRecentAlerts() {
    // Retornar alertas recentes mockados
    return mockDashboardData.recent_alerts;
  },

  async markAsRead(id: number) {
    // Simular marcação como lido
    console.log("Alerta marcado como lido:", id);
    return { message: "Alert marked as read" };
  },
}

// Mock de localizações
const mockLocations = [
  {
    id: 1,
    name: "Zona Industrial Norte",
    description: "Área industrial norte da cidade",
    latitude: -23.5505,
    longitude: -46.6333,
    address: "Rua Industrial, 123",
    created_at: "2023-12-01T10:00:00Z"
  },
  {
    id: 2,
    name: "Centro de Controle",
    description: "Centro de controle ambiental",
    latitude: -23.5605,
    longitude: -46.6433,
    address: "Av. Principal, 456",
    created_at: "2023-12-02T11:00:00Z"
  },
  {
    id: 3,
    name: "Reserva Natural",
    description: "Reserva natural protegida",
    latitude: -23.5705,
    longitude: -46.6533,
    address: "Estrada da Reserva, 789",
    created_at: "2023-12-03T12:00:00Z"
  }
];

export const locationService = {
  async getLocations() {
    // Retornar localizações mockadas
    return mockLocations;
  },

  async createLocation(locationData: any) {
    // Simular criação
    console.log("Localização criada:", locationData);
    return { ...locationData, id: Math.floor(Math.random() * 1000) };
  },
}

// Mock de membros da equipe
const mockTeamMembers = [
  {
    id: 1,
    email: "admin@ecomanager.com",
    username: "admin",
    full_name: "Administrador do Sistema",
    role: "admin",
    is_active: true,
    created_at: "2023-12-01T10:00:00Z"
  },
  {
    id: 2,
    email: "gerente@ecomanager.com",
    username: "gerente",
    full_name: "Gerente Ambiental",
    role: "manager",
    is_active: true,
    created_at: "2023-12-02T11:00:00Z"
  },
  {
    id: 3,
    email: "analista@ecomanager.com",
    username: "analista",
    full_name: "Analista Ambiental",
    role: "analyst",
    is_active: true,
    created_at: "2023-12-03T12:00:00Z"
  }
];

export const teamService = {
  async getTeamMembers() {
    // Retornar membros da equipe mockados
    return mockTeamMembers;
  },

  async createTeamMember(userData: any) {
    // Simular criação
    console.log("Membro da equipe criado:", userData);
    return { ...userData, id: Math.floor(Math.random() * 1000) };
  },
}

// Mock de métricas
const mockMetrics = [
  {
    id: 1,
    metric_type: "air_quality",
    value: 85.5,
    unit: "AQI",
    location_id: 1,
    recorded_at: "2023-12-20T10:00:00Z"
  },
  {
    id: 2,
    metric_type: "water_quality",
    value: 87.0,
    unit: "%",
    location_id: 2,
    recorded_at: "2023-12-20T11:00:00Z"
  },
  {
    id: 3,
    metric_type: "vegetation_cover",
    value: 94.2,
    unit: "%",
    location_id: 3,
    recorded_at: "2023-12-20T12:00:00Z"
  }
];

export const monitoringService = {
  async getMetrics(metricType?: string, locationId?: number) {
    // Filtrar métricas mockadas
    return mockMetrics.filter(m => 
      (!metricType || m.metric_type === metricType) && 
      (!locationId || m.location_id === locationId)
    );
  },
}

export const waterResourcesService = {
  async getWaterMetrics(locationId?: number) {
    // Filtrar métricas de água mockadas
    return mockMetrics.filter(m => 
      m.metric_type === "water_quality" && 
      (!locationId || m.location_id === locationId)
    );
  },
}

export const floraFaunaService = {
  async getFloraFaunaMetrics(locationId?: number) {
    // Filtrar métricas de vegetação mockadas
    return mockMetrics.filter(m => 
      m.metric_type === "vegetation_cover" && 
      (!locationId || m.location_id === locationId)
    );
  },
}

export const settingsService = {
  async getSettings() {
    // Retornar configurações mockadas
    return {
      user: {
        id: 1,
        username: "admin",
        email: "admin@ecomanager.com",
        full_name: "Administrador do Sistema",
        role: "admin"
      },
      system: {
        environment: "development",
        version: "1.0.0"
      }
    };
  },
}
