# Dashboard Project

## Project Overview

The Dashboard Project is a web application designed to provide users with an intuitive interface for managing and visualizing data related to user enrollments. It leverages a modern tech stack, ensuring a responsive and dynamic user experience.

## Features

- User authentication and management
- Enrollment statistics visualized in bar charts and doughnut chart.
- Responsive design for both desktop and mobile devices.
- API integration for fetching and displaying data.

## Technologies Used

- **Frontend:**
  - React.js
  - Chart.js
  - Axios
  - Tailwind CSS / Bootstrap

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT for authentication
  - dotenv for environment variable management

## Installation

To get started with the Dashboard project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/professorSergio12/Assignment-React-Dashboard.git
   ```

2. Navigate to the project directory:
   ```
   cd Dashboard
   ```

3. Install the backend dependencies:

   ```
   npm install
   ```
4. Navigate to the client directory and install frontend dependencies:
   ```
   cd client
   npm install
   ```

5. Create a .env file in the root directory and add your MongoDB connection string:
   ```
   DATABASE_URL=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   ```
6. Start the development server:
   ```
   npm run dev
   ```

This will start the backend server using Nodemon ans do same for cleint  side.

### Usage
- Open your web browser and navigate to http://localhost:3000 to access the dashboard.
- Use the authentication features to log in or sign up.
- Explore the enrollment statistics and other features available in the dashboard.

  ### API Endpoints
Authentication Routes
POST /api/auth/signin: Login a user.
POST /api/auth/signup: Register a new user.

User Routes: 
GET /api/user/dashboard/ChildOverview: Get enrollment statistics for a specific year.
GET /api/user/dashboard/CareGiverOverview: Get enrollment statistics for a specific year.
GET /api/user/dashboard/financialOverview: Get enrollment statistics for a specific year.
GET /api/user/dashboard/attendanceOverview: Get enrollment statistics.
GET /api/user/dashboard/enrollmentOverview: Get enrollment statistics for a specific year.

Directory Structure
```
React-Dashboard/
│
├── api/                   # Backend code
│   ├── controllers/       # Controller files
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # error and verifying 
│   └── index.js           # Entry point for the backend
│
├── client/                # Frontend code
│   ├── public/            # Public assets
│   ├── src/               # React source files
│   └── package.json       # Client dependencies
│
├── .env                   # Environment variables
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

### Contributing: 
Contributions are welcome! If you would like to contribute.
