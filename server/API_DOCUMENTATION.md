# API Documentation - Backend Optimizations & Cart Management

## Overview
This document outlines the complete backend optimization and cart management system implementation for the NT Store application.

## Base URL
```
http://localhost:8888/v1
```

---

## 🛒 Cart Management Endpoints

### 1. Get User Cart
**GET** `/cart`
- **Auth Required:** Yes
- **Description:** Retrieves the authenticated user's shopping cart
- **Response:**
```json
{
    "status": "success",
    "data": {
        "userId": "user_id",
        "items": [
            {
                "productId": "product_id",
                "name": "Product Name",
                "price": 29.99,
                "quantity": 2,
                "img": "https://...",
                "dsc": "Description"
            }
        ],
        "totalItems": 2,
        "totalPrice": 59.98
    }
}
```

### 2. Add Item to Cart
**POST** `/cart/add`
- **Auth Required:** Yes
- **Body:**
```json
{
    "productId": "product_id",
    "quantity": 1
}
```
- **Response:**
```json
{
    "status": "success",
    "message": "Item added to cart",
    "data": { ...cart }
}
```

### 3. Update Cart Item Quantity
**PUT** `/cart/update`
- **Auth Required:** Yes
- **Body:**
```json
{
    "productId": "product_id",
    "quantity": 3
}
```
- **Note:** Setting quantity to 0 will remove the item

### 4. Remove Item from Cart
**DELETE** `/cart/remove/:productId`
- **Auth Required:** Yes
- **Params:** productId
- **Response:**
```json
{
    "status": "success",
    "message": "Item removed from cart",
    "data": { ...cart }
}
```

### 5. Clear Cart
**DELETE** `/cart/clear`
- **Auth Required:** Yes
- **Description:** Removes all items from the cart
- **Response:**
```json
{
    "status": "success",
    "message": "Cart cleared",
    "data": { ...emptyCart }
}
```

### 6. Get All Carts (Admin)
**GET** `/cart/admin/all?page=1&limit=10`
- **Auth Required:** Yes (Admin only)
- **Query Params:**
  - `page` (default: 1)
  - `limit` (default: 10)
- **Response:**
```json
{
    "status": "success",
    "carts": [...],
    "total": 50,
    "page": 1,
    "totalPages": 5
}
```

### 7. Delete Cart (Admin)
**DELETE** `/cart/admin/:userId`
- **Auth Required:** Yes (Admin only)
- **Params:** userId
- **Description:** Deletes a specific user's cart

---

## 📦 Product Endpoints

### 1. List Products
**GET** `/products?page=1&pageSize=10`
- **Auth Required:** No
- **Query Params:**
  - `page` (default: 1)
  - `pageSize` (default: 10)

### 2. Get Recommended Products
**GET** `/products/recommend?limit=9`
- **Auth Required:** No
- **Query Params:**
  - `limit` (default: 9)

### 3. Get Product by ID
**GET** `/products/:productId`
- **Auth Required:** No
- **Params:** productId

### 4. Create Product (Admin)
**POST** `/products`
- **Auth Required:** Yes (Admin only)
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `imageFile`: Image file
  - `data`: JSON string
```json
{
    "name": "Product Name",
    "dsc": "Description",
    "price": 29.99,
    "categoryId": "category_id",
    "country": "USA"
}
```

### 5. Update Product (Admin)
**PUT** `/products/:productId`
- **Auth Required:** Yes (Admin only)
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `imageFile` (optional): New image file
  - `data` OR individual fields: Product data to update

### 6. Delete Product (Admin)
**DELETE** `/products/:productId`
- **Auth Required:** Yes (Admin only)
- **Params:** productId

---

## 🔐 Authentication & User Management

### Overview
The authentication system uses JWT (JSON Web Tokens) for stateless authentication with role-based access control (RBAC).

**Key Features:**
- ✅ Secure password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Role-based authorization (Admin/User)
- ✅ Token auto-refresh on profile requests
- ✅ Protected endpoints with middleware
- ✅ Account status management (active/inactive)

