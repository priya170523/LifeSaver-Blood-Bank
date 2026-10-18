# 🩸 LifeSaver Blood Bank Management System

A web-based Blood Bank Management System designed to help manage blood donors and blood requests efficiently. Built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

## 🚀 Features

- 👤 **User Registration** — Create an account securely.
- 🔐 **User Authentication** — Sign in with hashed passwords.
- 🩸 **Donor Registration** — Register as a blood donor.
- 🏥 **Blood Requests** — Submit blood requests through an online form.
- 💾 **Database Integration** — Store user accounts, donor details, and blood requests in MongoDB.
- 📱 **Responsive Interface** — Simple web pages for accessing the system.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript | Client-side functionality |
| Node.js | Server runtime |
| Express.js | Backend API and routing |
| MongoDB | Database |
| Mongoose | Database models |
| bcryptjs | Password hashing |
| Express Session | Session management |

## 📂 Project Structure

```text
LifeSaver-Blood-Bank/
├── models/
│   ├── BloodRequest.js
│   ├── Donor.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── bloodRequests.js
│   └── donors.js
├── index.html
├── about.html
├── contact.html
├── donate.html
├── request.html
├── signin.html
├── signup.html
├── learn-more.html
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/priya170523/LifeSaver-Blood-Bank.git
cd LifeSaver-Blood-Bank
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/blood_donation
SESSION_SECRET=replace_with_a_long_random_secret
NODE_ENV=development
```

Replace the session secret with a securely generated random value. Never commit your `.env` file or share your credentials publicly.

### 4. Start MongoDB

Ensure MongoDB Community Server is installed and running locally, or configure `MONGODB_URI` to point to your own MongoDB deployment.

### 5. Run the application

For development:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

Open the application in your browser:

**http://localhost:3000**

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server and database status |
| POST | `/api/auth/signup` | Register a user |
| POST | `/api/auth/signin` | Authenticate a user |
| GET | `/api/auth/me` | Check the current session |
| POST | `/api/auth/signout` | Sign out |
| POST | `/api/donors` | Register a blood donor |
| POST | `/api/blood-requests` | Submit a blood request |

## 🔒 Security

- Passwords are hashed using bcryptjs.
- Session cookies use HTTP-only and SameSite settings.
- Environment variables are used for database configuration and session secrets.
- Private configuration files should not be committed to GitHub.

**Note:** Before using this application with real users, implement and test appropriate authorization, rate limiting, CSRF protection, data privacy controls, and production database security.

## 🎯 Project Objective

The objective of LifeSaver Blood Bank is to provide a convenient web-based platform for registering blood donors and submitting blood requests, helping make blood donation coordination easier.

## 👩‍💻 Author

**Aswitha Priya**

GitHub: [@priya170523](https://github.com/priya170523)

## 📄 License

This project is available for educational and portfolio purposes. Add a license file if you want to specify formal reuse and distribution permissions.
