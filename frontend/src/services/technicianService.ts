import { Technician, TechnicianFormData } from '../types/technician';

// Mock de técnicos para demonstração
const mockTechnicians: Technician[] = [
  {
    id: 1,
    name: 'Carlos Silva',
    address: 'Av. Paulista, 1500, Apto 45',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-200',
    specialization: 'Engenharia Ambiental',
    professionalId: 'CREA-SP 123456',
    createdAt: '2021-03-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Ana Oliveira',
    address: 'Rua das Flores, 250',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '22000-100',
    specialization: 'Biologia',
    professionalId: 'CRBio 12345-01',
    createdAt: '2022-01-20T14:45:00Z'
  },
  {
    id: 3,
    name: 'Marcos Santos',
    address: 'Av. Amazonas, 750',
    city: 'Belo Horizonte',
    state: 'MG',
    zipCode: '30000-000',
    specialization: 'Geologia',
    professionalId: 'CREA-MG 78910',
    createdAt: '2020-11-05T09:15:00Z'
  }
];

// Serviço de técnicos
export const technicianService = {
  // Listar todos os técnicos
  async getTechnicians(): Promise<Technician[]> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockTechnicians];
  },

  // Obter técnico por ID
  async getTechnicianById(id: number): Promise<Technician | undefined> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTechnicians.find(tech => tech.id === id);
  },

  // Criar novo técnico
  async createTechnician(techData: TechnicianFormData): Promise<Technician> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Criar novo técnico com ID gerado
    const newTechnician: Technician = {
      id: Math.max(0, ...mockTechnicians.map(t => t.id)) + 1,
      ...techData,
      createdAt: new Date().toISOString()
    };
    
    // Adicionar ao array de técnicos mockados
    mockTechnicians.push(newTechnician);
    
    return newTechnician;
  },

  // Atualizar técnico existente
  async updateTechnician(id: number, techData: TechnicianFormData): Promise<Technician> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Encontrar índice do técnico
    const index = mockTechnicians.findIndex(tech => tech.id === id);
    
    if (index === -1) {
      throw new Error('Técnico não encontrado');
    }
    
    // Atualizar técnico
    const updatedTechnician: Technician = {
      ...mockTechnicians[index],
      ...techData,
      updatedAt: new Date().toISOString()
    };
    
    // Substituir no array
    mockTechnicians[index] = updatedTechnician;
    
    return updatedTechnician;
  },

  // Excluir técnico
  async deleteTechnician(id: number): Promise<void> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockTechnicians.findIndex(tech => tech.id === id);
    
    if (index === -1) {
      throw new Error('Técnico não encontrado');
    }
    
    // Remover do array
    mockTechnicians.splice(index, 1);
  }
};

