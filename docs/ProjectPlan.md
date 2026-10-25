# Software Engineering — Project Plan

## Cover Page

| Field | Details |
|---|---|
| **Course** | BLG411E Software Engineering |
| **Report name** | Project Plan |
| **Project title** | Clublibrary – Student Clubs & Project Teams Social Platform |
| **Group name / number** | Al-ı Memnu |
| **Group members** | Melih Kart — 150200701, Beyza Arısan — 150230069, Eslem Azra Yılmaz — 150220110, Yusuf Erdem Cıdık — 040230205 |
| **Instructor** | Ayşe Tosun Kühn, Tolga Ovatman |
| **Submission date** | 2026-10-25 |
| **Document version** | 1.0 |

---

## 1. Introduction

### 1.1 Scope

**Project overview:**  
Clublibrary is a social media web and mobile application for university student clubs and project teams. It gives students a single place to discover clubs and teams, follow their activity, and stay informed about the events, lectures, and meetings happening on campus. Captains and managers get tools to organize their members, publish events, and share updates through posts. The goal is to replace the scattered mix of social media pages and posters that clubs and teams rely on today with one dedicated campus platform.

The project belongs to the education domain and focuses on student life outside the classroom. Its possible customers are universities that want to bring all of their student clubs and project teams together on one digital platform. The key users are students and the members, managers, and captains of clubs and project teams, together with platform administrators who approve new clubs and project teams.

**In scope:**
- **Web & Mobile Applications** – The platform is delivered as both a responsive web application and a mobile application (Android and iOS), which offer the features below and use the same backend. The Platform Administrator screens are provided only in the web application.
- **User Accounts & Authentication** – Sign-up and login with a university e-mail address, e-mail verification, password reset, and user profiles (department, year, interests).
- **Club & Project Team Management** – Clubs and project teams work the same way. A student requests a new club or project team, which stays pending until a Platform Administrator checks whether it is legitimate and approves or rejects it. Once it is approved, the student who requested it becomes its Captain; captains are assigned only to approved clubs and project teams. Each club and project team has a profile page (description, logo, contact info) and a member list, students join through membership requests and can leave, and the Captain and Managers can remove members.
- **Roles & Permissions** – Role-based access with four roles in each club or project team: Student (non-member), Member, Manager, and Captain. Captains assign managers and can hand over the Captain role to another member; each role has defined rights over content and events. In addition, a platform-level Platform Administrator role approves or rejects requests for new clubs and project teams and can change the Captain of a club or project team when needed.
- **Events & Calendar** – Clubs and project teams create events of different types (social events, lectures/talks, meetings, workshops) with date, time, and location; member-only or public visibility; RSVP/attendance; a personal calendar of upcoming events.
- **Posts & Media Feed** – Posts by clubs and project teams with text, photos, and videos; likes and comments; a feed for each club and team, and a personal home feed built from joined and followed clubs and teams.
- **Discover** – Browsing and searching clubs, project teams, upcoming public events, and popular posts, with filtering by club category and event type.

**Optional scope:**
- Messaging groups (group chats for the members of a club or project team), implemented only if time remains after all in-scope features are complete.

**Out of scope:**
- Integration with official university systems (student information system, LMS, official course timetables).
- Ticket sales, payments, and membership fees.
- Live streaming, voice, and video calls.
- Automatic cross-posting to external social media platforms.

**Assumptions and constraints:**
- **Time:** the project follows the course schedule; each report is due in the week shown in the Project Charter's milestone table. The Requirement Specification, Requirement Analysis, Software Design, and Software Test Reports are delivered during the project; the code freeze is on 25.12.2026 with release `v1.0.0` on `main`, the demo is on 26.12.2026, and the presentation is on 28.12.2026.
- **Team:** the team (Al-ı Memnu) has four members. All members work as full-stack developers and take part in every phase of the project; in addition, each member leads one area: project management and the mobile application (Melih Kart), backend (Beyza Arısan), frontend (Eslem Azra Yılmaz), and requirements and QA (Yusuf Erdem Cıdık). All members are students taking other courses, so they work on the project part-time.
- **Technology:**
  - *Backend:* Python with Flask (REST API), SQLAlchemy (Flask-SQLAlchemy) with Flask-Migrate, and Flask-JWT-Extended with bcrypt; a MySQL database hosted on Aiven; Cloudinary for photo and video storage; Gmail SMTP for verification and password-reset e-mails.
  - *Web:* Next.js with TypeScript, Tailwind CSS, and shadcn/ui.
  - *Mobile:* React Native with Expo (TypeScript) for Android and iOS, using the same REST API as the web application.
  - *Hosting:* the backend and the web application on Vercel, the database on Aiven.
- **Budget:** the project has no budget, so only free plans are used: Aiven (free MySQL plan), Vercel (Hobby), Cloudinary (free plan), Gmail SMTP, and Expo Go. Their limits shape some decisions: the Aiven free database can power off when it is idle, a Vercel function accepts requests of at most 4.5 MB (so photos and videos are uploaded directly to Cloudinary), and Gmail sends about 500 e-mails per day.
- **Changing requirements:** the TA acts as the customer in project meetings. Each new request is recorded as a GitHub issue with the `customer-requests` label within 48 hours and is accepted, deferred, or declined with a written reason, so the scope may change during the project.
- **Process:** all work is tracked on the GitHub Projects board; every change is made on its own branch and merged through a pull request reviewed by at least one teammate.
- **AI assistance:** the team uses Claude Opus 5.x, Gemini, and GPT 5.x as development assistants for coding, dummy data and test generation, debugging, research, and code review. AI-generated code is reviewed and tested by a team member before it is merged.

### 1.2 Deliverables

Number each project deliverable. Use the same IDs in the task table below. **Please note that, in this case, the deliverables are not the documents that you are going to submit throughout the project timeline. However, 'Documentation' is a deliverable itself ;)**

| Deliverable ID | Deliverable name | Description / contents | Acceptance criterion |
|---|---|---|---|
| D-01 | Backend REST API | Flask REST API under `/api` that serves both the web and the mobile application: authentication (including verification and password-reset e-mails sent through Gmail SMTP), users, clubs and project teams, memberships, roles, follows, events, RSVPs, calendar, posts, likes and comments, feeds, discover, and platform administration. Photos and videos are stored on Cloudinary. The API is deployed on Vercel. | Every endpoint needed by T-03–T-18 is implemented, returns JSON, enforces JWT and role checks where required, and passes the API tests in `tests/`. |
| D-02 | Database | MySQL database hosted on Aiven with the full schema (for example users, clubs and project teams with their approval status, categories, memberships and roles, follows, events, RSVPs, posts, likes, and comments), managed by Flask-Migrate migrations, plus a dummy-data seed script. | The whole schema is created from the migrations on an empty database with no manual steps; the seed script fills realistic demo data; foreign keys and unique constraints reject invalid data (for example duplicate memberships or RSVPs). |
| D-03 | Web application | Responsive Next.js (TypeScript) web application built with Tailwind CSS and shadcn/ui and hosted on Vercel. It covers all in-scope features, including the Platform Administrator screens, which exist only in the web application. | Every in-scope feature can be used in the browser, connected to the deployed API (D-01), on desktop and phone-size screens, and the site is reachable at its Vercel URL. |
| D-04 | Mobile application | React Native with Expo (TypeScript) application for Android and iOS that uses the same backend (D-01). It covers all in-scope features for students, members, managers, and captains; the Platform Administrator screens are not included. | Every in-scope student, member, manager, and captain feature can be used on real Android and iOS devices through Expo Go or an installable build. |
| D-05 | Test suite | Automated backend tests (unit and API/integration) in `tests/`, plus manual test cases for the web and mobile applications. | The automated tests run with one command and pass; every functional task T-03–T-18 is covered by at least one automated or manual test case, and the results are recorded in the Software Test Report. |
| D-06 | Deployed release | The running system: the backend and the web application deployed on Vercel, the database on Aiven, a mobile build, and release `v1.0.0` on the `main` branch. | Release `v1.0.0` is created on `main` by 25.12.2026 (code freeze), and the full system works end to end in the demo on 26.12.2026. |
| D-07 | Documentation | Repository README (project description, team roles, and setup and run guide), API endpoint documentation, and the course reports: Project Charter, Project Plan, Requirement Specification, Requirement Analysis, Software Design, and Software Test Reports. | Each report is submitted in `docs/` on its own branch with a pull request and a release by its deadline, and merged after review; a new team member can run the project by following the README. |

### 1.3 Functional Requirements / Tasks

Number the functional tasks and map **every task** to one or more deliverables from Section 1.2.

