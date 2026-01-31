# Restor App – Hiring Platform

## Project Description
Restor App is a recruitment platform where **companies** can publish job offers and **candidates** can register and be matched with them.  
The project uses a fake REST API built with **json-server**.

MPA

---

## Group Members
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

## Database Structure (`db.json`)

### companies
Stores company users.
```json
{
  "id": 1,
  "role": "company",
  "name": "Crudzaso Tech",
  "email": "example@gmail.com",
  "password": "123456",
  "industry": "Technology",
  "size": "51-200",
  "location": "Medellín, Colombia",
  "description": "We build fast hiring experiences"
}

companies
Stores candidate users.

{
  "id": 1,
  "role": "candidate",
  "name": "Ana Gómez",
  "email": "example@gmail.com",
  "password": "123456",
  "title": "Frontend Developer",
  "skills": ["React", "CSS", "JavaScript"],
  "openToWork": true,
  "location": "Bogotá",
  "experienceYears": 3
}
jobOffers
Stores job offers created by companies
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
matches
Represents a match between company and candidate.
{
  "id": 1,
  "companyId": 1,
  "jobOfferId": 1,
  "candidateId": 1,
  "status": "pending",
  "createdAt": "2026-01-20",
  "contactUnlocked": false
}
reservations
Temporary reservation between company and candidate.
{
  "id": 1,
  "candidateId": 1,
  "companyId": 1,
  "jobOfferId": 1,
  "active": true,
  "reservedAt": "2026-01-20"
}
```
## System Features
- Register as company or candidate  
- Login with role validation  
- Session stored in LocalStorage  
- Role-based redirection  

---

## How to Run

### 1. Install JSON Server

- npm install -g json-server

### 2. Run Backend

- json-server --watch db.json --port 3000

### 3. Open Project

- Open the login page with Live Server or directly in browser.

### Notes

- Passwords are stored in plain text (educational use only)

- No SPA implementation

- Fake backend using json-server