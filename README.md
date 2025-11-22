
# 🧠 Smart Task Manager — Backend (Node + Express + MongoDB)

A scalable REST API backend for Smart Task Manager providing secure user access, project/task management, auto-assignment logic, and activity logging.

---

## 🚀 Features

### 🔐 Authentication
- Register & Login with JWT
- Protected routes with role-based access

### 👥 Team Management
- Each user owns multiple teams
- Member stored inside team document (no reference)
- Fields:
  - Name
  - Role
  - Capacity
  - Current Task

### 📁 Project Management
- Each project linked to 1 team
- Tracks assigned tasks
- Full CRUD operations

### 📝 Task Management
- Assign tasks to team members
- Tracks priority & status
- Auto caps overload warnings

### 🤖 Auto Reassignment Logic
When triggered:
- Detect overloaded members
- Move **only Low & Medium** priority tasks
- Ensure tasks go to members with capacity
- Log every reassignment

### 🗂 Activity Log
- Stored in separate collection

- Dashboard fetches latest 5–10 logs

---

## 🛠️ Tech Stack

| Technology | Use |
|-----------|-----|
| **Node.js + Express** | Server |
| **MongoDB + Mongoose** | Database |
| **JWT** | Authentication |
| **Zod** | Validation |
| **Bcrypt** | Password security |

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env

# Server
PORT="5000"
NODE_ENV="development"
MONGO_URL=your_database_url

#bcryptjs
BCRYPT_SALT_ROUNDS=bcrypt_salt_rounds

FRONTEND_URL=your_frontend_url

#jwt
JWT_ACCESS_SECRET=access_token_secret
JWT_ACCESS_EXPIRES=days
JWT_REFRESH_SECRET=refresh_token_secret
JWT_REFRESH_EXPIRES=days

```


