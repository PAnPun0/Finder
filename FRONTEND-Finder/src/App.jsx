import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import FinderPage from './pages/FinderPage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage' 
import ChatsPage from './pages/ChatsPage'
import ChatRoomPage from './pages/ChatRoomPage'
import LikesPage from './pages/LikesPage'
import BlindDatePage from './pages/BlindDatePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        
        
        <Route path="/finder" element={<FinderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path='/chats' element={<ChatsPage />} />
        <Route path='/chats/:id' element={<ChatRoomPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path='/random' element={<BlindDatePage/>}  />

        <Route path="/search" element={<div className="p-10">Поиск</div>} />
        <Route path="/likes" element={<div className="p-10">Лайки</div>} />
        <Route path="/chats" element={<div className="p-10">Чаты</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
