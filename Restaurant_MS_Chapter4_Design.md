# CHAPTER 4: SYSTEM DESIGN AND DEVELOPMENT

## 4.1 System Architecture

### Overall Architecture Design

The Restaurant Management System follows a modern three-tier architecture pattern, designed for scalability, maintainability, and performance. The architecture separates concerns into distinct layers, enabling independent development, testing, and deployment of system components.

**Architecture Layers:**

**Presentation Layer (Frontend)**
- **Technology:** React.js with Redux for state management
- **Responsibility:** User interface, user experience, client-side logic
- **Components:** Web application accessible via modern browsers
- **Features:** Responsive design, real-time updates, intuitive navigation

**Application Layer (Backend)**
- **Technology:** Node.js with Express.js framework
- **Responsibility:** Business logic, API endpoints, authentication, authorization
- **Components:** RESTful API services, middleware, authentication services
- **Features:** Scalable microservices architecture, secure API endpoints

**Data Layer (Database)**
- **Technology:** MongoDB with Mongoose ODM
- **Responsibility:** Data storage, retrieval, persistence, backup
- **Components:** Document-based database, data models, indexing
- **Features:** Flexible schema, horizontal scaling, data replication

### System Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  React.js Frontend Application                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            |
│  │   Order     │ │    Table    │ │   Admin     │            |  
│  │ Management  │ │ Management  │ │ Dashboard   │            |  
│  └─────────────┘ └─────────────┘ └─────────────┘            |
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            |
│  │   Menu      │ │   Billing   │ │   Customer  │            | 
│  │ Management  │ │   System    │ │ Management  │            |
│  └─────────────┘ └─────────────┘ └─────────────┘            |
└─────────────────────────────────────────────────────────────┘
                              │
                         HTTP/HTTPS
                              │
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Node.js + Express.js Backend Services                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │    User     │ │    Order    │ │    Table    │           │
│  │   Service   │ │   Service   │ │   Service   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Menu      │ │   Billing   │ │   Analytics │           │
│  │   Service   │ │   Service   │ │   Service   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Authentication & Authorization            │   │
│  │                 JWT + Role-Based Access            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                         MongoDB Driver
                              │
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  MongoDB Database                                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │    Users    │ │   Orders    │ │   Tables    │           │
│  │ Collection  │ │ Collection  │ │ Collection  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Menus     │ │  Customers  │ │  Analytics  │           │
│  │ Collection  │ │ Collection  │ │ Collection  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### Communication Patterns

**Client-Server Communication**
- RESTful API architecture with JSON data exchange
- HTTP/HTTPS protocols for secure communication
- Real-time updates using WebSocket connections for live data
- Stateless server design for improved scalability

**Internal Service Communication**
- Modular service architecture with clear interfaces
- Shared database access through well-defined data access layers
- Event-driven communication for real-time updates
- Centralized logging and monitoring for system observability

## 4.2 Technology Stack

### Frontend Technologies

**React.js Framework**
- **Version:** React 18.3.1
- **Purpose:** Building interactive user interfaces with component-based architecture
- **Benefits:** Virtual DOM for performance, large ecosystem, strong community support
- **Key Features:** Hooks for state management, functional components, JSX syntax

**Redux Toolkit**
- **Version:** 2.8.2
- **Purpose:** Predictable state management for complex application state
- **Benefits:** Centralized state, time-travel debugging, middleware support
- **Key Features:** Slices for organized state management, async thunks for API calls

**Additional Frontend Libraries**
- **React Router DOM 6.28.0:** Client-side routing and navigation
- **Axios 1.10.0:** HTTP client for API communication
- **React Icons 4.12.0:** Comprehensive icon library
- **Tailwind CSS 3.4.1:** Utility-first CSS framework for styling
- **Notistack 3.0.2:** Notification system for user feedback

### Backend Technologies

**Node.js Runtime**
- **Purpose:** JavaScript runtime for server-side development
- **Benefits:** High performance, non-blocking I/O, extensive package ecosystem
- **Key Features:** Event-driven architecture, npm package management

**Express.js Framework**
- **Version:** 5.1.0
- **Purpose:** Web application framework for building APIs and web services
- **Benefits:** Minimal setup, flexible middleware system, robust routing
- **Key Features:** RESTful API support, middleware integration, error handling

