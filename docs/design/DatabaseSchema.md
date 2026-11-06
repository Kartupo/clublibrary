# Database Schema (WBS-1.2)

UML class diagram of the backend models in `backend/api/models/`. PK = primary key, FK = foreign key, UK = unique. A filled diamond means the child is deleted with its parent (`CASCADE`). Arrows from `User` follow the multiplicity: `1` is also `CASCADE` (deleting a user deletes their memberships, requests, follows, RSVPs, likes and comments), `0..1` keeps the row and sets the link to `NULL` (`SET NULL`).

```mermaid
classDiagram
    direction LR

    class User {
        +int id PK
        +string email UK
        +string password_hash
        +string name
        +string department
        +smallint study_year
        +string interests
        +string photo_url
        +string photo_public_id
        +bool is_verified
        +bool is_admin
        +datetime created_at
    }

    class Club {
        +int id PK
        +string name UK
        +enum kind : club | project_team
        +enum category : see notes
        +text description
        +string logo_url
        +string logo_public_id
        +string contact_info
        +enum status : pending | approved | rejected
        +string rejection_reason
        +int requested_by_id FK
        +int reviewed_by_id FK
        +datetime reviewed_at
        +datetime created_at
    }

    class Membership {
        +int id PK
        +int user_id FK
        +int club_id FK
        +enum role : member | manager | captain
        +datetime joined_at
        +smallint captain_flag GENERATED
        UNIQUE(user_id, club_id)
        UNIQUE(captain_flag, club_id) one Captain per club
    }

    class MembershipRequest {
        +int id PK
        +int user_id FK
        +int club_id FK
        +enum status : pending | approved | rejected
        +int decided_by_id FK
        +datetime decided_at
        +datetime created_at
        +smallint pending_flag GENERATED
        UNIQUE(pending_flag, user_id, club_id) one pending request
    }

    class Follow {
        +int user_id PK,FK
        +int club_id PK,FK
        +datetime created_at
    }

    class Event {
        +int id PK
        +int club_id FK
        +int created_by_id FK
        +string title
        +text description
        +enum event_type : social | lecture | meeting | workshop
        +datetime starts_at
        +datetime ends_at
        +string location
        +enum visibility : public | members
        +datetime created_at
        +datetime updated_at
        CHECK(ends_at IS NULL OR ends_at >= starts_at)
    }

    class RSVP {
        +int user_id PK,FK
        +int event_id PK,FK
        +enum response : going | not_going
        +datetime responded_at
    }

    class Post {
        +int id PK
        +int club_id FK
        +int author_id FK
        +text body
        +datetime created_at
        +datetime updated_at
    }

    class PostMedia {
        +int id PK
        +int post_id FK
        +enum media_type : image | video
        +string url
        +string public_id
        +smallint position
    }

    class Like {
        +int user_id PK,FK
        +int post_id PK,FK
        +datetime created_at
    }

    class Comment {
        +int id PK
        +int post_id FK
        +int user_id FK
        +text body
        +datetime created_at
    }

    User "1" --> "0..*" Membership : has
    Club "1" *-- "0..*" Membership : has
    User "1" --> "0..*" MembershipRequest : sends
    User "0..1" --> "0..*" MembershipRequest : decides
    Club "1" *-- "0..*" MembershipRequest : receives
    User "1" --> "0..*" Follow : follows
    Club "1" *-- "0..*" Follow : followed by
    User "0..1" --> "0..*" Club : requests / reviews
    Club "1" *-- "0..*" Event : organizes
    User "0..1" --> "0..*" Event : creates
    Event "1" *-- "0..*" RSVP : has
    User "1" --> "0..*" RSVP : responds
    Club "1" *-- "0..*" Post : publishes
    User "0..1" --> "0..*" Post : writes
    Post "1" *-- "0..*" PostMedia : contains
    Post "1" *-- "0..*" Like : has
    User "1" --> "0..*" Like : gives
    Post "1" *-- "0..*" Comment : has
    User "1" --> "0..*" Comment : writes
```

## Notes

