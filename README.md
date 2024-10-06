# 💸 **Money Minder**  

### Preview



[screen-capture (1).webm](https://github.com/user-attachments/assets/8dd39a1a-0dd6-4327-aa8f-e66896e95713)







![React.js](https://img.shields.io/badge/frontend-reactjs-blue?logo=react)  
![Node.js](https://img.shields.io/badge/backend-nodejs-green?logo=nodedotjs)  
![MongoDB](https://img.shields.io/badge/database-mongodb-brightgreen?logo=mongodb)  
![TailwindCSS](https://img.shields.io/badge/ui-tailwindcss-blue?logo=tailwindcss)  
![JWT](https://img.shields.io/badge/authentication-jwt-orange?logo=jsonwebtokens)  
![Docker](https://img.shields.io/badge/containerization-docker-blue?logo=docker)

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [License](#license)

---

## 📝 **About**
This is a **Full Stack Web Application** that combines **React.js** for the frontend, **Node.js/Express.js** for the backend, and **MongoDB** as the database to manage user data and financial records. It uses **JWT** (JSON Web Tokens) for secure user authentication and is containerized with **Docker** for easy deployment and scalability.

---

## ✨ **Features**
- 🌐 **Frontend**: Built with **React.js** and styled using **Tailwind CSS** for a modern, responsive user interface.
- 🔒 **Backend**: Powered by **Node.js** and **Express.js** to create a RESTful API.
- 🗄️ **Database**: Uses **MongoDB** to store user data and financial records.
- 🔐 **Authentication**: Secure user authentication using **JWT**.
- 🐳 **Containerization**: Easily deployable with **Docker** for efficient, consistent environments.
  
---

## 🛠️ **Tech Stack**
| Technology       | Description                              |
|------------------|------------------------------------------|
| **Frontend**     | [React.js](https://reactjs.org)          |
| **Backend**      | [Node.js](https://nodejs.org) + [Express.js](https://expressjs.com) |
| **Database**     | [MongoDB](https://www.mongodb.com)       |
| **Authentication** | [JWT](https://jwt.io)                   |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com)  |
| **Containerization** | [Docker](https://www.docker.com)       |

---

## ⚙️ **Installation**

### Prerequisites
- **Node.js** (version 16 or above)
- **MongoDB** installed or a cloud MongoDB service like **MongoDB Atlas**
- **Docker** (if you want to run the project in containers)

### Step-by-Step Guide
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

4. Set up MongoDB and update the environment variables.

---

## 🔑 **Environment Variables**

Create a `.env` file in the root of the `backend` directory and add the following environment variables:

```bash
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `PORT`: Port for running the backend (optional, default is 5000).

---

## 🚀 **Running the Application**

### Local Setup

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Open your browser and navigate to `http://localhost:5000`.

---

## 🐳 **Docker Setup**

### Building and Running with Docker

1. Build the Docker image:
   ```bash
   docker build -t your-image-name .
   ```

2. Run the Docker container:
   ```bash
   docker run -it --rm -e MONGO_URI=your_mongo_uri -e JWT_SECRET=your_jwt_secret -p 5000:5000 your-image-name
   ```

---

## 📜 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 **Contributing**
Feel free to open issues or submit pull requests. Contributions are welcome!

---

## 🎉 **Contact**
- GitHub: [YourUsername](https://github.com/your-username)
- Email: [youremail@example.com](mailto:youremail@example.com)

---

Happy coding! ✨

---