**User Roles:**
- `0` - Administrator (full access)
- `1` - Regular User (limited access)

---

## 📝 Public Authentication Endpoints

### 1. Sign Up (Register New User)
**POST** `/auth/signup`

**Description:** Register a new user account and receive authentication token.

**Request:**
```bash
curl -X POST http://localhost:8888/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "image": "https://...",
    "phoneNumber": "+1234567890",
    "address": "123 Main St"
  }'
```

**Required Fields:**
- `email` - Valid email format
- `password` - Minimum 6 characters
- `firstName` - User's first name
- `lastName` - User's last name

**Optional Fields:**
- `image` - Profile picture URL
- `phoneNumber` - Contact number
- `address` - Physical address

**Success Response (201):**
```json
{
    "status": "success",
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
        "_id": "67fde123abc",
        "name": "John Doe",
        "email": "user@example.com",
        "role": 1,
        "isActive": true,
        "createdAt": "2025-10-04T08:04:56.551Z"
    }
}
```

**Error Responses:**
- `400` - Missing required fields or invalid email/password format
- `409` - Email already exists

---

### 2. Login
**POST** `/auth/login`

**Description:** Authenticate existing user and receive JWT token.

**Request:**
```bash
curl -X POST http://localhost:8888/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Required Fields:**
- `email` - Registered email address
- `password` - Account password

**Success Response (200):**
```json
{
    "status": "success",
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
        "_id": "67fde123abc",
        "name": "John Doe",
        "email": "user@example.com",
        "role": 1,
        "image": "https://...",
        "phoneNumber": "+1234567890",
        "address": "123 Main St",
        "isActive": true
    }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials (incorrect email/password)
- `403` - Account is inactive

**Security Notes:**
- Passwords are hashed using bcrypt
- Token expires in 24 hours
- Failed login attempts should be monitored (recommended)

---

## 👤 User Profile Endpoints (Authenticated)

### 3. Get Current User Profile
**GET** `/auth/profile`

**Description:** Retrieve authenticated user's profile information. Returns refreshed token.

**Request:**
```bash
curl -X GET http://localhost:8888/v1/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Headers:**
- `Authorization: Bearer <token>` (required)

**Success Response (200):**
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": {
        "_id": "67fde123abc",
        "name": "John Doe",
        "email": "user@example.com",
        "role": 1,
        "phoneNumber": "+1234567890",
        "address": "123 Main St",
        "image": "https://...",
        "isActive": true,
        "createdAt": "2025-10-04T08:04:56.551Z",
        "updatedAt": "2025-10-04T10:15:30.123Z"
    }
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `404` - User not found

**Notes:**
- Token is automatically refreshed with extended expiration
- Useful for session validation and token refresh

---

### 4. Update Own Profile
**PUT** `/auth/profile`

**Description:** Update authenticated user's profile information.

**Request:**
```bash
curl -X PUT http://localhost:8888/v1/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "phoneNumber": "+1987654321",
    "address": "456 New St",
    "image": "https://..."
  }'
```

**Headers:**
- `Authorization: Bearer <token>` (required)

**Updatable Fields:**
- `firstName` - First name
- `lastName` - Last name
- `phoneNumber` - Contact number
- `address` - Physical address
- `image` - Profile picture URL

**Restrictions:**
- ❌ Cannot update `email`
- ❌ Cannot update `role` (use admin endpoint)
- ❌ Cannot update `isActive` status

**Success Response (200):**
```json
{
    "status": "success",
    "message": "Profile updated successfully",
    "data": {
        "_id": "67fde123abc",
        "name": "Jane Smith",
        "email": "user@example.com",
        "role": 1,
        "phoneNumber": "+1987654321",
        "address": "456 New St",
        "image": "https://...",
        "isActive": true
    }
}
```

**Error Responses:**
- `400` - Invalid input data
- `401` - Missing or invalid token
- `404` - User not found

---

## 👨‍💼 Admin User Management Endpoints

**All endpoints require admin authentication** (`role: 0`)

### 5. Get All Users (List)
**GET** `/users?page=1&limit=10&role=1`

**Description:** Retrieve paginated list of users with optional role filtering.

**Request:**
```bash
curl -X GET "http://localhost:8888/v1/users?page=1&limit=10&role=1" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `role` - Filter by role: `0` (admins) or `1` (users) (optional)

