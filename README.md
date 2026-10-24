# Clublibrary – Student Clubs & Project Teams Social Platform
 
Clublibrary is a social media web and mobile application for university student clubs and project teams. It gives students a single place to discover clubs and teams, follow their activity, and stay informed about the events, lectures, and meetings happening on campus. Captains and managers get tools to organize their members, publish events, and share updates through posts.
 
Course project for **BLG411E Software Engineering**, Istanbul Technical University.
 
## Team – Al-ı Memnu
 
All members work as full-stack developers and take part in every phase of the project (requirements, design, development, testing, and documentation). In addition, each member leads one area of the project.
 
| Member | Student ID | Development role | Management role |
|---|---|---|---|
| Melih Kart | 150200701 | Full-Stack Developer | Project Manager – planning, scheduling, task tracking, risk management, team coordination, GitHub repository management, React Native mobile application |
| Beyza Arısan | 150230069 | Full-Stack Developer | Backend Lead – Flask REST API, database design, system architecture, deployment, Software Design Report |
| Eslem Azra Yılmaz | 150220110 | Full-Stack Developer | Frontend Lead – Next.js interface, UI/UX design, reusable components, responsive layouts |
| Yusuf Erdem Cıdık | 040230205 | Full-Stack Developer | Requirements and QA Lead – requirement gathering, testing, Requirement Specification, Requirement Analysis and Software Test Reports, communication with the Product Owner |
 
## Technology Stack
 
- **Backend:** Python, Flask (REST API), MySQL hosted on Aiven, SQLAlchemy (Flask-SQLAlchemy) + Flask-Migrate, Flask-JWT-Extended + bcrypt, Cloudinary, Docker
- **Frontend:** Next.js with TypeScript, Tailwind CSS, shadcn/ui, hosted on Vercel
- **Mobile:** React Native with Expo (TypeScript), for Android and iOS

## Repository Structure
 
| Folder | Contents |
|---|---|
| `backend/` | Flask REST API |
| `frontend/` | Next.js web application |
| `mobile/` | React Native (Expo) mobile application *(planned)* |
| `docs/` | Project documents (charter, plan, requirements, design, test reports) |
| `tests/` | Automated tests |

## Running Locally
 
### Backend
 
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
 
Copy `backend/.env.example` to `backend/.env` and fill it in (ask the Project Manager for the database password), put `ca.pem` in `backend/certs/`, then run:
 
```powershell
flask --app app run --debug
```
 
Check http://localhost:5000/api/health and http://localhost:5000/api/health/db.
 
### Frontend
 
```powershell
cd frontend
npm install
npm run dev
```
 
Open http://localhost:3000.