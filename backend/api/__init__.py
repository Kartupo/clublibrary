from flask import Flask

from .config import Config
from .extensions import db, migrate


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    # Import the models so Flask-Migrate can see every table
    from . import models  # noqa: F401

    from .routes.health import bp as health_bp
    app.register_blueprint(health_bp, url_prefix="/api")

    return app
