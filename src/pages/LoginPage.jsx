import { useState } from 'react'

const SENHA = 'forcaacamp2026'   // ← troque aqui a senha do admin

export default function LoginPage({ onLogin }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleLogin() {
    if (senha === SENHA) {
      onLogin()
    } else {
      setErro('Senha incorreta. Tente novamente.')
      setSenha('')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ fontSize: '2.5rem', marginBottom: '.6rem' }}>🔐</div>
        <h2>Área ADM</h2>
        <p>Acesso restrito à organização do acampamento</p>

        <div className="field">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErro('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Digite a senha"
            autoFocus
          />
        </div>

        {erro && <div className="login-error">{erro}</div>}

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem', padding: '.75rem', fontSize: '1rem' }}
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
