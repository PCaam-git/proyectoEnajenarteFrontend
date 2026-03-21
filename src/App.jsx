import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'

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

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mis-inscripciones"
            element={
              <ProtectedRoute>
                <MyRegistrations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/ponentes"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminSpeakers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/eventos"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/talleres"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminWorkshops />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inscripciones"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminRegistrations />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}