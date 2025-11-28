# 💬 Tether — Real-Time Chat Application

Tether is a **full-stack real-time chat app** built with the MERN stack and **Socket.IO** for instant messaging.  
It supports authentication, media uploads, user profiles, persistent message storage, and a clean, responsive UI built with React (Vite).  

> ⚡️ Chat instantly. Upload seamlessly. Stay connected in real-time.

---

## 🚀 Tech Stack

### 🧠 Backend
- **Node.js + Express** — REST API & WebSocket server
- **MongoDB + Mongoose** — persistent message and user storage
- **Socket.IO** — real-time bidirectional communication
- **Cloudinary** — image/media upload & hosting
- **JWT** — authentication tokens
- **bcrypt** — password hashing
- **Nodemon** — hot reload during development

### 🎨 Frontend
- **React (Vite)** — fast, modular frontend
- **Axios** — API and socket communication
- **Zustand-like stores** — custom global state management (`useAuthStore`, `useChatStore`, `useThemeStore`)
- **Plain CSS** — simple global styling (`index.css`)
- **Vite Dev Server** — blazing-fast development setup

### 🛠️ Dev & Tooling
- npm, ESLint, Git  
- MongoDB Atlas (recommended)  
- Cloudinary (media hosting)  
- Deployed easily on Render / Vercel / Heroku

---

## 📂 Repository Structure

tether-chat-app/
│
├── backend/
│   ├── index.js               # Entry point
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── message.route.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── message.model.js
│   ├── lib/
│   │   ├── db.js
│   │   ├── socket.js
│   │   ├── cloudinary.js
│   │   └── utils.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   └── .env                   # Environment variables (not committed)
│
├── frontend/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── ChatContainer.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MessageInput.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── NavBar.jsx
│   │   ├── NoChatSelected.jsx
│   │   └── AuthImagePattern.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── SettingsPage.jsx
│   ├── lib/
│   │   ├── axios.js
│   │   └── utils.js
│   ├── constants/
│   │   └── themes.js
│   ├── store/
│   │   ├── useAuthStore.js
│   │   ├── useChatStore.js
│   │   └── useThemeStore.js
│   ├── public/
│   ├── index.html
│   └── vite.config.js
│
├── package.json
├── README.md
└── .gitignore

---

## 🔑 Key Features

### 🧾 Authentication
- Signup, login, and logout via **JWT-protected routes**
- Middleware validation using `auth.middleware.js`

### 💬 Real-Time Messaging
- Powered by **Socket.IO**
- Bi-directional message delivery with `userSocketMap` for tracking active users
- Live user presence indicator (online/offline)

### 🧠 Persistence
- User and message storage via **MongoDB**
- Mongoose schemas: `user.model.js`, `message.model.js`

### 📸 Media Uploads
- Integrated **Cloudinary** upload for profile pictures or message attachments
- Configured via `cloudinary.js` in `lib`

### 🖥️ Frontend UI
- Responsive and modular React component design
- Dynamic sidebar and chat layout
- Custom global state management using **Zustand-style hooks**

### 🌗 Theme & Personalization
- Customizable theme toggles with `useThemeStore`
- Simple theme constants defined in `/frontend/constants/themes.js`

---

## ⚙️ Environment Variables

### 🔐 Backend (`backend/.env`)
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
NODE_ENV=development

### 💡 Frontend (`frontend/.env`)
VITE_API_URL=http://localhost:5001

---

## 🧭 Getting Started (Development)

1. **Clone the repository**
   git clone https://github.com/CodenameCypher/tether-chat-app.git
   cd tether-chat-app

2. **Install dependencies**
   cd backend && npm install
   cd ../frontend && npm install

3. **Set up your `.env` files** in both frontend and backend as shown above.

4. **Run servers concurrently**
   # Backend (Terminal 1)
   cd backend
   npm run dev

   # Frontend (Terminal 2)
   cd frontend
   npm run dev

5. **Visit**
   http://localhost:5173
   Start chatting! 🎉

---

## 🧩 How It Works

| Layer | Description |
|-------|--------------|
| **Frontend** | React UI → Zustand stores → Axios & Socket.IO client |
| **Backend (Express)** | REST routes for `/auth` and `/message`, plus Socket.IO server on same HTTP server |
| **Database (MongoDB)** | Persists all messages & users |
| **Sockets** | Manages real-time communication and online status tracking |

> The backend serves both the API and the built React app in production for a unified deployment experience.

---

## 📅 Roadmap / Future Enhancements

- 🔄 Group chats & typing indicators  
- 💬 Message delivery receipts  
- 📱 Responsive mobile layout  
- 🕓 Message history loading & pagination  
- 🔐 Two-factor authentication  
- ☁️ Offline message queue & push notifications  
- 🧪 Unit/integration testing setup  

---

## 🤝 Contributing

Pull requests are welcome!  
If you’d like to suggest a feature or fix a bug:
1. Fork this repo  
2. Create a feature branch  
3. Submit a PR with a clear description  

---

## 🧾 License

MIT License © 2025 [CodenameCypher](https://github.com/CodenameCypher)