| Task ID | Functional requirement / task | Description | Related deliverable ID(s) |
|---|---|---|---|
| T-01 | Project setup and architecture | Set up the repository structure, the Flask application with its connection to the Aiven database, the Next.js and Expo application skeletons, environment configuration, and the Cloudinary and Gmail SMTP accounts; design the database schema and create the first migration. | D-01, D-02, D-03, D-04 |
| T-02 | UI/UX design | Design the screen layouts, navigation, and a shared visual style (wireframes) for the web and mobile applications, so that both offer the same main flows with a consistent look. | D-03, D-04 |
| T-03 | Sign-up and e-mail verification | A student signs up with a university e-mail address (`@itu.edu.tr` in this project) and a password; the account becomes active only after the student opens the verification link sent by e-mail. The link expires after a set time, and the student can request a new one. | D-01, D-02, D-03, D-04 |
| T-04 | Login, logout, and password reset | A verified user logs in and receives a JWT access token, can log out, and can set a new password through a reset link sent by e-mail, which also expires after a set time. | D-01, D-02, D-03, D-04 |
| T-05 | User profile | A user views and edits their own profile (name, photo, department, year, interests) and can view other users' profiles. | D-01, D-02, D-03, D-04 |
| T-06 | Club / project team request | A logged-in student requests a new club or project team with its name, type (club or project team), category, and description. The request is stored as *Pending*; the requester can see its status (Pending, Approved, Rejected) and, if it is rejected, the reason. Once it is approved, the requester becomes its Captain and first member. | D-01, D-02, D-03, D-04 |
| T-07 | Platform Administrator approval and captain change | A Platform Administrator sees the list of pending requests, checks whether each club or project team is legitimate, and approves it or rejects it with a reason. Only approved clubs and project teams are visible on the platform. The Platform Administrator can also change the Captain of a club or project team when needed (for example, when the Captain graduates or leaves); the new Captain must already be a member, and the previous Captain becomes a regular Member. Platform Administrator accounts are created by the team, not through sign-up, and these screens exist only in the web application. | D-01, D-02, D-03 |
| T-08 | Roles and permissions | All features require a logged-in, verified account, so "public" means visible to every logged-in user. Each club or project team has four roles. A Student (non-member) sees public content; a Member also sees member-only events; a Manager can also manage events, posts, comments on the club's or team's posts, the profile page, and membership requests, and can remove Members; the Captain can also make a Member a Manager or return a Manager to Member, remove Managers from the club or team, and hand over the Captain role to another member, after which the previous Captain becomes a regular Member. The backend checks these rights on every request. | D-01, D-02, D-03, D-04 |
| T-09 | Club / project team profile page | Each approved club or project team has a public profile page (description, logo, contact info) that its Captain and Managers can edit. | D-01, D-02, D-03, D-04 |
| T-10 | Membership management | A student sends a membership request to a club or project team; its Captain or a Manager approves or rejects it; the Captain or a Manager can also remove a Member from the club or team, and only the Captain can remove a Manager; members can leave, but a Captain must hand over the Captain role first; the member list is shown on the profile page. | D-01, D-02, D-03, D-04 |
| T-11 | Follow / unfollow | A user follows or unfollows a club or project team to see its posts in their home feed and its public events in their calendar without becoming a member. | D-01, D-02, D-03, D-04 |
| T-12 | Event management | Captains and Managers create, edit, and delete events of different types (social event, lecture/talk, meeting, workshop) with date, time, location, and public or member-only visibility. | D-01, D-02, D-03, D-04 |
| T-13 | RSVP and attendance | A user responds to an event as going or not going (only members can respond to member-only events), and the Captain and Managers see the attendee list (the users who answered going). | D-01, D-02, D-03, D-04 |
| T-14 | Personal calendar | A user sees a calendar of upcoming events from the clubs and project teams they joined or follow, with the events they are going to highlighted. | D-01, D-03, D-04 |
| T-15 | Posts with media | Captains and Managers publish posts on behalf of their club or project team with text, photos, and videos (uploaded directly from the app to Cloudinary), and can edit or delete them. | D-01, D-02, D-03, D-04 |
| T-16 | Likes and comments | Logged-in users like and unlike posts, and add and delete their own comments; the Captain and Managers can also delete comments on their club's or team's posts. | D-01, D-02, D-03, D-04 |
| T-17 | Feeds | Each club and project team has its own feed, and each user has a personal home feed built from the clubs and project teams they joined or follow; feeds show the newest posts first and load page by page. | D-01, D-03, D-04 |
| T-18 | Discover and search | Users browse clubs, project teams, upcoming public events, and popular posts (ranked by likes); search clubs and project teams by name and events by title; and filter clubs and project teams by category and events by type. | D-01, D-03, D-04 |
| T-19 | Testing | Write and run automated backend tests and manual test cases for the web and mobile applications, and create the dummy-data seed script used for testing and the demo. | D-02, D-05 |
| T-20 | Deployment and release | Deploy the backend and the web application to Vercel, produce the mobile build, and publish release `v1.0.0` on `main`. | D-06 |
| T-21 | Documentation | Write the README, the API documentation, and the course reports. | D-07 |

T-03–T-18 are the functional requirements; T-01, T-02, and T-19–T-21 are supporting tasks needed to design, build, test, deploy, and document the system. D-02 is listed only for tasks that add tables or fields to the database; tasks that only read existing data (T-14, T-17, T-18) use it through D-01.

### 1.4 Non-functional Issues

Describe relevant quality attributes, including security, performance, and usability.

| Quality attribute | Requirement / concern | How it will be assessed |
|---|---|---|
| Security | Only verified `@itu.edu.tr` accounts and the Platform Administrator accounts created by the team can use the platform. Passwords are hashed with bcrypt and never stored or returned in plain text. API access uses JWT tokens with an expiry time. Role and Platform Administrator checks are enforced on the backend, not only in the user interface. All traffic, including the database connection, uses HTTPS/SSL. Secrets (database password, JWT key, Cloudinary keys, Gmail app password) are kept in `.env` files outside Git. Database access goes through SQLAlchemy to prevent SQL injection, and uploads are limited by file type and size through signed Cloudinary uploads created by the backend. | API tests try protected endpoints without a token, with an expired token, and with a lower role, and expect `401`/`403`. A manual check confirms that no password hash or secret appears in API responses or in the repository. |
| Performance | Typical API requests (login, feed page, event list) respond within 1 second with the seeded demo data. Feeds and lists are paginated (for example 20 items per page), so they do not load all records at once. Web pages show their first content within 3 seconds on a normal connection. | Response times are measured with Postman or the browser developer tools on the deployed system using the seeded data, and the slowest endpoints are noted in the Software Test Report. |
| Usability | The web and mobile apps offer the same main flows with a consistent design (only the Platform Administrator screens are web-only). The web app is responsive down to phone screen widths (about 360 px). A new student can sign up, find a club, and send a membership request without help. Clear error messages are shown for invalid input. Text and buttons keep readable contrast. | Usability walkthroughs with at least 3 students outside the team, who complete set tasks (sign up, join a club, RSVP to an event) while the team notes problems. The responsive layout is checked in browser device mode and on a phone. |
| Reliability | The system handles errors without crashing: the API returns clear JSON error messages, and the clients show them to the user. Database connections recover after idle periods on the Aiven free plan (connection pre-ping and recycling). Database constraints and transactions keep data consistent, for example no duplicate memberships or RSVPs. | Tests for invalid input, duplicate actions, and missing resources expect proper error codes. The `/api/health/db` endpoint is checked after the database has been idle. |
| Maintainability | Code follows one structure per part: Flask blueprints for the backend, and components and pages for the web and mobile apps. Every change goes through a feature branch and a pull request reviewed by at least one teammate. Database changes are made only through migrations. | Pull-request history on GitHub shows reviews before merging. Migrations recreate the schema on an empty database. |
| Compatibility | The web app works on current versions of Chrome, Firefox, Safari, and Edge. The mobile app runs on both Android and iOS from one Expo codebase. | Manual test runs on each listed browser and on at least one Android and one iOS device using Expo Go. |
| Privacy | Personal data is limited to what the platform needs (e-mail, name, department, year, interests, photo). Member-only events are shown only to members of that club or team. | API tests check that a non-member cannot see member-only events. The database fields are reviewed against this list in the Software Design Report. |

---

## 2. Project Plan — Work Breakdown Structure (WBS)

Decompose the tasks in Section 1.3 into smaller **subtasks / activities**. Give each WBS activity a unique ID, link it to its parent task, and estimate its size on this five-level scale:

**T = Tiny · S = Small · M = Medium · L = Large · XL = Extra-large**

