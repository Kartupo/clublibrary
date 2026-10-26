import os
from pathlib import Path

from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BACKEND_DIR / ".env")


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_ENGINE_OPTIONS = {
        # Check each connection before use; cloud databases drop idle ones
        "pool_pre_ping": True,
        "pool_recycle": 280,
        # Encrypted connection, verified with Aiven's certificate
        "connect_args": {"ssl": {"ca": str(BACKEND_DIR / "certs" / "ca.pem")}},
    }

    # Photo and video storage; the SDK reads this URL
    CLOUDINARY_URL = os.getenv("CLOUDINARY_URL")

    # Gmail SMTP for verification and password-reset e-mails
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")
