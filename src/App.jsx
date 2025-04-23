import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Signin from './pages/Signin.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  )
}