**Club categories.** `clubs.category` is an enum used by the Discover filters: `technology`, `engineering`, `science`, `arts`, `music`, `sports`, `culture`, `social`, `career`, `entrepreneurship`, `other`. Values are stored in lowercase English; the clients show display names. Adding a category needs a migration.

**Enforced by the database**

| Rule | How |
|---|---|
| A user has at most one membership per club | `UNIQUE(user_id, club_id)` on `memberships` |
| A club has at most one Captain | `captain_flag` is generated from `role` (1 for the Captain, NULL otherwise) with `UNIQUE(captain_flag, club_id)` |
| A user has at most one pending join request per club | `pending_flag` is generated from `status` (1 while pending, NULL otherwise) with `UNIQUE(pending_flag, user_id, club_id)`; rejected or approved requests do not block a new one |
| An event cannot end before it starts | `CHECK(ends_at IS NULL OR ends_at >= starts_at)` on `events` |
| One RSVP, one like and one follow per user | Composite primary keys on `rsvps`, `likes`, `follows` |
| `updated_at` / `responded_at` refresh on every change | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`, so raw SQL updates are covered too |

The generated flags are computed only from `role` / `status`, never from `user_id` or `club_id`: TiDB rejects generated columns based on a column whose foreign key has `ON DELETE CASCADE`. Application code never writes them; TiDB rejects a hand-written value.

Handing over Captaincy must demote the old Captain **before** promoting the new one, inside one transaction: the unique key is checked on every statement, so promoting first fails.

**TiDB Cloud notes**

- The database runs on TiDB Cloud Starter (MySQL-compatible). Stored generated columns cannot be added with `ALTER TABLE`; a new one needs the table to be created with it.
- CHECK constraints are only enforced when the cluster setting `tidb_enable_check_constraint` is `ON` (set once with `SET GLOBAL`; it is on for our cluster). A constraint created while it was off is ignored.
- String literals in generated column expressions are written as `_utf8mb4'captain'`, the form TiDB reports back, so `flask db check` sees no false difference.
- Tables use the `utf8mb4_bin` collation: equality and unique keys are case- and accent-sensitive, so `Ali@x.com` and `ali@x.com` are different e-mails. Two rules keep lists and search friendly:
  - **Sorting.** Alphabetical lists (club names, event titles) sort with the `utf8mb4_0900_ai_ci` collation: `ORDER BY name COLLATE utf8mb4_0900_ai_ci`, in SQLAlchemy `order_by(Club.name.collate("utf8mb4_0900_ai_ci"))`. This gives `ağ, Bilim, Çevre, İnovasyon, Robotics, Zeka`; the plain byte order would be `Bilim, Robotics, Zeka, ağ, Çevre, İnovasyon`.
  - **Search.** Search ignores case and Turkish accents, so `cevre` finds `Çevre` and `siir` finds `Şiir`. Compare with the same collation, and first replace the dotless `ı` with `i` on both sides, because the collation treats `ı` as a separate letter (otherwise `isik` would not find `Işık`):

    ```python
    searchable = func.replace(Club.name, "ı", "i").collate("utf8mb4_0900_ai_ci")
    query = query.where(searchable.contains(term.replace("ı", "i"), autoescape=True))
    ```

    `autoescape=True` makes a `%` or `_` typed by the user match literally.
- `AUTO_INCREMENT` ids are unique but not consecutive, and a newer row can get a smaller id. Sort by `created_at`, never by `id`.

**Enforced by the API, not the database**

- A Captain can only exist on an approved club. Approving a club request sets `clubs.status` and creates the requester's Captain membership in one transaction.
- An approved club always has a Captain; leaving is blocked for a Captain until Captaincy is handed over.
- A user who is already a member cannot send a join request.
- A post must have a body, at least one media item, or both (media live in `post_media`, so a CHECK cannot see them).

**Cloudinary.** Every stored image or video keeps its Cloudinary `public_id` (`users.photo_public_id`, `clubs.logo_public_id`, `post_media.public_id`) so a replaced or deleted file can also be removed from Cloudinary.

**E-mail verification and password reset** need no table. Links carry signed, expiring `itsdangerous` tokens. A reset token also includes a short fragment of the current `password_hash`; once the password changes, the fragment no longer matches and every earlier reset link stops working.
