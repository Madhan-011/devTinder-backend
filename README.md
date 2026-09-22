# DevTinder Backend 🚀

Backend API for **DevTinder**, a developer-focused platform inspired by Tinder. The application is being built as a MERN project where developers can create profiles, discover other developers, send connection requests, review requests, and view their connections.

This repository focuses on the **Node.js + Express.js + MongoDB + Mongoose backend**. The backend phase now includes authentication, protected profile APIs, connection-request workflows, Mongoose relationships, and a developer feed with pagination.

> **Project status:** Backend foundation and core connection features implemented. The next phase is the **React frontend**, where these APIs will be connected to the user interface.

---

## 🛠️ Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — REST API framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **JavaScript** — CommonJS backendS
- **JWT (JSON Web Tokens)** — Authentication
- **bcrypt** — Password hashing and password comparison
- **cookie-parser** — Reading authentication cookies
- **validator** — Email, password and URL validation
- **Nodemon** — Development workflow
- **Postman** — API testing

---

## ✨ Features Implemented

### 🔐 Authentication

- User signup
- User login
- User logout
- Password hashing with `bcrypt`
- Password comparison during login
- JWT generation
- JWT-based protected routes
- JWT stored in an HTTP cookie
- Authentication middleware using `req.user`

### 👤 Profile Management

- View authenticated user profile
- Edit profile
- Allowed-field validation for profile updates
- Change password after verifying the current password
- Protected profile routes

Allowed profile update fields currently include:

```js
["photoUrl", "about", "gender", "age", "skills"]
```

This prevents clients from directly changing restricted fields such as `_id`, `email`, or other internal data.

### ✅ Validation

The backend uses both request-level and Mongoose schema-level validation.

- First and last name validation
- Email validation
- Strong password validation
- Age range validation
- Gender enum validation
- Profile photo URL validation
- Maximum number of skills
- Unique email constraint
- Automatic timestamps

### 🤝 Connection Request System

Users can interact with other developers through connection requests.

Supported request statuses:

```text
interested
ignored
accepted
rejected
```

Implemented functionality:

- Send an `interested` request
- Send an `ignored` request
- Accept an incoming request
- Reject an incoming request
- Prevent duplicate requests in either direction
- Prevent a user from sending a request to themselves
- Protect request APIs with authentication middleware

### 🔗 Mongoose References & Population

Connection requests store references to users instead of duplicating complete user documents.

```js
fromUserId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
```

When data is retrieved, Mongoose `populate()` is used to fetch the related user information.

```js
.populate("fromUserId", USER_SAFE_DATA)
```

This keeps the connection-request document small while allowing the API to return the required developer profile data.

### 👥 Connections API

- Fetch incoming pending connection requests
- Fetch accepted connections
- Return populated developer profile information
- Restrict returned user fields through a safe-field projection

### 📰 Developer Feed

The feed API returns developer profiles that are relevant to the logged-in user.

The feed excludes:

- The logged-in user
- Users who already have a connection request relationship with the logged-in user

Pagination is implemented with:

- `page`
- `limit`
- `skip`

The API also caps the requested page size to **50** items.

---

## 🏗️ Project Structure

```text
 devTinder-backend/
 ├── src/
 │   ├── config/
 │   │   └── database.js
 │   │
 │   ├── middlewares/
 │   │   └── auth.js
 │   │
 │   ├── models/
 │   │   ├── user.js
 │   │   └── connctionRequest.js
 │   │
 │   ├── routers/
 │   │   ├── auth.js
 │   │   ├── profile.js
 │   │   ├── request.js
 │   │   └── user.js
 │   │
 │   ├── utils/
 │   │   └── validation.js
 │   │
 │   └── app.js
 │
 ├── apiList.md
 ├── .gitignore
 ├── package.json
 ├── package-lock.json
 └── README.md
```

---

## 🔄 Backend Architecture / Request Flow

```text
Client (Postman / React Frontend)
                │
                ▼
          Express Server
                │
        ┌───────┴────────┐
        ▼                ▼
     Routers         Middleware
        │                │
        └───────┬────────┘
                ▼
          Business Logic
                │
                ▼
          Mongoose Models
                │
                ▼
             MongoDB
```

For protected routes:

```text
Login
  ↓
Verify email + password
  ↓
Generate JWT
  ↓
Store JWT in cookie
  ↓
Protected request
  ↓
userAuth middleware
  ↓
Verify JWT
  ↓
Find user in MongoDB
  ↓
req.user
  ↓
Protected route handler
```

---

## 🔐 Authentication Middleware

The `userAuth` middleware is responsible for protecting private routes.

It:

1. Reads the JWT from the `token` cookie.
2. Verifies the JWT.
3. Extracts the user ID.
4. Finds the user in MongoDB.
5. Attaches the user document to `req.user`.
6. Calls `next()` to continue to the route handler.

Example:

```js
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});
```

---

## 🔑 Password Security

Passwords are never intended to be stored as plain text.

### Signup

```text
Plain Password
      ↓
 bcrypt.hash()
      ↓
Password Hash
      ↓
 MongoDB
```

### Login / Password Change

```text
Entered Password
      ↓
 bcrypt.compare()
      ↓
Stored Password Hash
      ↓
Valid / Invalid
```

