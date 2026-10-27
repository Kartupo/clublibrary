from ..extensions import db


class Event(db.Model):
    """An event created by a Captain or Manager (T-12)."""

    __tablename__ = "events"
    __table_args__ = (db.Index("ix_events_club_starts", "club_id", "starts_at"),)

    id = db.Column(db.Integer, primary_key=True)
    club_id = db.Column(db.Integer, db.ForeignKey("clubs.id", ondelete="CASCADE"), nullable=False)
    created_by_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="SET NULL"))

    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    event_type = db.Column(
        db.Enum("social", "lecture", "meeting", "workshop", name="event_type"),
        nullable=False,
    )
    starts_at = db.Column(db.DateTime, nullable=False)
    ends_at = db.Column(db.DateTime)
    location = db.Column(db.String(255), nullable=False)
    visibility = db.Column(
        db.Enum("public", "members", name="event_visibility"),
        nullable=False,
        default="public",
    )
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now()
    )

    rsvps = db.relationship("RSVP", back_populates="event", cascade="all, delete-orphan")


class RSVP(db.Model):
    """A user's going / not going answer to an event (T-13). One answer per user and event."""

    __tablename__ = "rsvps"

    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id", ondelete="CASCADE"), primary_key=True)
    response = db.Column(db.Enum("going", "not_going", name="rsvp_response"), nullable=False)
    responded_at = db.Column(
        db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now()
    )

    event = db.relationship("Event", back_populates="rsvps")
