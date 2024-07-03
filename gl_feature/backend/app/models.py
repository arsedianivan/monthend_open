# backend/app/models.py

from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Account(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String, unique=True, index=True)
    name = Column(String)
    type = Column(String)
    parent_id = Column(Integer, ForeignKey('accounts.id'))
    parent = relationship("Account", remote_side=[id])

class JournalEntry(Base):
    __tablename__ = "journal_entries"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime)
    description = Column(String)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    journal_entry_id = Column(Integer, ForeignKey('journal_entries.id'))
    account_id = Column(Integer, ForeignKey('accounts.id'))
    debit = Column(Numeric(10, 2))
    credit = Column(Numeric(10, 2))

