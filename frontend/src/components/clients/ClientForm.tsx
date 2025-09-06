import React, { useState, useEffect } from 'react';
import { Client, ClientFormData, emptyClientForm } from '../../types/client';
import { Save, Trash } from 'lucide-react';

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: ClientFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  isSubmitting: boolean;
}

export default function ClientForm({ client, onSubmit, onDelete, isSubmitting }: ClientFormProps) {
  const [formData, setFormData] = useState<ClientFormData>(emptyClientForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Preencher formulário quando cliente for fornecido (edição)
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        document: client.document,
        email: client.email,
        phone: client.phone,
        address: client.address,
        city: client.city,
        state: client.state,
        zipCode: client.zipCode,
        contactPerson: client.contactPerson,
        contactPhone: client.contactPhone,
        contactEmail: client.contactEmail,
        notes: client.notes
      });
    } else {
      setFormData(emptyClientForm);
    }
  }, [client]);
  
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
    
    if (!formData.document.trim()) {
      newErrors.document = 'CPF/CNPJ é obrigatório';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
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
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Pessoa / Empresa *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Nome completo ou razão social"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        
        {/* CPF/CNPJ */}
        <div>
          <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
            CPF/CNPJ *
          </label>
          <input
            type="text"
            id="document"
            name="document"
            value={formData.document}
            onChange={handleChange}
            className={`input-field ${errors.document ? 'border-red-500' : ''}`}
            placeholder="000.000.000-00 ou 00.000.000/0001-00"
          />
          {errors.document && <p className="mt-1 text-xs text-red-500">{errors.document}</p>}
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            placeholder="email@exemplo.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        
        {/* Telefone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="(00) 00000-0000"
          />
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
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Informações de Contato</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pessoa de Contato */}
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
              Pessoa de Contato
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="input-field"
              placeholder="Nome do contato"
            />
          </div>
          
          {/* Telefone de Contato */}
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone de Contato
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="input-field"
              placeholder="(00) 00000-0000"
            />
          </div>
          
          {/* Email de Contato */}
          <div className="md:col-span-2">
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email de Contato
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="input-field"
              placeholder="contato@exemplo.com"
            />
          </div>
        </div>
      </div>
      
      {/* Observações */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Observações
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="input-field"
          placeholder="Informações adicionais sobre o cliente..."
        />
      </div>
      
      {/* Botões de ação */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        {/* Botão de excluir (apenas para edição) */}
        {client && onDelete && (
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