---

## 🗄️ Database Design

### User Model

| Field | Type | Validation / Purpose |
|---|---|---|
| `firstName` | String | Required, trimmed, 4–50 characters |
| `lastName` | String | Trimmed, max 50 characters |
| `email` | String | Required, unique, lowercase, valid email |
| `password` | String | Required, strong password validation |
| `age` | Number | 18–100 |
| `gender` | String | `male`, `female`, `others` |
| `photoUrl` | String | Valid URL, default profile image |
| `about` | String | Max 200 characters |
| `skills` | Array | Maximum 10 skills |
| `createdAt` | Date | Mongoose timestamp |
| `updatedAt` | Date | Mongoose timestamp |

### Connection Request Model

```text
ConnectionRequest
│
├── fromUserId → User
├── toUserId   → User
├── status
├── createdAt
└── updatedAt
```

The model also contains a compound index on:

```js
{ fromUserId: 1, toUserId: 1 }
```

A Mongoose `pre("save")` hook prevents a user from creating a connection request to their own account.

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/signup` | Create a new user | ❌ |
| `POST` | `/login` | Login and issue JWT cookie | ❌ |
| `POST` | `/logout` | Clear authentication cookie | ❌ |

### Profile

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/profile/view` | View logged-in user's profile | ✅ |
| `PATCH` | `/profile/edit` | Update allowed profile fields | ✅ |
| `PATCH` | `/profile/password` | Change password | ✅ |

### Connection Requests

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/request/send/:status/:toUserId` | Send `interested` or `ignored` request | ✅ |
| `POST` | `/request/review/:status/:requestId` | Accept or reject an incoming request | ✅ |

Example statuses:

```text
/request/send/interested/:toUserId
/request/send/ignored/:toUserId

/request/review/accepted/:requestId
/request/review/rejected/:requestId
```

### User / Connection APIs

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/user/requests/received` | Fetch pending incoming requests | ✅ |
| `GET` | `/user/connections` | Fetch accepted connections | ✅ |
| `GET` | `/feed?page=1&limit=10` | Fetch developer feed | ✅ |

---

## 🧪 Example API Flow

A typical authenticated flow looks like this:

```text
Signup
  ↓
Login
  ↓
JWT Cookie
  ↓
View / Edit Profile
  ↓
Discover Developers
  ↓
Send Interested / Ignored Request
  ↓
Receive Request
  ↓
Accept / Reject Request
  ↓
View Connections
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Madhan-011/devTinder-backend.git
cd devTinder-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MongoDB

The project connects to MongoDB through `src/config/database.js`.

Before running the application, configure a valid MongoDB connection string there, or move the connection string into an environment variable such as `MONGODB_URI`.

> Never commit MongoDB credentials, JWT secrets, or other sensitive values to GitHub.

### 4. Start the development server

```bash
npm run dev
```

### 5. Start the server normally

```bash
npm start
```

The project is configured to run on:

```text
http://localhost:7777
```

---

## 🧪 API Testing with Postman

The backend APIs have been tested using Postman.

A useful collection flow is:

```text
Signup
Login
Profile View
Profile Edit
Send Connection Request
Review Connection Request
Received Requests
Connections
Feed
Logout
```

For protected requests, make sure the login request has established the authentication cookie and that Postman sends that cookie with subsequent requests.

---

## 📚 What I Learned from This Project

Building DevTinder is helping me understand backend development beyond individual APIs and CRUD operations.

Key concepts practiced:

- Node.js and Express.js
- REST API design
- Express routers and middleware
- Authentication and authorization
- JWT and cookies
- Password hashing with bcrypt
- API-level validation
- Mongoose schema validation
- MongoDB relationships using `ObjectId`
- Mongoose `ref` and `populate()`
- Mongoose instance methods
- Mongoose middleware
- MongoDB indexes and compound indexes
- Query filtering with `$or`, `$and`, `$ne`, and `$nin`
- Pagination using `skip()` and `limit()`
- Protected APIs
- Safe-field selection when returning user data
- Backend project organization

---

## 🚧 Next Phase — React Frontend

The backend now provides the core APIs needed to build the user-facing application.

The next phase is to build the **DevTinder frontend with React** and connect it to these APIs.

Planned frontend work includes:

- Signup and login UI
- Authentication state handling
- Developer feed
- Developer profile cards
- Interested / Ignore actions
- Received connection requests
- Accept / Reject actions
- Connections page
- Profile editing
- Password change flow
- Responsive UI

The goal is to move from testing the backend through Postman to using the same APIs through a complete React application.

---

## 🔮 Future Backend Improvements

- Centralized error-handling middleware
- Move all secrets to environment variables
- Stronger cookie security configuration for production
- API documentation
- Automated API tests
- Backend deployment
- Additional discovery and filtering features

---

## 👨‍💻 Author

**Madhan K**

GitHub: [Madhan-011](https://github.com/Madhan-011)

DevTinder Backend: [github.com/Madhan-011/devTinder-backend](https://github.com/Madhan-011/devTinder-backend)

---

⭐ This project is being built incrementally as part of my journey toward becoming a **Full Stack Developer**.
