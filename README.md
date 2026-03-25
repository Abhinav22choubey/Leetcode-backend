# 🚀 Leetcode-backend

![Node](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-API-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![Render](https://img.shields.io/badge/Deployed-Render-purple?logo=render)
![License](https://img.shields.io/badge/license-ISC-green)

---

## 📝 Description

Leetcode-backend is a robust and scalable server-side application built using Express.js, designed to replicate the core backend functionalities of platforms like LeetCode. It handles problem management, user authentication, code submissions, and execution workflows, making it a strong foundation for coding platforms and assessment systems.

---

## 🌐 Live API

🔗 Backend URL: https://leetcode-backend-smd2.onrender.com

> ⚠️ Notes:
>
> * Server may take time to respond initially due to Render cold start.
> * If API fails, try again after a few seconds.

---

## ✨ Features

* 🔐 User authentication (JWT-based login/signup)
* 🧠 Problem creation and management
* 📤 Code submission handling
* ⚡ Integration with Judge0 API for code execution
* 📊 Submission history tracking
* ☁️ Cloudinary integration for video uploads
* 🤖 AI chat support
* 🧩 Redis caching for performance optimization
* 🛡️ Middleware-based authorization (user/admin)

---

## 🛠️ Tech Stack

* 🚀 Node.js
* ⚡ Express.js
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication
* ☁️ Cloudinary
* 🧠 Redis
* 🌐 Axios

---

## 📦 Key Dependencies

axios: ^1.13.6
bcrypt: ^6.0.0
cloudinary: ^2.9.0
cookie-parser: ^1.4.7
cors: ^2.8.6
dotenv: ^17.2.3
express: ^5.1.0
jsonwebtoken: ^9.0.3
mongoose: ^8.19.3
nodemon: ^3.1.10
redis: ^5.10.0
validator: ^13.15.26

---

## 🚀 Run Commands

npm run start
npm run dev
npm run test

---

## 📁 Project Structure

.
├── package.json
└── src
    ├── Models
    ├── Routes
    ├── config
    ├── controllers
    ├── middleware
    └── utils

---

## 🛠️ Development Setup

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB database

### Installation

git clone https://github.com/Abhinav22choubey/Leetcode-backend.git
cd Leetcode-backend
npm install
npm run dev

---

## 🔐 Environment Variables

Create a `.env` file and add:

PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REDIS_URL=your_redis_url

---

## 🚀 Deployment

* Backend deployed on Render

### Steps:

1. Push code to GitHub
2. Create Web Service on Render
3. Add environment variables
4. Deploy

---

## 👥 Contributing

1. Fork the repository
2. Create a branch
3. Commit changes
4. Push and open PR

---

## 🚧 Future Improvements

* 🧪 Add test case execution system
* 📈 Performance optimization
* 🏆 Contest backend system
* 📊 Advanced analytics
* 🔄 WebSocket for real-time updates

---

## 🔗 GitHub Repository

https://github.com/Abhinav22choubey/Leetcode-backend

---

## 👨‍💻 Author

Abhinav Kumar Choubey

GitHub: https://github.com/Abhinav22choubey
Linkedin: https://linkedin.com/in/abhinav22choubey

---

⭐ Give it a star if you like it!
