from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text, Float, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    ANALYST = "analyst"
    VIEWER = "viewer"

class ProcessStatus(str, enum.Enum):
    PENDING = "pending"
    IN_ANALYSIS = "in_analysis"
    APPROVED = "approved"
    REJECTED = "rejected"
    EXPIRED = "expired"

class AlertType(str, enum.Enum):
    WARNING = "warning"
    ERROR = "error"
    INFO = "info"
    SUCCESS = "success"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.VIEWER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    processes = relationship("Process", back_populates="created_by")
    alerts = relationship("Alert", back_populates="user")

class Process(Base):
    __tablename__ = "processes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    status = Column(Enum(ProcessStatus), default=ProcessStatus.PENDING)
    priority = Column(String)  # alta, media, baixa
    due_date = Column(DateTime)
    location_id = Column(Integer, ForeignKey("locations.id"))
    created_by_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    created_by = relationship("User", back_populates="processes")
    location = relationship("Location")

class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    address = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    message = Column(Text)
    alert_type = Column(Enum(AlertType))
    location_id = Column(Integer, ForeignKey("locations.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="alerts")
    location = relationship("Location")

class EnvironmentalMetric(Base):
    __tablename__ = "environmental_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    metric_type = Column(String)  # air_quality, water_quality, vegetation_cover
    value = Column(Float)
    unit = Column(String)
    location_id = Column(Integer, ForeignKey("locations.id"))
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    location = relationship("Location")
