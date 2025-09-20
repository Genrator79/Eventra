# 🎉 Eventra – Modern Event Management Platform

<div align="center">

![Eventra Logo](https://img.shields.io/badge/Eventra-Event%20Management-blue?style=for-the-badge&logo=calendar)

A full-stack event management platform with modern UI, dark mode, and comprehensive admin controls. Built with React, Node.js, and MongoDB.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Now-green?style=for-the-badge&logo=vercel)](https://eventra-5j2m.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Genrator79/Eventra)

</div>

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark Mode Support** - Toggle between light and dark themes with persistent storage
- **Glass Morphism Design** - Beautiful glass effects and modern gradients
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Floating elements, hover effects, and transitions
- **Beautiful Typography** - Inter font family for better readability

### 🔐 **Authentication & Security**
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for user passwords
- **Protected Routes** - Role-based access control
- **Session Management** - Automatic token validation and refresh

### 📅 **Event Management**
- **Browse Events** - View all events with pagination and filtering
- **Featured Events** - Highlighted events on homepage
- **Category Filtering** - Filter events by categories
- **Search Functionality** - Search events by title and description
- **Event Details** - Comprehensive event information pages
- **Admin Controls** - Create, update, and delete events

### 👤 **User Management**
- **User Profiles** - Detailed user profiles with customization
- **Profile Updates** - Edit personal information
- **User Dashboard** - Personalized user experience
- **Registration System** - Event registration functionality

### 🛠 **Technical Features**
- **RESTful API** - Well-structured backend API
- **Database Indexing** - Optimized MongoDB queries
- **Error Handling** - Comprehensive error management
- **Input Validation** - Server-side validation for all inputs
- **CORS Configuration** - Secure cross-origin requests
- **Health Monitoring** - API health check endpoints

---

## 🚀 Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **JWT Decode** - Token management
- **Context API** - State management for theme

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### **Development Tools**
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

---

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account (for image storage)

### **1. Clone the Repository**
```bash
git clone https://github.com/Genrator79/Eventra.git
cd Eventra
```

### **2. Backend Setup**
```bash
cd backend
npm install

# Create .env file
touch .env

# Add environment variables
echo "PORT=9000" >> .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET_KEY=your_jwt_secret_key" >> .env
echo "CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name" >> .env
echo "CLOUDINARY_API_KEY=your_cloudinary_api_key" >> .env
echo "CLOUDINARY_API_SECRET=your_cloudinary_api_secret" >> .env

# Start backend server
npm start
```

### **3. Frontend Setup**
```bash
cd frontend
npm install

# Start development server
npm run dev
```

### **4. Access the Application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:9000`
- API Health Check: `http://localhost:9000/api/health`

---

## 🗂️ Project Structure

```
Eventra/
├── 📁 backend/
│   ├── 📁 controllers/          # API route handlers
│   │   ├── auth-controllers.js
│   │   ├── event-controllers.js
│   │   └── user-controller.js
│   ├── 📁 database/             # Database connection
│   │   └── db.js
│   ├── 📁 middleware/           # Custom middleware
│   │   └── auth-middleware.js
│   ├── 📁 models/               # Database schemas
│   │   ├── Event.js
│   │   └── User.js
│   ├── 📁 routes/               # API routes
│   │   ├── auth-route.js
│   │   ├── events-route.js
│   │   └── user-route.js
│   ├── package.json
│   ├── server.js                # Main server file
│   └── seeder.js                # Database seeder
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable components
│   │   ├── 📁 pages/            # Page components
│   │   ├── 📁 common/           # Shared components
│   │   ├── 📁 contexts/         # React contexts
│   │   ├── 📁 config/           # API configuration
│   │   ├── 📁 assets/           # Static assets
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### **Events**
- `GET /api/events` - Get all events (with pagination, filtering, search)
- `GET /api/events/featured` - Get featured events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events/add` - Create new event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

### **Users**
- `GET /api/user/me` - Get user profile (protected)
- `PUT /api/user/me/update` - Update user profile (protected)

### **Health**
- `GET /api/health` - API health check

---

## 🎨 UI Components

### **Pages**
- **Home** - Featured events showcase with hero section
- **Events** - All events listing with filters and search
- **Event Details** - Comprehensive event information
- **Login/Register** - Authentication forms with modern design
- **Profile** - User profile management
- **Admin Dashboard** - Event management interface
- **Category Pages** - Filtered event listings

### **Components**
- **Navbar** - Responsive navigation with dark mode toggle
- **Hero** - Animated hero section with search
- **Card** - Event cards with hover effects
- **Footer** - Modern footer with social links
- **Theme Provider** - Dark mode context management

---

## 🌟 Key Features in Detail

### **Dark Mode Implementation**
- Persistent theme preference using localStorage
- System preference detection
- Smooth theme transitions
- Context-based theme management

### **Responsive Design**
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### **Performance Optimizations**
- Database indexing for faster queries
- Image optimization with Cloudinary
- Lazy loading for better performance
- Efficient state management

### **Security Features**
- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected API routes

---

## 🚀 Deployment

### **Backend (Render)**
The backend is deployed on Render with the following configuration:
- **URL**: `https://eventra-backend-lsy8.onrender.com`
- **Port**: 9000
- **Database**: MongoDB Atlas
- **Environment**: Production

### **Frontend (Vercel/Netlify)**
The frontend can be deployed on any static hosting service:
- **Vercel**: Connect GitHub repository
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Deploy from GitHub Actions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abhijeet Kumar**
- GitHub: [@Genrator79](https://github.com/Genrator79)
- Project Link: [Eventra Repository](https://github.com/Genrator79/Eventra)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS
- MongoDB for the database solution
- Cloudinary for image storage
- All open-source contributors

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Abhijeet Kumar](https://github.com/Genrator79)

</div>