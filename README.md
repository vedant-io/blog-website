# Blog Website

This is a full-stack blog website built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to create, read, update, and delete blog posts.

## Tech Stack

**Frontend:**

*   React.js
*   Vite
*   React Router
*   TanStack Query
*   Zustand
*   Axios
*   Tailwind CSS

**Backend:**

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   Passport.js for authentication
*   JWT for authorization

## Features

*   User authentication (signup, login, and logout) with Google OAuth.
*   Create, read, update, and delete blog posts.
*   Like and comment on posts.
*   View posts by specific authors.
*   View posts by tags.
*   User profiles.

## Getting Started

### Prerequisites

*   Node.js (v14 or later)
*   npm
*   MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/blog-website.git
    cd blog-website
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

    The backend server will be running on `http://localhost:5000`.

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

    The frontend development server will be running on `http://localhost:5173`.

## Project Structure

```
.
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── lib
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── strategies
│   └── ...
└── frontend
    ├── src
    │   ├── api
    │   ├── assets
    │   ├── components
    │   ├── lib
    │   ├── pages
    │   └── queryOptions
    └── ...
```

## License

This project is licensed under the MIT License.
