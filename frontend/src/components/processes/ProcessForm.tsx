import React, { useState, useEffect } from 'react';
import { Process, ProcessFormData, emptyProcessForm, priorityOptions, statusOptions, processTypeOptions, clientOptions, responsibleUserOptions } from '../../types/process';
import { Save, Trash, Calendar } from 'lucide-react';

interface ProcessFormProps {
  process?: Process;
  onSubmit: (data: ProcessFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  isSubmitting: boolean;
}

export default function ProcessForm({ process, onSubmit, onDelete, isSubmitting }: ProcessFormProps) {
  const [formData, setFormData] = useState<ProcessFormData>(emptyProcessForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Preencher formulário quando processo for fornecido (edição)
  useEffect(() => {
    if (process) {
      setFormData({
        processNumber: process.processNumber,
        protocolDate: process.protocolDate,
        processType: process.processType,
        priority: process.priority,
        object: process.object,
        client: process.client || '',
        municipality: process.municipality,
        status: process.status || 'Em Andamento',
        responsibleUser: process.responsibleUser || '',
        dueDate: process.dueDate || '',
        startDate: process.startDate || '',
        completionDate: process.completionDate || '',
        location: process.location || '',
        budget: process.budget,
        environmentalImpact: process.environmentalImpact || '',
        observations: process.observations || ''
      });
    } else {
      setFormData(emptyProcessForm);
    }
  }, [process]);
  
  // Atualizar campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo quando ele for editado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Atualizar campo de orçamento (formatação monetária)
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = value ? parseInt(value) : undefined;
    setFormData(prev => ({ ...prev, budget: numericValue }));
    
    if (errors.budget) {
      setErrors(prev => ({ ...prev, budget: '' }));
    }
  };

  // Formatar valor monetário para exibição
  const formatCurrency = (value?: number) => {
    if (!value) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validações básicas
    if (!formData.processNumber.trim()) {
      newErrors.processNumber = 'Número do processo é obrigatório';
    }
    
    if (!formData.protocolDate) {
      newErrors.protocolDate = 'Data de protocolo é obrigatória';
    }
    
    if (!formData.processType.trim()) {
      newErrors.processType = 'Tipo de processo é obrigatório';
    }
    
    if (!formData.object.trim()) {
      newErrors.object = 'Objeto do processo é obrigatório';
    }
    
    if (!formData.municipality.trim()) {
      newErrors.municipality = 'Município é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    await onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Número do Processo */}
        <div>
          <label htmlFor="processNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Número do Processo *
          </label>
          <input
            type="text"
            id="processNumber"
            name="processNumber"
            value={formData.processNumber}
            onChange={handleChange}
            className={`input-field ${errors.processNumber ? 'border-red-500' : ''}`}
            placeholder="Ex: PROC-2024-001"
          />
          {errors.processNumber && <p className="mt-1 text-xs text-red-500">{errors.processNumber}</p>}
        </div>
        
        {/* Data de Protocolo */}
        <div>
          <label htmlFor="protocolDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Protocolo *
          </label>
          <div className="relative">
            <input
              type="date"
              id="protocolDate"
              name="protocolDate"
              value={formData.protocolDate}
              onChange={handleChange}
              className={`input-field ${errors.protocolDate ? 'border-red-500' : ''}`}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {errors.protocolDate && <p className="mt-1 text-xs text-red-500">{errors.protocolDate}</p>}
        </div>
        
        {/* Tipo de Processo */}
        <div>
          <label htmlFor="processType" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Processo *
          </label>
          <select
            id="processType"
            name="processType"
            value={formData.processType}
            onChange={handleChange}
            className={`input-field ${errors.processType ? 'border-red-500' : ''}`}
          >
            <option value="">Selecione...</option>
            {processTypeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.processType && <p className="mt-1 text-xs text-red-500">{errors.processType}</p>}
        </div>
        
        {/* Prioridade */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridade
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field"
          >
            {priorityOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Objeto do Processo */}
        <div className="md:col-span-2">
          <label htmlFor="object" className="block text-sm font-medium text-gray-700 mb-1">
            Objeto do Processo *
          </label>
          <textarea
            id="object"
            name="object"
            value={formData.object}
            onChange={handleChange}
            rows={3}
            className={`input-field ${errors.object ? 'border-red-500' : ''}`}
            placeholder="Descreva o objeto do processo..."
          />
          {errors.object && <p className="mt-1 text-xs text-red-500">{errors.object}</p>}
        </div>
        
        {/* Cliente */}
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
            Cliente
          </label>
          <select
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Selecione...</option>
            {clientOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Município */}
        <div>
          <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 mb-1">
            Município *
          </label>
          <input
            type="text"
            id="municipality"
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            className={`input-field ${errors.municipality ? 'border-red-500' : ''}`}
            placeholder="Nome do município"
          />
          {errors.municipality && <p className="mt-1 text-xs text-red-500">{errors.municipality}</p>}
        </div>
        
        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Usuário Responsável */}
        <div>
          <label htmlFor="responsibleUser" className="block text-sm font-medium text-gray-700 mb-1">
            Usuário Responsável
          </label>
          <select
            id="responsibleUser"
            name="responsibleUser"
            value={formData.responsibleUser}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Selecione...</option>
            {responsibleUserOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Data de Vencimento */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Vencimento
          </label>
          <div className="relative">
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input-field"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Data de Início */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Início
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input-field"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Data de Conclusão */}
        <div>
          <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Conclusão
          </label>
          <div className="relative">
            <input
              type="date"
              id="completionDate"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleChange}
              className="input-field"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Localização */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Localização
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            placeholder="Localização do processo"
          />
        </div>
        
        {/* Orçamento */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Orçamento (R$)
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget ? formatCurrency(formData.budget) : ''}
            onChange={handleBudgetChange}
            className="input-field"
            placeholder="R$ 0,00"
          />
        </div>
        
        {/* Impacto Ambiental */}
        <div className="md:col-span-2">
          <label htmlFor="environmentalImpact" className="block text-sm font-medium text-gray-700 mb-1">
            Impacto Ambiental
          </label>
          <textarea
            id="environmentalImpact"
            name="environmentalImpact"
            value={formData.environmentalImpact}
            onChange={handleChange}
            rows={3}
            className="input-field"
            placeholder="Descreva o impacto ambiental..."
          />
        </div>
        
        {/* Observações */}
        <div className="md:col-span-2">
          <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={3}
            className="input-field"
            placeholder="Observações adicionais..."
          />
        </div>
      </div>
      
      {/* Botões de ação */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        {/* Botão de excluir (apenas para edição) */}
        {process && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 flex items-center disabled:opacity-50"
          >
            <Trash className="w-4 h-4 mr-2" />
            Excluir
          </button>
        )}
        
        {/* Botão de salvar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary ml-auto flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