| WBS activity ID | Parent task ID | Activity / subtask | Description / completion condition | Size (T/S/M/L/XL) |
|---|---|---|---|---|
| WBS-1.1 | T-01 | Repository and external services setup | Create the GitHub repository structure, configure .env templates, and set up Aiven MySQL, Cloudinary, and Gmail SMTP accounts; completed when all services are reachable from local configuration. | T |
| WBS-1.2 | T-01 | Backend skeleton and database schema migration | Initialize the Flask application, define SQLAlchemy models for all core entities, and generate the initial Flask-Migrate migration; completed when migrations build the full schema on an empty Aiven database. | M |
| WBS-1.3 | T-01 | Web and mobile application skeletons | Initialize the Next.js (TypeScript, Tailwind CSS, shadcn/ui) web app and the React Native (Expo, TypeScript) mobile app with shared API client utilities; completed when both apps build and call a health-check endpoint. | S |
| WBS-2.1 | T-02 | Shared design system and navigation flow | Define the color palette, typography, reusable component rules, and navigation structure across web and mobile; completed when the team approves the shared style guide. | S |
| WBS-2.2 | T-02 | Web and mobile screen wireframes | Create wireframes for all main student, member, manager, captain, and web-only Platform Administrator screens; completed when wireframes cover all flows required by T-03–T-18. | M |
| WBS-3.1 | T-03 | Sign-up and e-mail verification API | Implement endpoints for @itu.edu.tr registration, bcrypt password hashing, expiring verification links sent via Gmail SMTP, and link resending; completed when unverified accounts are blocked and verification activates the user. | S |
| WBS-3.2 | T-03 | Sign-up and verification web and mobile screens | Build registration forms, input validation, verification status pages, and resend triggers on web and mobile; completed when a student can register and verify their account from both clients. | S |
| WBS-4.1 | T-04 | Login, logout, and password-reset API | Implement JWT login, logout handling, password-reset e-mail delivery, and token-validated password update endpoints; completed when valid tokens are issued and expired reset links are rejected. | S |
| WBS-4.2 | T-04 | Login and password-reset web and mobile screens | Build login views, JWT session storage, logout actions, and password-reset screens on web and mobile; completed when users can log in, log out, and reset passwords end to end. | S |
| WBS-5.1 | T-05 | User profile and photo upload API | Implement endpoints to fetch user profiles, update own profile fields (name, department, year, interests), and generate signed Cloudinary upload parameters; completed when profile updates persist in MySQL. | T |
| WBS-5.2 | T-05 | User profile web and mobile screens | Build personal profile view/edit pages with direct Cloudinary photo upload and public user profile views on web and mobile; completed when changes display immediately on both platforms. | S |
| WBS-6.1 | T-06 | Club / project team request API | Implement endpoints for students to submit new club/team requests with Pending status and view their request status and rejection reasons; completed when requests are stored and retrievable by the requester. | T |
| WBS-6.2 | T-06 | Club / project team request web and mobile screens | Build the new club/team request form and the "My Requests" status tracking view on web and mobile; completed when a student can submit a request and see its state (Pending, Approved, Rejected). | S |
| WBS-7.1 | T-07 | Platform Administrator approval and captain change API | Implement admin-only endpoints to list pending requests, approve (assigning the requester as Captain and first member) or reject with a reason, and reassign the Captain role to an existing member; completed when non-admin calls return 403 and role transitions update atomically. | S |
| WBS-7.2 | T-07 | Platform Administrator web screens | Build the web-only administrator dashboard to review pending club/team requests and change a club's or team's Captain; completed when an administrator can approve, reject, and reassign captains from the browser. | S |
| WBS-8.1 | T-08 | Role-based access control (RBAC) and role management API | Implement backend middleware/decorators enforcing Student, Member, Manager, Captain, and Platform Administrator permissions, plus Captain endpoints to promote/demote Managers and hand over Captaincy; completed when unauthorized actions return `401`/`403` across all protected endpoints. | M |
| WBS-8.2 | T-08 | Role-aware UI guards and role management screens | Implement role-based visibility guards and Captain role-management controls (promote/demote Manager, transfer Captaincy) on web and mobile; completed when UI actions match the logged-in user's role in each club or team. | M |
| WBS-9.1 | T-09 | Club / project team profile API | Implement endpoints to retrieve approved club/team profiles and allow Captains and Managers to edit description, logo (via Cloudinary), and contact info; completed when only approved profiles are visible and editable by authorized roles. | T |
| WBS-9.2 | T-09 | Club / project team profile web and mobile screens | Build the public club/team profile view and the Captain/Manager profile editing interface on web and mobile; completed when profile updates and logos render properly on both platforms. | S |
| WBS-10.1 | T-10 | Membership management API | Implement endpoints for sending join requests, approving/rejecting requests, listing members, leaving a club/team (blocking Captains until handover), and removing Members/Managers per role rules; completed when duplicate memberships and invalid removals are rejected. | M |
| WBS-10.2 | T-10 | Membership management web and mobile screens | Build join/leave buttons, the public member list, and the Captain/Manager request-approval and member-removal views on web and mobile; completed when full membership lifecycles work on both clients. | M |
| WBS-11.1 | T-11 | Follow / unfollow API | Implement endpoints for users to follow and unfollow approved clubs/teams and check follow status; completed when follow relationships are stored without granting member-only access. | T |
| WBS-11.2 | T-11 | Follow / unfollow web and mobile UI | Add follow/unfollow toggle buttons and state indicators to club/team pages on web and mobile; completed when toggling updates the user's feed and calendar sources. | T |
| WBS-12.1 | T-12 | Event management API | Implement CRUD endpoints for Captains and Managers to publish, edit, and delete events (social, lecture/talk, meeting, workshop) with date, time, location, and public/member-only visibility; completed when non-members cannot fetch member-only events. | S |
| WBS-12.2 | T-12 | Event management web and mobile screens | Build event creation/editing forms for Captains/Managers and event detail pages on web and mobile; completed when events can be created, edited, viewed, and deleted on both platforms. | M |
| WBS-13.1 | T-13 | RSVP and attendance API | Implement endpoints to submit/update going or not-going responses (enforcing member checks on member-only events) and list attendees for Captains/Managers; completed when duplicate RSVPs are prevented by database constraints. | T |
| WBS-13.2 | T-13 | RSVP and attendee list web and mobile screens | Build RSVP toggle controls for users and the attendee list view for Captains/Managers on web and mobile; completed when RSVP changes immediately update attendance counts and lists. | S |
| WBS-14.1 | T-14 | Personal calendar API | Implement an endpoint aggregating upcoming events from clubs and teams the user joined or follows, including the user's RSVP status; completed when only authorized upcoming events are returned in chronological order. | T |
| WBS-14.2 | T-14 | Personal calendar web and mobile screens | Build the personal calendar view on web and mobile with visual highlights for events marked as "going"; completed when users can browse their upcoming schedule and open event details. | M |
| WBS-15.1 | T-15 | Posts and media API | Implement CRUD endpoints for Captains and Managers to publish, edit, and delete posts with text and signed Cloudinary photo/video uploads; completed when media metadata and post records are validated and stored. | M |
| WBS-15.2 | T-15 | Post composer and media display on web and mobile | Build post creation/editing forms with direct-to-Cloudinary photo/video upload and media rendering in post cards on web and mobile; completed when Captains/Managers can publish and manage multimedia posts. | L |
| WBS-16.1 | T-16 | Likes and comments API | Implement endpoints to like/unlike posts, add comments, and delete own comments or moderate comments as a club's Captain/Manager; completed when like counts and comment permissions pass API checks. | S |
| WBS-16.2 | T-16 | Likes and comments web and mobile UI | Build interactive like buttons, comment lists, comment input boxes, and deletion controls on web and mobile; completed when users and moderators can interact with posts in real time. | S |
| WBS-17.1 | T-17 | Club and personal home feeds API | Implement paginated endpoints (newest first) for individual club/team feeds and the personal home feed built from joined and followed clubs/teams; completed when paginated queries respond within 1 second on seeded data. | S |
| WBS-17.2 | T-17 | Feed screens and pagination on web and mobile | Build the personal home feed and club/team feed views with page-by-page loading on web and mobile; completed when feeds load smoothly without fetching all records at once. | M |
| WBS-18.1 | T-18 | Discover, search, and filtering API | Implement endpoints to browse popular posts (ranked by likes), upcoming public events, and clubs/teams, with search by name/title and filtering by club category and event type; completed when combined search and filter queries return accurate paginated results. | S |
| WBS-18.2 | T-18 | Discover and search web and mobile screens | Build the Discover page with tabs (clubs/teams, public events, popular posts), search bar, and category/type filter controls on web and mobile; completed when users can search and filter across both clients. | M |
| WBS-19.1 | T-19 | Dummy-data seed script | Write a repeatable seed script populating realistic users, pending/approved clubs and teams, roles, follows, events, RSVPs, posts, likes, and comments; completed when running the script populates an empty migrated database without errors. | S |
| WBS-19.2 | T-19 | Automated backend unit and API test suite | Write pytest unit and integration tests in `tests/` covering T-03–T-18, authentication/RBAC failures (`401`/`403`), and database constraints; completed when all automated tests run and pass with a single command. | L |
| WBS-19.3 | T-19 | Manual web/mobile testing and usability walkthroughs | Execute manual test cases across Chrome, Firefox, Safari, Edge, and Android/iOS (Expo Go), and conduct usability walkthroughs with at least 3 external students; completed when all findings and response-time checks are logged for the Software Test Report. | M |
| WBS-20.1 | T-20 | Backend and web production deployment | Deploy the Flask REST API and Next.js web app to Vercel connected to Aiven MySQL, Cloudinary, and Gmail SMTP, and verify `/api/health/db` recovery after idle periods; completed when both production URLs are live and stable. | S |
| WBS-20.2 | T-20 | Mobile build, end-to-end verification, and `v1.0.0` release | Produce the final Expo mobile build, run an end-to-end demo rehearsal across web and mobile, and tag release `v1.0.0` on `main` by 25.12.2026; completed when `v1.0.0` is published and ready for the demo. | S |
| WBS-21.1 | T-21 | Project Charter and Project Plan reports | Draft, review via pull request, and submit the Project Charter and Project Plan in `docs/` with their respective GitHub releases; completed when both reports are merged by their deadlines. | M |
| WBS-21.2 | T-21 | Requirement Specification and Requirement Analysis reports | Gather detailed requirements, write user stories and analysis models, and submit the Requirement Specification (02.11.2026) and Requirement Analysis (23.11.2026) reports in `docs/`; completed when both reports are reviewed and released. | XL |
| WBS-21.3 | T-21 | Software Design and Software Test reports | Document architecture, database schema, and component designs for the Software Design Report (07.12.2026), and compile test results for the Software Test Report (21.12.2026); completed when both reports are reviewed and released. | XL |
| WBS-21.4 | T-21 | Repository README and API documentation | Write the repository `README.md` (project overview, team roles, local setup and run guide) and complete `/api` endpoint documentation; completed when a new developer can set up and run the system using only the README. | S |

**WBS decomposition notes:**  
Each parent task (T-01–T-21) from Section 1.3 is decomposed into smaller, testable activities numbered WBS-1.1 through WBS-21.4. Functional tasks (T-03–T-18) are split horizontally into a Backend API & Database activity (.1) and a Web & Mobile Client UI activity (.2, except WBS-7.2, which is web-only for Platform Administrators). This separation reflects the team's structure—allowing backend endpoint development (led by Beyza) to proceed first or in parallel against agreed API contracts while web (led by Eslem) and mobile (led by Melih) interfaces are built and integrated. Supporting tasks (T-01, T-02, T-19, T-20, T-21) are split by milestone and artifact so that setup, design, testing, deployment, and the six course reports can be scheduled and tracked incrementally across the 12-week semester.

> **Course guideline note:** User stories for these subtasks will be written in the separate requirements document; this project plan defines and sizes the subtasks.

---

## 3. Estimates

Estimate effort for **each WBS activity** in **man-weeks (person-weeks)**. Keep the WBS IDs aligned with Section 2.

