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
- **JWT** – Authentication and authorization
- **cookie-parser** – Cookie handling
- **validator** – Data validation
- **Nodemon** – Development server auto-restart

## 📁 Project Structure

```text
devtinder-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   └── user.js
│   ├── routers/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── request.js
│   ├── utils/
│   │   └── validation.js
│   └── app.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

```bash
git clone https://github.com/Madhan-011/devTinder-backend.git
cd devTinder-backend
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> **Never commit your `.env` file or expose database credentials and JWT secrets on GitHub.**

## ▶️ Running the Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server runs on `http://localhost:7777`.

## 🗄️ Database

The application uses **MongoDB** with **Mongoose**. The database connection is established before starting the Express server.

## 👤 User Model

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

## 🔗 API Endpoints

### Authentication Router

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/signup` | Create a new user |
| POST | `/login` | Authenticate user and issue JWT cookie |
| POST | `/logout` | Clear authentication cookie |

### Profile Router

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/profile/view` | View authenticated user's profile |
| PATCH | `/profile/edit` | Update authenticated user's profile |
| PATCH | `/profile/password` | Change authenticated user's password |

### Connection Request Router

| Method | Endpoint | Status |
|---|---|---|
| POST | `/sendConnectionRequest` | Initial implementation |
| POST | `/request/send/interested/:userId` | Planned |
| POST | `/request/send/ignored/:userId` | Planned |
| POST | `/request/review/accepted/:requestId` | Planned |
| POST | `/request/review/rejected/:requestId` | Planned |

Planned request statuses:

```text
interested
ignored
accepted
rejected
```

## 🔐 Authentication & Authorization

DevTinder uses **JWT-based authentication** with cookies.

```text
LOGIN
  ↓
Verify Email & Password
  ↓
Generate JWT
  ↓
Store JWT in Cookie
  ↓
Protected API Request
  ↓
userAuth Middleware
  ↓
Read & Verify JWT
  ↓
Find User in MongoDB
  ↓
req.user = user
  ↓
Route Handler
```

The `userAuth` middleware protects authenticated routes such as profile and connection-request APIs.

## 🔒 Password Security

Passwords are not stored as plain text.

### Signup

```text
Plain Password
      ↓
bcrypt.hash()
      ↓
Hashed Password
      ↓
MongoDB
```

### Login

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Password Hash
      ↓
Valid / Invalid
```

The User model also provides methods for password validation and JWT generation.

## 🧩 Middleware

The `userAuth` middleware:

1. Reads the JWT from the request cookie
2. Verifies the JWT
3. Extracts the user's ID
4. Finds the user in MongoDB
5. Attaches the user to `req.user`
6. Passes control to the protected route

Example:

```js
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});
```

## 🧪 API Testing

The APIs can be tested using:

- Postman
- Thunder Client
- Insomnia

Typical flow:

```text
Signup
  ↓
Login
  ↓
JWT Cookie
  ↓
Protected API
  ↓
Profile / Protected Feature
```

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
- [x] Cookie-based authentication
- [x] Authentication middleware
- [x] Profile view API
- [x] Profile edit API
- [x] Logout API
- [x] Change password API
- [x] Router separation
- [x] Initial connection request API
- [x] Mongoose timestamps

## 🚧 Planned Features

- [ ] Complete connection request workflow
- [ ] Interested/ignored request handling
- [ ] Accept/reject connection requests
- [ ] User connections API
- [ ] User pending requests API
- [ ] Developer discovery/feed logic
- [ ] Forgot password / password reset flow
- [ ] Improved error handling
- [ ] Improved API response structure
- [ ] Move all secrets completely to environment variables
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
- Authentication and authorization
- JWT
- Cookies
- Router architecture
- Protected routes
- Error handling
- Backend project architecture
- Full-stack application development

## 👨‍💻 Author

**Madhan K**

GitHub: https://github.com/Madhan-011

---

⭐ **DevTinder is actively under development, with new backend features being added progressively.**
