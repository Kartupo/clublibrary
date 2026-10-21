from flask import Blueprint
from sqlalchemy import text

from ..extensions import db

bp = Blueprint("health", __name__)


@bp.get("/health")
def health():
    return {"status": "ok"}


@bp.get("/health/db")
def health_db():
    db.session.execute(text("SELECT 1"))
    return {"database": "ok"}