# GenWeb.ai (AI Website Builder 2.0) 🚀

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

**Transform natural language prompts into stunning, production-ready, fully responsive websites with AI.**

</div>

---

## 🌟 What's New in 2.0

- ⚡ **Enhanced AI Engine**: Optimized prompt engineering and structured JSON extraction with OpenRouter.
- 🔐 **Bulletproof Multi-Account Auth**: Google OAuth powered by Firebase with account-switching support, JWT cookies & Bearer tokens.
- 🛠️ **Live In-Browser Code Editor**: Integrated Monaco Code Editor for instant code inspection and manual adjustments.
- 💳 **Stripe Credits & Webhook Integration**: Automated credit fulfillment and real-time subscription management.
- 🌐 **Instant Subdomain / Slug Deployment**: One-click instant publishing with shareable live links.
- 🎨 **Modern Dark Glassmorphism UI**: Built with Tailwind CSS v4, Motion (Framer Motion), and Lucide icons.

---

## ✨ Features

- **Prompt-to-Website AI Generation**: Describe any website idea (e.g., portfolio, SaaS landing page, e-commerce) and receive clean, modern HTML/Tailwind/JS code.
- **Interactive Code Editor & Live Preview**: Real-time side-by-side editing with live preview rendering.
- **Project Dashboard**: Manage all your generated websites, track versions, and toggle deployments.
- **Credit-Based Billing System**: Free plan with credit limits and Pro upgrade options via Stripe Checkout.
- **Instant Deployment**: Publicly accessible live URLs for any generated website.
- **Seamless Authentication**: Google Sign-In with persistent session tracking across cross-origin deployments.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 + Vite 7
- **Styling**: TailwindCSS 4, Motion (Framer Motion)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **State Management**: Redux Toolkit & React-Redux
- **Icons**: Lucide React
- **Auth Client**: Firebase Authentication (Google Auth Provider)
- **HTTP Client**: Axios with global JWT bearer interceptor

### **Backend**
- **Runtime**: Node.js & Express 5 (ES Modules)
- **Database**: MongoDB Atlas with Mongoose ORM
- **AI Integration**: OpenRouter API
- **Payments**: Stripe Checkout & Webhook handler
- **Auth & Security**: JWT (JSON Web Tokens), Cookie-Parser, CORS

---

## 📁 Project Structure

```text
AIwebsitebuilder/
├── backend/
│   ├── config/             # DB & OpenRouter configuration
│   ├── controllers/        # Auth, User, Website, Billing & Stripe controllers
│   ├── middleware/         # isAuth JWT authentication middleware
│   ├── models/             # Mongoose schemas (User, Website)
│   ├── routes/             # Express API routes
│   ├── utils/              # JSON extraction & helpers
│   ├── index.js            # Server entry point
│   └── package.json
└── frontend/
    └── vite-project/
        ├── src/
        │   ├── Components/ # LoginModal, Navbar, UI components
        │   ├── Hooks/      # useGetCurrentUser hook
        │   ├── pages/      # Home, Dashboard, Editor, Generate, LiveSite, Pricing
        │   ├── redux/      # Redux store & userSlice
        │   ├── App.jsx     # Route configurations & Axios interceptor
        │   ├── firebase.js # Firebase app & Google Auth config
        │   └── main.jsx    # Application entry point
        └── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Akshayahlawat21/AIwebsite-Builder2.0.git
cd AIwebsite-Builder2.0
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend/vite-project
npm install
```

Create a `.env` file in `frontend/vite-project/`:
```env
VITE_SERVER_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the frontend dev server:
```bash
npm run dev
```

---

## 💳 Stripe Webhook Testing (Local Development)

To test Stripe payments and webhook fulfillment locally:

1. Download and login to the **Stripe CLI**:
   ```bash
   stripe login
   ```
2. Forward events to your local backend:
   ```bash
   stripe listen --forward-to localhost:5000/api/stripe/webhook
   ```
3. Copy the resulting webhook signing secret (`whsec_...`) into your backend `.env` as `STRIPE_WEBHOOK_SECRET`.

---

## 🚢 Deployment

### Frontend (Vercel)
- Root Directory: `frontend/vite-project`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: Add all `VITE_*` environment variables in Vercel project settings.

### Backend (Render / Railway)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node index.js`
- Environment Variables: Add all backend `.env` variables in Render environment settings with `NODE_ENV=production`.

---

## 📄 License

This project is licensed under the **MIT License**.
