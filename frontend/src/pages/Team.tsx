import { Link } from 'react-router-dom';
import { UserRound, Users, Award } from 'lucide-react';

export default function Team() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Equipe</h1>
        <p className="text-gray-600">Gerencie membros da equipe e permissões</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/technicians" className="card hover:bg-gray-50 p-6 flex items-start transition-colors">
          <div className="bg-primary-100 p-3 rounded-lg mr-4">
            <Award className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Técnicos</h3>
            <p className="text-gray-600">Gerencie os técnicos e suas áreas de atuação</p>
          </div>
        </Link>
        
        <Link to="/clients" className="card hover:bg-gray-50 p-6 flex items-start transition-colors">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <UserRound className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Clientes</h3>
            <p className="text-gray-600">Gerencie os clientes e suas informações</p>
          </div>
        </Link>
        
        <div className="card p-6 flex items-start">
          <div className="bg-gray-100 p-3 rounded-lg mr-4">
            <Users className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Usuários do Sistema</h3>
            <p className="text-gray-600">Gerencie usuários e permissões (Em desenvolvimento)</p>
          </div>
        </div>
        
        <div className="card p-6 flex items-start">
          <div className="bg-gray-100 p-3 rounded-lg mr-4">
            <Users className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Relatórios de Equipe</h3>
            <p className="text-gray-600">Relatórios e métricas da equipe (Em desenvolvimento)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
