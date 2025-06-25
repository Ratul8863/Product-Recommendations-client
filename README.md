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

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Toastify](https://img.shields.io/badge/React_Toastify-1B1F23?style=for-the-badge&logo=react&logoColor=white)
![Lottie](https://img.shields.io/badge/Lottie-000000?style=for-the-badge&logo=lottie&logoColor=00C1CC)
![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Awesome Reveal](https://img.shields.io/badge/React_Awesome_Reveal-purple?style=for-the-badge&logo=react&logoColor=white)



## 🛠️ How to Run Locally

- **Step 1:** Clone the repository
  --git clone https://github.com/Ratul8863/Product-Recommendations-client..git
- **Step 2:** Navigate to the project directory
--cd Product-Recommendations-client
- **Step 3:** Install dependencies
--npm install
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