**Authentication and Security**
- **JSON Web Tokens (JWT) 9.0.2:** Secure authentication and authorization
- **bcrypt 6.0.0:** Password hashing and encryption
- **CORS 2.8.5:** Cross-origin resource sharing configuration
- **HTTP-errors 2.0.0:** HTTP error handling and status codes

### Database Technology

**MongoDB**
- **Version:** 8.16.1 (via Mongoose)
- **Purpose:** Document-oriented NoSQL database for flexible data storage
- **Benefits:** Schema flexibility, horizontal scaling, JSON-like documents
- **Key Features:** Rich query language, indexing, aggregation framework

**Mongoose ODM**
- **Version:** 8.16.1
- **Purpose:** Object Document Mapping for MongoDB with Node.js
- **Benefits:** Schema validation, middleware support, query building
- **Key Features:** Model definitions, validation rules, population

### Development and Build Tools

**Vite Build Tool**
- **Version:** 4.5.3
- **Purpose:** Fast build tool and development server
- **Benefits:** Hot module replacement, optimized builds, plugin ecosystem
- **Key Features:** ES modules support, TypeScript integration, CSS preprocessing

**Development Dependencies**
- **Nodemon 3.1.10:** Automatic server restart during development
- **ESLint:** Code linting and style enforcement
- **Autoprefixer 10.4.21:** CSS vendor prefix automation
- **PostCSS 8.5.4:** CSS transformation and optimization

## 4.3 Database Design

### Entity Relationship Design

The database design follows a document-oriented approach suitable for MongoDB, with collections representing main entities and embedded documents for related data.

**Core Collections:**

