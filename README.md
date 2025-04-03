# Blog Frontend Application

A modern React-based blog application that allows users to create, read, update, and delete blog posts. The application features user authentication, profile management, and a responsive design built with Tailwind CSS.

## Features

- User authentication (login/register)
- Blog post management (CRUD operations)
- Profile management
- Responsive design
- Modern UI with Tailwind CSS
- Protected routes for authenticated users

## Tech Stack

- React 18
- React Router DOM v7
- Tailwind CSS
- Axios for API requests
- JWT for authentication
- React Hot Toast for notifications
- Hero Icons and React Icons
- Vite as build tool

## Project Structure

```
src/
├── components/      # Reusable UI components
├── contexts/        # React context providers
├── pages/           # Application pages/routes
├── api.js           # API service configuration
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_URL=your_backend_api_url
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Application Workflow

### Authentication Flow

1. Users can register with email and password
2. Login generates a JWT token stored for authenticated requests
3. Protected routes check for valid authentication
4. AuthContext manages global auth state

### Blog Management

1. Home page displays all blog posts
2. Authenticated users can:
   - Create new blog posts
   - Edit their own posts
   - Delete their posts
   - View their posts in My Blogs section

### Components

- `Navbar`: Navigation and auth status
- `BlogCard`: Reusable blog post display
- `DeleteConfirmation`: Modal for delete confirmation

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.
