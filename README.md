# DevTinder Backend 🚀

Backend API for **DevTinder**, a developer-focused platform inspired by Tinder, designed to help developers discover and connect with other developers.

## 📌 Project Status

🚧 **Currently under development**

The backend is being built incrementally using **Node.js, Express.js, MongoDB, and Mongoose**.

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Backend web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **JavaScript** – Programming language
- **bcrypt** – Password hashing
- **JWT** – Authentication
- **cookie-parser** – Cookie handling
- **validator** – Data validation
- **Nodemon** – Development server auto-restart

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
│   ├── utils/
│   │   └── validation.js
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
git clone https://github.com/Madhan-011/devTinder-backend.git
```

Navigate into the project:

```bash
cd devTinder-backend
```

Install dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the project root and add your MongoDB connection string and JWT secret:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> **Never commit your `.env` file or expose database credentials and JWT secrets on GitHub.**

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

A `User` model has been created using a Mongoose schema with validation and default values.

### Current Fields

| Field | Type | Description |
|---|---|---|
| `firstName` | String | User's first name |
| `lastName` | String | User's last name |
| `email` | String | Unique email address |
| `password` | String | Hashed password |
| `age` | Number | User's age |
| `gender` | String | `male`, `female`, or `others` |
| `photoUrl` | String | Profile photo URL |
| `about` | String | User description |
| `skills` | Array of Strings | User's skills |
| `createdAt` | Date | Account creation time |
| `updatedAt` | Date | Last update time |

### Schema Validation

The user schema currently includes:

- Required fields
- Minimum and maximum length validation
- Email validation
- Strong password validation
- Unique email constraint
- Age validation
- Gender enum validation
- Profile photo URL validation
- Maximum 10 skills
- Automatic timestamps

## 🔗 Current API Endpoints

### 1. Create User

**POST** `/signup`

Creates a new user and stores the password securely using **bcrypt hashing**.

```text
POST http://localhost:7777/signup
```

Example request:

```json
{
  "firstName": "Anandhu",
  "lastName": "Aji",
  "email": "anandhu@gmail.com",
  "password": "StrongPassword@123"
}
```

The signup process:

```text
Request
   ↓
Validate signup data
   ↓
Hash password using bcrypt
   ↓
Create User document
   ↓
Save to MongoDB
   ↓
Send response
```

---

### 2. Login User

**POST** `/login`

Authenticates a user using their email and password.

```text
POST http://localhost:7777/login
```

Example request:

```json
{
  "email": "anandhu@gmail.com",
  "password": "StrongPassword@123"
}
```

The login process:

```text
Email + Password
       ↓
Find user by email
       ↓
Compare password using bcrypt
       ↓
Generate JWT
       ↓
Store JWT in cookie
       ↓
Login successful
```

---

### 3. Get User Profile

**GET** `/profile`

Returns the profile of the currently authenticated user.

```text
GET http://localhost:7777/profile
```

The API:

1. Reads the JWT from the cookie
2. Verifies the JWT
3. Gets the user ID from the token
4. Finds the user in MongoDB
5. Returns the user profile

```text
Request
   ↓
Read JWT from Cookie
   ↓
Verify JWT
   ↓
Extract User ID
   ↓
Find User in MongoDB
   ↓
Return Profile
```

---

### 4. Get One User

**GET** `/user`

Finds a user using their email.

```text
GET http://localhost:7777/user
```

---

### 5. Get All Users

**GET** `/feed`

Returns all users from the database.

```text
GET http://localhost:7777/feed
```

---

### 6. Delete User

**DELETE** `/user`

Deletes a user using their MongoDB document ID.

```text
DELETE http://localhost:7777/user
```

Example request:

```json
{
  "id": "USER_ID"
}
```

---

### 7. Update User Profile

**PATCH** `/user/:userId`

Updates allowed profile fields for a user.

```text
PATCH http://localhost:7777/user/USER_ID
```

Currently allowed fields:

```text
photoUrl
about
gender
age
skills
```

Example request:

```json
{
  "about": "Full Stack Developer",
  "age": 23,
  "skills": ["JavaScript", "React", "Node.js"]
}
```

The API uses `Object.keys().every()` to ensure that only allowed fields are updated.

## 🔐 Authentication

DevTinder currently uses **JWT-based authentication**.

### Authentication Flow

```text
              LOGIN
                │
                ▼
        Verify Email & Password
                │
                ▼
          Generate JWT
                │
                ▼
        Store JWT in Cookie
                │
                ▼
       Access Protected APIs
                │
                ▼
          Verify JWT
                │
                ▼
          Get User Profile
```

JWT is currently used to identify the authenticated user.

> The JWT secret should be stored securely in an environment variable and should never be committed to the repository.

## 🔒 Password Security

User passwords are **not stored as plain text**.

During signup:

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Hashed Password
      ↓
MongoDB
```

During login:

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Password Hash
      ↓
Valid / Invalid
```

## 🧪 API Testing

The APIs can be tested using tools such as:

- Postman
- Thunder Client
- Insomnia

The current APIs are being tested during development before adding more features.

## 🎯 Completed Features

- [x] Express server setup
- [x] Express routing
- [x] Express JSON middleware
- [x] MongoDB connection
- [x] Mongoose integration
- [x] User schema and model
- [x] Schema-level validation
- [x] Signup API
- [x] Signup data validation
- [x] Password hashing using bcrypt
- [x] Login API
- [x] Password verification using bcrypt
- [x] JWT generation
- [x] JWT verification
- [x] Cookie-based token storage
- [x] Profile API
- [x] Get single user API
- [x] Get all users API
- [x] Delete user API
- [x] Update user API
- [x] API-level update validation
- [x] User profile fields
- [x] Mongoose timestamps

## 🚧 Planned Features

- [ ] Move secrets completely to environment variables
- [ ] Authentication middleware for protected routes
- [ ] Logout API
- [ ] Improved error handling
- [ ] Login/signup response improvements
- [ ] Developer discovery/feed logic
- [ ] Connection requests
- [ ] Accept/reject connection requests
- [ ] Send/receive developer requests
- [ ] User profile management
- [ ] API documentation
- [ ] Backend deployment
- [ ] Frontend integration

## 📚 Learning Objectives

This project is helping me gain practical experience with:

- Node.js backend development
- Express.js
- REST APIs
- Express middleware
- MongoDB
- Mongoose
- CRUD operations
- Database schemas and models
- API-level validation
- Schema-level validation
- Password hashing
- Authentication
- JWT
- Cookies
- Error handling
- Backend project architecture
- Full-stack application development

## 👨‍💻 Author

**Madhan K**

GitHub:  
https://github.com/Madhan-011

---

⭐ **DevTinder is actively under development, with new backend features being added progressively.**
