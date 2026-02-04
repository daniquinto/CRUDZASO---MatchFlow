
# MatchFlow – Hiring Platform (MPA)

MatchFlow is a multi-page recruitment platform that connects companies and candidates through a simple and intuitive hiring flow. Companies can publish job offers, while candidates create professional profiles and apply to open positions.  

The application uses a **fake REST API powered by JSON Server** and stores authentication sessions in **LocalStorage**.

---

## Project Architecture

The system follows a **users + role profiles** architecture:

- **users** → Authentication & shared identity  
- **companies** → Company profile data  
- **candidates** → Candidate profile data  

---

## Team Members

- Daniela Quinto  
- Ulith  
- Faiber Camacho  
- Stteen  
- Andres  

---

## Technologies

- HTML  
- Tailwind CSS  
- JavaScript (Vanilla)  
- JSON Server  
- LocalStorage  

---

## Project Structure

```
matchFlow/
│
├── index.html
├── db.json
├── css/
│   └── login.css
├── js/
│   ├── auth.js
│   ├── dashboard.js
│   ├── guard.js
│   ├── login.js
│   ├── profile.js
│   ├── register.js
│   └── storage.js
├── pages/
│   ├── company/
│   │   ├── dashboard.html
│   │   ├── profile.html
│   │   └── company-job-offers.html
│   ├── user/
│   │   ├── candidate-dashboard.html
│   │   ├── candidate-profile.html
│   │   └── candidate-job-offers.html
│   └── Login-register/
│       └── register.html
```

---

## Database Structure (`db.json`)

### users
Stores authentication credentials and shared identity.

```json
{
  "id": 1,
  "role": "company",
  "name": "Crudzaso Tech",
  "email": "company@gmail.com",
  "password": "123456"
}
```

### companies
Linked to users by `userId`.

```json
{
  "id": 1,
  "userId": 1,
  "industry": "Technology",
  "size": "51-200",
  "location": "Medellín, Colombia",
  "description": "We build fast hiring experiences"
}
```

### candidates
Linked to users by `userId`.

```json
{
  "id": 1,
  "userId": 2,
  "title": "Frontend Developer",
  "skills": ["React", "CSS", "JavaScript"],
  "openToWork": true,
  "location": "Bogotá",
  "experienceYears": 3
}
```

### jobOffers

```json
{
  "id": 1,
  "companyId": 1,
  "title": "Frontend Developer",
  "description": "React developer with experience in SPAs",
  "location": "Remote",
  "employmentType": "Full-time",
  "status": "open",
  "createdAt": "2026-01-15"
}
```

### matches

```json
{
  "id": 1,
  "companyId": 1,
  "jobOfferId": 1,
  "candidateId": 1,
  "status": "pending",
  "createdAt": "2026-01-20",
  "contactUnlocked": false
}
```

### reservations

```json
{
  "id": 1,
  "candidateId": 1,
  "companyId": 1,
  "jobOfferId": 1,
  "active": true,
  "reservedAt": "2026-01-20"
}
```

---

## Data Relationships

- users.id → companies.userId  
- users.id → candidates.userId  
- companies.id → jobOffers.companyId  
- jobOffers.id → matches.jobOfferId  
- candidates.id → matches.candidateId  
- companies.id → matches.companyId  
- companies.id → reservations.companyId  
- candidates.id → reservations.candidateId  

---

## Features

### Authentication
- Register as company or candidate  
- Email uniqueness validation  
- Login with role-based authentication  
- Session persistence using LocalStorage  
- Protected routes with guards  

### Company
- Create and manage company profile  
- Publish job offers  
- View candidate matches  

### Candidate
- Create and update professional profile  
- Browse job offers  
- Apply to offers  

---

## How to Run the Project

### 1. Install JSON Server
```bash
npm install -g json-server
```

### 2. Start Backend
```bash
json-server --watch db.json --port 3000
```

### 3. Run Frontend
Open `index.html` using Live Server or directly in your browser.


