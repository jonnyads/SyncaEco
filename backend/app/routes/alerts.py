from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.services import AlertService
from app.schemas.schemas import Alert, AlertCreate, AlertUpdate, User

router = APIRouter()

@router.get("/", response_model=List[Alert])
async def get_alerts(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return AlertService.get_alerts(db, skip=skip, limit=limit)

@router.post("/", response_model=Alert)
async def create_alert(
    alert: AlertCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return AlertService.create_alert(db=db, alert=alert, user_id=current_user.id)

@router.get("/recent", response_model=List[Alert])
async def get_recent_alerts(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return AlertService.get_recent_alerts(db, limit=10)

@router.put("/{alert_id}/read")
async def mark_alert_as_read(
    alert_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    from app.models.models import Alert as AlertModel
    alert = db.query(AlertModel).filter(AlertModel.id == alert_id).first()
    if alert is None:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    alert.is_read = True
    db.commit()
    return {"message": "Alert marked as read"}
