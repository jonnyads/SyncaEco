import React, { useState, useEffect } from 'react';
import { Technician, TechnicianFormData, emptyTechnicianForm, specializationOptions } from '../../types/technician';
import { Save, Trash } from 'lucide-react';

interface TechnicianFormProps {
  technician?: Technician;
  onSubmit: (data: TechnicianFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  isSubmitting: boolean;
}

export default function TechnicianForm({ technician, onSubmit, onDelete, isSubmitting }: TechnicianFormProps) {
  const [formData, setFormData] = useState<TechnicianFormData>(emptyTechnicianForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customSpecialization, setCustomSpecialization] = useState<string>('');
  
  // Preencher formulário quando técnico for fornecido (edição)
  useEffect(() => {
    if (technician) {
      setFormData({
        name: technician.name,
        address: technician.address,
        city: technician.city,
        state: technician.state,
        zipCode: technician.zipCode,
        specialization: technician.specialization,
        professionalId: technician.professionalId
      });
      
      // Verificar se é uma especialização personalizada
      if (!specializationOptions.includes(technician.specialization) && technician.specialization !== 'Outro') {
        setCustomSpecialization(technician.specialization);
        setFormData(prev => ({ ...prev, specialization: 'Outro' }));
      }
    } else {
      setFormData(emptyTechnicianForm);
      setCustomSpecialization('');
    }
  }, [technician]);
  
  // Atualizar campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo quando ele for editado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validações básicas
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.professionalId.trim()) {
      newErrors.professionalId = 'Registro profissional é obrigatório';
    }
    
    if (!formData.specialization) {
      newErrors.specialization = 'Área de atuação é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Se for "Outro" e tiver especialização personalizada, use-a
    const dataToSubmit = { ...formData };
    if (formData.specialization === 'Outro' && customSpecialization.trim()) {
      dataToSubmit.specialization = customSpecialization.trim();
    }
    
    await onSubmit(dataToSubmit);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Nome completo do técnico"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        
        {/* Endereço */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Endereço
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
            placeholder="Rua, número, complemento"
          />
        </div>
        
        {/* Cidade */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Cidade
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
            placeholder="Nome da cidade"
          />
        </div>
        
        {/* Estado */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Selecione...</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
        
        {/* CEP */}
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
            CEP
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="input-field"
            placeholder="00000-000"
          />
        </div>
        
        {/* Área de Atuação */}
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
            Área de Atuação *
          </label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className={`input-field ${errors.specialization ? 'border-red-500' : ''}`}
          >
            <option value="">Selecione...</option>
            {specializationOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.specialization && (
            <p className="mt-1 text-xs text-red-500">{errors.specialization}</p>
          )}
          
          {/* Campo para especialização personalizada */}
          {formData.specialization === 'Outro' && (
            <div className="mt-2">
              <input
                type="text"
                value={customSpecialization}
                onChange={(e) => setCustomSpecialization(e.target.value)}
                className="input-field"
                placeholder="Especifique a área de atuação"
              />
            </div>
          )}
        </div>
        
        {/* Registro Profissional */}
        <div>
          <label htmlFor="professionalId" className="block text-sm font-medium text-gray-700 mb-1">
            Registro Profissional *
          </label>
          <input
            type="text"
            id="professionalId"
            name="professionalId"
            value={formData.professionalId}
            onChange={handleChange}
            className={`input-field ${errors.professionalId ? 'border-red-500' : ''}`}
            placeholder="Ex: CREA-SP 123456"
          />
          {errors.professionalId && (
            <p className="mt-1 text-xs text-red-500">{errors.professionalId}</p>
          )}
        </div>
      </div>
      
      {/* Botões de ação */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        {/* Botão de excluir (apenas para edição) */}
        {technician && onDelete && (
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

