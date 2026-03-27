# 🍽️ Food Rescue

## 📘 Introduction
**Food Rescue** is a web-based platform designed to reduce food wastage in hostels by connecting **hostel mess admins** (who list leftover food) with **NGOs** (who collect and distribute it to people in need).  
The platform promotes **sustainability**, **social responsibility**, and **efficient resource utilization** through automation.

---

## 🎯 Objective
The goal of this project is to:
- Help hostel mess admins post leftover food details quickly.
- Allow NGOs to view and accept available food listings.
- Enable smooth communication and tracking between both parties.
- Minimize manual coordination and ensure timely food redistribution.

---

## 🧠 Technology Stack

| Component | Technology | Description |
|------------|-------------|--------------|
| **Frontend** | React.js | Builds responsive and interactive user interfaces. |
| **Backend** | Node.js + Express.js | Handles server logic, API routes, and data flow. |
| **Database** | MySQL | Stores users, food items, and package data. |
| **Authentication** | JWT (JSON Web Token) | Manages secure login and session persistence. |
| **Tools** | Postman, VS Code, GitHub | Used for API testing, development, and version control. |

---

## 🏗️ System Architecture

### 1. **Frontend (Client Side)**
- Built using **React.js**.  
- Users (Mess Admins or NGOs) interact via forms and dashboards.  
- Actions like login, posting food, or accepting food send API requests to the backend.

### 2. **Backend (Server Side)**
- Developed using **Express.js** and **Node.js**.  
- Handles API routes, authentication, and communication with the database.  
- Routes are divided into:
  - `/api/auth` → Authentication (login/register)
  - `/api/food` → Food listing and retrieval
  - `/api/packages` → Package acceptance and delivery details

### 3. **Database (MySQL)**
- Contains tables like:
  - `users` → User details and roles (MESS or NGO)
  - `food_items` → Food listings with expiry and status
  - `packages` → Accepted and assigned deliveries
- Ensures **data integrity** through primary and foreign keys.

---

## 🔁 System Flow

**Example Flow:**
1. Mess Admin logs in → Posts leftover food → Data stored in database.  
2. NGO logs in → Views listed food → Accepts → Package created.  
3. Delivery details shared → Status updated to *Delivered*.  

---

## 🚀 Features

### 🏠 For Hostel Mess Admin
- Secure login and registration.  
- Add details about leftover food.  
- View status of listed food items.  

### 🏢 For NGO
- Browse available food listings.  
- Accept food items and create packages.  
- Share driver and delivery details.  

### ⚙️ General Features
- **JWT Authentication** → Auto logout after 15 minutes.  
- **Role-Based Access Control** → Separate dashboards for MESS and NGO.  
- **RESTful API Design** → Clean and maintainable routes.  
- **Responsive UI** → Works across all devices.  

---

## 🧩 API Endpoints

| Route | Method | Description |
|--------|---------|-------------|
| `/api/auth/login` | POST | Authenticates a user and returns JWT token. |
| `/api/food/add` | POST | Adds a new food listing by mess admin. |
| `/api/food/all` | GET | Fetches all available food items for NGOs. |
| `/api/packages/accept` | POST | NGO accepts a food listing and creates a package. |

---

## 🔒 Security Measures
- **JWT Token Expiry** → Auto logout after session timeout.  
- **CORS Enabled** → Allows secure cross-origin requests.  
- **Environment Variables** → All sensitive credentials stored in `.env` file.

---

## 📊 Results and Impact
- Reduced food wastage in hostels by bridging the gap between mess admins and NGOs.  
- Streamlined coordination using a simple, web-based solution.  
- Potential for large-scale use in colleges, restaurants, and corporate offices.

---

## 🔮 Future Enhancements
- Integrate **real-time notifications** using Socket.io.  
- Add **Google Maps API** for delivery tracking.  
- Build an **analytics dashboard** to show total food rescued.  
- Implement **email/SMS alerts** for faster communication.  

---

## 🏁 Conclusion
The **Food Rescue** project showcases how technology can serve society.  
By combining a robust backend, an intuitive frontend, and secure data handling, this platform simplifies food redistribution and supports sustainable living.

---

## 👨‍💻 Contributors
- **Achintya** – Developer, Designer, and Project Lead.