**Success Response (200):**
```json
{
    "status": "success",
    "users": [
        {
            "_id": "67fde123abc",
            "name": "John Doe",
            "email": "user@example.com",
            "role": 1,
            "isActive": true,
            "createdAt": "2025-10-04T08:04:56.551Z"
        }
    ],
    "total": 50,
    "page": 1,
    "totalPages": 5
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - User is not an admin

---

### 6. Search Users
**GET** `/users/search?query=john&page=1&limit=10`

**Description:** Search users by name or email with pagination.

**Request:**
```bash
curl -X GET "http://localhost:8888/v1/users/search?query=john&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Query Parameters:**
- `query` - Search term for name or email (required, min 2 characters)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Success Response (200):**
```json
{
    "status": "success",
    "users": [
        {
            "_id": "67fde123abc",
            "name": "John Doe",
            "email": "john@example.com",
            "role": 1,
            "isActive": true
        }
    ],
    "total": 10,
    "page": 1,
    "totalPages": 1
}
```

**Error Responses:**
- `400` - Missing or invalid query parameter
- `401` - Missing or invalid token
- `403` - User is not an admin

---

### 7. Get User by ID
**GET** `/users/:userId`

**Description:** Retrieve detailed information about a specific user.

**Request:**
```bash
curl -X GET http://localhost:8888/v1/users/67fde123abc \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Path Parameters:**
- `userId` - MongoDB ObjectId of the user

**Success Response (200):**
```json
{
    "status": "success",
    "data": {
        "_id": "67fde123abc",
        "name": "John Doe",
        "email": "user@example.com",
        "role": 1,
        "isActive": true,
        "phoneNumber": "+1234567890",
        "address": "123 Main St",
        "image": "https://...",
        "createdAt": "2025-10-04T08:04:56.551Z",
        "updatedAt": "2025-10-04T10:15:30.123Z"
    }
}
```

**Error Responses:**
- `400` - Invalid user ID format
- `401` - Missing or invalid token
- `403` - User is not an admin
- `404` - User not found

---

### 8. Create User (Admin)
**POST** `/users`

**Description:** Create a new user account with specified role and details.

**Request:**
```bash
curl -X POST http://localhost:8888/v1/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": 1,
    "image": "https://...",
    "phoneNumber": "+1234567890",
    "address": "789 Admin St"
  }'
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Required Fields:**
- `email` - Valid email format
- `password` - Minimum 6 characters
- `firstName` - User's first name
- `lastName` - User's last name
- `role` - User role: `0` (admin) or `1` (user)

**Optional Fields:**
- `image` - Profile picture URL
- `phoneNumber` - Contact number
- `address` - Physical address

**Success Response (201):**
```json
{
    "status": "success",
    "message": "User created successfully",
    "data": {
        "_id": "67fde456def",
        "name": "Jane Smith",
        "email": "newuser@example.com",
        "role": 1,
        "isActive": true
    }
}
```

**Error Responses:**
- `400` - Missing required fields or invalid data
- `401` - Missing or invalid token
- `403` - User is not an admin
- `409` - Email already exists

---

### 9. Update User (Admin)
**PUT** `/users/:userId`

**Description:** Update any user field including role and status. Full admin privileges.

