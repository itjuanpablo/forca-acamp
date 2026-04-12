import { useState } from 'react'

const SENHA = 'forcaacamp2026'

export default function LoginPage({ onLogin }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro]   = useState('')
  const [show, setShow]   = useState(false)

  function handleLogin() {
    if (senha === SENHA) { onLogin() }
    else { setErro('Senha incorreta. Tente novamente.'); setSenha('') }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ fontSize:'2.5rem', marginBottom:'.6rem' }}>🔐</div>
        <h2>Área ADM</h2>
        <p>Acesso restrito à organização do acampamento</p>
        <div className="field" style={{ textAlign:'left' }}>
          <label>Senha de acesso</label>
          <div style={{ position:'relative' }}>
            <input
              type={show ? 'text' : 'password'}
              value={senha}
              onChange={e => { setSenha(e.target.value); setErro('') }}
              onKeyDown={e => e.key==='Enter' && handleLogin()}
              placeholder="Digite a senha"
              autoFocus
              style={{ paddingRight:'2.8rem' }}
            />
            <button
              type="button"
              onClick={() => setShow(s=>!s)}
              style={{ position:'absolute', right:'.6rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:'1rem' }}>
              {show ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        {erro && <div className="login-error">⚠️ {erro}</div>}
        <button className="btn btn-primary" style={{ width:'100%', marginTop:'1rem', padding:'.75rem', fontSize:'1rem' }}
          onClick={handleLogin}>
          Entrar →
        </button>
        <p style={{ fontSize:'.72rem', color:'var(--mid)', marginTop:'1rem', fontWeight:600 }}>
          Senha padrão: <code>forcaacamp2026</code><br/>Altere em <code>src/pages/LoginPage.jsx</code>
        </p>
      </div>
    </div>
  )
}
