# Full-Stack Todo App

A full-stack Todo Application built using React (Vite) and Node.js + Express, featuring JWT authentication, user-specific todos, and a clean, responsive UI.

## ✨ Highlights
- User authentication (Register / Login / Logout)
- JWT-based authentication using HTTP-only cookies
- Create, update, delete todos
- User-specific todos (each user sees only their own todos)
- Real-time UI updates with React state
- Clean and responsive UI using Tailwind CSS

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Zod (Input validation)
- bcrypt (Password hashing)

## 🚀 Run Locally

### Clone the repository
git clone https://github.com/MohammedZainJ/fullstack-todo-app.git
cd fullstack-todo-app

### Backend Setup
cd backend
npm install

Create a `.env` file in the backend folder:

MONGODB_URI=your_mongodb_connection_string  
JWT_SECRET_KEY=your_secret_key  
Frontend_URL=http://localhost:5173  

Start backend server:
npm start

### Frontend Setup
cd ../frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

Backend runs on:
http://localhost:3000

## 📚 Key Learnings
- Full-stack authentication flow
- JWT handling with cookies
- Protected routes using middleware
- REST API communication with Axios
- React state management and re-rendering
- Secure backend validation using Zod

## 👤 Author
Mohammed Zain J  
📧 mohammedzainj2004@gmail.com
