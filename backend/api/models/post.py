from ..extensions import db


class Post(db.Model):
    """A post published on behalf of a club or team (T-15)."""

    __tablename__ = "posts"
    __table_args__ = (db.Index("ix_posts_club_created", "club_id", "created_at"),)

    id = db.Column(db.Integer, primary_key=True)
    club_id = db.Column(db.Integer, db.ForeignKey("clubs.id", ondelete="CASCADE"), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"))
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), index=True)
    updated_at = db.Column(
        db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now()
    )

    media = db.relationship(
        "PostMedia", back_populates="post", cascade="all, delete-orphan", order_by="PostMedia.position"
    )
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")


class PostMedia(db.Model):
    """A photo or video attached to a post, stored on Cloudinary (T-15)."""

    __tablename__ = "post_media"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    media_type = db.Column(db.Enum("image", "video", name="media_type"), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    public_id = db.Column(db.String(255))  # Cloudinary id, needed to delete the file
    position = db.Column(db.SmallInteger, nullable=False, default=0)

    post = db.relationship("Post", back_populates="media")


class Like(db.Model):
    """A user's like on a post (T-16). One like per user and post."""

    __tablename__ = "likes"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())


class Comment(db.Model):
    """A comment on a post (T-16)."""

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    post = db.relationship("Post", back_populates="comments")
