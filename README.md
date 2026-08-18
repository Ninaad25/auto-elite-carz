# 🚗 Auto Elite Carz

> A modern full-stack pre-owned car marketplace built with React, Node.js, Express, Prisma and PostgreSQL.

Auto Elite Carz is a full-stack web application designed to provide a clean, modern and transparent platform for browsing and managing pre-owned cars.

Users can explore available cars, search by brand or model, view detailed vehicle information, create accounts, manage their profiles and save cars to their favourites.

The platform also includes an admin dashboard for managing vehicle listings and images.

---

## ✨ Features

### 🚘 Car Catalogue

- Browse available pre-owned cars
- Search cars by brand or model
- View detailed vehicle information
- View pricing and specifications
- View fuel type and transmission
- View kilometres driven
- View registration city
- View multiple vehicle images
- Display vehicle availability status

### 🔎 Car Search

- Search directly from the homepage
- Search by car brand
- Search by car model
- Automatically navigate to filtered car results

### ❤️ Favourites

- Add cars to favourites
- Remove cars from favourites
- View saved cars
- Favourite state is synchronized with the user's account
- Login protection for favourite actions

### 👤 Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Persistent authentication
- Logout functionality
- Protected user functionality

### 👤 User Profile

- View account information
- Edit profile information
- Update name
- Update email
- Update phone number

### 🛠️ Admin Dashboard

- Admin-only access
- Add new vehicle listings
- Edit vehicle information
- Manage vehicle availability
- Upload vehicle images
- Upload additional images
- Delete individual images
- Set primary vehicle image
- Manage vehicle catalogue

### 🖼️ Vehicle Gallery

- Multiple images per vehicle
- Primary image support
- Additional image uploads
- Individual image deletion
- Responsive vehicle image gallery

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- JavaScript / TypeScript
- Prisma ORM
- JWT
- bcrypt

## Database

- PostgreSQL
- Prisma ORM

---

# 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         │     Web Browser     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Frontend       │
                         │   React + Vite      │
                         │    Tailwind CSS     │
                         └──────────┬──────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Backend       │
                         │ Node.js + Express   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Prisma        │
                         │        ORM          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     PostgreSQL      │
                         │      Database       │
                         └─────────────────────┘

auto-elite-carz/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── cars/
│   │   │   ├── dashboard/
│   │   │   ├── layout/
│   │   │   └── ...
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Cars.jsx
│   │   │   ├── CarDetails.jsx
│   │   │   ├── Favourites.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ...
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── lib/
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```
# ⚙️ Getting Started
Prerequisites

Make sure you have the following installed:

Node.js
npm
PostgreSQL
Git

# 📥 Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/auto-elite-carz.git

Navigate into the project:

cd auto-elite-carz

# 🎨 Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173

# ⚙️ Backend Setup

Open another terminal and navigate to the backend:

cd auto-elite-carz/backend

Install dependencies:

npm install

# 🔐 Environment Variables

Create a .env file inside the backend directory.

Use the provided .env.example file as a reference.

Example:

DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/auto_elite_carz"


JWT_SECRET="your-secret-key"


PORT=5001

⚠️ Never commit your actual .env file to GitHub.

# 🗄️ Database Setup

Make sure PostgreSQL is running.

Generate the Prisma client:

npx prisma generate

Run the database migrations:

npx prisma migrate dev

If the project contains a seed script:

npm run seed
▶️ Start the Backend

From the backend directory:

npm run dev

The backend API will normally run on:

http://localhost:5001
🔑 Authentication

Auto Elite Carz uses JWT-based authentication.

The authentication flow works as follows:
```
User
 │
 ▼
Login / Signup
 │
 ▼
Express API
 │
 ▼
Validate Credentials
 │
 ▼
Generate JWT
 │
 ▼
Frontend Stores Authentication State
 │
 ▼
