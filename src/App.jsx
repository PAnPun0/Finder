import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import FinderPage from './pages/FinderPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главная страница (/) - теперь это Логин */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Страница приложения (/finder) */}
        <Route path="/finder" element={<FinderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