**Users Collection**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, validated),
  phone: Number (required, 9-digit validation),
  password: String (required, hashed),
  role: String (required, enum: ["Manager", "Waiter", "Kitchen", "Cashier"]),
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean (default: true)
}
```

**Tables Collection**
```javascript
{
  _id: ObjectId,
  tableNo: Number (required, unique),
  status: String (enum: ["Available", "Booked", "Occupied"], default: "Available"),
  customerInfo: {
    name: String,
    phone: Number,
    guests: Number
  },
  currentOrder: ObjectId (ref: "Order"),
  createdAt: Date,
  updatedAt: Date
}
```

**Orders Collection**
```javascript
{
  _id: ObjectId,
  orderId: String (unique, auto-generated),
  customerDetails: {
    name: String,
    phone: Number,
    guests: Number
  },
  tableId: ObjectId (ref: "Table"),
  items: [{
    menuItemId: String,
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    specialInstructions: String
  }],
  orderStatus: String (enum: ["Pending", "In Progress", "Ready", "Served", "Cancelled"]),
  bills: {
    subtotal: Number (required),
    tax: Number (required),
    totalWithTax: Number (required)
  },
  paymentStatus: String (enum: ["Pending", "Paid", "Refunded"]),
  paymentMethod: String (enum: ["Cash", "Digital"]),
  orderDate: Date (default: Date.now),
  createdAt: Date,
  updatedAt: Date,
  servedBy: ObjectId (ref: "User")
}
```

**Menu Items Collection**
```javascript
{
  _id: ObjectId,
  itemId: String (unique),
  name: String (required),
  category: String (required, enum: ["Starters", "Main Course", "Beverages", "Soups", "Desserts", "Pizza", "Alcoholic Drinks", "Salads"]),
  price: Number (required),
  description: String,
  isAvailable: Boolean (default: true),
  ingredients: [String],
  allergens: [String],
  preparationTime: Number (minutes),
  popularity: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

**Customers Collection**
```javascript
{
  _id: ObjectId,
  name: String (required),
  phone: Number (unique),
  email: String,
  visitHistory: [{
    date: Date,
    orderId: ObjectId (ref: "Order"),
    totalAmount: Number,
    tableNumber: Number
  }],
  preferences: {
    favoriteItems: [String],
    dietaryRestrictions: [String],
    specialRequests: String
  },
  loyaltyPoints: Number (default: 0),
  totalVisits: Number (default: 0),
  totalSpent: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Database Indexing Strategy

**Performance Optimization Indexes:**
- Users: email (unique), phone (unique), role
- Tables: tableNo (unique), status
- Orders: orderId (unique), orderDate, orderStatus, tableId
- MenuItems: itemId (unique), category, isAvailable
- Customers: phone (unique), email

**Compound Indexes:**
- Orders: {orderDate: 1, orderStatus: 1} for reporting queries
- MenuItems: {category: 1, isAvailable: 1} for menu display
- Customers: {phone: 1, name: 1} for customer lookup

### Data Validation Rules

**User Data Validation:**
- Email format validation using regex pattern
- Phone number must be exactly 9 digits (Cameroon standard)
- Password minimum length and complexity requirements
- Role must be one of predefined values

**Order Data Validation:**
- Order items must reference valid menu items
- Bill calculations must be mathematically correct
- Order status transitions must follow business rules
- Customer information must be complete for table assignment

**Menu Item Validation:**
- Price must be positive number
- Category must be one of eight predefined categories
- Preparation time must be reasonable (5-120 minutes)
- Availability status must be boolean

## 4.4 Interface Design

### User Interface Design Principles

**Simplicity and Clarity**
- Clean, uncluttered interface design suitable for restaurant environment
- Clear visual hierarchy with consistent typography and spacing
- Intuitive navigation that requires minimal training
- Color-coded elements for quick recognition (order status, table status)

**Responsive Design**
- Mobile-first approach ensuring compatibility across devices
- Flexible grid system adapting to different screen sizes
- Touch-friendly interface elements for tablet usage
- Optimized performance on various hardware configurations

**Accessibility Considerations**
- High contrast color schemes for visibility in restaurant lighting
- Large, easily clickable buttons for touch interfaces
- Clear error messages and user feedback
- Keyboard navigation support for accessibility compliance

### Key Interface Components

**Dashboard Layout**
- **Header:** Restaurant name, user information, logout functionality
- **Navigation:** Role-based menu with clear icons and labels
- **Main Content:** Context-sensitive content area
- **Footer:** System status, connection indicator, help links

**Order Management Interface**
- **Menu Categories:** Visual grid with category icons and item counts
- **Item Selection:** Detailed item cards with prices and descriptions
- **Order Summary:** Real-time cart with modification capabilities
- **Customer Info:** Quick customer detail capture and table assignment

**Table Management Interface**
- **Table Grid:** Visual representation of restaurant layout
- **Status Indicators:** Color-coded table status (green=available, yellow=booked, red=occupied)
- **Quick Actions:** One-click table status updates and customer assignment
- **Table Details:** Customer information and current order display

**Administrative Dashboard**
- **Metrics Overview:** Key performance indicators and real-time statistics
- **Charts and Graphs:** Visual representation of sales data and trends
- **Report Generation:** Customizable reports with date range selection
- **User Management:** Staff account creation and role assignment

### Wireframe Specifications

**Main Dashboard Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│ Restaurant MS    │ Welcome, [User Name]  │ [Logout] [Help] │
├─────────────────────────────────────────────────────────────┤
│ [Home] [Orders] [Tables] [Menu] [Reports] [Settings]        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Today's   │ │   Active    │ │  Available  │           │
│  │   Revenue   │ │   Orders    │ │   Tables    │           │
│  │  512,000 F  │ │     16      │ │     8       │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  Recent Orders                          Popular Dishes      │
│  ┌─────────────────────────────────┐ ┌─────────────────┐   │
│  │ Order #1234 - Table 5          │ │ 1. Butter       │   │
│  │ Status: In Progress             │ │    Chicken      │   │
│  │ ─────────────────────────────── │ │ 2. Grilled      │   │
│  │ Order #1235 - Table 2          │ │    Salmon       │   │
│  │ Status: Ready                   │ │ 3. Pizza        │   │
│  └─────────────────────────────────┘ │    Margherita   │   │
│                                     └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Order Taking Interface Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│ Menu Categories                    │ Order Summary          │
├─────────────────────────────────────┼─────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │ Customer: John Doe     │
│ │🍟   │ │🍚   │ │🍹   │ │🥣   │    │ Table: 5               │
│ │Start│ │Main │ │Bev  │ │Soup │    │ Guests: 4              │
│ │ers  │ │Cours│ │erage│ │s    │    │ ─────────────────────  │
│ └─────┘ └─────┘ └─────┘ └─────┘    │ Items:                 │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │ • Butter Chicken x2    │
│ │🍰   │ │🍕   │ │🍺   │ │🥗   │    │   5,000 F              │
│ │Dess │ │Pizza│ │Alco │ │Sala │    │ • French Fries x1      │
│ │erts │ │     │ │holic│ │ds   │    │   2,500 F              │
│ └─────┘ └─────┘ └─────┘ └─────┘    │ ─────────────────────  │
│                                    │ Subtotal: 7,500 F      │
│ Selected: Starters                 │ Tax (5.25%): 394 F     │
│ ┌─────────────────────────────────┐ │ Total: 7,894 F        │
│ │ French Fries        2,500 F [+] │ │                        │
│ │ Onion Rings         2,500 F [+] │ │ [Cash] [Digital]       │
│ │ Garlic Bread        3,000 F [+] │ │ [Place Order]          │
│ │ Chicken Wings       2,000 F [+] │ │                        │
│ └─────────────────────────────────┘ │                        │
└─────────────────────────────────────┴─────────────────────────┘
```

## 4.5 Development Approach

### Modular Development Strategy

The Restaurant Management System was developed using a modular approach, breaking down the application into distinct, manageable components that can be developed, tested, and maintained independently.

**Frontend Module Structure:**
```
src/
├── components/
│   ├── shared/           # Reusable UI components
│   ├── menu/            # Menu management components
│   ├── table/           # Table management components
│   ├── order/           # Order processing components
│   ├── billing/         # Billing and payment components
│   └── dashboard/       # Administrative dashboard components
├── pages/               # Main application pages
├── redux/               # State management
│   ├── slices/          # Redux slices for different features
│   └── store/           # Store configuration
├── utils/               # Utility functions and helpers
├── constants/           # Application constants and data
└── assets/              # Static assets (images, icons)
```

**Backend Module Structure:**
```
backend/
├── controllers/         # Request handlers and business logic
│   ├── userController.js
│   ├── orderController.js
│   ├── tableController.js
│   └── menuController.js
├── models/              # Database models and schemas
│   ├── userModel.js
│   ├── orderModel.js
│   ├── tableModel.js
│   └── menuModel.js
├── routes/              # API route definitions
│   ├── userRoutes.js
│   ├── orderRoutes.js
│   ├── tableRoutes.js
│   └── menuRoutes.js
├── middleware/          # Custom middleware functions
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── config/              # Configuration files
│   ├── database.js
│   └── config.js
└── utils/               # Utility functions
```

### Component-Based Architecture

**React Component Hierarchy:**
- **App Component:** Root component managing global state and routing
- **Layout Components:** Header, navigation, footer components
- **Feature Components:** Specific functionality components (OrderForm, TableGrid, MenuManager)
- **UI Components:** Reusable interface elements (buttons, forms, modals)

**Component Design Principles:**
- Single Responsibility: Each component has one clear purpose
- Reusability: Components designed for use across multiple contexts
- Props Interface: Clear, well-defined props for component communication
- State Management: Local state for component-specific data, Redux for global state

### Code Organization and Standards

**Coding Standards:**
- **JavaScript ES6+:** Modern JavaScript features and syntax
- **Functional Components:** React hooks for state and lifecycle management
- **Async/Await:** Promise-based asynchronous programming
- **Error Handling:** Comprehensive error handling and user feedback

**File Naming Conventions:**
- Components: PascalCase (e.g., OrderManagement.jsx)
- Utilities: camelCase (e.g., formatCurrency.js)
- Constants: UPPER_SNAKE_CASE (e.g., API_ENDPOINTS.js)
- Styles: kebab-case (e.g., order-form.css)

**Code Quality Measures:**
- ESLint configuration for code consistency
- Prettier for automatic code formatting
- PropTypes for component prop validation
- JSDoc comments for function documentation

### Version Control and Collaboration

**Git Workflow:**
- **Main Branch:** Production-ready code
- **Development Branch:** Integration branch for features
- **Feature Branches:** Individual feature development
- **Hotfix Branches:** Critical bug fixes

**Commit Standards:**
- Conventional commit messages for clarity
- Atomic commits for specific changes
- Code review process before merging
- Automated testing before deployment

## 4.6 Backend Integration

### API Design and Implementation

**RESTful API Architecture:**
The backend follows REST principles with clear, predictable endpoints for all system operations.

**API Endpoint Structure:**
```
Base URL: /api/

Authentication:
POST /api/user/register     # User registration
POST /api/user/login        # User authentication
GET  /api/user/             # Get user profile
POST /api/user/logout       # User logout

Order Management:
GET    /api/order/          # Get all orders
POST   /api/order/          # Create new order
GET    /api/order/:id       # Get specific order
PUT    /api/order/:id       # Update order status

Table Management:
GET    /api/table/          # Get all tables
POST   /api/table/          # Add new table
PUT    /api/table/:id       # Update table status
```

**Request/Response Format:**
```javascript
// Standard API Response Format
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "error": string (optional)
}

// Example Order Creation Request
POST /api/order/
{
  "customerDetails": {
    "name": "John Doe",
    "phone": "123456789",
    "guests": 4
  },
  "orderStatus": "Pending",
  "bills": {
    "total": 7500,
    "tax": 394,
    "totalWithTax": 7894
  },
  "items": [
    {
      "name": "Butter Chicken",
      "price": 5000,
      "quantity": 2
    }
  ]
}
```

### Authentication and Authorization

**JWT-Based Authentication:**
```javascript
// Token Generation (from userController.js)
const accessToken = jwt.sign(
    { userId: user._id },
    config.accessTokenSecret,
    { expiresIn: "1d" }
);

res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
});
```

**Token Verification Middleware:**
```javascript
// From tokenVerification.js
const isVerifiedUser = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return next(createHttpError(401, "Access token required"));
    }

    try {
        const decoded = jwt.verify(token, config.accessTokenSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return next(createHttpError(401, "Invalid access token"));
    }
};
```

### Database Integration

**MongoDB Connection and Configuration:**
```javascript
// From database.js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
```

**Data Models Implementation:**
```javascript
// Order Model (from orderModal.js)
const orderSchema = new mongoose.Schema({
    customerDetails: {},
    orderStatus: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    bills: {
        total: { type: Number, required: true },
        tax: { type: Number, required: true },
        totalWithTax: { type: Number, required: true }
    },
    items: [],
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" }
}, { timestamps: true });

// Table Model (from tableModal.js)
const tableSchema = new mongoose.Schema({
    tableNo: { type: Number, required: true, unique: true },
    status: {
        type: String,
        enum: ["Available", "Booked", "Occupied"],
        default: "Available"
    },
    customerInfo: {
        name: { type: String },
        phone: { type: Number },
        guests: { type: Number }
    },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }
});
```

### Error Handling and Validation

**Global Error Handler:**
```javascript
// From globalErrorHandler.js
const globalErrorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
```

**Input Validation Examples:**
```javascript
// User validation (from userModal.js)
email: {
    type: String,
    required: true,
    validate: {
        validator: function (v) {
            return /\S+@\S+\.\S+/.test(v);
        },
        message: "Email must be in valid format!"
    }
},
phone: {
    type: Number,
    required: true,
    validate: {
        validator: function (v) {
            return /\d{9}/.test(v);
        },
        message: "Phone number must be a 9-digit number!"
    }
}
```

### Performance Optimization

**Database Query Optimization:**
- Indexing on frequently queried fields (tableNo, email, phone)
- Efficient data retrieval with selective field projection
- Pagination for large data sets
- Connection pooling for database efficiency

**API Response Optimization:**
```javascript
// Example from orderController.js
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate('table', 'tableNo status')
            .sort({ createdAt: -1 })
            .limit(50); // Limit results for performance

        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully!",
            data: orders
        });
    } catch (error) {
        next(error);
    }
};
```

**Security Measures:**
- Password hashing using bcrypt
- HTTP-only cookies for token storage
- CORS configuration for cross-origin requests
- Input sanitization and validation
- Environment variable management for sensitive data

### Real-time Communication

**WebSocket Integration (Future Enhancement):**
```javascript
// Planned implementation for real-time updates
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join restaurant room
    socket.on('join-restaurant', (restaurantId) => {
        socket.join(restaurantId);
    });

    // Handle order updates
    socket.on('order-update', (data) => {
        socket.to(data.restaurantId).emit('order-updated', data);
    });

    // Handle table status updates
    socket.on('table-update', (data) => {
        socket.to(data.restaurantId).emit('table-updated', data);
    });
});
```

### API Documentation

**Endpoint Documentation Example:**
```javascript
/**
 * @route   POST /api/order
 * @desc    Create a new order
 * @access  Private (Authenticated users only)
 * @body    {
 *   customerDetails: {
 *     name: string,
 *     phone: number,
 *     guests: number
 *   },
 *   orderStatus: string,
 *   bills: {
 *     total: number,
 *     tax: number,
 *     totalWithTax: number
 *   },
 *   items: array
 * }
 * @returns {
 *   success: boolean,
 *   message: string,
 *   data: object
 * }
 */
```

This completes Chapter 4, covering the comprehensive system design and development approach for the Restaurant Management System, including architecture, technology stack, database design, interface design, development methodology, and backend integration with real code examples from the actual implementation.
```
