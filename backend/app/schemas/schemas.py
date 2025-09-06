from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models.models import UserRole, ProcessStatus, AlertType

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    role: UserRole = UserRole.VIEWER

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Process Schemas
class ProcessBase(BaseModel):
    title: str
    description: str
    priority: str
    due_date: datetime
    location_id: int

class ProcessCreate(ProcessBase):
    pass

class ProcessUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProcessStatus] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None
    location_id: Optional[int] = None

class Process(ProcessBase):
    id: int
    status: ProcessStatus
    created_by_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Location Schemas
class LocationBase(BaseModel):
    name: str
    description: str
    latitude: float
    longitude: float
    address: str

class LocationCreate(LocationBase):
    pass

class LocationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None

class Location(LocationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Alert Schemas
class AlertBase(BaseModel):
    title: str
    message: str
    alert_type: AlertType
    location_id: int

class AlertCreate(AlertBase):
    pass

class AlertUpdate(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None
    alert_type: Optional[AlertType] = None
    location_id: Optional[int] = None
    is_read: Optional[bool] = None

class Alert(AlertBase):
    id: int
    user_id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Environmental Metric Schemas
class EnvironmentalMetricBase(BaseModel):
    metric_type: str
    value: float
    unit: str
    location_id: int

class EnvironmentalMetricCreate(EnvironmentalMetricBase):
    pass

class EnvironmentalMetric(EnvironmentalMetricBase):
    id: int
    recorded_at: datetime

    class Config:
        from_attributes = True

# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Dashboard Schemas
class DashboardMetrics(BaseModel):
    air_quality: str
    air_quality_trend: str
    water_resources: str
    water_resources_trend: str
    vegetation_cover: str
    vegetation_cover_trend: str
    active_alerts: int
    active_alerts_trend: str

class DashboardData(BaseModel):
    metrics: DashboardMetrics
    recent_processes: List[Process]
    recent_alerts: List[Alert]