**Request:**
```bash
curl -X PUT http://localhost:8888/v1/users/67fde123abc \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "role": 0,
    "isActive": false,
    "phoneNumber": "+1234567890"
  }'
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Path Parameters:**
- `userId` - MongoDB ObjectId of the user

**Updatable Fields:**
- `firstName` - First name
- `lastName` - Last name
- `email` - Email address
- `role` - User role (0 or 1)
- `isActive` - Account status (true/false)
- `phoneNumber` - Contact number
- `address` - Physical address
- `image` - Profile picture URL

**Success Response (200):**
```json
{
    "status": "success",
    "message": "User updated successfully",
    "data": {
        "_id": "67fde123abc",
        "name": "Jane Smith",
        "email": "user@example.com",
        "role": 0,
        "isActive": false,
        "phoneNumber": "+1234567890"
    }
}
```

**Error Responses:**
- `400` - Invalid user ID or data
- `401` - Missing or invalid token
- `403` - User is not an admin
- `404` - User not found
- `409` - Email already in use (if updating email)

**Notes:**
- Admins can update any field including roles
- Can activate/deactivate accounts
- Can promote users to admin or demote admins to users

---

### 10. Delete User
**DELETE** `/users/:userId`

**Description:** Permanently delete a user account. Cannot delete own account.

**Request:**
```bash
curl -X DELETE http://localhost:8888/v1/users/67fde123abc \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Path Parameters:**
- `userId` - MongoDB ObjectId of the user

**Restrictions:**
- ❌ Admin cannot delete their own account
- ⚠️ This action is **permanent** and cannot be undone
- 🗑️ User's cart will also be deleted

**Success Response (200):**
```json
{
    "status": "success",
    "message": "User deleted successfully",
    "data": {
        "_id": "67fde123abc",
        "name": "John Doe",
        "email": "user@example.com",
        "role": 1
    }
}
```

**Error Responses:**
- `400` - Invalid user ID format or attempting to delete own account
- `401` - Missing or invalid token
- `403` - User is not an admin
- `404` - User not found

---

### 11. Update User Role (Quick)
**PATCH** `/users/:userId/role`

**Description:** Quick endpoint to change user role only. More focused than full update.

**Request:**
```bash
curl -X PATCH http://localhost:8888/v1/users/67fde123abc/role \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": 0
  }'
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Path Parameters:**
- `userId` - MongoDB ObjectId of the user

**Required Fields:**
- `role` - New role: `0` (admin) or `1` (user)

**Restrictions:**
- ❌ Admin cannot change their own role

**Success Response (200):**
```json
{
    "status": "success",
    "message": "User role updated successfully",
    "data": {
        "_id": "67fde123abc",
        "name": "John Doe",
        "email": "user@example.com",
        "role": 0,
        "isActive": true
    }
}
```

**Error Responses:**
- `400` - Invalid role value or attempting to change own role
- `401` - Missing or invalid token
- `403` - User is not an admin
- `404` - User not found

**Use Cases:**
- Promote user to admin
- Demote admin to regular user
- Quick role management without updating other fields

---

### 12. Create Admin Account (Secure)
**POST** `/users/create-admin`

**Description:** Create a new administrator account with enhanced security validation and audit logging.

**Request:**
```bash
curl -X POST http://localhost:8888/v1/users/create-admin \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePass123!",
    "firstName": "Admin",
    "lastName": "User",
    "image": "https://...",
    "phoneNumber": "+1234567890",
    "address": "Admin Office"
  }'
