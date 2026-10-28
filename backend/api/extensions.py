from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# compare_server_default: also detect changes to database-side defaults
migrate = Migrate(compare_server_default=True)
