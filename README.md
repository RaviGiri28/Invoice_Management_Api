# Invoice_Management_Api

A production-ready REST API built with **Node.js**, **TypeScript**, **Express.js**, **TypeORM**, and **MySQL**. This API handles complete invoice management including authentication, customer management, product management, invoice generation with auto calculations, and payment tracking.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| TypeScript | Type safety |
| Express.js | Web framework |
| TypeORM | ORM for database |
| MySQL | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |

---

## 📁 Folder Structure

```
invoice-api/
├── src/
│   ├── config/
│   │   └── env.ts                  # Environment variables config
│   ├── entities/
│   │   ├── User.ts                 # User entity
│   │   ├── Customer.ts             # Customer entity
│   │   ├── Product.ts              # Product entity
│   │   ├── Invoice.ts              # Invoice entity
│   │   ├── InvoiceItem.ts          # Invoice item entity
│   │   └── Payment.ts              # Payment entity
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.routes.ts
│   │   ├── customers/
│   │   │   ├── customers.controller.ts
│   │   │   ├── customers.service.ts
│   │   │   └── customers.routes.ts
│   │   ├── products/
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── products.routes.ts
│   │   ├── invoices/
│   │   │   ├── invoices.controller.ts
│   │   │   ├── invoices.service.ts
│   │   │   └── invoices.routes.ts
│   │   └── payments/
│   │       ├── payments.controller.ts
│   │       ├── payments.service.ts
│   │       └── payments.routes.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts      # JWT auth middleware
│   ├── utils/
│   │   ├── response.ts             # Consistent API response helper
│   │   ├── invoice-number.ts       # Auto invoice number generator
│   │   └── calculate.ts            # Invoice totals calculator
│   ├── migrations/                 # TypeORM migration files
│   ├── app.ts                      # Express app setup
│   ├── index.ts                    # Entry point
│   └── data-source.ts              # TypeORM data source config
├── .env                            # Environment variables
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MySQL
- Postman (for testing)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/RaviGiri28/Invoice_Management_Api
cd invoice-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=invoice_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

**4. Create MySQL database**
```sql
CREATE DATABASE invoice_db;
```

**5. Run migrations**
```bash
npm run migration:run
```

**6. Start the server**
```bash
npm run dev
```

Server will start at `http://localhost:3000` ✅

---

## 📌 API Endpoints

### 🔐 Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |

### 👥 Customers
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/customers` | Create customer | ✅ |
| GET | `/api/customers` | Get all customers | ✅ |
| GET | `/api/customers/:id` | Get single customer | ✅ |
| PUT | `/api/customers/:id` | Update customer | ✅ |
| DELETE | `/api/customers/:id` | Delete customer | ✅ |

### 📦 Products
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/products/create` | Create product | ✅ |
| GET | `/api/products` | Get all products | ✅ |
| GET | `/api/products/:id` | Get single product | ✅ |
| PUT | `/api/products/:id/update` | Update product | ✅ |
| DELETE | `/api/products/:id/delete` | Soft delete product | ✅ |

### 🧾 Invoices
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/invoices/create` | Create invoice | ✅ |
| GET | `/api/invoices` | Get all invoices | ✅ |
| GET | `/api/invoices/:id` | Get single invoice | ✅ |
| PUT | `/api/invoices/:id/status/update` | Update invoice status | ✅ |
| DELETE | `/api/invoices/:id/delete` | Delete invoice | ✅ |

### 💳 Payments
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/payments/create` | Create payment | ✅ |
| GET | `/api/payments` | Get all payments | ✅ |
| GET | `/api/payments/:id` | Get single payment | ✅ |
| GET | `/api/payments/invoice/:invoiceId` | Get payments by invoice | ✅ |
| DELETE | `/api/payments/:id/delete` | Delete payment | ✅ |

---

## 🔑 Authentication

All protected routes require a JWT token in the request header:

```
Authorization: Bearer <your_token>
```

Get your token by calling the Login API.

---

## 📊 Invoice Calculation Logic

When creating an invoice, totals are auto calculated:

```
Item subtotal  = quantity × unit price
Item tax       = item subtotal × tax rate / 100
Item total     = item subtotal + item tax

Invoice subtotal = sum of all item subtotals
Invoice tax      = sum of all item taxes
Invoice total    = subtotal + tax - discount
```

---

## 💳 Payment Status Flow

```
DRAFT → SENT → PAID
             ↘ CANCELLED
```

- Invoice is automatically marked as **PAID** when total payments equal invoice total
- Deleting a payment reverts invoice status from **PAID** back to **SENT**

---

## 🛠️ Available Scripts

```bash
npm run dev               # Start development server
npm run build             # Build for production
npm run start             # Start production server
npm run migration:generate # Generate new migration
npm run migration:run      # Run pending migrations
```

---

## 📮 Postman Collection

Import the included `Invoice_Management_API.postman_collection.json` file in Postman to test all APIs with pre-configured requests organized by module.

---

## 👨‍💻 Author

**Ravi**
Built as part of 3-Month Backend Learning Assignment
