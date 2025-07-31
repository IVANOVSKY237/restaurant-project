# APPENDICES

## Appendix A: User Manual

### Getting Started Guide

**System Requirements:**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (minimum 1 Mbps recommended)
- Device: Computer, tablet, or smartphone
- Screen resolution: 1024x768 or higher (desktop), responsive on mobile

**First-Time Login:**
1. Open your web browser and navigate to: https://restaurant-ms.cm
2. Click "Login" button on the homepage
3. Enter your credentials provided by your restaurant manager
4. Complete the initial setup wizard
5. Familiarize yourself with the dashboard layout

### User Roles and Permissions

**Manager Role:**
- Full system access and administration
- User management and role assignment
- Business analytics and reporting
- System configuration and settings
- Financial reports and data export

**Waiter Role:**
- Order taking and management
- Table assignment and status updates
- Customer information management
- Basic reporting (own orders)
- Menu browsing and item selection

**Kitchen Staff Role:**
- Order viewing and status updates
- Kitchen queue management
- Order preparation tracking
- Completion notifications
- Basic inventory status viewing

**Cashier Role:**
- Billing and payment processing
- Receipt generation and printing
- Payment method selection
- Daily cash reconciliation
- Customer payment history

### Step-by-Step Operational Procedures

**Taking a New Order:**
1. **Login** to the system using your credentials
2. **Select Table** from the table management interface
3. **Add Customer Information:**
   - Enter customer name
   - Input phone number (9 digits)
   - Specify number of guests
4. **Browse Menu Categories:**
   - Click on desired category (Starters, Main Course, etc.)
   - View available items with prices
5. **Add Items to Order:**
   - Click "+" button next to desired items
   - Specify quantity if more than one
   - Add special instructions if needed
6. **Review Order Summary:**
   - Verify all items and quantities
   - Check customer information
   - Confirm table assignment
7. **Process Payment:**
   - Select payment method (Cash/Digital)
   - Review bill calculation with tax
   - Complete payment processing
8. **Generate Receipt:**
   - Print customer receipt
   - Save order for kitchen processing

**Managing Table Status:**
1. **Access Table Management** from main navigation
2. **View Table Layout** with color-coded status indicators:
   - Green: Available
   - Yellow: Booked
   - Red: Occupied
3. **Update Table Status:**
   - Click on table to select
   - Choose new status from dropdown
   - Add customer information if booking
4. **Assign Orders to Tables:**
   - Select table with customer
   - Link active order to table
   - Update status to "Occupied"

**Processing Kitchen Orders:**
1. **Access Kitchen Interface** from main menu
2. **View Order Queue** sorted by time and priority
3. **Update Order Status:**
   - Mark as "In Progress" when starting preparation
   - Update to "Ready" when completed
   - Notify service staff of completion
4. **Manage Special Requests:**
   - Review customer special instructions
   - Communicate with service staff if needed
   - Update preparation time estimates

### Troubleshooting Common Issues

**Login Problems:**
- **Issue:** Cannot login with credentials
- **Solution:** Check username/password, contact manager for reset
- **Prevention:** Keep credentials secure, change password regularly

**Slow System Performance:**
- **Issue:** Pages loading slowly or timing out
- **Solution:** Check internet connection, refresh browser, clear cache
- **Prevention:** Use recommended browsers, maintain stable internet

**Order Not Appearing:**
- **Issue:** Order placed but not visible in kitchen
- **Solution:** Refresh page, check order status, contact technical support
- **Prevention:** Verify order submission confirmation before proceeding

**Payment Processing Errors:**
- **Issue:** Payment not processing correctly
- **Solution:** Verify payment details, try alternative method, manual processing
- **Prevention:** Regular system updates, payment method validation

## Appendix B: Setup Instructions

### System Installation Guide

**Server Requirements:**
- Ubuntu 20.04 LTS or newer
- Node.js 18.0 or higher
- MongoDB 5.0 or higher
- Nginx web server
- SSL certificate for HTTPS

**Installation Steps:**

**1. Server Preparation:**
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install Nginx
sudo apt install nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

**2. Application Deployment:**
```bash
# Clone repository
git clone https://github.com/restaurant-ms/backend.git
cd backend

# Install dependencies
npm install --production

# Create environment file
cp .env.example .env
nano .env

# Build frontend
cd ../frontend
npm install
npm run build

# Copy build files to web directory
sudo cp -r dist/* /var/www/restaurant-ms/
```

**3. Database Configuration:**
```bash
# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongosh
use restaurant_ms
db.createUser({
  user: "restaurant_user",
  pwd: "secure_password",
  roles: ["readWrite"]
})
```

