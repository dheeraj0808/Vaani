# Twitter Clone

A full-stack Twitter clone application built with React.js (frontend) and Node.js (backend) implementing core social media features.

## Project Structure

```
Vaani/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── server.js           # Server entry point
│   │   ├── config/
│   │   │   ├── db.js           # Database configuration
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
│   │   │   ├── user.model.js
│   │   │   ├── post.model.js
│   │   │   └── story.model.js
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
```

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend root with the following variables:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/twitter-clone

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

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
- **Posts**: Create, view, like, comment on posts
- **Stories**: Create and view 24-hour stories with view tracking
- **Security**: Password hashing, JWT authentication, rate limiting
- **Validation**: Input validation using express-validator
- **Error Handling**: Centralized error handling with custom error responses

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

## Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.
