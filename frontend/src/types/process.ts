export interface Process {
  id: number;
  processNumber: string;
  protocolDate: string;
  processType: string;
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  object: string;
  client?: string;
  municipality: string;
  status?: 'Em Andamento' | 'Pendente' | 'Concluído' | 'Cancelado' | 'Suspenso';
  responsibleUser?: string;
  dueDate?: string;
  startDate?: string;
  completionDate?: string;
  location?: string;
  budget?: number;
  environmentalImpact?: string;
  observations?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProcessFormData {
  processNumber: string;
  protocolDate: string;
  processType: string;
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  object: string;
  client?: string;
  municipality: string;
  status?: 'Em Andamento' | 'Pendente' | 'Concluído' | 'Cancelado' | 'Suspenso';
  responsibleUser?: string;
  dueDate?: string;
  startDate?: string;
  completionDate?: string;
  location?: string;
  budget?: number;
  environmentalImpact?: string;
  observations?: string;
}

export const emptyProcessForm: ProcessFormData = {
  processNumber: '',
  protocolDate: '',
  processType: '',
  priority: 'Média',
  object: '',
  client: '',
  municipality: '',
  status: 'Em Andamento',
  responsibleUser: '',
  dueDate: '',
  startDate: '',
  completionDate: '',
  location: '',
  budget: undefined,
  environmentalImpact: '',
  observations: ''
};

// Opções para dropdowns
export const priorityOptions = ['Baixa', 'Média', 'Alta', 'Crítica'];

export const statusOptions = ['Em Andamento', 'Pendente', 'Concluído', 'Cancelado', 'Suspenso'];

export const processTypeOptions = [
  'Licenciamento Ambiental',
  'EIA/RIMA',
  'RAS',
  'CAR',
  'Outorga de Água',
  'Plano de Controle Ambiental',
  'Relatório de Controle Ambiental',
  'Auditoria Ambiental',
  'Outro'
];

export const clientOptions = [
  'Empresa ABC Ltda',
  'Indústria XYZ S.A.',
  'Construtora Verde Ltda',
  'Agropecuária Sustentável',
  'Mineração Responsável S.A.',
  'Outro'
];

export const responsibleUserOptions = [
  'Ana Silva',
  'Carlos Santos',
  'Maria Oliveira',
  'João Costa',
  'Pedro Almeida',
  'Outro'
];
