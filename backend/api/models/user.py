from ..extensions import db


class User(db.Model):
    """A student account (T-03, T-04, T-05) or a Platform Administrator (T-07)."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)  # @itu.edu.tr
    password_hash = db.Column(db.String(255), nullable=False)  # bcrypt, never the password

    name = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(150))
    study_year = db.Column(db.SmallInteger)
    interests = db.Column(db.String(500))
    photo_url = db.Column(db.String(500))  # Cloudinary URL

    is_verified = db.Column(db.Boolean, nullable=False, default=False)  # e-mail verified
    is_admin = db.Column(db.Boolean, nullable=False, default=False)  # Platform Administrator
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    memberships = db.relationship("Membership", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.email}>"
