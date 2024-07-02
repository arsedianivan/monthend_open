# backend/app/users.py

from fastapi import Depends, HTTPException
from fastapi_users import FastAPIUsers
from fastapi_users.db import SQLAlchemyUserDatabase
from fastapi_users.authentication import JWTAuthentication
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker
from .database import get_db, engine
from .models import User as UserModel
from pydantic import BaseModel

DATABASE_URL = "sqlite:///./test.db"

Base: DeclarativeMeta = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class User(BaseModel):
    id: str
    email: str

    class Config:
        orm_mode = True

jwt_authentication = JWTAuthentication(secret="SECRET", lifetime_seconds=3600, tokenUrl="auth/jwt/login")

user_db = SQLAlchemyUserDatabase(UserModel, SessionLocal)

fastapi_users = FastAPIUsers(
    user_db,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)

app.include_router(
    fastapi_users.get_auth_router(jwt_authentication), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(), prefix="/auth", tags=["auth"]
)
app.include_router(
    fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"]
)
app.include_router(
    fastapi_users.get_verify_router(), prefix="/auth", tags=["auth"]
)
app.include_router(
    fastapi_users.get_users_router(), prefix="/users", tags=["users"]
)