| WBS activity ID | Size | Estimated effort (man-weeks) | Basis / assumptions |
|---|---|---|---|
| WBS-1.1 | T | 0.25 | Standard repository setup and free-tier account configuration (Aiven, Cloudinary, Gmail SMTP). |
| WBS-1.2 | M | 0.75 | Designing the full relational schema upfront and configuring SQLAlchemy + Flask-Migrate with Aiven connection pooling. |
| WBS-1.3 | S | 0.50 | Scaffolding Next.js and Expo apps with TypeScript, Tailwind/shadcn, and shared API client wrappers using AI boilerplate generation. |
| WBS-2.1 | S | 0.50 | Defining shared styling tokens and navigation bars across web and mobile. |
| WBS-2.2 | M | 0.75 | Designing wireframes for all core flows plus the web-only Admin dashboard. |
| WBS-3.1 | S | 0.50 | Implementing `@itu.edu.tr` regex validation, bcrypt hashing, signed tokens, and Gmail SMTP sending. |
| WBS-3.2 | S | 0.50 | Building sign-up and verification screens on both Next.js and Expo. |
| WBS-4.1 | S | 0.50 | Standard `Flask-JWT-Extended` endpoints and expiring password-reset e-mail flow. |
| WBS-4.2 | S | 0.50 | Building login and password-reset forms and token persistence on web and mobile. |
| WBS-5.1 | T | 0.25 | Simple CRUD endpoints for user profile fields plus signed Cloudinary upload signature endpoint. |
| WBS-5.2 | S | 0.50 | Profile view/edit pages and image picker integration on web and mobile. |
| WBS-6.1 | T | 0.25 | Straightforward creation and status-listing endpoints for club/team requests. |
| WBS-6.2 | S | 0.50 | Request submission form and status badge view on web and mobile. |
| WBS-7.1 | S | 0.50 | Admin approval/rejection logic and transactional Captain reassignment between members. |
| WBS-7.2 | S | 0.50 | Web-only table and action modals for Platform Administrators (no mobile work required). |
| WBS-8.1 | M | 0.75 | Central RBAC decorators checking 4 club roles + Platform Admin across routes, plus role promotion/demotion/handover rules. |
| WBS-8.2 | M | 0.75 | Role-conditional rendering and Captain role-management UI across both web and mobile clients. |
| WBS-9.1 | T | 0.25 | Club/team profile read/update endpoints reusing Cloudinary upload signing. |
| WBS-9.2 | S | 0.50 | Public club/team profile layout and Captain/Manager edit form on web and mobile. |
| WBS-10.1 | M | 0.75 | Multi-role membership state machine (join request, approve/reject, leave constraints for Captain, remove Member vs. Manager). |
| WBS-10.2 | M | 0.75 | Member list, join/leave triggers, and management panels on both web and mobile. |
| WBS-11.1 | T | 0.25 | Simple join-table toggle endpoints for following and unfollowing approved clubs/teams. |
| WBS-11.2 | T | 0.25 | Follow/unfollow button state integration on web and mobile profile headers. |
| WBS-12.1 | S | 0.50 | Event CRUD endpoints with event type enum and public vs. member-only visibility filtering. |
| WBS-12.2 | M | 0.75 | Event creation/edit forms (with date/time pickers) and event detail views on web and mobile. |
| WBS-13.1 | T | 0.25 | RSVP upsert endpoint with member-only access check and attendee list query. |
| WBS-13.2 | S | 0.50 | RSVP buttons and Captain/Manager attendee list view on web and mobile. |
| WBS-14.1 | T | 0.25 | Read-only query joining events from joined/followed clubs with the user's RSVPs. |
| WBS-14.2 | M | 0.75 | Interactive calendar component and highlighted "going" events on both web and mobile. |
| WBS-15.1 | M | 0.75 | Post CRUD endpoints supporting multiple photo/video URLs and signed direct-to-Cloudinary upload validation. |
| WBS-15.2 | L | 1.00 | Direct client-to-Cloudinary photo/video upload progress handling and responsive media galleries on web and mobile. |
| WBS-16.1 | S | 0.50 | Like toggle and comment creation/deletion endpoints with Captain/Manager moderation checks. |
| WBS-16.2 | S | 0.50 | Like counters and comment thread components on web and mobile. |
| WBS-17.1 | S | 0.50 | Paginated SQLAlchemy queries for club feeds and aggregated home feeds. |
| WBS-17.2 | M | 0.75 | Paginated feed lists and state management on web and mobile. |
| WBS-18.1 | S | 0.50 | Search and filter queries for clubs/teams, upcoming public events, and popular posts by like count. |
| WBS-18.2 | M | 0.75 | Multi-tab Discover screen with search bar and category/event-type filters on web and mobile. |
| WBS-19.1 | S | 0.50 | AI-assisted generation of realistic campus clubs, users, events, and posts in a repeatable Python seed script. |
| WBS-19.2 | L | 1.00 | Comprehensive pytest suite covering all functional tasks (T-03–T-18), RBAC edge cases, and constraint checks. |
| WBS-19.3 | M | 0.75 | Cross-browser testing, Android/iOS device testing via Expo Go, performance timing, and 3 external student usability sessions. |
| WBS-20.1 | S | 0.50 | Configuring Vercel serverless deployment for Flask and Next.js, environment variables, and Aiven idle recovery check. |
| WBS-20.2 | S | 0.50 | Building the Expo release, running the final demo rehearsal, and tagging `v1.0.0` on `main`. |
| WBS-21.1 | M | 0.75 | Writing, reviewing, and releasing the Project Charter and Project Plan documents. |
| WBS-21.2 | XL | 1.50 | Writing and reviewing the Requirement Specification and Requirement Analysis reports across all 4 team members. |
| WBS-21.3 | XL | 1.50 | Writing and reviewing the Software Design Report and Software Test Report across all 4 team members. |
| WBS-21.4 | S | 0.50 | Writing the setup/run `README.md` and documenting all `/api` endpoints. |
| **Total** | — | **27.25** | **Sum of 46 WBS activities (8 T, 21 S, 13 M, 2 L, 2 XL) across the 12-week project timeline.** |

**Estimation method:**  
The team used a calibrated T-shirt sizing method mapped directly to **man-weeks (person-weeks)**, where **1 man-week** represents one team member's weekly project allocation:
- **T (Tiny) = 0.25 man-weeks:** Single-endpoint logic or minor UI components with minimal dependencies.
- **S (Small) = 0.50 man-weeks:** Standard API modules, single-platform screens (such as the web-only Admin dashboard), or straightforward dual-client screens.
- **M (Medium) = 0.75 man-weeks:** Multi-role business logic (such as RBAC and membership rules) or interactive screens implemented across both Next.js and React Native Expo.
- **L (Large) = 1.00 man-week:** Complex cross-platform multimedia workflows (direct Cloudinary photo/video uploads and galleries) and the full automated API test suite.
- **XL (Extra-large) = 1.50 man-weeks:** Major multi-week engineering report pairs (Requirement Specification + Analysis, and Software Design + Test Reports) requiring collaborative writing and peer review from all four members.

Because the team actively uses AI assistants (Claude Opus 5.x, Gemini, and GPT 5.x) for boilerplate code generation, SQLAlchemy query drafting, dummy-data seeding, unit test scaffolding, and debugging, implementation effort is reduced by approximately 30–35% compared to traditional manual coding, while preserving manual review and testing time before every pull request merge. Across the 12-week schedule (`05.10.2026` to `28.12.2026`), a total effort of **27.25 man-weeks** requires an average of **~2.27 man-weeks per calendar week** across the 4-member team (roughly **0.57 FTE per student**), which fits realistic part-time student availability alongside other university coursework.

**Effort versus duration:** If an activity requires **2 man-weeks** and **2 fully allocated team members** can work in parallel, its estimated duration is **1 week** (assuming no other constraints). Scheduling must account for actual availability and dependencies. Also, take the AI agent(s) into the account.

---

## 4. Resources

### 4.1 Team Structure and Member Roles

The team (Al-ı Memnu) has four members. All members are full-stack developers and take part in every phase of the project; in addition, each member leads one area. Leads own their layer of the code, but members also help in other layers when the schedule needs it (for example, the QA Lead builds the backend of some features in busy weeks).

| Member | Student ID | Role(s) | Main responsibilities |
|---|---|---|---|
| Melih Kart | 150200701 | Project Manager, Product Owner & Full-Stack Developer (Mobile Lead) | Planning, scheduling, task tracking on the GitHub Projects board, risk management, team coordination, and repository management; leads the React Native (Expo) mobile screens, the web deployment, and the final mobile build; leads the Project Charter and Project Plan. |
| Beyza Arısan | 150230069 | Full-Stack Developer & Backend Lead | Leads the Flask REST API, the database schema and migrations, system architecture, backend deployment, and the `v1.0.0` release; leads the Software Design Report and the API documentation. |
| Eslem Azra Yılmaz | 150220110 | Full-Stack Developer & Frontend Lead | Leads the Next.js web screens, the shared design system and wireframes, reusable components, responsive layouts, browser testing, and the usability walkthroughs. |
| Yusuf Erdem Cıdık | 040230205 | Full-Stack Developer & Requirements and QA Lead | Leads requirement gathering, communication with the customer (TA) and `customer-requests` issues, the seed data, the automated test suite, and manual test reporting; builds the backend of selected features (T-06, T-07, T-11, T-16, and parts of others); leads the Requirement Specification, Requirement Analysis, and Software Test Reports. |

**AI assistants.** Claude Opus 5.x, Gemini, and GPT 5.x are not counted as team members or FTE. Their effect is already included in the reduced effort estimates of Section 3 (boilerplate code, query drafts, seed data, test scaffolding, debugging). Every AI-generated change is owned, reviewed, and tested by the member assigned to the activity.

### 4.2 Member-to-Activity Assignment

**Allocation (FTE)** is the share of one member's weekly project time given to the activity in each week it runs (or only in the weeks noted in brackets), using the same unit as Section 3 (1 man-week = one member's weekly project allocation). For every activity, the sum of its allocations multiplied by its duration in weeks (Section 5) equals its effort estimate in Section 3; for example, WBS-1.2 has 0.6 + 0.15 = 0.75 FTE for 1 week = 0.75 man-weeks, and WBS-15.2 has 0.2 + 0.3 = 0.5 FTE for 2 weeks = 1.0 man-week.

