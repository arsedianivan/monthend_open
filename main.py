from fastapi import FastAPI
import os

app = FastAPI()

DATABASE_URL = os.getenv("postgresql://username:password@hostname:port/database")
SECRET_KEY = os.getenv("321caa270a527f3795258c7d6484cad2")

@app.get("/")
def read_root():
    return {"Hello": "Welcome to MONTHEND"}
