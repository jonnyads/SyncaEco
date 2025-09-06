from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.services import ProcessService, AlertService, EnvironmentalMetricService
from app.schemas.schemas import DashboardData, DashboardMetrics, User

router = APIRouter()

@router.get("/", response_model=DashboardData)
async def get_dashboard_data(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Obter métricas ambientais
    metrics_data = EnvironmentalMetricService.get_latest_metrics(db)
    active_alerts_count = AlertService.get_active_alerts_count(db)
    
    metrics = DashboardMetrics(
        air_quality=metrics_data["air_quality"],
        air_quality_trend=metrics_data["air_quality_trend"],
        water_resources=metrics_data["water_resources"],
        water_resources_trend=metrics_data["water_resources_trend"],
        vegetation_cover=metrics_data["vegetation_cover"],
        vegetation_cover_trend=metrics_data["vegetation_cover_trend"],
        active_alerts=active_alerts_count,
        active_alerts_trend="-40% desde último mês"
    )
    
    # Obter processos recentes
    recent_processes = ProcessService.get_recent_processes(db, limit=3)
    
    # Obter alertas recentes
    recent_alerts = AlertService.get_recent_alerts(db, limit=3)
    
    return DashboardData(
        metrics=metrics,
        recent_processes=recent_processes,
        recent_alerts=recent_alerts
    )