```

**Headers:**
- `Authorization: Bearer <admin_token>` (required)

**Required Fields:**
- `email` - Valid email format
- `password` - **Minimum 8 characters** (stricter than regular users)
- `firstName` - Admin's first name
- `lastName` - Admin's last name

**Optional Fields:**
- `image` - Profile picture URL
- `phoneNumber` - Contact number
- `address` - Physical address

**Security Features:**
- ✅ Enhanced password requirement (8+ characters vs 6)
- ✅ Admin-only access control
- ✅ Audit logging to server console
- ✅ Duplicate email validation
- ✅ Automatic role assignment (role=0)
- ✅ Account created as active by default

**Success Response (201):**
```json
{
    "status": "success",
    "message": "Admin account created successfully",
    "data": {
        "_id": "67fde789ghi",
        "name": "Admin User",
        "email": "admin@example.com",
        "role": 0,
        "isActive": true,
        "createdAt": "2025-10-04T08:30:12.456Z"
    }
}
```

**Error Responses:**
- `400` - Missing required fields, invalid email, or password too short
- `401` - Missing or invalid token
- `403` - Requesting user is not an admin
- `409` - Email already exists

**Server Console Log:**
```
[ADMIN CREATION] New admin created: admin@example.com by admin: superadmin@example.com
```

**Why Use This Instead of `/users`?**
- 🔒 Higher security standards for admin accounts
- 📝 Explicit audit trail
- 🛡️ Clear intent and better code organization
- ⚡ Simplified - automatically sets role to 0
- 📊 Easier to track admin creation events

---

## 🔧 Backend Optimizations Implemented

### 1. Cart Model Improvements
- **Structured schema** with embedded CartItem schema
- **Validation rules** for price and quantity
- **Automatic total calculation** method
- **References** to User and Product models
- **Timestamps** for tracking cart updates

### 2. Service Layer Architecture
- **CartService** class with static methods
- **Error handling** with try-catch and throw
- **Reusable business logic** separated from controllers
- **Database query optimization** with proper indexes

### 3. Controller Enhancements
- **Consistent response format** with status and message
- **Input validation** before processing
- **Better error messages** with console.error logging
- **HTTP status codes** properly aligned with REST standards

### 4. RESTful Route Structure
- **Semantic URL paths** (`/products/:id` instead of `/product/deleteProduct?:id`)
- **HTTP verb alignment** (GET, POST, PUT, DELETE)
- **Route organization** by feature and access level
- **Authentication middleware** properly applied

### 5. Code Quality Improvements
- **Consistent naming conventions** (camelCase for functions)
- **Proper async/await** error handling
- **Removed unused code** and comments
- **Standardized imports** and exports

---

## 🔐 Authentication & Authorization System

### Overview
The API uses a two-tier authentication system with JWT tokens and role-based access control.

### Middleware Chain

#### 1. `auth` Middleware
**Purpose:** Validates JWT token and authenticates requests.

**Functionality:**
- Extracts token from `Authorization: Bearer <token>` header
- Verifies token signature using `ACCESS_TOKEN_SECRET`
- Decodes user ID from token payload
- Attaches `userId` to `req` object for downstream use
- Returns 401 if token is missing, invalid, or expired

**Usage:**
```javascript
router.get('/profile', auth, getProfile);
```

#### 2. `isAdmin` Middleware
**Purpose:** Authorizes admin-only endpoints.

**Functionality:**
- Must be used **after** `auth` middleware
- Fetches user from database using `req.userId`
- Checks if user role is `0` (admin)
- Returns 403 if user is not an admin
- Allows request to proceed if user is admin

**Usage:**
```javascript
router.delete('/users/:id', auth, isAdmin, deleteUser);
```

### JWT Token Details

**Token Structure:**
```json
{
  "userId": "67fde123abc",
  "iat": 1728019496,
  "exp": 1728105896
}
```

**Token Properties:**
- **Algorithm:** HS256 (HMAC with SHA-256)
- **Expiration:** 24 hours (1 day)
- **Secret:** Stored in `ACCESS_TOKEN_SECRET` environment variable
- **Payload:** Contains `userId` for user identification

**Token Usage:**
```bash
# Include in every authenticated request
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Lifecycle:**
1. **Generation:** Created on signup/login
2. **Storage:** Client stores in localStorage/sessionStorage/cookies
3. **Transmission:** Sent in Authorization header
4. **Validation:** Verified on every protected endpoint
5. **Refresh:** New token issued on profile requests
6. **Expiration:** Expires after 24 hours

### Authorization Levels

| Endpoint Type | Auth Required | Admin Required | Middleware |
|--------------|---------------|----------------|------------|
| Public (signup, login) | ❌ No | ❌ No | None |
| User Profile | ✅ Yes | ❌ No | `auth` |
| User Cart | ✅ Yes | ❌ No | `auth` |
| User Management | ✅ Yes | ✅ Yes | `auth, isAdmin` |
| Product Create/Update/Delete | ✅ Yes | ✅ Yes | `auth, isAdmin` |
| Admin Creation | ✅ Yes | ✅ Yes | `auth, isAdmin` |

### Security Best Practices