| WBS activity ID | Assigned member | Responsibility | Allocation to activity (FTE) |
|---|---|---|---|
| WBS-1.1 | Melih Kart | Creates the repository structure, GitHub Projects board, labels and `.env` templates | 0.15 |
| WBS-1.1 | Beyza Arısan | Sets up the Aiven MySQL, Cloudinary and Gmail SMTP accounts | 0.1 |
| WBS-1.2 | Beyza Arısan | Builds the Flask skeleton (with a health-check endpoint), SQLAlchemy models and the first migration | 0.6 |
| WBS-1.2 | Yusuf Erdem Cıdık | Reviews the models against the requirements | 0.15 |
| WBS-1.3 | Melih Kart | Creates the Expo (TypeScript) skeleton and the shared API client | 0.25 |
| WBS-1.3 | Eslem Azra Yılmaz | Creates the Next.js (Tailwind CSS, shadcn/ui) skeleton and the shared API client | 0.25 |
| WBS-2.1 | Melih Kart | Applies the design system to mobile navigation | 0.2 |
| WBS-2.1 | Eslem Azra Yılmaz | Defines colours, typography, component rules and web navigation | 0.3 |
| WBS-2.2 | Melih Kart | Draws the mobile wireframes | 0.15 |
| WBS-2.2 | Eslem Azra Yılmaz | Draws the web wireframes, including the admin screens | 0.45 |
| WBS-2.2 | Yusuf Erdem Cıdık | Checks that the wireframes cover all flows of T-03–T-18 | 0.15 |
| WBS-3.1 | Beyza Arısan | Implements the Sign-up & verification endpoints and their API checks | 0.5 |
| WBS-3.2 | Melih Kart | Builds the mobile screens | 0.25 |
| WBS-3.2 | Eslem Azra Yılmaz | Builds the web screens | 0.25 |
| WBS-4.1 | Beyza Arısan | Implements the Login & password-reset endpoints and their API checks | 0.5 |
| WBS-4.2 | Melih Kart | Builds the mobile screens | 0.25 |
| WBS-4.2 | Eslem Azra Yılmaz | Builds the web screens | 0.25 |
| WBS-5.1 | Beyza Arısan | Implements the User profile endpoints and their API checks | 0.25 |
| WBS-5.2 | Melih Kart | Builds the mobile screens | 0.25 |
| WBS-5.2 | Eslem Azra Yılmaz | Builds the web screens | 0.25 |
| WBS-6.1 | Yusuf Erdem Cıdık | Implements the Club/team request endpoints and their API checks | 0.25 |
| WBS-6.2 | Melih Kart | Builds the mobile screens | 0.25 |
| WBS-6.2 | Eslem Azra Yılmaz | Builds the web screens | 0.25 |
| WBS-7.1 | Yusuf Erdem Cıdık | Implements the Admin approval & captain change endpoints and their API checks | 0.5 |
| WBS-7.2 | Eslem Azra Yılmaz | Builds the web-only administrator dashboard | 0.15 (week of 16 Nov), 0.35 (week of 23 Nov) |
| WBS-8.1 | Beyza Arısan | Implements the main endpoints and database changes | 0.6 |
| WBS-8.1 | Yusuf Erdem Cıdık | Implements part of the endpoints and their API tests | 0.15 |
| WBS-8.2 | Melih Kart | Builds the mobile screens | 0.4 |
| WBS-8.2 | Eslem Azra Yılmaz | Builds the web screens | 0.35 |
| WBS-9.1 | Beyza Arısan | Implements the Club/team profile endpoints and their API checks | 0.25 |
| WBS-9.2 | Melih Kart | Builds the mobile screens | 0.3 |
| WBS-9.2 | Eslem Azra Yılmaz | Builds the web screens | 0.2 |
| WBS-10.1 | Beyza Arısan | Implements the main endpoints and database changes | 0.5 |
| WBS-10.1 | Yusuf Erdem Cıdık | Implements part of the endpoints and their API tests | 0.25 |
| WBS-10.2 | Melih Kart | Builds the mobile screens | 0.4 |
| WBS-10.2 | Eslem Azra Yılmaz | Builds the web screens | 0.35 |
| WBS-11.1 | Yusuf Erdem Cıdık | Implements the Follow / unfollow endpoints and their API checks | 0.25 |
| WBS-11.2 | Melih Kart | Builds the mobile screens | 0.15 |
| WBS-11.2 | Eslem Azra Yılmaz | Builds the web screens | 0.1 |
| WBS-12.1 | Beyza Arısan | Implements the main endpoints and database changes | 0.4 |
| WBS-12.1 | Yusuf Erdem Cıdık | Implements part of the endpoints and their API tests | 0.1 |
| WBS-12.2 | Melih Kart | Builds the mobile screens | 0.4 |
| WBS-12.2 | Eslem Azra Yılmaz | Builds the web screens | 0.35 |
| WBS-13.1 | Beyza Arısan | Implements the RSVP & attendance endpoints and their API checks | 0.25 |
| WBS-13.2 | Melih Kart | Builds the mobile screens | 0.25 |
| WBS-13.2 | Eslem Azra Yılmaz | Builds the web screens | 0.25 |
| WBS-14.1 | Beyza Arısan | Implements the Personal calendar endpoints and their API checks | 0.25 |
| WBS-14.2 | Melih Kart | Builds the mobile screens | 0.4 |
| WBS-14.2 | Eslem Azra Yılmaz | Builds the web screens | 0.35 |
| WBS-15.1 | Beyza Arısan | Implements the main endpoints and database changes | 0.6 |
| WBS-15.1 | Yusuf Erdem Cıdık | Implements part of the endpoints and their API tests | 0.15 |
| WBS-15.2 | Melih Kart | Builds the mobile screens | 0.3 |
| WBS-15.2 | Eslem Azra Yılmaz | Builds the web screens | 0.2 |
| WBS-16.1 | Yusuf Erdem Cıdık | Implements the Likes & comments endpoints and their API checks | 0.5 |
| WBS-16.2 | Melih Kart | Builds the mobile screens | 0.25 |
| WBS-16.2 | Eslem Azra Yılmaz | Builds the web screens | 0.25 |
| WBS-17.1 | Beyza Arısan | Implements the Feeds endpoints and their API checks | 0.5 |
| WBS-17.2 | Melih Kart | Builds the mobile screens | 0.4 |
| WBS-17.2 | Eslem Azra Yılmaz | Builds the web screens | 0.35 |
| WBS-18.1 | Beyza Arısan | Implements the main endpoints and database changes | 0.25 |
| WBS-18.1 | Yusuf Erdem Cıdık | Implements part of the endpoints and their API tests | 0.25 |
| WBS-18.2 | Melih Kart | Builds the mobile Discover screen | 0.1 |
| WBS-18.2 | Beyza Arısan | Builds the Discover web tabs and filter controls | 0.3 |
| WBS-18.2 | Eslem Azra Yılmaz | Builds the web search bar and connects the web screens to the API | 0.2 |
| WBS-18.2 | Yusuf Erdem Cıdık | Builds the mobile filter controls | 0.15 |
| WBS-19.1 | Beyza Arısan | Writes the repeatable seed script | 0.2 |
| WBS-19.1 | Yusuf Erdem Cıdık | Prepares realistic demo data (clubs, users, events, posts) | 0.3 |
| WBS-19.2 | Beyza Arısan | Reviews the tests and fixes failing endpoints | 0.1 |
| WBS-19.2 | Yusuf Erdem Cıdık | Writes the pytest unit and API tests, including `401`/`403` and constraint cases | 0.4 |
| WBS-19.3 | Melih Kart | Runs Android and iOS tests through Expo Go | 0.25 |
| WBS-19.3 | Eslem Azra Yılmaz | Runs browser tests (Chrome, Firefox, Safari, Edge) and the usability walkthroughs | 0.25 |
| WBS-19.3 | Yusuf Erdem Cıdık | Logs all findings and response-time checks for the Software Test Report | 0.25 |
| WBS-20.1 | Melih Kart | Deploys the Next.js web app to Vercel | 0.2 |
| WBS-20.1 | Beyza Arısan | Deploys the Flask API to Vercel and checks `/api/health/db` after idle periods | 0.3 |
| WBS-20.2 | Melih Kart | Produces the final Expo build and runs the end-to-end demo rehearsal | 0.3 |
| WBS-20.2 | Beyza Arısan | Tags and publishes release `v1.0.0` on `main` | 0.2 |
| WBS-21.1 | Melih Kart | Leads and edits the Project Charter and Project Plan | 0.1 |
| WBS-21.1 | Beyza Arısan | Writes and reviews assigned sections of the Charter and Plan | 0.05 |
| WBS-21.1 | Eslem Azra Yılmaz | Writes and reviews assigned sections of the Charter and Plan | 0.05 |
| WBS-21.1 | Yusuf Erdem Cıdık | Writes and reviews assigned sections of the Charter and Plan | 0.05 |
| WBS-21.2 | Melih Kart | Writes user stories, models and assigned sections; reviews the PRs | 0.1 |
| WBS-21.2 | Beyza Arısan | Writes user stories, models and assigned sections; reviews the PRs | 0.05 |
| WBS-21.2 | Eslem Azra Yılmaz | Writes user stories, models and assigned sections; reviews the PRs | 0.15 (week of 26 Oct, 02 Nov only) |
| WBS-21.2 | Yusuf Erdem Cıdık | Leads and edits the Requirement Specification and Requirement Analysis | 0.15 |
| WBS-21.3 | Melih Kart | Writes and reviews assigned sections of both reports | 0.05 |
| WBS-21.3 | Beyza Arısan | Leads the Software Design Report | 0.125 |
| WBS-21.3 | Eslem Azra Yılmaz | Writes and reviews assigned sections of both reports | 0.05 (week of 30 Nov), 0.15 (week of 14 Dec) |
| WBS-21.3 | Yusuf Erdem Cıdık | Leads the Software Test Report | 0.15 |
| WBS-21.4 | Melih Kart | Writes the README sections for their part (setup, run guide) | 0.05 |
| WBS-21.4 | Beyza Arısan | Writes the `/api` endpoint documentation | 0.15 |
| WBS-21.4 | Eslem Azra Yılmaz | Writes the README sections for their part (setup, run guide) | 0.1 (week of 14 Dec only) |

