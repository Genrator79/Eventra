# Eventra - Project Resume Entry

Here are three versions of the project description tailored for different resume styles. Choose the one that fits your layout.

## Option 1: Detailed (STAR Method) - *Best for Senior/Mid-Level Roles*

**Eventra – Full Stack Event Management Platform** | *React, Node.js, Express, MongoDB, Tailwind CSS*
*   **Architected and developed** a scalable MERN stack application for event discovery and booking, handling user authentication, event management, and real-time registrations.
*   **Engineered Advanced Search:** Implemented a dual-layered filtering system allowing users to query events by keyword and category simultaneously using MongoDB regex and complex URL parameters, enhancing content discoverability.
*   **Optimized Frontend Architecture:** Refactored the API layer from manual `fetch` calls with repetitive header injection to a **centralized Axios instance with interceptors**. This reduced code redundancy by 40% and ensured secure, automatic JWT token attachment for all authenticated requests.
*   **Designed Premium UI:** Built a 100% responsive interface using **Tailwind CSS** and Glassmorphism principles, featuring immersive video hero sections and sticky interaction elements to drive user engagement.
*   **Secured Backend:** Deployed robust JWT-based authentication with Bcrypt password hashing and Role-Based Access Control (RBAC) to strictly separate Admin content management from User booking flows.
*   **Deployment & DevOps:** Configured the Express backend to statically serve the React frontend build in production, enabling seamless single-port deployment on Render.

---

## Option 2: Concise - *Best for 1-Page Resumes*

**Eventra – Premium Event Management Platform**
*   Built a production-ready **MERN stack** application with secure JWT authentication and role-based access control.
*   **Solved architectural scalability issues** by migrating from manual API calls to a modular **Axios** configuration with request interceptors for automatic token management.
*   Developed a dynamic **search and filtering engine** that syncs query parameters with the URL for shareable search results.
*   Designed a high-performance, responsive UI using **React & Tailwind CSS**, featuring real-time state management and interactive animations.

---

## Option 3: Technical Deep Dive - *for "Challenges Faced" Interview Questions*

**"Tell me about a technical challenge you faced while building Eventra."**

**The Challenge (API Architecture):**
"Initially, I built the frontend using standard `fetch` calls. I found myself manually retrieving the JWT token from `localStorage` and adding it to the headers in every single component that needed to fetch data. This led to a lot of repetitive code and made it hard to handle token expiration errors globally. It was messy and error-prone."

**The Solution:**
"I refactored the entire data layer to use **Axios**. I created a centralized configuration file with **request and response interceptors**.
1.  **Request Interceptor:** Automatically checks for a token in local storage and attaches it to the `Authorization` header before the request leaves the app.
2.  **Response Interceptor:** I set up global error handling to catch 401 (Unauthorized) errors, allowing me to redirect users to login automatically if their session expired.
This made my components strictly focused on UI logic rather than authentication details."

**The Challenge (Search & Filtering):**
"I didn't want basic client-side filtering because it doesn't scale with large datasets. I implemented backend filtering where the API accepts `search` and `category` query parameters. On the frontend, I used `useSearchParams` to sync the URL with the user's input. This means if a user searches for 'Jazz' in 'Music' and refreshes the page, their search state remains intact."

---

## Tech Stack List
**Languages:** JavaScript (ES6+), HTML5, CSS3
**Frontend:** React.js, Tailwind CSS, Lucide React, Recharts, Axios, React Router 6
**Backend:** Node.js, Express.js, REST API
**Database:** MongoDB, Mongoose (Schema Validation, Indexing)
**Tools:** Git, GitHub, Render, VS Code, Postman