**4. Nginx Configuration:**
```nginx
# /etc/nginx/sites-available/restaurant-ms
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.pem;
    ssl_certificate_key /path/to/private-key.pem;
    
    location / {
        root /var/www/restaurant-ms;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**5. Process Management:**
```bash
# PM2 ecosystem configuration
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'restaurant-ms-backend',
    script: 'app.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log'
  }]
};

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Environment Configuration

**Backend Environment Variables (.env):**
```bash
# Server Configuration
NODE_ENV=production
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://restaurant_user:secure_password@localhost:27017/restaurant_ms

# Authentication
JWT_SECRET=your_jwt_secret_key_here
ACCESS_TOKEN_SECRET=your_access_token_secret_here

# Security
BCRYPT_SALT_ROUNDS=12
SESSION_SECRET=your_session_secret_here

# CORS Configuration
CLIENT_URL=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com,https://admin.your-domain.com
```

**Frontend Environment Variables (.env):**
```bash
# API Configuration
VITE_API_URL=https://your-domain.com/api
VITE_APP_NAME=Restaurant Management System

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
```

### Security Configuration

**Firewall Setup:**
```bash
# Configure UFW firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 27017  # MongoDB (restrict to localhost in production)
```

**SSL Certificate Installation:**
```bash
# Install Certbot for Let's Encrypt
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal setup
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

**Database Security:**
```bash
# MongoDB security configuration
# /etc/mongod.conf
security:
  authorization: enabled
net:
  bindIp: 127.0.0.1
  port: 27017
```

### Backup and Monitoring

**Automated Backup Script:**
```bash
#!/bin/bash
# backup.sh - Daily backup script

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/restaurant-ms"
DB_NAME="restaurant_ms"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
mongodump --db $DB_NAME --out $BACKUP_DIR/db_$DATE

# Application backup
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/restaurant-ms

# Clean old backups (keep 30 days)
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

**Monitoring Setup:**
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30

# System monitoring with cron
# Add to crontab:
# */5 * * * * /usr/local/bin/system-monitor.sh
```

## Appendix C: Code Samples

### Frontend Code Examples

**React Component Example - Order Management:**
```jsx
// components/order/OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { menus } from '../../constants';