**Implemented:**
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token expiration (24 hours)
- ✅ Role-based access control (RBAC)
- ✅ Admin creation audit logging
- ✅ Duplicate email prevention
- ✅ Account status management (isActive)
- ✅ Password minimum length validation

**Recommended Additional Measures:**
- 🔄 Implement refresh token mechanism
- 🚫 Add rate limiting for login attempts
- 📧 Email verification on signup
- 🔐 Two-factor authentication (2FA) for admins
- 📝 Comprehensive audit logging system
- 🛡️ CORS configuration for production
- 🔒 HTTPS/TLS in production
- 💾 Token blacklisting for logout
- ⏱️ Session timeout with activity tracking

### Error Handling

**Authentication Errors:**
```json
// 401 Unauthorized - Missing token
{
  "status": "error",
  "message": "No token provided"
}

// 401 Unauthorized - Invalid token
{
  "status": "error",
  "message": "Invalid or expired token"
}
```

**Authorization Errors:**
```json
// 403 Forbidden - Not admin
{
  "status": "error",
  "message": "Access denied. Admin privileges required."
}

// 403 Forbidden - Account inactive
{
  "status": "error",
  "message": "Account is inactive"
}
```

### Testing Authentication

**Get Token:**
```bash
# Login to get token
curl -X POST http://localhost:8888/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "admin123"}'

# Extract token from response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Use Token:**
```bash
# Make authenticated request
curl -X GET http://localhost:8888/v1/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

**Test Admin Access:**
```bash
# Try admin endpoint (requires role=0)
curl -X GET http://localhost:8888/v1/users \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Cart Model Schema

```javascript
{
    userId: ObjectId (ref: User, required, unique),
    items: [{
        productId: ObjectId (ref: Product, required),
        name: String (required),
        price: Number (required, min: 0),
        quantity: Number (required, min: 1, default: 1),
        img: String,
        dsc: String
    }],
    totalItems: Number (default: 0),
    totalPrice: Number (default: 0),
    timestamps: true
}
```

---

## 🚀 Key Features

### Cart Management
✅ Add items to cart
✅ Update item quantities
✅ Remove items from cart
✅ Clear entire cart
✅ Automatic total calculation
✅ Product validation before adding
✅ Admin cart management

### Product Management
✅ CRUD operations with proper REST conventions
✅ Image upload with Cloudinary
✅ Pagination support
✅ Recommended products endpoint
✅ Admin-only modifications

### User Management
✅ Authentication with JWT
✅ Role-based access control
✅ Password hashing with bcrypt
✅ Profile retrieval

---

## 📝 Response Format Standards

### Success Response
```json
{
    "status": "success",
    "message": "Optional message",
    "data": { ...responseData }
}
```

### Error Response
```json
{
    "status": "error",
    "message": "Error description"
}
```

---

## 🔄 Migration Notes

### Updated API Routes
- `/v1/product/*` → `/v1/products/*`
- `/v1/user/*` → `/v1/users/*` or `/v1/auth/*`
- `/v1/category/*` → `/v1/categories/*`
- Query parameters → Path parameters for IDs

### Frontend Integration Required
Update all API calls to use new endpoints:
- `/products` instead of `/product`
- `/auth/login` instead of `/user/login`
- `/cart` instead of `/cart/cartbyUser`
- Use path params: `/products/${id}` instead of `/product?id=${id}`

---

## 🛠️ Environment Variables Required

```env
PORT=8888
MONGODB_URL=mongodb://...
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📚 Testing Recommendations

1. **Cart Operations**: Test add, update, remove, clear flows
2. **Authentication**: Verify token validation and role checking
3. **Product CRUD**: Test all admin operations with proper auth
4. **Error Handling**: Test invalid inputs and missing auth
5. **Pagination**: Verify page boundaries and limits
6. **Image Upload**: Test product image upload/update

---

## 🎯 Future Enhancements

- [ ] Order management system
- [ ] Payment integration
- [ ] Inventory tracking
- [ ] Product reviews and ratings
- [ ] Search and filtering
- [ ] Email notifications
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Redis caching layer

---

**Last Updated:** 2025-10-04
**API Version:** 1.0.0
