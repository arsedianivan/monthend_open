# backend/app/main.py

import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from . import models, schemas
from .database import Base, SessionLocal
from dotenv import load_dotenv
from prometheus_fastapi_instrumentator import Instrumentator
import logging
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from .roles import Role, role_permissions
from .models import User
from .database import SessionLocal
from sqlalchemy.orm import Session

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

models.Base.metadata.create_all(bind=engine)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/accounts/", response_model=schemas.Account)
def create_account(account: schemas.AccountCreate, db: Session = Depends(get_db)):
    db_account = models.Account(**account.dict())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

@app.get("/accounts/{account_id}", response_model=schemas.Account)
def read_account(account_id: int, db: Session = Depends(get_db)):
    db_account = db.query(models.Account).filter(models.Account.id == account_id).first()
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return db_account

@app.post("/journal_entries/", response_model=schemas.JournalEntry)
def create_journal_entry(journal_entry: schemas.JournalEntryCreate, db: Session = Depends(get_db)):
    db_journal_entry = models.JournalEntry(**journal_entry.dict())
    db.add(db_journal_entry)
    db.commit()
    db.refresh(db_journal_entry)
    return db_journal_entry

@app.get("/journal_entries/{journal_entry_id}", response_model=schemas.JournalEntry)
def read_journal_entry(journal_entry_id: int, db: Session = Depends(get_db)):
    db_journal_entry = db.query(models.JournalEntry).filter(models.JournalEntry.id == journal_entry_id).first()
    if db_journal_entry is None:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return db_journal_entry

@app.post("/transactions/", response_model=schemas.Transaction)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions/{transaction_id}", response_model=schemas.Transaction)
def read_transaction(transaction_id: int, db: Session = Depends(get_db)):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

@app.middleware("http")
async def log_requests(request: Request, call_next):
    idem = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    logger.info(f"rid={idem} start request path={request.url.path}")
    response = await call_next(request)
    logger.info(f"rid={idem} completed_in={response.elapsed.total_seconds()}s status_code={response.status_code}")
    return response

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(SessionLocal)):
    user = db.query(User).filter(User.email == token).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user

def check_permissions(user: User, permission: str):
    if permission not in role_permissions[user.role]:
        raise HTTPException(status_code=403, detail="Operation not permitted")

@app.get("/users/{user_id}")
def read_user(user_id: int, current_user: User = Depends(get_current_user)):
    check_permissions(current_user, "read")
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Add Prometheus instrumentation
Instrumentator().instrument(app).expose(app)