const OrderForm = () => {
  const [selectedCategory, setSelectedCategory] = useState(menus[0]);
  const [itemCounts, setItemCounts] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const customerData = useSelector(state => state.customer);

  const handleAddItem = (item) => {
    const orderItem = {
      id: `${Date.now()}_${item.id}`,
      menuItemId: item.id,
      name: item.name,
      price: parseInt(item.price),
      quantity: 1,
      category: selectedCategory.name
    };
    dispatch(addToCart(orderItem));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="order-form">
      <div className="menu-categories">
        {menus.map((category) => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory.id === category.id ? 'selected' : ''}`}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => setSelectedCategory(category)}
          >
            <span className="category-icon">{category.icon}</span>
            <h3>{category.name}</h3>
            <p>{category.items.length} Items</p>
          </div>
        ))}
      </div>

      <div className="menu-items">
        {selectedCategory.items.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="price">{item.price} FCFA</p>
            </div>
            <button
              className="add-button"
              onClick={() => handleAddItem(item)}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="customer-info">
          <p>Customer: {customerData.customerName}</p>
          <p>Table: {customerData.tableNo}</p>
          <p>Guests: {customerData.guest}</p>
        </div>
        
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>{item.price} FCFA</span>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="total">
          <strong>Total: {calculateTotal()} FCFA</strong>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
```

**Backend API Example - Order Controller:**
```javascript
// controllers/orderController.js
const createHttpError = require("http-errors");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const mongoose = require("mongoose");

const addOrder = async (req, res, next) => {
    try {
        const { customerDetails, orderStatus, bills, items, tableId } = req.body;

        // Validate required fields
        if (!customerDetails || !items || items.length === 0) {
            return next(createHttpError(400, "Customer details and items are required"));
        }

        // Validate bill calculations
        const calculatedTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const calculatedTax = calculatedTotal * 0.0525; // 5.25% tax
        const calculatedTotalWithTax = calculatedTotal + calculatedTax;

        if (Math.abs(bills.total - calculatedTotal) > 0.01) {
            return next(createHttpError(400, "Bill calculation error"));
        }

        // Create order
        const order = new Order({
            customerDetails,
            orderStatus: orderStatus || 'Pending',
            bills: {
                total: calculatedTotal,
                tax: calculatedTax,
                totalWithTax: calculatedTotalWithTax
            },
            items,
            table: tableId,
            createdBy: req.user.userId
        });

        await order.save();

        // Update table status if provided
        if (tableId) {
            await Table.findByIdAndUpdate(tableId, {
                status: 'Occupied',
                currentOrder: order._id
            });
        }

        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order
        });

    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const { orderStatus } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, "Invalid order ID"));
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { orderStatus },
            { new: true }
        ).populate('table', 'tableNo status');

        if (!order) {
            return next(createHttpError(404, "Order not found"));
        }

        // If order is completed, update table status
        if (orderStatus === 'Served') {
            await Table.findByIdAndUpdate(order.table._id, {
                status: 'Available',
                currentOrder: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    addOrder,
    updateOrder,
    getAllOrders,
    getOrder
};
```

**Database Model Example:**
```javascript
// models/orderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        default: function() {
            return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
    },
    customerDetails: {
        name: { type: String, required: true },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d{9}$/.test(v);
                },
                message: "Phone number must be 9 digits"
            }
        },
        guests: { type: Number, required: true, min: 1 }
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'In Progress', 'Ready', 'Served', 'Cancelled'],
        default: 'Pending'
    },
    bills: {
        total: { type: Number, required: true, min: 0 },
        tax: { type: Number, required: true, min: 0 },
        totalWithTax: { type: Number, required: true, min: 0 }
    },
    items: [{
        menuItemId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        category: { type: String, required: true },
        specialInstructions: { type: String }
    }],
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Refunded'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Digital', 'Card'],
        default: 'Cash'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'customerDetails.phone': 1 });

// Virtual for order duration
orderSchema.virtual('orderDuration').get(function() {
    if (this.orderStatus === 'Served' && this.updatedAt) {
        return Math.round((this.updatedAt - this.createdAt) / (1000 * 60)); // minutes
    }
    return null;
});

module.exports = mongoose.model("Order", orderSchema);
```

## Appendix D: Survey Forms and Interview Summaries

### Restaurant Owner Interview Summary

**Interview Methodology:**
- **Participants:** 15 restaurant owners/managers in Douala and Yaoundé
- **Duration:** 45-60 minutes per interview
- **Method:** Semi-structured interviews with open-ended questions
- **Date Range:** March 2024 - April 2024

**Key Questions Asked:**
1. What are your biggest operational challenges?
2. How do you currently manage orders and billing?
3. What technology do you currently use?
4. What would be your ideal restaurant management solution?
5. What is your budget for technology solutions?

**Summary of Responses:**

**Current Challenges (Frequency of mention):**
- Order accuracy and communication (87% of respondents)
- Table management during peak hours (73% of respondents)
- Manual billing errors (67% of respondents)
- Staff coordination (60% of respondents)
- Inventory tracking (53% of respondents)
- Customer data management (47% of respondents)

**Technology Usage:**
- Basic cash registers: 67%
- Manual processes only: 27%
- Simple POS systems: 6%
- Smartphone apps for basic functions: 33%

**Desired Features (Priority ranking):**
1. Automated billing with tax calculation
2. Digital order management
3. Table status tracking
4. Customer information storage
5. Sales reporting and analytics
6. Staff management tools

**Budget Considerations:**
- Initial investment willingness: 500,000 - 1,500,000 FCFA
- Monthly operational budget: 50,000 - 150,000 FCFA
- ROI expectation: 6-12 months payback period

### Staff Survey Results

**Survey Methodology:**
- **Participants:** 45 restaurant staff members
- **Roles:** Waiters (60%), Kitchen staff (22%), Cashiers (18%)
- **Method:** Online and paper questionnaires
- **Response Rate:** 89%

**Technology Comfort Level:**
- Very comfortable: 31%
- Somewhat comfortable: 42%
- Neutral: 18%
- Somewhat uncomfortable: 7%
- Very uncomfortable: 2%

**Current Process Pain Points:**
- Handwriting legibility issues: 78%
- Order modification difficulties: 65%
- Communication delays: 71%
- Manual calculation errors: 56%
- Customer wait time complaints: 83%

**Training Preferences:**
- Hands-on training: 67%
- Video tutorials: 45%
- Written manuals: 23%
- Peer training: 38%
- Online courses: 15%

### Customer Feedback Survey

**Survey Details:**
- **Participants:** 120 restaurant customers
- **Age Range:** 18-65 years
- **Method:** In-person and online surveys
- **Location:** Douala (60%), Yaoundé (40%)

**Service Expectations:**
- Order accuracy: 95% consider "very important"
- Service speed: 87% consider "very important"
- Payment options: 62% want multiple payment methods
- Receipt provision: 78% always want receipts

**Technology Acceptance:**
- Comfortable with digital ordering: 73%
- Prefer traditional service: 27%
- Want mobile payment options: 58%
- Interested in loyalty programs: 81%

**Current Satisfaction Levels:**
- Very satisfied: 15%
- Satisfied: 34%
- Neutral: 28%
- Dissatisfied: 18%
- Very dissatisfied: 5%

**Improvement Suggestions:**
- Faster service: 67%
- More accurate orders: 54%
- Better payment options: 43%
- Clearer pricing: 38%
- Loyalty rewards: 35%
```
