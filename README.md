# 🔐 Login & Signup System – MERN + Chakra UI
This project is a simple authentication system built with:

- Frontend: React + Chakra UI

- Backend: Node.js + Express + MongoDB

It supports:

- ✅ User Registration

- ✅ User Login

- ✅ Protected Welcome Route

## 📦 Tech Stack
### 🚀 Frontend
- React 

- Chakra UI – for responsive and customizable UI

- React Router DOM v7 – for routing

- Axios – for API requests

### 🛠 Backend
- Express.js v5 – for API server

- MongoDB & Mongoose – for database and ODM

- JWT (jsonwebtoken) – for authentication

- Bcrypt – for password hashing

- CORS, Dotenv, Validator, Nodemon

## 📁 Project Structure
```bash
📦Geta assignment/
|
├-- 📁backend/ # Backend (Node.js + Express + MongoDB)
|          |- controllers
│          |- models/
│          |- routes/
│          |- middleware/ 
|          |- .env
|          |- index.js
|          |- package.json
|
|-- 📁frontend (React + Chakra UI)
|           |- public/
|           |- src/
|           |    |- assets/
|           |    |- components/
|           |    |- pages/
|           |    |- App.jsx
|           |    |- main.jsx  
```

## 🔐 Features
### ✅ Features
1. Signup
Validates email and password

Stores password using bcrypt hashing

Sends JWT token on successful signup

2. Login
Verifies user credentials

Sends JWT token on success

3. Welcome (Protected Route)
Requires JWT token in header

Uses Authorization: Bearer <token>

## 🚀 Getting Started
### 🔧 Prerequisites
- Node.js ≥ 18.x

- MongoDB Atlas or local MongoDB

## 🔨 Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/Nitishkumar8521/Geta-Assignment.git
cd Geta-Assignment
```
### 2. Setup Backend
```bash
cd Backend
npm install
npm run dev
```
### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
## 🔒 Authentication & Authorization
- JWT stored in local storage

- Middleware for verifying user

## 🔁 API Routes (Backend)

### 🔐 User Routes
| Method | Endpoint                | Description          |
|--------|-------------------------|----------------------|
| POST   | /user/register          |  Register a new user |
| POST   | /user/login             |  Login and get token |


### 👤Author

Developed by **Nitish Kumar Singh.** Feel free to contribute or provide feedback!

