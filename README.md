# 🎓 Exam Management System

An end-to-end **exam management web application** built using **Angular** for the frontend and **ASP.NET Core Web API** for the backend. It supports authentication, role-based access control, and full exam creation, viewing, editing, and deletion features.

---

## 🚀 Features

### 👥 Authentication & Authorization
- User **Registration** and **Login**
- JWT Token-based Authentication
- **Role-based access** (Admin / Student)
- Route guards (`AuthGuard`, `RoleGuard`) for protected areas

### 🧪 Exam Management
- **Admins** can:
  - Create new exams with questions and options
  - Update existing exams
  - Delete exams
  - View exam statistics

- **Students** can:
  - View list of available exams
  - Take exams (optional extension)
  - View results (optional extension)

### 📄 Dashboard
- Admin Dashboard: Overview of exams, number of questions, and quick actions
- Student Dashboard: Upcoming/pending exams

---

## 🛠️ Tech Stack

| Frontend         | Backend            |
|------------------|--------------------|
| Angular 20       | ASP.NET Core 8     |
| Reactive Forms   | Entity Framework   |
| Bootstrap / CSS  | SQL Server         |
| JWT Decode       | AutoMapper         |
| Angular Guards   | RESTful APIs       |


