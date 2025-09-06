import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../types'

interface PermissionGateProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
}

export function PermissionGate({ children, allowedRoles, fallback }: PermissionGateProps) {
  const { user } = useAuth()

  if (!user) {
    return fallback || null
  }

  if (!allowedRoles.includes(user.role)) {
    return fallback || null
  }

  return <>{children}</>
}

// Componentes de conveniência para diferentes níveis de permissão
export function AdminOnly({ children, fallback }: Omit<PermissionGateProps, 'allowedRoles'>) {
  return (
    <PermissionGate allowedRoles={[UserRole.ADMIN]} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}

export function ManagerAndAbove({ children, fallback }: Omit<PermissionGateProps, 'allowedRoles'>) {
  return (
    <PermissionGate allowedRoles={[UserRole.ADMIN, UserRole.MANAGER]} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}

export function AnalystAndAbove({ children, fallback }: Omit<PermissionGateProps, 'allowedRoles'>) {
  return (
    <PermissionGate allowedRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.ANALYST]} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}
