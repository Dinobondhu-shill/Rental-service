# 🚗 Vehicle Rental System – Backend API

A complete backend API for managing a vehicle rental service with user authentication, vehicle inventory control, booking management, and role-based access control.

---

## 🔗 Live API URL
**Base URL:**  
__


---

## 📌 Features

### 🔐 Authentication
- User registration & login (JWT based)
- Password hashing with bcrypt
- Role-based access (Admin & Customer)
- Protected API routes with token verification

### 👤 User Management
- Admin: View/update/delete any user
- Customer: Update own profile only
- Prevent deleting users with active bookings

### 🚘 Vehicle Management
- Add, update, delete, and view vehicles
- Track availability: `available` | `booked`
- Public visibility for vehicle list and details
- Unique registration constraints

### 📅 Booking Management
- Create bookings with validated date range
- Calculate total price automatically  
  *(daily_rent_price × number_of_days)*
- Status workflow: `active`, `cancelled`, `returned`
- Customers can cancel only before start date
- Admin can mark as returned
- Auto-return system for expired bookings

### 🗂 Modular Architecture
- Feature-based folder structure
- Clear separation of:
  - Routes
  - Controllers
  - Services
  - Middleware
---

## 🛠 Technology Stack

| Layer      | Technology |
|------------|------------|
| Runtime    | Node.js |
| Language   | TypeScript |
| Framework  | Express.js |
| Database   | PostgreSQL |
| Security   | bcrypt |
| Auth       | JSON Web Token (JWT) |
| Architecture | Modular, MVC-style |

---

## 📁 Project Structure
```bash

src/
├── app.ts
├── config/
├── middlewares/
├── utils/
├── auth/
│ ├── auth.route.ts
│ ├── auth.controller.ts
│ └── auth.service.ts
├── users/
├── vehicles/
└── bookings/

```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/vehicle-rental-system.git
cd vehicle-rental-system
npm install
```

---

## ⚙️ Environmenment variable
Create a .env file:
```bash
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```
---

## ⚙️ Run database (create tables manually or with migrations)
---

## ⚙️Start the server
```bash

npm run dev

```

---

## ⚙️ Build for production
```bash

npm run build
npm start

```

----
## 🧪 API Testing

You can test using:

**Postman

Thunder Client

Insomnia**

Make sure to include:***
```bash

Authorization: Bearer <token>

```

----
## 🤝 Contributing
Contributions and pull requests are welcome.

----
## 🙌 Author

DINBONDHU SHILL

<a href="https://dinobondhu-shill-portfolio.netlify.app" target="_blank">
  🔗 Visit My Portfolio
</a>
