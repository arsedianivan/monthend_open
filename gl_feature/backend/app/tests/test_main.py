# backend/app/tests/test_main.py

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..main import app, get_db
from ..database import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

def test_create_account(db):
    response = client.post("/accounts/", json={"account_number": "1001", "name": "Cash", "type": "Asset"})
    assert response.status_code == 200
    assert response.json()["account_number"] == "1001"
    assert response.json()["name"] == "Cash"

def test_read_account(db):
    client.post("/accounts/", json={"account_number": "1001", "name": "Cash", "type": "Asset"})
    response = client.get("/accounts/1")
    assert response.status_code == 200
    assert response.json()["account_number"] == "1001"
    assert response.json()["name"] == "Cash"
