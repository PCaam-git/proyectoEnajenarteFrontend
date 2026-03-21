import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Events from './pages/public/Events'
import Workshops from './pages/public/Workshops'

import Profile from './pages/user/Profile'
import MyRegistrations from './pages/user/MyRegistrations'

import AdminPanel from './pages/admin/AdminPanel'
import AdminUsers from './pages/admin/AdminUsers'
import AdminSpeakers from './pages/admin/AdminSpeakers'
import AdminEvents from './pages/admin/AdminEvents'
import AdminWorkshops from './pages/admin/AdminWorkshops'
import AdminRegistrations from './pages/admin/AdminRegistrations'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/talleres" element={<Workshops />} />

          <Route path="/perfil" element={<Profile />} />
          <Route path="/mis-inscripciones" element={<MyRegistrations />} />

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/usuarios" element={<AdminUsers />} />
          <Route path="/admin/ponentes" element={<AdminSpeakers />} />
          <Route path="/admin/eventos" element={<AdminEvents />} />
          <Route path="/admin/talleres" element={<AdminWorkshops />} />
          <Route path="/admin/inscripciones" element={<AdminRegistrations />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}