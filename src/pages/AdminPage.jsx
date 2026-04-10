import { useState, useMemo } from 'react'
import { getInscricoes, deleteInscricao } from '../lib/storage'
import { gerarComprovantePDF } from '../lib/pdf'
import { exportarExcel } from '../lib/excel'

const PAG_LABEL  = { pix: 'PIX', dinheiro: 'Dinheiro', debito: 'Débito', credito: 'Crédito' }
const BAR_LABEL  = { sozinho: 'Individual', compartilhar: 'Compartilhada', nao: 'Não' }

export default function AdminPage({ onLogout }) {
  const [lista, setLista]     = useState(() => getInscricoes())
  const [busca, setBusca]     = useState('')
  const [filtPag, setFiltPag] = useState('')
  const [filtBar, setFiltBar] = useState('')
  const [confirmDel, setConfirmDel] = useState(null)

  const reload = () => setLista(getInscricoes())

  const filtrados = useMemo(() => {
    return lista.filter(i => {
      const q = busca.toLowerCase()
      const matchQ = !q || i.nome.toLowerCase().includes(q) || i.equipe.toLowerCase().includes(q) || i.lider.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)
      const matchP = !filtPag || i.pagamento === filtPag
      const matchB = !filtBar || i.barraca === filtBar
      return matchQ && matchP && matchB
    })
  }, [lista, busca, filtPag, filtBar])

  // Stats
  const stats = useMemo(() => ({
    total: lista.length,
    pix:      lista.filter(i => i.pagamento === 'pix').length,
    dinheiro: lista.filter(i => i.pagamento === 'dinheiro').length,
    debito:   lista.filter(i => i.pagamento === 'debito').length,
    credito:  lista.filter(i => i.pagamento === 'credito').length,
    comBarraca: lista.filter(i => i.barraca !== 'nao').length,
    comRestricao: lista.filter(i => i.alergia === 'sim').length,
  }), [lista])

  function handleDelete(id) {
    deleteInscricao(id)
    reload()
    setConfirmDel(null)
  }

  return (
    <div className="container" style={{ maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0 1rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: '1.6rem', color: 'var(--pink)', textShadow: '2px 2px 0 var(--pink-dark)' }}>
            Painel ADM 🎪
          </h1>
          <p style={{ color: 'var(--gray)', fontWeight: 700, fontSize: '.85rem' }}>Força Acamp 2026 — Inscrições</p>
        </div>
        <div style={{ display: 'flex', gap: '.6rem' }}>
          <button
            className="btn btn-green"
            onClick={() => exportarExcel(lista)}
            disabled={lista.length === 0}
          >
            📊 Exportar Excel
          </button>
          <button className="btn btn-secondary" onClick={onLogout}>
            🚪 Sair
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="adm-stats">
        <div className="stat-card">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Total inscritos</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: '#2E7D32' }}>{stats.pix}</div>
          <div className="stat-label">PIX</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: '#F9A825' }}>{stats.dinheiro}</div>
          <div className="stat-label">Dinheiro</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: '#1565C0' }}>{stats.debito + stats.credito}</div>
          <div className="stat-label">Cartão</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: 'var(--cyan-dark)' }}>{stats.comBarraca}</div>
          <div className="stat-label">Com barraca</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color: '#C62828' }}>{stats.comRestricao}</div>
          <div className="stat-label">Restrição alim.</div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="filter-bar">
        <input
          type="text"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="🔍 Buscar por nome, equipe, líder ou ID..."
        />
        <select
          value={filtPag}
          onChange={e => setFiltPag(e.target.value)}
          style={{ border: '2.5px solid var(--dark)', borderRadius: 8, padding: '.55rem .9rem', fontFamily: 'Nunito', fontWeight: 700, fontSize: '.88rem', background: '#fff', cursor: 'pointer', boxShadow: '3px 3px 0 rgba(0,0,0,.1)' }}
        >
          <option value="">💳 Todos pagamentos</option>
          <option value="pix">PIX</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
        </select>
        <select
          value={filtBar}
          onChange={e => setFiltBar(e.target.value)}
          style={{ border: '2.5px solid var(--dark)', borderRadius: 8, padding: '.55rem .9rem', fontFamily: 'Nunito', fontWeight: 700, fontSize: '.88rem', background: '#fff', cursor: 'pointer', boxShadow: '3px 3px 0 rgba(0,0,0,.1)' }}
        >
          <option value="">⛺ Todas barracas</option>
          <option value="sozinho">Individual</option>
          <option value="compartilhar">Compartilhada</option>
          <option value="nao">Sem barraca</option>
        </select>
      </div>

      {/* ── Table ── */}
      {filtrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{lista.length === 0 ? '🍦' : '🔍'}</div>
          <p>{lista.length === 0 ? 'Nenhuma inscrição ainda.' : 'Nenhum resultado encontrado.'}</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Líder / Equipe</th>
                <th>Pagamento</th>
                <th>Barraca</th>
                <th>Restrição</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((i, idx) => (
                <tr key={i.id}>
                  <td style={{ color: 'var(--gray)', fontSize: '.78rem' }}>{idx + 1}</td>
                  <td>
                    <div style={{ fontWeight: 900 }}>{i.nome}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--gray)', fontFamily: 'monospace' }}>{i.id}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{i.lider}</div>
                    <div style={{ fontSize: '.78rem', color: 'var(--gray)' }}>{i.equipe}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${i.pagamento}`}>{PAG_LABEL[i.pagamento]}</span>
                  </td>
                  <td style={{ fontSize: '.82rem' }}>{BAR_LABEL[i.barraca]}</td>
                  <td>
                    <span className={`badge badge-${i.alergia}`}>
                      {i.alergia === 'sim' ? '⚠️ Sim' : '✅ Não'}
                    </span>
                  </td>
                  <td style={{ fontSize: '.78rem', color: 'var(--gray)' }}>{i.dataCadastro}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '.3rem' }}>
                      <button
                        title="Baixar PDF"
                        onClick={() => gerarComprovantePDF(i)}
                        style={{ background: 'var(--pink)', border: '2px solid var(--pink-dark)', borderRadius: 6, color: '#fff', padding: '.3rem .5rem', cursor: 'pointer', fontSize: '.75rem' }}
                      >
                        📄
                      </button>
                      <button
                        title="Excluir"
                        onClick={() => setConfirmDel(i)}
                        style={{ background: '#FFEBEE', border: '2px solid #C62828', borderRadius: 6, color: '#C62828', padding: '.3rem .5rem', cursor: 'pointer', fontSize: '.75rem' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '.8rem', fontWeight: 700, marginTop: '1rem' }}>
        Mostrando {filtrados.length} de {lista.length} inscrições
      </p>

      {/* ── Confirm delete modal ── */}
      {confirmDel && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth: 360 }}>
            <div className="modal-emoji">🗑️</div>
            <h2 style={{ fontSize: '1.2rem' }}>Excluir inscrição?</h2>
            <p>Tem certeza que quer remover <strong style={{ color: 'var(--dark)' }}>{confirmDel.nome}</strong>? Essa ação não pode ser desfeita.</p>
            <div className="btn-row" style={{ marginTop: '1.2rem' }}>
              <button
                className="btn"
                style={{ flex: 1, background: '#C62828', color: '#fff', border: '2.5px solid #7B1A1A', boxShadow: '3px 3px 0 #7B1A1A' }}
                onClick={() => handleDelete(confirmDel.id)}
              >
                Sim, excluir
              </button>
              <button className="btn btn-secondary" onClick={() => setConfirmDel(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