**Availability or allocation constraints:**
- **Part-time work.** All members are students taking other courses, so each member's total allocation in any week is limited to **1.0** (their full weekly project time). The allocations above were added up week by week: no member goes above 1.0 in any week, and the average load over the 12 weeks is about 0.57 per member, which matches Section 3.
- **Busiest weeks.** The weeks of 9 November to 13 December carry the most parallel feature work; members' loads in these weeks are between 0.4 and 1.0. To keep the Backend Lead within capacity, the backend of T-06, T-07, T-11, and T-16 is assigned to the QA Lead, and the Backend Lead and the QA Lead help with the Discover screens (WBS-18.2) in the week of 7 December.
- **Lighter weeks.** The first weeks (setup) and the last two weeks (testing and release) have lower loads. This leaves room for report work and for fixing problems found in testing before the code freeze.
- **Report deadlines.** Report work (WBS-21.x) is spread over the weeks before each deadline and is included in the weekly totals; each report's lead gets the largest share.
- **Exams and other commitments.** Midterm periods and assignments of other courses can lower availability in some weeks. In those weeks, non-critical activities are moved within their slack (Section 5.2), and members help each other across layers when a critical activity is at risk.
- **Holidays.** 29 October (Republic Day) falls in the week of WBS-3.2 and WBS-4.1; the lost day is covered by the members' remaining capacity in that week.
- **Free-plan and device limits.** Hardware and software resources are limited to free plans (Aiven, Vercel Hobby, Cloudinary, Gmail SMTP, Expo Go), as stated in Section 1.1. iOS testing depends on members' access to an iPhone.

---

## 5. Schedule

### 5.1 PERT Chart — Activity Sequence

Nodes are the WBS activities from Section 2 with their durations in weeks; arrows show that an activity cannot start before its predecessor is finished. The **main critical path** is shown in dark red; other activities with zero slack are shown in light red. The documentation activities (WBS-21.x) follow fixed course deadlines and are shown in the Gantt chart (Section 5.3).

```mermaid
flowchart LR
    START((Start<br/>05 Oct))
    N1_1["WBS-1.1<br/>Repository and external services setup<br/>1 w"]
    N1_2["WBS-1.2<br/>Backend skeleton and DB schema migration<br/>1 w"]
    N1_3["WBS-1.3<br/>Web and mobile app skeletons<br/>1 w"]
    N2_1["WBS-2.1<br/>Shared design system and navigation<br/>1 w"]
    N2_2["WBS-2.2<br/>Screen wireframes<br/>1 w"]
    N3_1["WBS-3.1<br/>Sign-up & verification API<br/>1 w"]
    N3_2["WBS-3.2<br/>Sign-up & verification screens<br/>1 w"]
    N4_1["WBS-4.1<br/>Login & password-reset API<br/>1 w"]
    N4_2["WBS-4.2<br/>Login & password-reset screens<br/>1 w"]
    N5_1["WBS-5.1<br/>User profile API<br/>1 w"]
    N5_2["WBS-5.2<br/>User profile screens<br/>1 w"]
    N6_1["WBS-6.1<br/>Club/team request API<br/>1 w"]
    N6_2["WBS-6.2<br/>Club/team request screens<br/>1 w"]
    N7_1["WBS-7.1<br/>Admin approval & captain change API<br/>1 w"]
    N7_2["WBS-7.2<br/>Admin web screens<br/>2 w"]
    N8_1["WBS-8.1<br/>RBAC & role management API<br/>1 w"]
    N8_2["WBS-8.2<br/>Role-aware UI & role management screens<br/>1 w"]
    N9_1["WBS-9.1<br/>Club/team profile API<br/>1 w"]
    N9_2["WBS-9.2<br/>Club/team profile screens<br/>1 w"]
    N10_1["WBS-10.1<br/>Membership management API<br/>1 w"]
    N10_2["WBS-10.2<br/>Membership management screens<br/>1 w"]
    N11_1["WBS-11.1<br/>Follow / unfollow API<br/>1 w"]
    N11_2["WBS-11.2<br/>Follow / unfollow UI<br/>1 w"]
    N12_1["WBS-12.1<br/>Event management API<br/>1 w"]
    N12_2["WBS-12.2<br/>Event management screens<br/>1 w"]
    N13_1["WBS-13.1<br/>RSVP & attendance API<br/>1 w"]
    N13_2["WBS-13.2<br/>RSVP & attendee list screens<br/>1 w"]
    N14_1["WBS-14.1<br/>Personal calendar API<br/>1 w"]
    N14_2["WBS-14.2<br/>Personal calendar screens<br/>1 w"]
    N15_1["WBS-15.1<br/>Posts & media API<br/>1 w"]
    N15_2["WBS-15.2<br/>Post composer & media display<br/>2 w"]
    N16_1["WBS-16.1<br/>Likes & comments API<br/>1 w"]
    N16_2["WBS-16.2<br/>Likes & comments UI<br/>1 w"]
    N17_1["WBS-17.1<br/>Feeds API<br/>1 w"]
    N17_2["WBS-17.2<br/>Feed screens & pagination<br/>1 w"]
    N18_1["WBS-18.1<br/>Discover, search & filtering API<br/>1 w"]
    N18_2["WBS-18.2<br/>Discover & search screens<br/>1 w"]
    N19_1["WBS-19.1<br/>Dummy-data seed script<br/>1 w"]
    N19_2["WBS-19.2<br/>Automated backend test suite<br/>2 w"]
    N19_3["WBS-19.3<br/>Manual testing & usability walkthroughs<br/>1 w"]
    N20_1["WBS-20.1<br/>Backend & web production deployment<br/>1 w"]
    N20_2["WBS-20.2<br/>Mobile build, E2E check & v1.0.0 release<br/>1 w"]
    START --> N1_1
    N1_1 --> N1_2
    N1_1 --> N1_3
    N1_1 --> N2_1
    N2_1 --> N2_2
    N1_2 --> N3_1
    N3_1 --> N3_2
    N1_3 --> N3_2
    N2_2 --> N3_2
    N3_1 --> N4_1
    N4_1 --> N4_2
    N3_2 --> N4_2
    N4_1 --> N5_1
    N5_1 --> N5_2
    N4_2 --> N5_2
    N4_1 --> N6_1
    N6_1 --> N6_2
    N4_2 --> N6_2
    N6_1 --> N7_1
    N8_1 --> N7_1
    N7_1 --> N7_2
    N6_2 --> N7_2
    N8_2 --> N7_2
    N4_1 --> N8_1
    N8_1 --> N8_2
    N4_2 --> N8_2
    N8_1 --> N9_1
    N9_1 --> N9_2
    N8_2 --> N9_2
    N9_1 --> N10_1
    N10_1 --> N10_2
    N9_2 --> N10_2
    N9_1 --> N11_1
    N11_1 --> N11_2
    N9_2 --> N11_2
    N9_1 --> N12_1
    N12_1 --> N12_2
    N9_2 --> N12_2
    N12_1 --> N13_1
    N13_1 --> N13_2
    N12_2 --> N13_2
    N13_1 --> N14_1
    N11_1 --> N14_1
    N14_1 --> N14_2
    N13_2 --> N14_2
    N11_2 --> N14_2
    N8_1 --> N15_1
    N15_1 --> N15_2
    N8_2 --> N15_2
    N15_1 --> N16_1
    N16_1 --> N16_2
    N15_2 --> N16_2
    N10_1 --> N17_1
    N11_1 --> N17_1
    N15_1 --> N17_1
    N17_1 --> N17_2
    N16_2 --> N17_2
    N10_2 --> N17_2
    N11_2 --> N17_2
    N12_1 --> N18_1
    N16_1 --> N18_1
    N18_1 --> N18_2
    N16_2 --> N18_2
    N12_2 --> N18_2
    N1_2 --> N19_1
    N14_1 --> N19_2
    N17_1 --> N19_2
    N18_1 --> N19_2
    N5_1 --> N19_2
    N7_1 --> N19_2
    N19_1 --> N19_2
    N14_2 --> N19_3
    N17_2 --> N19_3
    N18_2 --> N19_3
    N5_2 --> N19_3
    N7_2 --> N19_3
    N20_1 --> N19_3
    N1_2 --> N20_1
    N1_3 --> N20_1
    N19_2 --> N20_2
    N19_3 --> N20_2
    N20_2 --> FINISH((Code freeze<br/>25 Dec))
    classDef critical fill:#ffe1e1,stroke:#d33,stroke-width:3px;
    classDef main fill:#ffb3b3,stroke:#a00,stroke-width:4px;
    class N2_1,N2_2,N4_1,N8_1,N9_1,N12_1,N13_1,N14_1,N15_1,N15_2,N16_2,N17_2,N18_2,N19_2 critical;
    class N1_1,N1_2,N3_1,N3_2,N4_2,N8_2,N9_2,N12_2,N13_2,N14_2,N19_3,N20_2 main;
```

**PERT notes (activity durations and dependencies):**
- **Durations.** Each activity's duration comes from its effort in Section 3 and the members assigned to it in Section 4.2 (duration = effort ÷ total allocation). Most activities take 1 week; the admin screens (WBS-7.2), the post composer (WBS-15.2), and the automated test suite (WBS-19.2) take 2 weeks.
- **Setup first.** Everything starts from WBS-1.1. The backend skeleton (WBS-1.2), the web and mobile skeletons (WBS-1.3), and the design system (WBS-2.1) run in parallel in the second week. The health-check endpoint is the first part of WBS-1.2, so WBS-1.3 can call it in the same week.
- **Backend first, then clients.** For each feature, the API activity (.1) is finished one week before its web and mobile screens (.2), so the clients are built against working endpoints. While the clients build one feature, the backend already works on the next one; this keeps both groups busy without waiting.
- **Feature order follows data dependencies.** Sign-up (T-03) comes before login (T-04); every later feature needs a logged-in user. Roles (T-08) come before the club profile page (T-09), posts (T-15), and the admin screens (T-07). Membership (T-10), follow (T-11), and events (T-12) need club profiles. RSVPs (T-13) need events. The calendar (T-14) needs RSVPs and follows; feeds (T-17) need posts, memberships, and follows; Discover (T-18) needs events and likes, because popular posts are ranked by likes.
- **Early deployment.** WBS-20.1 is done early (week of 26 October) so the team works against the real Vercel and Aiven setup from the start; the apps are then redeployed after each merge.
- **Testing and release.** The automated test suite (WBS-19.2) starts when all APIs are finished. Manual testing and usability walkthroughs (WBS-19.3) run on the deployed system after all screens are finished, and the release (WBS-20.2) comes last.

