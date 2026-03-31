import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

function getInitialToken() {
  return localStorage.getItem('token') || ''
}

function getInitialUser() {
  const savedUser = localStorage.getItem('user')

  if (!savedUser) {
    return null
  }

  try {
    return JSON.parse(savedUser)
  } catch (error) {
    console.error(error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getInitialToken)
  const [user, setUser] = useState(getInitialUser)

  function login(authData) {
  const receivedToken = authData.token

  const receivedUser = {
    id: authData.id,
    username: authData.username,
    role: authData.role,
  }

  setToken(receivedToken)
  setUser(receivedUser)

  localStorage.setItem('token', receivedToken)
  localStorage.setItem('user', JSON.stringify(receivedUser))
}

  function logout() {
    setToken('')
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function isAuthenticated() {
    return token !== ''
  }

  function isAdmin() {
    return user?.role === 'ADMIN'
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}