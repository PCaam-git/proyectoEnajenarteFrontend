import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken) {
      setToken(savedToken)
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  function login(authData) {
  const receivedToken = authData.token

  const receivedUser = {
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