### 5.2 Critical Path and Total Project Duration

The critical path is the longest path from start to finish. It was found with a forward pass (earliest start and finish of every activity) and a backward pass (latest start and finish); activities with zero slack are critical.

**Critical path (in activity order):**  
`WBS-1.1 → WBS-1.2 → WBS-3.1 → WBS-3.2 → WBS-4.2 → WBS-8.2 → WBS-9.2 → WBS-12.2 → WBS-13.2 → WBS-14.2 → WBS-19.3 → WBS-20.2`

| Critical-path activity ID | Duration (weeks) | Reason it is critical |
|---|---|---|
| WBS-1.1 | 1 | First activity; every other activity needs the repository and the external services. |
| WBS-1.2 | 1 | No API can be built before the Flask skeleton and the database schema exist. |
| WBS-3.1 | 1 | Sign-up is the first feature API; all user-related features depend on it. |
| WBS-3.2 | 1 | The sign-up screens are needed before the login screens can complete the account flow. |
| WBS-4.2 | 1 | Every later screen needs a logged-in user and a stored JWT session. |
| WBS-8.2 | 1 | Club screens show different actions for each role, so role-aware UI must exist first. |
| WBS-9.2 | 1 | Membership, follow, and event screens are opened from the club / team profile page. |
| WBS-12.2 | 1 | RSVP controls are placed on the event detail screens. |
| WBS-13.2 | 1 | The calendar highlights events the user is going to, so RSVP screens must exist. |
| WBS-14.2 | 1 | Last feature screens on the longest chain; manual testing needs all screens. |
| WBS-19.3 | 1 | Manual testing and usability checks must finish before the release. |
| WBS-20.2 | 1 (21–25 Dec) | The `v1.0.0` release on `main` is the end of the project (code freeze). |

**Total project schedule:** **12 weeks**, from **2026-10-05** to **2026-12-25** (code freeze, release `v1.0.0`), followed by the demo on 2026-12-26 and the presentation in the week of 2026-12-28.

**Critical-path explanation:**  
The main critical path adds up to 1 × 12 = 12 weeks, which is the length of the project: a one-week delay in any of its activities moves the code freeze by one week. Because most activities take 1 week and the backend and clients work in a pipeline, several parallel chains also have zero slack (for example the backend chain WBS-4.1 → WBS-8.1 → WBS-9.1 → WBS-12.1 → WBS-13.1 → WBS-14.1, and the posts chain WBS-15.1 → WBS-15.2 → WBS-16.2 → WBS-17.2 / WBS-18.2 → WBS-19.3); these are shown in light red and are watched as closely as the main path. Activities off the critical path have slack: the user profile (WBS-5.x) has 4 weeks, the club request and admin activities (WBS-6.x, WBS-7.x) have 2 weeks, membership, follow, likes, feeds, and discover APIs (WBS-10.x, WBS-11.x, WBS-16.1, WBS-17.1, WBS-18.1) have 1 week, the seed script (WBS-19.1) has 6 weeks, and the first deployment (WBS-20.1) has 7 weeks. The schedule is resource-leveled: some non-critical activities (WBS-10.2, WBS-16.1, WBS-18.1, WBS-20.1) start later than their earliest start, but always within their slack.

### 5.3 Gantt Chart — Project Timeline

Critical activities are marked `crit` (shown in red). Milestones are the report deadlines and the end-of-term dates.

```mermaid
gantt
    title Clublibrary — Project Timeline (Fall 2026)
    dateFormat YYYY-MM-DD
    axisFormat %d %b

    section Setup & Design
    WBS-1.1 Repository and external services setup :crit, t1_1, 2026-10-05, 7d
    WBS-1.2 Backend skeleton and DB schema migration :crit, t1_2, 2026-10-12, 7d
    WBS-1.3 Web and mobile app skeletons :t1_3, 2026-10-12, 7d
    WBS-2.1 Shared design system and navigation :crit, t2_1, 2026-10-12, 7d
    WBS-2.2 Screen wireframes :crit, t2_2, 2026-10-19, 7d
    WBS-20.1 Backend & web production deployment :t20_1, 2026-10-26, 7d
    WBS-19.1 Dummy-data seed script :t19_1, 2026-10-19, 7d

    section Accounts & Roles
    WBS-3.1 Sign-up & verification API :crit, t3_1, 2026-10-19, 7d
    WBS-3.2 Sign-up & verification screens :crit, t3_2, 2026-10-26, 7d
    WBS-4.1 Login & password-reset API :crit, t4_1, 2026-10-26, 7d
    WBS-4.2 Login & password-reset screens :crit, t4_2, 2026-11-02, 7d
    WBS-5.1 User profile API :t5_1, 2026-11-02, 7d
    WBS-5.2 User profile screens :t5_2, 2026-11-09, 7d
    WBS-6.1 Club/team request API :t6_1, 2026-11-02, 7d
    WBS-6.2 Club/team request screens :t6_2, 2026-11-09, 7d
    WBS-8.1 RBAC & role management API :crit, t8_1, 2026-11-02, 7d
    WBS-8.2 Role-aware UI & role management screens :crit, t8_2, 2026-11-09, 7d
    WBS-7.1 Admin approval & captain change API :t7_1, 2026-11-09, 7d
    WBS-7.2 Admin web screens :t7_2, 2026-11-16, 14d

    section Clubs & Events
    WBS-9.1 Club/team profile API :crit, t9_1, 2026-11-09, 7d
    WBS-9.2 Club/team profile screens :crit, t9_2, 2026-11-16, 7d
    WBS-10.1 Membership management API :t10_1, 2026-11-16, 7d
    WBS-10.2 Membership management screens :t10_2, 2026-11-30, 7d
    WBS-11.1 Follow / unfollow API :t11_1, 2026-11-16, 7d
    WBS-11.2 Follow / unfollow UI :t11_2, 2026-11-23, 7d
    WBS-12.1 Event management API :crit, t12_1, 2026-11-16, 7d
    WBS-12.2 Event management screens :crit, t12_2, 2026-11-23, 7d
    WBS-13.1 RSVP & attendance API :crit, t13_1, 2026-11-23, 7d
    WBS-13.2 RSVP & attendee list screens :crit, t13_2, 2026-11-30, 7d
    WBS-14.1 Personal calendar API :crit, t14_1, 2026-11-30, 7d
    WBS-14.2 Personal calendar screens :crit, t14_2, 2026-12-07, 7d

    section Posts & Discovery
    WBS-15.1 Posts & media API :crit, t15_1, 2026-11-09, 7d
    WBS-15.2 Post composer & media display :crit, t15_2, 2026-11-16, 14d
    WBS-16.1 Likes & comments API :t16_1, 2026-11-23, 7d
    WBS-16.2 Likes & comments UI :crit, t16_2, 2026-11-30, 7d
    WBS-17.1 Feeds API :t17_1, 2026-11-23, 7d
    WBS-17.2 Feed screens & pagination :crit, t17_2, 2026-12-07, 7d
    WBS-18.1 Discover, search & filtering API :t18_1, 2026-11-30, 7d
    WBS-18.2 Discover & search screens :crit, t18_2, 2026-12-07, 7d

    section Testing & Release
    WBS-19.2 Automated backend test suite :crit, t19_2, 2026-12-07, 14d
    WBS-19.3 Manual testing & usability walkthroughs :crit, t19_3, 2026-12-14, 7d
    WBS-20.2 Mobile build, E2E check & v1.0.0 release :crit, t20_2, 2026-12-21, 5d

    section Documentation
    WBS-21.1 Charter & Plan :t21_1, 2026-10-05, 21d
    WBS-21.2 Req. Spec & Analysis :t21_2, 2026-10-26, 28d
    WBS-21.3 Design & Test reports :t21_3, 2026-11-23, 28d
    WBS-21.4 README & API docs :t21_4, 2026-12-07, 14d

    section Milestones
    Req. Specification due :milestone, m1, 2026-11-02, 0d
    Req. Analysis due :milestone, m2, 2026-11-23, 0d
    Software Design due :milestone, m3, 2026-12-07, 0d
    Software Test due :milestone, m4, 2026-12-21, 0d
    Code freeze v1.0.0 :milestone, m5, 2026-12-25, 0d
    Final demo :milestone, m6, 2026-12-26, 0d
    Final presentation week :milestone, m7, 2026-12-28, 0d
```

**Schedule consistency check:**
- **WBS and estimates:** every WBS activity from Section 2 appears in the schedule with the same ID, and its allocations in Section 4.2 multiplied by its duration equal its estimate in Section 3 (total 27.25 man-weeks).
- **Dependencies:** in the Gantt chart, no activity starts before all of its predecessors in the PERT chart have finished.
- **Durations:** the PERT chart and the Gantt chart use the same duration for every activity; activities that start later than their earliest start stay within their slack, so the 12-week project length does not change.
- **Member availability:** adding up the allocations week by week, no member goes above their weekly project time (1.0) in any week.
- **Deadlines:** each report activity ends by its course deadline, and the release activity ends on the code-freeze date (25.12.2026).

---

## 6. Risks

### 6.1 Risk Impact / Probability Chart

Score both **probability** and **impact** on an ascending scale from **1 (lowest)** to **5 (highest)**. Place each risk ID in the corresponding matrix cell. Both axes increase from left to right / top to bottom.

