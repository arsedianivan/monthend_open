# backend/app/schemas.py

from pydantic import BaseModel
from typing import Optional

class AccountBase(BaseModel):
    account_number: str
    name: str
    type: str
    parent_id: Optional[int] = None

class AccountCreate(AccountBase):
    pass

class Account(AccountBase):
    id: int

    class Config:
        orm_mode = True

class JournalEntryBase(BaseModel):
    date: str
    description: str

class JournalEntryCreate(JournalEntryBase):
    pass

class JournalEntry(JournalEntryBase):
    id: int

    class Config:
        orm_mode = True

class TransactionBase(BaseModel):
    journal_entry_id: int
    account_id: int
    debit: Optional[float] = None
    credit: Optional[float] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int

    class Config:
        orm_mode = True
