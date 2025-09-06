export interface Client {
  id: number;
  name: string;
  document: string; // CPF/CNPJ
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClientFormData {
  name: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
}

export const emptyClientForm: ClientFormData = {
  name: '',
  document: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  contactPerson: '',
  contactPhone: '',
  contactEmail: '',
  notes: ''
};
