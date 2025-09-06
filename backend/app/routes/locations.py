from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.services import LocationService
from app.schemas.schemas import Location, LocationCreate, LocationUpdate, User

router = APIRouter()

@router.get("/", response_model=List[Location])
async def get_locations(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return LocationService.get_locations(db, skip=skip, limit=limit)

@router.post("/", response_model=Location)
async def create_location(
    location: LocationCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return LocationService.create_location(db=db, location=location)

@router.get("/{location_id}", response_model=Location)
async def get_location(
    location_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    location = LocationService.get_location_by_id(db, location_id=location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return location
