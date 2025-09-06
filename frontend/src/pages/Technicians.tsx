import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit, Eye, Trash, AlertCircle, Award } from 'lucide-react';
import { technicianService } from '../services/technicianService';
import { Technician, TechnicianFormData } from '../types/technician';
import Modal from '../components/Modal';
import TechnicianForm from '../components/technicians/TechnicianForm';

export default function Technicians() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | undefined>(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Buscar técnicos
  const { data: technicians = [], isLoading } = useQuery({
    queryKey: ['technicians'],
    queryFn: technicianService.getTechnicians
  });
  
  // Criar técnico
  const createMutation = useMutation({
    mutationFn: (data: TechnicianFormData) => technicianService.createTechnician(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technicians'] });
      setIsCreateModalOpen(false);
    }
  });
  
  // Atualizar técnico
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: TechnicianFormData }) => 
      technicianService.updateTechnician(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technicians'] });
      setIsEditModalOpen(false);
    }
  });
  
  // Excluir técnico
  const deleteMutation = useMutation({
    mutationFn: (id: number) => technicianService.deleteTechnician(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technicians'] });
      setIsDeleteModalOpen(false);
      setIsEditModalOpen(false);
    }
  });
  
  // Filtrar técnicos pelo termo de busca
  const filteredTechnicians = technicians.filter(tech => 
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.professionalId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Abrir modal de edição
  const handleEdit = (technician: Technician) => {
    setSelectedTechnician(technician);
    setIsEditModalOpen(true);
  };
  
  // Abrir modal de visualização
  const handleView = (technician: Technician) => {
    setSelectedTechnician(technician);
    setIsViewModalOpen(true);
  };
  
  // Abrir modal de exclusão
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  
  // Confirmar exclusão
  const confirmDelete = async () => {
    if (selectedTechnician) {
      await deleteMutation.mutateAsync(selectedTechnician.id);
    }
  };
  
  // Enviar formulário de criação
  const handleCreate = async (data: TechnicianFormData) => {
    await createMutation.mutateAsync(data);
  };
  
  // Enviar formulário de edição
  const handleUpdate = async (data: TechnicianFormData) => {
    if (selectedTechnician) {
      await updateMutation.mutateAsync({ id: selectedTechnician.id, data });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Técnicos</h1>
          <p className="text-gray-600">Gerencie os técnicos e suas áreas de atuação</p>
        </div>
        <button 
          className="btn-primary flex items-center"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Técnico
        </button>
      </div>
      
      {/* Barra de pesquisa */}
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome, área de atuação ou registro..."
          className="ml-2 flex-1 outline-none text-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Lista de técnicos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredTechnicians.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum técnico encontrado</h3>
            <p className="text-gray-600 mt-1">
              {searchTerm 
                ? `Não encontramos resultados para "${searchTerm}"`
                : 'Você ainda não tem técnicos cadastrados'}
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
                    Área de Atuação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registro Profissional
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
                {filteredTechnicians.map(technician => (
                  <tr key={technician.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{technician.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-primary-500 mr-2" />
                        <span className="text-sm text-gray-900">{technician.specialization}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {technician.professionalId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {technician.city && technician.state ? `${technician.city}/${technician.state}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(technician)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Visualizar"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(technician)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTechnician(technician);
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
        title="Novo Técnico"
        size="lg"
      >
        <TechnicianForm
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      </Modal>
      
      {/* Modal de Edição */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Técnico"
        size="lg"
      >
        {selectedTechnician && (
          <TechnicianForm
            technician={selectedTechnician}
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
        title="Detalhes do Técnico"
        size="md"
      >
        {selectedTechnician && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedTechnician.name}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTechnician.address ? 
                    `${selectedTechnician.address}, ${selectedTechnician.city}/${selectedTechnician.state}, ${selectedTechnician.zipCode}` : 
                    '-'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Área de Atuação</h3>
                <div className="mt-1 flex items-center">
                  <Award className="w-4 h-4 text-primary-500 mr-2" />
                  <span className="text-sm text-gray-900">{selectedTechnician.specialization}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Registro Profissional</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedTechnician.professionalId}</p>
              </div>
              
              <div className="md:col-span-2 border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500">Data de Cadastro</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedTechnician.createdAt).toLocaleDateString('pt-BR', {
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
                  handleEdit(selectedTechnician);
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
        title="Excluir Técnico"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja excluir o técnico <span className="font-semibold">{selectedTechnician?.name}</span>?
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

