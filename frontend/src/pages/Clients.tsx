import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit, Eye, Trash, AlertCircle } from 'lucide-react';
import { clientService } from '../services/clientService';
import { Client, ClientFormData } from '../types/client';
import Modal from '../components/Modal';
import ClientForm from '../components/clients/ClientForm';

export default function Clients() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Buscar clientes
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: clientService.getClients
  });
  
  // Criar cliente
  const createMutation = useMutation({
    mutationFn: (data: ClientFormData) => clientService.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsCreateModalOpen(false);
    }
  });
  
  // Atualizar cliente
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: ClientFormData }) => 
      clientService.updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsEditModalOpen(false);
    }
  });
  
  // Excluir cliente
  const deleteMutation = useMutation({
    mutationFn: (id: number) => clientService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsDeleteModalOpen(false);
      setIsEditModalOpen(false);
    }
  });
  
  // Filtrar clientes pelo termo de busca
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Abrir modal de edição
  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };
  
  // Abrir modal de visualização
  const handleView = (client: Client) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };
  
  // Abrir modal de exclusão
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  
  // Confirmar exclusão
  const confirmDelete = async () => {
    if (selectedClient) {
      await deleteMutation.mutateAsync(selectedClient.id);
    }
  };
  
  // Enviar formulário de criação
  const handleCreate = async (data: ClientFormData) => {
    await createMutation.mutateAsync(data);
  };
  
  // Enviar formulário de edição
  const handleUpdate = async (data: ClientFormData) => {
    if (selectedClient) {
      await updateMutation.mutateAsync({ id: selectedClient.id, data });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie seus clientes e contatos</p>
        </div>
        <button 
          className="btn-primary flex items-center"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </button>
      </div>
      
      {/* Barra de pesquisa */}
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome, CPF/CNPJ ou email..."
          className="ml-2 flex-1 outline-none text-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Lista de clientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum cliente encontrado</h3>
            <p className="text-gray-600 mt-1">
              {searchTerm 
                ? `Não encontramos resultados para "${searchTerm}"`
                : 'Você ainda não tem clientes cadastrados'}
            </p>
            {searchTerm && (
              <button 
                className="mt-4 text-primary-600 hover:text-primary-800"
                onClick={() => setSearchTerm('')}
              >
                Limpar busca
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF/CNPJ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cidade/UF
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      {client.contactPerson && (
                        <div className="text-xs text-gray-500">Contato: {client.contactPerson}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.document}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.city}/{client.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(client)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Visualizar"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(client)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedClient(client);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Excluir"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modal de Criação */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Novo Cliente"
        size="lg"
      >
        <ClientForm
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      </Modal>
      
      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Cliente"
        size="lg"
      >
        {selectedClient && (
          <ClientForm
            client={selectedClient}
            onSubmit={handleUpdate}
            onDelete={handleDelete}
            isSubmitting={updateMutation.isPending}
          />
        )}
      </Modal>
      
      {/* Modal de Visualização */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalhes do Cliente"
        size="lg"
      >
        {selectedClient && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">CPF/CNPJ</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.document}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.email || '-'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.phone || '-'}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedClient.address ? 
                    `${selectedClient.address}, ${selectedClient.city}/${selectedClient.state}, ${selectedClient.zipCode}` : 
                    '-'}
                </p>
              </div>
              
              <div className="border-t pt-4 md:col-span-2">
                <h3 className="text-sm font-medium text-gray-900">Informações de Contato</h3>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pessoa de Contato</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.contactPerson || '-'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Telefone de Contato</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.contactPhone || '-'}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Email de Contato</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedClient.contactEmail || '-'}</p>
              </div>
              
              {selectedClient.notes && (
                <div className="md:col-span-2 border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-500">Observações</h3>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selectedClient.notes}</p>
                </div>
              )}
              
              <div className="md:col-span-2 border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500">Data de Cadastro</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedClient.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEdit(selectedClient);
                }}
                className="btn-secondary"
              >
                Editar
              </button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Excluir Cliente"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja excluir o cliente <span className="font-semibold">{selectedClient?.name}</span>?
          </p>
          <p className="text-sm text-gray-500">
            Esta ação não pode ser desfeita.
          </p>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              disabled={deleteMutation.isPending}
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
