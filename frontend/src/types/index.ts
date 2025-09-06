// Tipos compartilhados entre frontend e backend

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  ANALYST = "analyst",
  VIEWER = "viewer"
}

export interface Process {
  id: number;
  title: string;
  description: string;
  status: ProcessStatus;
  priority: string;
  due_date: string;
  location_id: number;
  created_by_id: number;
  created_at: string;
  updated_at?: string;
}

export enum ProcessStatus {
  PENDING = "pending",
  IN_ANALYSIS = "in_analysis",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired"
}

export interface Location {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  created_at: string;
}

export interface Alert {
  id: number;
  title: string;
  message: string;
  alert_type: AlertType;
  location_id: number;
  user_id: number;
  is_read: boolean;
  created_at: string;
}

export enum AlertType {
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success"
}

export interface EnvironmentalMetric {
  id: number;
  metric_type: string;
  value: number;
  unit: string;
  location_id: number;
  recorded_at: string;
}

export interface DashboardMetrics {
  air_quality: string;
  air_quality_trend: string;
  water_resources: string;
  water_resources_trend: string;
  vegetation_cover: string;
  vegetation_cover_trend: string;
  active_alerts: number;
  active_alerts_trend: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recent_processes: Process[];
  recent_alerts: Alert[];
}

// Tipos para formulários
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  username: string;
  full_name: string;
  password: string;
  role: UserRole;
}

export interface ProcessForm {
  title: string;
  description: string;
  priority: string;
  due_date: string;
  location_id: number;
}
