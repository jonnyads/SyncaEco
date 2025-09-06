import { Client, ClientFormData } from '../types/client';

// Mock de clientes para demonstração
const mockClients: Client[] = [
  {
    id: 1,
    name: 'Empresa ABC Ltda',
    document: '12.345.678/0001-90',
    email: 'contato@empresaabc.com',
    phone: '(11) 3456-7890',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    contactPerson: 'João Silva',
    contactPhone: '(11) 98765-4321',
    contactEmail: 'joao.silva@empresaabc.com',
    notes: 'Cliente desde 2020',
    createdAt: '2020-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Maria Souza',
    document: '123.456.789-00',
    email: 'maria.souza@email.com',
    phone: '(21) 98765-4321',
    address: 'Rua das Flores, 123',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '22000-000',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    notes: 'Cliente pessoa física',
    createdAt: '2021-03-20T14:45:00Z'
  },
  {
    id: 3,
    name: 'Tech Solutions S.A.',
    document: '98.765.432/0001-10',
    email: 'contato@techsolutions.com',
    phone: '(31) 3333-4444',
    address: 'Rua da Tecnologia, 500',
    city: 'Belo Horizonte',
    state: 'MG',
    zipCode: '30000-000',
    contactPerson: 'Ana Oliveira',
    contactPhone: '(31) 99999-8888',
    contactEmail: 'ana@techsolutions.com',
    notes: 'Empresa de tecnologia',
    createdAt: '2019-11-05T09:15:00Z'
  }
];

// Serviço de clientes
export const clientService = {
  // Listar todos os clientes
  async getClients(): Promise<Client[]> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockClients];
  },

  // Obter cliente por ID
  async getClientById(id: number): Promise<Client | undefined> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockClients.find(client => client.id === id);
  },

  // Criar novo cliente
  async createClient(clientData: ClientFormData): Promise<Client> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Criar novo cliente com ID gerado
    const newClient: Client = {
      id: Math.max(0, ...mockClients.map(c => c.id)) + 1,
      ...clientData,
      createdAt: new Date().toISOString()
    };
    
    // Adicionar ao array de clientes mockados
    mockClients.push(newClient);
    
    return newClient;
  },

  // Atualizar cliente existente
  async updateClient(id: number, clientData: ClientFormData): Promise<Client> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Encontrar índice do cliente
    const index = mockClients.findIndex(client => client.id === id);
    
    if (index === -1) {
      throw new Error('Cliente não encontrado');
    }
    
    // Atualizar cliente
    const updatedClient: Client = {
      ...mockClients[index],
      ...clientData,
      updatedAt: new Date().toISOString()
    };
    
    // Substituir no array
    mockClients[index] = updatedClient;
    
    return updatedClient;
  },

  // Excluir cliente
  async deleteClient(id: number): Promise<void> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockClients.findIndex(client => client.id === id);
    
    if (index === -1) {
      throw new Error('Cliente não encontrado');
    }
    
    // Remover do array
    mockClients.splice(index, 1);
  }
};
