# Project Charter: Clublibrary – Student Clubs & Project Teams Social Platform

## 1. Project Purpose and Objectives
Clublibrary is a social media web application for university student clubs and project teams. It gives students a single place to discover clubs and teams, follow their activity, and stay informed about the events, lectures, and meetings happening on campus. Captains and managers get tools to organize their members, publish events, and share updates through posts. The goal is to replace the scattered mix of social media pages, messaging groups, and posters that clubs and teams rely on today with one dedicated campus platform.

## 2. Stakeholders & Roles
* **Product Owner:** Melih Kart - kartm20@itu.edu.tr
* **Software Engineering Team – Al-ı Memnu:** All members work as full-stack developers and take part in every phase of the project (requirements, design, development, testing, and documentation). In addition, each member leads one area of the project:
    * **Melih Kart** : Project Manager & Full-Stack Developer – leads planning, scheduling, task tracking, risk management, team coordination, and GitHub repository management
    * **Beyza Arısan** : Full-Stack Developer & Backend Lead – leads the Flask REST API, database design, system architecture, Docker setup, deployment, and the Software Design Report
    * **Eslem Azra Yılmaz** : Full-Stack Developer & Frontend Lead – leads the Next.js interface, UI/UX design, reusable components, and responsive layouts
    * **Yusuf Erdem Cıdık** : Full-Stack Developer & Requirements and QA Lead – leads requirement gathering, testing, the Requirement Specification, Requirement Analysis and Software Test Reports, and communication with the Product Owner
* **GH Repo/Project URL:** [clublibrary](https://github.com/Kartupo/clublibrary)

## 3. Project Scope
### Project domain
Clublibrary belongs to the education domain and focuses on student life outside the classroom. Its possible customers are universities that want to bring all of their student clubs and project teams together on one digital platform. The key users are students and the members, managers, and captains of clubs and project teams.

### In-Scope
* **User Accounts & Authentication** – Sign-up and login with a university e-mail address, e-mail verification, password reset, and user profiles (department, year, interests).
* **Club & Project Team Management** – Creating clubs and project teams (e.g. competition, research, or engineering teams), which work the same way: profile pages (description, logo, contact info), membership requests, joining/leaving, and member lists. A requested club or project team stays pending until a Platform Administrator approves it; captains are assigned only to approved clubs and project teams.
* **Roles & Permissions** – Role-based access with four roles in each club or project team: Student (non-member), Member, Manager, and Captain. Captains assign managers; each role has defined rights over content and events. In addition, a platform-level Platform Administrator role approves or rejects requests for new clubs and project teams.
* **Events & Calendar** – Clubs and project teams create events of different types (social events, lectures/talks, meetings, workshops) with date, time, and location; member-exclusive or public visibility; RSVP/attendance; a personal calendar of upcoming events.
* **Posts & Media Feed** – Posts by clubs and project teams with text, photos, and videos; likes and comments; a feed for each club and team, and a personal home feed built from joined and followed clubs and teams.
* **Discover** – Browsing and searching clubs, project teams, upcoming public events, and popular posts, with filtering by category.

### Out-of-Scope
* Integration with official university systems (student information system, LMS, official course timetables).
* Ticket sales, payments, and membership fees.
* Live streaming, voice, and video calls.
* Automatic cross-posting to external social media platforms.

## 4. Technology Stack

### Backend Stack
* Python with Flask – REST API *(alternatives: FastAPI, Django)*
* MySQL – relational database *(alternatives: PostgreSQL, Supabase)*
* SQLAlchemy (Flask-SQLAlchemy) + Flask-Migrate – ORM and database migrations
* Flask-JWT-Extended + bcrypt – authentication and password hashing *(alternatives: Supabase Auth)*
* Cloudinary – photo and video storage *(alternatives: Supabase Storage)*
* Docker – containerized deployment
* Google Cloud (Cloud Run, Cloud SQL) – backend and database hosting *(alternatives: Supabase)*

### Frontend Stack
* Next.js with TypeScript (React) *(alternatives: React with Vite)*
* Tailwind CSS – styling and responsive layout *(alternative: Bootstrap)*
* shadcn/ui – UI components *(alternatives: Material UI, Chakra UI)*
* Vercel – frontend hosting *(alternatives: Netlify)*

### AI Stack
* Claude Opus 5.x (Anthropic) – development assistant for coding, dummy data and test generation, and debugging
* Gemini (Google) – development assistant for research and code review
* GPT 5.x – development assistant

## 5. Project Milestones
| Deliverable                       | Deadline          |
|---                                |---                |
| Project Charter                   | 05.10.2026 23:59  |
| Project Plan                      | 19.10.2026 23:59  |
| Requirement Specification Report  | 02.11.2026 23:59  |
| Requirement Analysis Report       | 23.11.2026 23:59  |
| Software Design Report            | 07.12.2026 23:59  |
| Software Test Report              | 21.12.2026 23:59  |
| Codebase                          | 25.12.2026 23:59  |
| Demo                              | 26.12.2026 23:59  |
| Presentation                      | 28.12.2026 23:59  |
