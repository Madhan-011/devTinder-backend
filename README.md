# DevTinder Backend 🚀

Backend API for **DevTinder**, a developer-focused platform inspired by Tinder, designed to help developers discover and connect with other developers.

## 📌 Project Status

🚧 **Currently under development**

The backend is being built incrementally using **Node.js, Express.js, MongoDB, and Mongoose**.

## 🛠️ Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Backend web framework
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB ODM
* **JavaScript** – Programming language
* **Nodemon** – Development server auto-restart

## 📁 Project Structure

```text
devtinder-backend/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── models/
│   │   └── user.js
│   │
│   └── app.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/devtinder-backend.git
```

Navigate into the project:

```bash
cd devtinder-backend
```

Install dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the project root and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

> Never commit your `.env` file or expose database credentials on GitHub.

## ▶️ Running the Project

### Development

Run the project using Nodemon:

```bash
npm run dev
```

### Production

Run the project using Node.js:

```bash
npm start
```

The server runs on:

```text
http://localhost:7777
```

## 🗄️ Database

The application uses **MongoDB** with **Mongoose**.

The database connection is established before starting the Express server. The server starts listening on port `7777` only after a successful database connection.

## 👤 User Model

A `User` model has been created using a Mongoose schema.

### Current Fields

| Field       | Type   |
| ----------- | ------ |
| `firstName` | String |
| `lastName`  | String |
| `email`     | String |
| `password`  | String |
| `age`       | Number |
| `gender`    | String |

## 🔗 Current API Endpoints

### Create User

**POST** `/signup`

Creates and saves a new user in MongoDB.

Example request:

```text
POST http://localhost:7777/signup
```

Currently, the signup route uses sample user data for testing.

Example data:

```json
{
  "firstName": "Anandhu",
  "lastName": "Aji",
  "email": "anandhu@gmail.com",
  "password": "987654"
}
```

### Response

On successful creation, the saved user document is returned.

If saving fails, the API returns:

```text
400 Bad Request
Error while saving user: <error message>
```

## 🔐 Authentication Middleware

Authentication middleware has been introduced for handling protected routes.

Currently available middleware:

* `adminAuth`
* `userAuth`

The middleware follows the Express middleware pattern:

```text
Request
   ↓
Authentication Middleware
   ↓
next()
   ↓
Route Handler
```

The authentication logic is currently implemented as a basic placeholder and will be replaced with proper authentication in future development.

## 🎯 Planned Features

* [x] Express server setup
* [x] Express routing
* [x] MongoDB connection
* [x] Mongoose integration
* [x] User schema and model
* [x] Basic signup API
* [x] Authentication middleware structure
* [ ] Request body handling
* [ ] Input validation
* [ ] Secure password hashing
* [ ] Proper user authentication
* [ ] JWT authentication
* [ ] Login API
* [ ] Developer profiles
* [ ] Connection requests
* [ ] Accept/reject connection requests
* [ ] Feed/discovery system
* [ ] User profile management
* [ ] Centralized error handling
* [ ] API documentation
* [ ] Deployment

## 📚 Learning Objectives

This project is being developed to gain practical experience with:

* Node.js backend development
* Express.js
* REST APIs
* Express middleware
* MongoDB
* Mongoose
* Database schemas and models
* Authentication and authorization
* Backend project architecture
* API validation
* Error handling
* Production-ready backend development

## 👨‍💻 Author

**Madhan K**

GitHub: [Madhan-011](https://github.com/Madhan-011)

---

⭐ **DevTinder is actively under development and new backend features will be added progressively.**
