export interface Technician {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  specialization: string; // Área de atuação
  professionalId: string; // Registro profissional
  createdAt: string;
  updatedAt?: string;
}

export interface TechnicianFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  specialization: string;
  professionalId: string;
}

export const emptyTechnicianForm: TechnicianFormData = {
  name: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  specialization: '',
  professionalId: ''
};

// Lista de áreas de atuação para seleção
export const specializationOptions = [
  'Engenharia Ambiental',
  'Biologia',
  'Geologia',
  'Engenharia Florestal',
  'Engenharia Civil',
  'Química Ambiental',
  'Gestão Ambiental',
  'Oceanografia',
  'Agronomia',
  'Meteorologia',
  'Hidrologia',
  'Ecologia',
  'Geografia',
  'Outro'
];

