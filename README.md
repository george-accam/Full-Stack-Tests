# FarmFresh Marketplace

A direct-to-consumer platform connecting farmers with customers for fresh produce sales.

## Technology Stack

### Frontend
- React.js (Vite)
- Context API (State Management)
- Tailwind CSS (Styling)
- React Router (Navigation)
- Axios (HTTP Client)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Multer (File Uploads)

### Development Tools
- Nodemon (Development Server)
- Postman (API Testing)
- Git (Version Control)

## Features Implemented

### Core Features
- User authentication (Farmers & Customers)
- Product management (CRUD operations)
- Product browsing with search/filters
- Shopping cart functionality
- Order processing system
- Role-based dashboards

### Bonus Features
- Email order confirmations
- Responsive design (Mobile-first)

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas URI)
- Git


## API Documentation

### API Endpoints List

#### Authentication
| Method | Endpoint           | Description                | Protected |
|--------|--------------------|----------------------------|-----------|
| POST   | /api/auth/register | Register new user          | No        |
| POST   | /api/auth/login    | Login user                 | No        |
| GET    | /api/auth/me       | Get current user profile   | Yes       |

#### Products
| Method | Endpoint           | Description                | Protected | Role       |
|--------|--------------------|----------------------------|-----------|------------|
| GET    | /api/products      | Get all products           | No        |            |
| GET    | /api/products/:id  | Get single product         | No        |            |
| POST   | /api/products      | Create new product         | Yes       | farmer     |
| PUT    | /api/products/:id  | Update product             | Yes       | farmer     |
| DELETE | /api/products/:id  | Delete product             | Yes       | farmer     |

#### Orders
| Method | Endpoint           | Description                | Protected | Role       |
|--------|--------------------|----------------------------|-----------|------------|
| POST   | /api/orders        | Create new order           | Yes       | customer   |
| GET    | /api/orders        | Get user's orders          | Yes       | customer   |
| GET    | /api/orders/farmer | Get farmer's orders        | Yes       | farmer     |
| PUT    | /api/orders/:id    | Update order status        | Yes       | farmer     |

#### Users
| Method | Endpoint           | Description                | Protected |
|--------|--------------------|----------------------------|-----------|
| GET    | /api/users         | Get all users (admin)      | Yes       |
| PUT    | /api/users/profile | Update user profile        | Yes       |

## Setup Guide

### Detailed Backend Setup

1. **Database Configuration**:
   - Install MongoDB locally or create a free cluster on MongoDB Atlas
   - Update the `MONGO_URI` in `.env`:
     ```
     MONGO_URI=mongodb://localhost:27017/farmfresh
     # OR for Atlas
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/farmfresh
     ```

2. **Email Service**:
   - Create a Gmail account for sending notifications
   - Enable "Less secure app access" or use App Passwords
   - Add credentials to `.env`:
     ```
     EMAIL_USER=your.email@gmail.com
     EMAIL_PASS=yourpassword
     ```

3. **File Uploads**:
   - Create an `uploads` folder in the backend root
   - Ensure proper permissions:
     ```bash
     mkdir uploads
     chmod -R 755 uploads
     ```

### Frontend Configuration

1. **API Base URL**:
   - Set the backend API URL in `.env`:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

2. **Environment Variables**:
   - Configure any frontend-specific settings:
     ```
     VITE_GOOGLE_MAPS_API_KEY=your_key (if using maps)
     VITE_STRIPE_PUBLIC_KEY=your_key (if implementing payments)
     ```



## Design & Implementation Decisions

### Architecture Choices
1. **Monolithic MVC**: Chosen for simplicity and faster development
2. **JWT Authentication**: Stateless approach suitable for REST APIs
3. **Context API**: Lightweight state management for current requirements
4. **Mobile-first Design**: Prioritized mobile experience for rural users

### Trade-offs
1. **State Management**: Chose Context API over Redux for simpler learning curve
2. **Database**: MongoDB for flexible schema despite relational data aspects
3. **File Storage**: Local storage for simplicity over cloud solutions
4. **Payments**: Mock implementation to focus on core marketplace flow

### Security Considerations
1. **Input Validation**: Implemented on both client and server
2. **Password Handling**: BCrypt hashing with salt
3. **Rate Limiting**: Basic Express rate limiting middleware
4. **CORS**: Configured to only allow frontend origin

### Performance Optimizations
1. **Pagination**: Implemented for product listings
2. **Image Compression**: Basic client-side resizing before upload
3. **Database Indexing**: Added for frequently queried fields
4. **Caching**: Basic in-memory caching for product categories

### Future Improvements
1. **Microservices**: Split into separate services as scale demands
2. **Redis**: Add for session caching and rate limiting
3. **CDN**: Implement for static assets and product images
4. **WebSockets**: Real-time order notifications
5. **Payment Integration**: Stripe or PayPal implementation

## Testing Instructions

### Manual Testing
1. **Authentication Flow**:
   - Register new accounts of both types
   - Login/logout functionality
   - Protected route access

2. **Product Management**:
   - Farmer: Create/update/delete products
   - Customer: View products with filters

3. **Order Process**:
   - Add items to cart
   - Checkout flow
   - Order history views

### Automated Testing
Run test suites with:
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test