from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.services import ProcessService
from app.schemas.schemas import Process, ProcessCreate, ProcessUpdate, User

router = APIRouter()

@router.get("/", response_model=List[Process])
async def get_processes(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    processes = ProcessService.get_processes(db, skip=skip, limit=limit)
    return processes

@router.post("/", response_model=Process)
async def create_process(
    process: ProcessCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    return ProcessService.create_process(db=db, process=process, user_id=current_user.id)

@router.get("/{process_id}", response_model=Process)
async def get_process(
    process_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    process = ProcessService.get_process_by_id(db, process_id=process_id)
    if process is None:
        raise HTTPException(status_code=404, detail="Process not found")
    return process

@router.put("/{process_id}", response_model=Process)
async def update_process(
    process_id: int,
    process_update: ProcessUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    process = ProcessService.get_process_by_id(db, process_id=process_id)
    if process is None:
        raise HTTPException(status_code=404, detail="Process not found")
    
    # Atualizar campos
    update_data = process_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(process, field, value)
    
    db.commit()
    db.refresh(process)
    return process
