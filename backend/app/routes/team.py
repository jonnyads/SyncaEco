from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.services import UserService
from app.schemas.schemas import User, UserCreate, UserUpdate

router = APIRouter()

@router.get("/", response_model=List[User])
async def get_team_members(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return UserService.get_users(db, skip=skip, limit=limit)

@router.post("/", response_model=User)
async def create_team_member(
    user: UserCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return UserService.create_user(db=db, user=user)
