# Vaani

A full-stack social media application built with React.js (frontend) and Node.js (backend) implementing core social media features.

## Project Structure

```
Vaani/
├── Backend/
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── server.js           # Server entry point
│   │   ├── config/
│   │   │   ├── mysql.js        # MySQL database configuration
│   │   │   ├── initDB.js       # Database table initialization
│   │   │   └── env.js          # Environment variables
│   │   ├── routes/
│   │   │   ├── auth.routes.js  # Authentication routes
│   │   │   ├── user.routes.js  # User management routes
│   │   │   ├── post.routes.js  # Post management routes
│   │   │   └── story.routes.js # Story management routes
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── story.controller.js
│   │   ├── models/
│   │   │   ├── user.model.js   # MySQL User model
│   │   │   ├── post.model.js   # MySQL Post model
│   │   │   └── story.model.js  # MySQL Story model
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── token.service.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── utils/
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   └── asyncHandler.js
│   │   └── constants/
│   │       └── roles.js
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── README.md
└── frontend/                    # React frontend application
    ├── src/
    │   ├── Pages/
    │   │   └── LandingPage.jsx  # Login/Signup page
    │   ├── Components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── Home/
    │   │   │   └── Home.jsx
    │   │   ├── post/
    │   │   └── story/
    │   ├── services/
    │   │   ├── api.js           # Axios configuration
    │   │   ├── authService.js
    │   │   └── postService.js
    │   └── context/
    │       ├── AuthContext.jsx
    │       └── PostContext.jsx
    ├── package.json
    └── vite.config.js
```

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (running locally)
- npm or yarn

### Installation

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the Backend root with the following variables:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=vaani
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

4. Set up MySQL database:
```bash
# Install MySQL (macOS)
brew install mysql
brew services start mysql

# Create database
mysql -u root -p
CREATE DATABASE vaani;
exit;
```

5. Start the backend server:
```bash
npm start
```

The backend will automatically create all required MySQL tables on startup.
The server will start on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root with:
```env
VITE_API_URL=http://localhost:5000
VITE_API_BASE=/api
VITE_APP_NAME=Vaani
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
VITE_IS_DEV=true
```

4. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/current` - Get current user profile
- `GET /api/users/:username` - Get user profile by username
- `PATCH /api/users/update-profile` - Update user profile
- `POST /api/users/follow/:userId` - Follow a user
- `POST /api/users/unfollow/:userId` - Unfollow a user

### Posts
- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:postId` - Get post by ID
- `POST /api/posts/:postId/like` - Like/unlike a post
- `POST /api/posts/:postId/comment` - Add comment to post
- `DELETE /api/posts/:postId` - Delete a post

### Stories
- `POST /api/stories` - Create a new story
- `GET /api/stories` - Get all active stories
- `POST /api/stories/:storyId/view` - Mark story as viewed
- `DELETE /api/stories/:storyId` - Delete a story

## Features

- **User Authentication**: Registration, login, logout with JWT tokens
- **User Profiles**: View and update user profiles, follow/unfollow users
- **Posts**: Create, view, like, comment on posts with threading support
- **Stories**: Create and view 24-hour stories with view tracking
- **Security**: Password hashing with bcrypt, JWT authentication, rate limiting
- **Validation**: Input validation using express-validator
- **Error Handling**: Centralized error handling with custom error responses
- **Premium UI**: Dark-themed glassmorphic design with animations

## Database Schema

The application uses MySQL with the following tables:
- `users` - User accounts and profiles
- `followers` - User follow relationships
- `posts` - User posts and replies
- `post_images` - Post image attachments
- `post_likes` - Post likes
- `post_comments` - Post comments
- `retweets` - Post retweets
- `stories` - 24-hour expiring stories
- `story_viewers` - Story view tracking

All tables use InnoDB engine with proper foreign key constraints.

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Relational database
- **mysql2** - MySQL client for Node.js
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend  
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.
