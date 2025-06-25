# 🌐 Product Recommendation System - Frontend

This is the **frontend** of the full-stack Product Recommendation System built with **React**, **Tailwind CSS**, and **Firebase** for user authentication. It communicates with the backend via REST APIs and uses **JWT** stored in cookies to protect user-specific routes.

---

## 🎯 Project Purpose

To create a platform where users can post queries and receive helpful product recommendations from others. It supports email/password and Google login, query updates, likes, shares, and recommendation management — all protected by secure JWT-based authentication.

---

## 🔗 Live URL

👉 https://product-recommendation-byratul.web.app/

---

![Project Screenshot](https://i.ibb.co/G4kQn476/Screenshot-2025-06-25-142008.png)

---


## 🚀 Key Features

- 🔐 **Firebase Authentication** (Google + Email/Password)
- 🪪 **JWT-based Route Protection** with cookies
- 📥 Submit, update, and delete product queries
- 💡 Recommend products to existing queries
- ❤️ Like/unlike any query
- 🌈 Fully responsive & dark-themed UI
- 🍪 Uses HttpOnly cookies for secure JWT storage
- 🧠 Personalized query and recommendation dashboards
- 📊 Recommendation count and activity tracking

---

## 🔧 Tech Stack & NPM Packages

### 🔨 Core Tech:
- **React.js** (Vite)
- **Tailwind CSS**
- **Firebase Authentication**
- **Axios** (`axios`)
- **React Router DOM** (`react-router-dom`)
- **React Toastify** (`react-toastify`)
- **Lottie-react** (`lottie-react`) for animations
- **React Icons** (`react-icons`)
- **React Awesome Reveal** (`react-awesome-reveal`)


## 🛠️ How to Run Locally

- **Step 1:** Clone the repository
  --git clone https://github.com/Ratul8863/Product-Recommendations-client.git
- **Step 2:** Navigate to the project directory
cd Product-Recommendations-client
- **Step 3:** Install dependencies
npm install
- **Step 4:** Create a `.env` file and add your Firebase config:
-  **Example .env**
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messagingSenderId
VITE_appId=your_appId

- **Step 5:** Start the development server
npm run dev

### 📦 Installed NPM Packages:

```bash
npm install axios react-router-dom firebase react-toastify react-icons lottie-react react-awesome-reveal




