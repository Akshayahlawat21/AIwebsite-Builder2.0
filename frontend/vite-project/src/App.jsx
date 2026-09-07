import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import useGetCurrentUser from './Hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import WebsiteEditor from './pages/Editor'
import LiveSite from './pages/LiveSite'
import Pricing from './pages/Pricing'

import axios from 'axios';

// In local development, default to local backend on port 8000; in production use VITE_SERVER_URL or Render URL
export const serverUrl = import.meta.env.VITE_SERVER_URL || (import.meta.env.DEV ? "http://localhost:8000" : "https://aiwebsite-builder.onrender.com");

// Global interceptor: automatically add localStorage token to all API requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
function App() {
  useGetCurrentUser()
  const { userData } = useSelector(state => state.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={userData ? <Dashboard /> : <Home />} />
        <Route path='/generate' element={userData ? <Generate /> : <Home />} />
        <Route path='/editor/:id' element={userData ? <WebsiteEditor /> : <Home />} />
        <Route path='/site/:id' element={<LiveSite />} />
        <Route path='/pricing' element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
