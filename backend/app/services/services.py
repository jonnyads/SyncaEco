from sqlalchemy.orm import Session
from app.models.models import User, Process, Location, Alert, EnvironmentalMetric
from app.schemas.schemas import UserCreate, ProcessCreate, LocationCreate, AlertCreate, EnvironmentalMetricCreate
from app.core.security import get_password_hash
from typing import List, Optional
from datetime import datetime, timedelta

class UserService:
    @staticmethod
    def create_user(db: Session, user: UserCreate) -> User:
        hashed_password = get_password_hash(user.password)
        db_user = User(
            email=user.email,
            username=user.username,
            full_name=user.full_name,
            role=user.role,
            hashed_password=hashed_password
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        return db.query(User).offset(skip).limit(limit).all()

class ProcessService:
    @staticmethod
    def create_process(db: Session, process: ProcessCreate, user_id: int) -> Process:
        db_process = Process(
            **process.dict(),
            created_by_id=user_id
        )
        db.add(db_process)
        db.commit()
        db.refresh(db_process)
        return db_process

    @staticmethod
    def get_processes(db: Session, skip: int = 0, limit: int = 100) -> List[Process]:
        return db.query(Process).offset(skip).limit(limit).all()

    @staticmethod
    def get_process_by_id(db: Session, process_id: int) -> Optional[Process]:
        return db.query(Process).filter(Process.id == process_id).first()

    @staticmethod
    def get_recent_processes(db: Session, limit: int = 5) -> List[Process]:
        return db.query(Process).order_by(Process.created_at.desc()).limit(limit).all()

class LocationService:
    @staticmethod
    def create_location(db: Session, location: LocationCreate) -> Location:
        db_location = Location(**location.dict())
        db.add(db_location)
        db.commit()
        db.refresh(db_location)
        return db_location

    @staticmethod
    def get_locations(db: Session, skip: int = 0, limit: int = 100) -> List[Location]:
        return db.query(Location).offset(skip).limit(limit).all()

    @staticmethod
    def get_location_by_id(db: Session, location_id: int) -> Optional[Location]:
        return db.query(Location).filter(Location.id == location_id).first()

class AlertService:
    @staticmethod
    def create_alert(db: Session, alert: AlertCreate, user_id: int) -> Alert:
        db_alert = Alert(
            **alert.dict(),
            user_id=user_id
        )
        db.add(db_alert)
        db.commit()
        db.refresh(db_alert)
        return db_alert

    @staticmethod
    def get_alerts(db: Session, skip: int = 0, limit: int = 100) -> List[Alert]:
        return db.query(Alert).offset(skip).limit(limit).all()

    @staticmethod
    def get_recent_alerts(db: Session, limit: int = 5) -> List[Alert]:
        return db.query(Alert).order_by(Alert.created_at.desc()).limit(limit).all()

    @staticmethod
    def get_active_alerts_count(db: Session) -> int:
        return db.query(Alert).filter(Alert.is_read == False).count()

class EnvironmentalMetricService:
    @staticmethod
    def create_metric(db: Session, metric: EnvironmentalMetricCreate) -> EnvironmentalMetric:
        db_metric = EnvironmentalMetric(**metric.dict())
        db.add(db_metric)
        db.commit()
        db.refresh(db_metric)
        return db_metric

    @staticmethod
    def get_metrics_by_type(db: Session, metric_type: str, location_id: Optional[int] = None) -> List[EnvironmentalMetric]:
        query = db.query(EnvironmentalMetric).filter(EnvironmentalMetric.metric_type == metric_type)
        if location_id:
            query = query.filter(EnvironmentalMetric.location_id == location_id)
        return query.order_by(EnvironmentalMetric.recorded_at.desc()).all()

    @staticmethod
    def get_latest_metrics(db: Session) -> dict:
        # Simular dados para o dashboard
        return {
            "air_quality": "Boa",
            "air_quality_trend": "+5% desde último mês",
            "water_resources": "87%",
            "water_resources_trend": "-2% desde último mês",
            "vegetation_cover": "94%",
            "vegetation_cover_trend": "+1% desde último mês"
        }
