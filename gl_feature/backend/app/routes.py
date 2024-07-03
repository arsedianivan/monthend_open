from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .dependencies import get_db, get_current_user, check_permissions

router = APIRouter()

@router.post("/items/")
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    check_permissions(current_user, "create")
    return crud.create_item(db=db, item=item)
