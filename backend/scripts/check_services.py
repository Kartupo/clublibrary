"""Checks that every external service in .env is reachable (WBS-1.1)."""
import os
import smtplib
import sys
from pathlib import Path

from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))
load_dotenv(BACKEND_DIR / ".env")


def check_database():
    from sqlalchemy import text

    from api import create_app
    from api.extensions import db

    with create_app().app_context():
        db.session.execute(text("SELECT 1"))


def check_cloudinary():
    import cloudinary.api  # reads CLOUDINARY_URL from the environment

    cloudinary.api.ping()


def check_smtp():
    # Logs in only; no e-mail is sent
    with smtplib.SMTP(os.environ["MAIL_SERVER"], int(os.environ["MAIL_PORT"]), timeout=10) as smtp:
        smtp.starttls()
        smtp.login(os.environ["MAIL_USERNAME"], os.environ["MAIL_PASSWORD"])


all_ok = True
for name, check in [("Aiven MySQL", check_database), ("Cloudinary", check_cloudinary), ("Gmail SMTP", check_smtp)]:
    try:
        check()
        print(f"OK    {name}")
    except Exception as error:
        all_ok = False
        print(f"FAIL  {name}: {error}")

sys.exit(0 if all_ok else 1)
