from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.services import EnvironmentalMetricService
from app.schemas.schemas import EnvironmentalMetric, EnvironmentalMetricCreate, User

router = APIRouter()

@router.get("/", response_model=List[EnvironmentalMetric])
async def get_water_metrics(
    location_id: int = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return EnvironmentalMetricService.get_metrics_by_type(db, "water_quality", location_id)

@router.post("/", response_model=EnvironmentalMetric)
async def create_water_metric(
    metric: EnvironmentalMetricCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return EnvironmentalMetricService.create_metric(db=db, metric=metric)
