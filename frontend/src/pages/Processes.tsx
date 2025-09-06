import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit, Eye, Trash, AlertCircle, FileText, Calendar, MapPin, DollarSign } from 'lucide-react';
import { processService } from '../services/processService';
import { Process, ProcessFormData } from '../types/process';
import Modal from '../components/Modal';
import ProcessForm from '../components/processes/ProcessForm';

export default function Processes() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<Process | undefined>(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Buscar processos
  const { data: processes = [], isLoading } = useQuery({
    queryKey: ['processes'],
    queryFn: processService.getProcesses
  });
  
  // Criar processo
  const createMutation = useMutation({
    mutationFn: (data: ProcessFormData) => processService.createProcess(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes'] });
      setIsCreateModalOpen(false);
    }
  });
  
  // Atualizar processo
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: ProcessFormData }) => 
      processService.updateProcess(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes'] });
      setIsEditModalOpen(false);
    }
  });
  
  // Excluir processo
  const deleteMutation = useMutation({
    mutationFn: (id: number) => processService.deleteProcess(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processes'] });
      setIsDeleteModalOpen(false);
    }
  });
  
  // Filtrar processos pelo termo de busca
  const filteredProcesses = processes.filter(process => 
    process.processNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.processType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (process.client && process.client.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Abrir modal de edição
  const handleEdit = (process: Process) => {
    setSelectedProcess(process);
    setIsEditModalOpen(true);
  };
  
  // Abrir modal de visualização
  const handleView = (process: Process) => {
    setSelectedProcess(process);
    setIsViewModalOpen(true);
  };
  
  // Confirmar exclusão
  const confirmDelete = async () => {
    if (selectedProcess) {
      await deleteMutation.mutateAsync(selectedProcess.id);
    }
  };
  
  // Enviar formulário de criação
  const handleCreate = async (data: ProcessFormData) => {
    await createMutation.mutateAsync(data);
  };
  
  // Enviar formulário de edição
  const handleUpdate = async (data: ProcessFormData) => {
    if (selectedProcess) {
      await updateMutation.mutateAsync({ id: selectedProcess.id, data });
    }
  };

  // Função para obter cor da prioridade
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica': return 'bg-red-100 text-red-800';
      case 'Alta': return 'bg-orange-100 text-orange-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-800';
      case 'Em Andamento': return 'bg-blue-100 text-blue-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      case 'Suspenso': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Processos</h1>
          <p className="text-gray-600">Gerencie todos os processos ambientais</p>
        </div>
        <button 
          className="btn-primary flex items-center"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Processo
        </button>
      </div>
      
      {/* Barra de pesquisa */}
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por número, tipo, objeto, município ou cliente..."
          className="ml-2 flex-1 outline-none text-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Lista de processos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredProcesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum processo encontrado</h3>
            <p className="text-gray-600 mt-1">
              {searchTerm 
                ? `Não encontramos resultados para "${searchTerm}"`
                : 'Você ainda não tem processos cadastrados'}
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
                    Processo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Município
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProcesses.map(process => (
                  <tr key={process.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-primary-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{process.processNumber}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{process.object}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{process.processType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(process.status || '')}`}>
                        {process.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(process.priority)}`}>
                        {process.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        {process.municipality}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.dueDate ? (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                          {new Date(process.dueDate).toLocaleDateString('pt-BR')}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(process)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Visualizar"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(process)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProcess(process);
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
        title="Novo Processo"
        size="xl"
      >
        <ProcessForm
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      </Modal>
      
      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Processo"
        size="xl"
      >
        {selectedProcess && (
          <ProcessForm
            process={selectedProcess}
            onSubmit={handleUpdate}
            onDelete={() => setIsDeleteModalOpen(true)}
            isSubmitting={updateMutation.isPending}
          />
        )}
      </Modal>
      
      {/* Modal de Visualização */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalhes do Processo"
        size="lg"
      >
        {selectedProcess && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Número do Processo</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProcess.processNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tipo de Processo</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProcess.processType}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Prioridade</h3>
                <span className={`mt-1 inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedProcess.priority)}`}>
                  {selectedProcess.priority}
                </span>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Objeto</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProcess.object}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProcess.client || '-'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Município</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProcess.municipality}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`mt-1 inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedProcess.status || '')}`}>
                  {selectedProcess.status}
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Responsável</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProcess.responsibleUser || '-'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de Protocolo</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedProcess.protocolDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de Vencimento</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProcess.dueDate ? new Date(selectedProcess.dueDate).toLocaleDateString('pt-BR') : '-'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Localização</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProcess.location || '-'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Orçamento</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedProcess.budget ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(selectedProcess.budget) : '-'}
                </p>
              </div>
              
              {selectedProcess.environmentalImpact && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Impacto Ambiental</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProcess.environmentalImpact}</p>
                </div>
              )}
              
              {selectedProcess.observations && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Observações</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedProcess.observations}</p>
                </div>
              )}
              
              <div className="md:col-span-2 border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500">Data de Cadastro</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedProcess.createdAt).toLocaleDateString('pt-BR', {
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
                  handleEdit(selectedProcess);
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
        title="Excluir Processo"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja excluir o processo <span className="font-semibold">{selectedProcess?.processNumber}</span>?
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