Protected API Requests
```

Passwords are hashed using bcrypt before being stored in the database.

# 📡 API

The backend provides REST API endpoints for authentication, vehicles, favourites, users and administrative operations.

Authentication
POST /api/auth/signup
POST /api/auth/login
Cars
GET    /api/cars
GET    /api/cars/:id
POST   /api/cars
PUT    /api/cars/:id
DELETE /api/cars/:id
Favourites
GET    /api/favourites
GET    /api/favourites/:carId
POST   /api/favourites/:carId
DELETE /api/favourites/:carId
Profile
GET    /api/users/profile
PUT    /api/users/profile

API routes may vary depending on the current backend implementation.

# 🛡️ Security

The application implements several security practices:

JWT-based authentication
Password hashing with bcrypt
Protected routes
Admin authorization
Environment variables for sensitive configuration
Database access through Prisma
.env excluded from Git

# ❤️ User Flow
```
Homepage
   │
   ├── Search Cars
   │       │
   │       ▼
   │    Car Catalogue
   │       │
   │       ▼
   │    Car Details
   │       │
   │       ├── Favourite
   │       │
   │       └── Enquiry
   │
   └── Login / Signup
           │
           ▼
        Profile
           │
           └── Favourites
🛠️ Admin Flow
Admin Login
     │
     ▼
Admin Dashboard
     │
     ├── Add Car
     │
     ├── Edit Car
     │
     ├── Upload Images
     │
     ├── Delete Images
     │
     └── Manage Listings
```
# 📸 Screenshots

Screenshots can be added here to showcase the application.

<h2>🏠 Homepage</h2>

<img src="./screenshots/homepage.png" alt="Auto Elite Carz Homepage" width="900" height="600"/>

<h2>🚘 Car Catalogue</h2>

<img src="./screenshots/cars.png" alt="Auto Elite Carz Car Catalogue" width="900"/>

<h2>🚗 Car Details</h2>

<img src="./screenshots/car-details.png" alt="Auto Elite Carz Car Details" width="900"/>

<h2>❤️ Favourites</h2>

<img src="./screenshots/fav.png" alt="Auto Elite Carz Favourites" width="900"/>

<h2>👤 Profile</h2>

<img src="./screenshots/profile.png" alt="Auto Elite Carz Profile" width="900"/>

<h2>🛠️ About Us</h2>

<img src="./screenshots/about-us.png" alt="Auto Elite Carz About" width="900"/>

<h2> Contact</h2>

<img src="./screenshots/contact.png" alt="Auto Elite Carz Contact" width="900"/>

<h2>Login</h2>

<img src="./screenshots/login.png" alt="Auto Elite Carz Login" width="900"/>

<h2>Signup</h2>

<img src="./screenshots/signup.png" alt="Auto Elite Carz Signup" width="900"/>

# 🚧 Future Improvements

The following features can be added in future versions:

Advanced filtering
Price range filtering
Brand filtering
Fuel type filtering
Transmission filtering
Vehicle comparison
Car financing calculator
Online enquiry system
Email notifications
Cloud image storage
Production deployment
Admin analytics dashboard
SEO optimization
Mobile optimization
Automated testing
CI/CD pipeline
📚 What I Learned

# Building Auto Elite Carz provided practical experience with:

React application architecture
REST API development
Express.js
PostgreSQL database design
Prisma ORM
JWT authentication
Password hashing
Protected routes
Role-based authorization
Image management
File uploads
API integration with Axios
Responsive UI development
Tailwind CSS
Git and GitHub

## 👨‍💻 Author
Ninaad Mhadalkar - IT Engineer and Full-Stack Developer.

`Auto Elite Carz` was developed as a full-stack web development project combining a modern React frontend with a Node.js/Express backend and PostgreSQL database.

# 📄 License

This project is currently intended for educational and portfolio purposes.

⭐ If you find this project interesting, feel free to explore the code and follow the project on GitHub.

After pasting it into `README.md`, save it and run:

```
bash:
git add README.md
git commit -m "Improve project README"
git push
```