import { Process, ProcessFormData } from '../types/process';

// Mock de processos para demonstração
const mockProcesses: Process[] = [
  {
    id: 1,
    processNumber: 'PROC-2024-001',
    protocolDate: '2024-01-15',
    processType: 'Licenciamento Ambiental',
    priority: 'Alta',
    object: 'Licenciamento ambiental para implantação de unidade industrial',
    client: 'Empresa ABC Ltda',
    municipality: 'São Paulo',
    status: 'Em Andamento',
    responsibleUser: 'Ana Silva',
    dueDate: '2024-06-15',
    startDate: '2024-01-20',
    location: 'Zona Industrial Norte',
    budget: 150000,
    environmentalImpact: 'Impacto moderado na qualidade do ar e recursos hídricos',
    observations: 'Processo prioritário conforme cronograma estabelecido',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    processNumber: 'PROC-2024-002',
    protocolDate: '2024-02-01',
    processType: 'EIA/RIMA',
    priority: 'Crítica',
    object: 'Estudo de Impacto Ambiental para projeto de mineração',
    client: 'Mineração Responsável S.A.',
    municipality: 'Minas Gerais',
    status: 'Pendente',
    responsibleUser: 'Carlos Santos',
    dueDate: '2024-08-01',
    startDate: '2024-02-10',
    location: 'Região de Carajás',
    budget: 500000,
    environmentalImpact: 'Alto impacto na biodiversidade e recursos hídricos',
    observations: 'Processo complexo que requer análise detalhada',
    createdAt: '2024-02-01T14:45:00Z'
  },
  {
    id: 3,
    processNumber: 'PROC-2024-003',
    protocolDate: '2024-02-15',
    processType: 'CAR',
    priority: 'Média',
    object: 'Cadastro Ambiental Rural para propriedade agrícola',
    client: 'Agropecuária Sustentável',
    municipality: 'Mato Grosso',
    status: 'Concluído',
    responsibleUser: 'Maria Oliveira',
    dueDate: '2024-04-15',
    startDate: '2024-02-20',
    completionDate: '2024-04-10',
    location: 'Fazenda São José',
    budget: 25000,
    environmentalImpact: 'Baixo impacto, área já degradada',
    observations: 'Processo concluído dentro do prazo estabelecido',
    createdAt: '2024-02-15T09:15:00Z'
  }
];

// Serviço de processos
export const processService = {
  // Listar todos os processos
  async getProcesses(): Promise<Process[]> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockProcesses];
  },

  // Obter processo por ID
  async getProcessById(id: number): Promise<Process | undefined> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProcesses.find(process => process.id === id);
  },

  // Criar novo processo
  async createProcess(processData: ProcessFormData): Promise<Process> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Criar novo processo com ID gerado
    const newProcess: Process = {
      id: Math.max(0, ...mockProcesses.map(p => p.id)) + 1,
      ...processData,
      createdAt: new Date().toISOString()
    };
    
    // Adicionar ao array de processos mockados
    mockProcesses.push(newProcess);
    
    return newProcess;
  },

  // Atualizar processo existente
  async updateProcess(id: number, processData: ProcessFormData): Promise<Process> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Encontrar índice do processo
    const index = mockProcesses.findIndex(process => process.id === id);
    
    if (index === -1) {
      throw new Error('Processo não encontrado');
    }
    
    // Atualizar processo
    const updatedProcess: Process = {
      ...mockProcesses[index],
      ...processData,
      updatedAt: new Date().toISOString()
    };
    
    // Substituir no array
    mockProcesses[index] = updatedProcess;
    
    return updatedProcess;
  },

  // Excluir processo
  async deleteProcess(id: number): Promise<void> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockProcesses.findIndex(process => process.id === id);
    
    if (index === -1) {
      throw new Error('Processo não encontrado');
    }
    
    // Remover do array
    mockProcesses.splice(index, 1);
  }
};
