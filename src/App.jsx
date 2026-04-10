import { useState } from 'react'
import FormPage from './pages/FormPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  const [page, setPage]       = useState('form')   // 'form' | 'login' | 'admin'
  const [adminAuth, setAdminAuth] = useState(false)

  function goAdmin() {
    if (adminAuth) {
      setPage('admin')
    } else {
      setPage('login')
    }
  }

  function handleLogin() {
    setAdminAuth(true)
    setPage('admin')
  }

  function handleLogout() {
    setAdminAuth(false)
    setPage('form')
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav className="site-nav">
        <div className="nav-brand">🍦 Força Acamp</div>
        <div className="nav-links">
          <button
            className={`nav-btn ${page === 'form' ? 'active' : ''}`}
            onClick={() => setPage('form')}
          >
            📋 Inscrição
          </button>
          <button
            className={`nav-btn ${page === 'admin' || page === 'login' ? 'active' : ''}`}
            onClick={goAdmin}
          >
            🔐 ADM
          </button>
        </div>
      </nav>

      {/* ── PAGES ── */}
      {page === 'form'  && <FormPage />}
      {page === 'login' && <LoginPage onLogin={handleLogin} />}
      {page === 'admin' && adminAuth && <AdminPage onLogout={handleLogout} />}
    </>
  )
}