**Risk register:** List risks in **ascending order of probability, then impact**. The optional score is `Probability × Impact`; retain the same scale and order throughout.

| Risk ID | Risk description                                                                                                                                                               | Probability (1–5) | Impact (1–5) | Risk score (P × I) | Affected WBS activity ID(s)                                         |
|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------|:-------------|:-------------------|:--------------------------------------------------------------------|
| R-01 | Accidental exposure of secrets (database credentials, JWT secret, Cloudinary keys, Gmail app password) in Git history or API responses. | 1 | 4 | 4 | WBS-1.1, WBS-3.1, WBS-4.1, WBS-19.2 |
| R-02 | Limited access to physical iOS devices or Expo Go version mismatches delaying mobile verification on iOS. | 2 | 2 | 4 | WBS-1.3, WBS-19.3, WBS-20.2 |
| R-03 | Gmail SMTP daily sending limits (~500 e-mails/day) or `@itu.edu.tr` spam filtering delaying verification and password-reset e-mails. | 2 | 3 | 6 | WBS-1.1, WBS-3.1, WBS-4.1, WBS-19.3 |
| R-04 | Direct-to-Cloudinary upload signature errors or Vercel's 4.5 MB serverless request limit breaking photo and video uploads on web or mobile. | 2 | 4 | 8 | WBS-5.1, WBS-5.2, WBS-9.1, WBS-9.2, WBS-15.1, WBS-15.2 |
| R-05 | AI-generated code introducing subtle logic bugs, regressions, or unindexed SQLAlchemy queries that exceed the 1-second API response target. | 2 | 4 | 8 | WBS-1.2, WBS-17.1, WBS-18.1, WBS-19.2 |
| R-06 | API contract mismatches or UI/UX drift between the Flask backend, Next.js web app, and React Native (Expo) mobile app during parallel work. | 3 | 3 | 9 | WBS-2.1, WBS-2.2, WBS-8.2, WBS-12.2, WBS-15.2, WBS-17.2 |
| R-07 | Temporary unavailability of a team member (for example travel or illness) delaying web screens scheduled in the same weeks, such as the admin screens (`WBS-7.2`), which have only 2 weeks of slack. | 3 | 3 | 9 | WBS-5.2, WBS-7.2, WBS-9.2, WBS-15.2 |
| R-08 | Authorization gaps or state-transition bugs in the 4-role club hierarchy (Student, Member, Manager, Captain), Captain handover rules, or Platform Administrator actions. | 3 | 4 | 12 | WBS-7.1, WBS-8.1, WBS-8.2, WBS-10.1, WBS-10.2, WBS-19.2 |
| R-09 | Aiven free-tier MySQL database powering off after idle periods or dropping connections during testing or the live demo. | 3 | 4 | 12 | WBS-1.2, WBS-19.3, WBS-20.1, WBS-20.2 |
| R-10 | Changing or newly added customer (TA) requirements (`customer-requests`) during project meetings expanding scope during busy development weeks. | 4 | 3 | 12 | WBS-6.1, WBS-7.1, WBS-10.1, WBS-12.1, WBS-21.2 |
| R-11 | University midterm exams and heavy coursework in peak weeks (16 Nov – 13 Dec, when member allocations reach 0.85–1.0 FTE) delaying zero-slack activities on the critical path. | 4 | 4 | 16 | WBS-9.2, WBS-12.2, WBS-13.2, WBS-14.2, WBS-15.2, WBS-17.2, WBS-18.2 |

| Impact ↓ / Probability → | 1 (Very low) | 2 (Low)    | 3 (Medium) | 4 (High) | 5 (Very high) |
|:-------------------------|:-------------|:-----------|:-----------|:---------|:--------------|
| **1 — Very low**         | —            | —          | —          | —        | —             |
| **2 — Low**              | —            | R-02       | —          | —        | —             |
| **3 — Medium**           | —            | R-03       | R-06, R-07 | R-10     | —             |
| **4 — High**             | R-01         | R-04, R-05 | R-08, R-09 | R-11     | —             |
| **5 — Very high**        | —            | —          | —          | —        | —             |

### 6.2 Risk Mitigation / Aversion Plan

Map **every identified risk** to relevant project activities and record preventive or mitigating actions.

| Risk ID | Related WBS activity ID(s)                                          | Mitigation / avoidance strategy                                                                                                                                                                                                                                          | Responsible member | Contingency if risk occurs                                                                                                                                                                                                              |
|:--------|:--------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| R-01    | WBS-1.1, WBS-3.1, WBS-4.1, WBS-19.2                                 | Keep all credentials in `.env` files excluded via `.gitignore`, provide only placeholder `.env.example` templates, and verify in pull requests and API tests that password hashes and secrets never appear in responses.                                                 | Beyza Arısan       | Immediately revoke and rotate compromised keys (Aiven, Cloudinary, Gmail app password, JWT secret) and purge sensitive commits from the repository.                                                                                     |
| R-02    | WBS-1.3, WBS-19.3, WBS-20.2                                         | Lock the Expo SDK version in `package.json` from Week 2, avoid platform-specific native modules outside standard Expo Go support, and test mobile screens weekly on both Android and iOS.                                                                                | Melih Kart         | Borrow an iOS device from a classmate for the manual test run (`WBS-19.3`) and demo rehearsal (`WBS-20.2`), or run the iOS build on a macOS simulator while demonstrating physical device usage on Android.                             |
| R-03    | WBS-1.1, WBS-3.1, WBS-4.1, WBS-19.3                                 | Pre-verify seeded demo accounts in `WBS-19.1` so automated tests and demo flows do not send bulk e-mails, and test `@itu.edu.tr` delivery early during `WBS-3.1`.                                                                                                        | Beyza Arısan       | Switch to a secondary Gmail SMTP account or transactional e-mail service (such as Resend/SendGrid free tier), and allow a Platform Administrator or seed script to mark test accounts verified if university mail delays delivery.      |
| R-04    | WBS-5.1, WBS-5.2, WBS-9.1, WBS-9.2, WBS-15.1, WBS-15.2              | Upload photos and videos directly from the web and mobile clients to Cloudinary using backend-generated signed parameters so media files never pass through Vercel serverless functions; build a shared upload helper in Week 7 (`WBS-15.2`).                            | Yusuf Erdem Cıdık  | Restrict maximum file sizes on the client before upload (e.g., 5 MB for photos, 20 MB for short videos) and fall back to image compression or photo-only posts if video uploads hit free-tier bandwidth limits.                         |
| R-05    | WBS-1.2, WBS-17.1, WBS-18.1, WBS-19.2                               | Require every AI-assisted pull request to be reviewed and tested by a teammate before merge, add database indexes on foreign keys and filter columns in `WBS-1.2`, and enforce pagination (20 items/page) on all feeds and lists.                                        | Yusuf Erdem Cıdık  | Profile slow endpoints with Postman during `WBS-19.3`, rewrite inefficient ORM queries into optimized SQLAlchemy joins, and revert any faulty AI-generated commit via Git.                                                              |
| R-06    | WBS-2.1, WBS-2.2, WBS-8.2, WBS-12.2, WBS-15.2, WBS-17.2             | Complete each feature’s backend API (`.1`) one week before its client screens (`.2`), agree on JSON request/response schemas before coding, and follow the shared wireframes from `WBS-2.2`.                                                                             | Eslem Azra Yılmaz  | Hold a quick sync between Backend, Web, and Mobile leads to patch payload mismatches immediately, and update shared TypeScript API client types in one pull request.                                                                    |
| R-07 | WBS-5.2, WBS-7.2, WBS-9.2, WBS-15.2 | Members share planned absences early; their report work is done before or after those weeks, and longer non-critical activities (for example `WBS-7.2`, spread over two weeks) are scheduled around them within their slack. | Melih Kart | If a web activity falls behind, move it within its slack or let another full-stack member take over the remaining screens for that week. |
| R-08    | WBS-7.1, WBS-8.1, WBS-8.2, WBS-10.1, WBS-10.2, WBS-19.2             | Centralize role checks in reusable Flask decorators (`WBS-8.1`), wrap Captain handover and approval changes in database transactions, and write dedicated `401`/`403` pytest cases for every role and endpoint.                                                          | Beyza Arısan       | Freeze new feature merges until broken role checks are patched on the backend, and add regression tests in `tests/` before redeploying.                                                                                                 |
| R-09    | WBS-1.2, WBS-19.3, WBS-20.1, WBS-20.2                               | Configure SQLAlchemy `pool_pre_ping=True` and connection recycling in `WBS-1.2`, deploy early in Week 4 (`WBS-20.1`), and verify recovery after idle periods using the `/api/health/db` endpoint.                                                                        | Beyza Arısan       | Trigger `/api/health/db` 15 minutes before every TA meeting, usability session, and the final demo on 26 Dec to wake the Aiven database, and keep a local MySQL + seeded database backup ready if Aiven has an outage.                  |
| R-10    | WBS-6.1, WBS-7.1, WBS-10.1, WBS-12.1, WBS-21.2                      | Log every TA request as a `customer-requests` GitHub issue within 48 hours, evaluate its effort against remaining slack in weekly planning, and keep optional scope (messaging groups) strictly deferred unless all in-scope tasks finish early.                         | Yusuf Erdem Cıdık  | Negotiate with the TA to defer or decline high-effort late requests with a documented written justification on the GitHub issue, or trade them against non-critical UI polish.                                                          |
| R-11    | WBS-9.2, WBS-12.2, WBS-13.2, WBS-14.2, WBS-15.2, WBS-17.2, WBS-18.2 | Track weekly progress on the GitHub Projects board, shift non-critical tasks within their slack (as done for `WBS-10.2` and `WBS-18.1`), and cross-assign tasks across layers (e.g., Yusuf building backend APIs and Beyza building Discover web screens in `WBS-18.2`). | Melih Kart         | Reallocate hours from lighter weeks, simplify non-essential UI styling using standard `shadcn/ui` components, and have available teammates pair up on any critical-path activity at risk of slipping past Friday of its scheduled week. |
