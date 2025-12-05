import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import FinderPage from './pages/FinderPage'
import WelcomePage from './pages/WelcomePage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path="/finder" element={<FinderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
