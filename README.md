# 🎉 Eventra – Premium Event Management Platform


---

## ✨ Key Features

### 🎨 **Immersive UI/UX**
- **Modern Aesthetic** - Glassmorphism, smooth gradients, and a clean, spacious design.
- **Premium Event Pages** - Immersive hero sections with detailed event storytelling.
- **Responsive Layouts** - Flawless experience across mobile, tablet, and desktop devices.
- **Micro-interactions** - Subtle animations and transitions for a polished feel.

### 📅 **Event Discovery & Management**
- **Smart Discovery** - Browse events with category filtering and search.
- **Real-time Registration** - Seamlessly book tickets for upcoming events.
- **User Dashboard** - Track your "Upcoming" dedicated profile view.
- **Admin Control Center** - Powerful dashboard for administrators to create, manage, and curate events.

### 🔐 **Enterprise-Grade Security**
- **JWT Authentication** - Secure, stateless session management.
- **Role-Based Access Control (RBAC)** - Distinct permissions for Users and Admins.
- **Data Encryption** - Industry-standard bcrypt hashing for sensitive data.

---

## 🚀 Tech Stack

### **Frontend**
- **React 18** - Component-based UI library.
- **Tailwind CSS** - Utility-first styling for rapid design.
- **Lucide React** - Vector iconography.
- **Sonner** - Elegant toast notifications.
- **Axios** - Promise-based HTTP client.

### **Backend**
- **Node.js & Express** - Scalable server-side runtime.
- **MongoDB & Mongoose** - Flexible NoSQL schema design.
- **JWT (JSON Web Tokens)** - Secure authentication.

---

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v16+)
- MongoDB Atlas Connection String

### **1. Clone the Repository**
```bash
git clone https://github.com/Genrator79/Eventra
cd Eventra
```

### **2. Backend Configuration**
```bash
cd backend
npm install

# Create .env file
echo "PORT=9000" > .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET_KEY=your_secure_secret" >> .env


# Start Server
npm start
```

### **3. Frontend Configuration**
```bash
cd frontend
npm install

# Start Development Server
npm run dev
```

### **4. Access**
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:9000`

---

## 🔌 API Reference

### **Authentication**
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Authenticate user and get token |

### **Events**
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/events` | Fetch all events (public) |
| `GET` | `/api/events/:id` | Get specific event details |
| `POST` | `/api/events/:id/register` | Register for an event **(Auth required)** |
| `POST` | `/api/events/add` | Create new event **(Admin only)** |

### **User Profile**
| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/user/me` | Get current user's profile |
| `GET` | `/api/user/me/registrations` | Get user's event history |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

<div align="center">

**Made with ❤️ by [Abhijeet Kumar](https://github.com/Genrator79)**

</div>