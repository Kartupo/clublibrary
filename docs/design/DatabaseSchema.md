# Database Schema (WBS-1.2)

UML class diagram of the backend models in `backend/api/models/`. PK = primary key, FK = foreign key, UK = unique. A filled diamond means the child is deleted with its parent (`CASCADE`).

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
        +bool is_verified
        +bool is_admin
        +datetime created_at
    }

    class Club {
        +int id PK
        +string name UK
        +enum kind : club | project_team
        +string category
        +text description
        +string logo_url
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
        UNIQUE(user_id, club_id)
    }

    class MembershipRequest {
        +int id PK
        +int user_id FK
        +int club_id FK
        +enum status : pending | approved | rejected
        +int decided_by_id FK
        +datetime decided_at
        +datetime created_at
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
