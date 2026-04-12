import { useState, useMemo, useEffect, useCallback } from 'react'
import { getInscricoes, deleteInscricao, updateStatus } from '../lib/storage'
import { isSupabaseConfigured } from '../lib/supabase'
import { gerarComprovantePDF } from '../lib/pdf'
import { exportarExcel } from '../lib/excel'

const PAG_LABEL = { pix:'PIX', dinheiro:'Dinheiro', debito:'Débito', credito:'Crédito' }
const BAR_LABEL = { sozinho:'Individual', compartilhar:'Compartilhada', nao:'Não' }
const STATUS_LABEL = { pendente:'Pendente', confirmado:'Confirmado', cancelado:'Cancelado' }

export default function AdminPage({ onLogout }) {
  const [lista, setLista]     = useState([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca]     = useState('')
  const [filtPag, setFiltPag] = useState('')
  const [filtBar, setFiltBar] = useState('')
  const [filtSt, setFiltSt]   = useState('')
  const [confirmDel, setConfirmDel] = useState(null)
  const [detail, setDetail]   = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getInscricoes()
      setLista(data)
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const filtrados = useMemo(() => lista.filter(i => {
    const q = busca.toLowerCase()
    return (
      (!q || i.nome?.toLowerCase().includes(q) || i.equipe?.toLowerCase().includes(q) || i.lider?.toLowerCase().includes(q) || i.id?.toLowerCase().includes(q)) &&
      (!filtPag || i.pagamento === filtPag) &&
      (!filtBar || i.barraca === filtBar) &&
      (!filtSt  || i.status === filtSt)
    )
  }), [lista, busca, filtPag, filtBar, filtSt])

  const stats = useMemo(() => ({
    total:        lista.length,
    pix:          lista.filter(i => i.pagamento==='pix').length,
    dinheiro:     lista.filter(i => i.pagamento==='dinheiro').length,
    debito:       lista.filter(i => i.pagamento==='debito').length,
    credito:      lista.filter(i => i.pagamento==='credito').length,
    confirmados:  lista.filter(i => i.status==='confirmado').length,
    comBarraca:   lista.filter(i => i.barraca!=='nao').length,
    comRestricao: lista.filter(i => i.alergia==='sim').length,
  }), [lista])

  async function handleDelete(id) {
    try {
      await deleteInscricao(id)
      await load()
    } catch(e) { alert('Erro: '+e.message) }
    setConfirmDel(null)
  }

  async function handleStatus(id, status) {
    try {
      await updateStatus(id, status)
      await load()
      if (detail?.id === id) setDetail(d => ({ ...d, status }))
    } catch(e) { alert('Erro: '+e.message) }
  }

  const selectStyle = {
    border:'2px solid #BDBDB8', borderRadius:8, padding:'.5rem .85rem',
    fontFamily:'Poppins,sans-serif', fontWeight:600, fontSize:'.85rem',
    background:'#fff', cursor:'pointer', boxShadow:'2px 2px 0 rgba(0,0,0,.07)', outline:'none',
  }

  return (
    <div className="container-wide">
      {/* ── Header ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.4rem 0 1rem', flexWrap:'wrap', gap:'.7rem' }}>
        <div>
          <h1 style={{ fontSize:'1.5rem', fontWeight:900, color:'var(--pink)' }}>
            Painel ADM 🎪
          </h1>
          <p style={{ color:'var(--mid)', fontWeight:600, fontSize:'.82rem' }}>
            Força Acamp 2026 · {isSupabaseConfigured() ? '🟢 Supabase conectado' : '🟡 localStorage (modo local)'}
          </p>
        </div>
        <div style={{ display:'flex', gap:'.6rem', flexWrap:'wrap' }}>
          <button className="btn btn-secondary" onClick={load} disabled={loading} title="Atualizar">
            {loading ? '⏳' : '🔄'} Atualizar
          </button>
          <button className="btn btn-green" onClick={() => exportarExcel(lista)} disabled={lista.length===0}>
            📊 Exportar Excel
          </button>
          <button className="btn btn-secondary" onClick={onLogout}>
            🚪 Sair
          </button>
        </div>
      </div>

      {/* ── Supabase banner se não configurado ── */}
      {!isSupabaseConfigured() && (
        <div className="supabase-banner">
          <span>⚠️</span>
          <span>
            Rodando em modo local (localStorage). Para acessar de qualquer dispositivo com sua equipe,{' '}
            <a href="#" onClick={e => { e.preventDefault(); alert('Veja o README.md para instruções de configuração do Supabase.') }}>
              configure o Supabase
            </a>.
          </span>
        </div>
      )}

      {/* ── Stats ── */}
      <div className="adm-stats">
        <div className="stat-card">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color:'var(--green)' }}>{stats.confirmados}</div>
          <div className="stat-label">Confirmados</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color:'#2E7D32' }}>{stats.pix}</div>
          <div className="stat-label">PIX</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color:'#B08A00' }}>{stats.dinheiro}</div>
          <div className="stat-label">Dinheiro</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color:'#1565C0' }}>{stats.debito + stats.credito}</div>
          <div className="stat-label">Cartão</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color:'var(--cyan-dark)' }}>{stats.comBarraca}</div>
          <div className="stat-label">Com barraca</div>
        </div>
        <div className="stat-card">
          <div className="stat-num" style={{ color:'var(--red)' }}>{stats.comRestricao}</div>
          <div className="stat-label">Restrição alim.</div>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="filter-bar">
        <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
          placeholder="🔍 Buscar nome, equipe, líder ou código..."/>
        <select value={filtPag} onChange={e => setFiltPag(e.target.value)} style={selectStyle}>
          <option value="">💳 Todos pagamentos</option>
          <option value="pix">PIX</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
        </select>
        <select value={filtBar} onChange={e => setFiltBar(e.target.value)} style={selectStyle}>
          <option value="">⛺ Todas barracas</option>
          <option value="sozinho">Individual</option>
          <option value="compartilhar">Compartilhada</option>
          <option value="nao">Sem barraca</option>
        </select>
        <select value={filtSt} onChange={e => setFiltSt(e.target.value)} style={selectStyle}>
          <option value="">● Todos status</option>
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="loading-wrap">
          <div className="spinner"/>
          <span>Carregando inscrições...</span>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{lista.length===0 ? '🍦' : '🔍'}</div>
          <p>{lista.length===0 ? 'Nenhuma inscrição ainda.' : 'Nenhum resultado encontrado.'}</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Participante</th>
                <th>Líder / Equipe</th>
                <th>Pagamento</th>
                <th>Status</th>
                <th>Barraca</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((i, idx) => (
                <tr key={i.id} style={{ cursor:'pointer' }} onClick={() => setDetail(i)}>
                  <td style={{ color:'var(--mid)', fontSize:'.75rem' }}>{idx+1}</td>
                  <td>
                    <div style={{ fontWeight:800 }}>{i.nome}</div>
                    <div style={{ fontSize:'.72rem', color:'var(--mid)', fontFamily:'monospace' }}>{i.id}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight:700 }}>{i.lider}</div>
                    <div style={{ fontSize:'.76rem', color:'var(--mid)' }}>{i.equipe}</div>
                  </td>
                  <td><span className={`badge badge-${i.pagamento}`}>{PAG_LABEL[i.pagamento]}</span></td>
                  <td>
                    <select
                      value={i.status || 'pendente'}
                      onClick={e => e.stopPropagation()}
                      onChange={e => { e.stopPropagation(); handleStatus(i.id, e.target.value) }}
                      style={{ ...selectStyle, fontSize:'.75rem', padding:'.25rem .5rem', boxShadow:'none' }}
                      className={`badge badge-${i.status||'pendente'}`}
                    >
                      <option value="pendente">Pendente</option>
                      <option value="confirmado">Confirmado ✓</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td style={{ fontSize:'.82rem' }}>{BAR_LABEL[i.barraca]}</td>
                  <td style={{ fontSize:'.75rem', color:'var(--mid)' }}>{i.dataCadastro}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <div style={{ display:'flex', gap:'.3rem' }}>
                      <button title="Ver detalhes"
                        onClick={() => setDetail(i)}
                        style={{ background:'#E3F2FD', border:'2px solid #1565C0', borderRadius:6, color:'#1565C0', padding:'.3rem .5rem', cursor:'pointer', fontSize:'.75rem' }}>
                        👁️
                      </button>
                      <button title="Baixar PDF"
                        onClick={() => gerarComprovantePDF(i)}
                        style={{ background:'var(--pink-pale)', border:'2px solid var(--pink-dark)', borderRadius:6, color:'var(--pink-dark)', padding:'.3rem .5rem', cursor:'pointer', fontSize:'.75rem' }}>
                        📄
                      </button>
                      <button title="Excluir"
                        onClick={() => setConfirmDel(i)}
                        style={{ background:'#FFEBEE', border:'2px solid var(--red-dark)', borderRadius:6, color:'var(--red)', padding:'.3rem .5rem', cursor:'pointer', fontSize:'.75rem' }}>
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

      <p style={{ textAlign:'center', color:'var(--mid)', fontSize:'.78rem', fontWeight:600, marginTop:'.9rem' }}>
        Mostrando {filtrados.length} de {lista.length} inscrições
      </p>

      {/* ── Modal detalhes ── */}
      {detail && (
        <div className="overlay" onClick={() => setDetail(null)}>
          <div className="modal" style={{ maxWidth:500, textAlign:'left' }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
              <div>
                <div style={{ fontSize:'1.25rem', fontWeight:900 }}>{detail.nome}</div>
                <div style={{ fontFamily:'monospace', fontSize:'.82rem', color:'var(--pink)', fontWeight:700 }}>{detail.id}</div>
              </div>
              <button onClick={() => setDetail(null)} className="btn btn-secondary" style={{ padding:'.3rem .7rem' }}>✕</button>
            </div>
            {[
              ['Líder', detail.lider], ['Equipe', detail.equipe],
              detail.telefone ? ['WhatsApp', detail.telefone] : null,
              detail.idade ? ['Idade', detail.idade+' anos'] : null,
              ['Alergia', detail.alergia==='sim' ? ('Sim — '+(detail.alergiaDesc||'')) : 'Não'],
              ['Barraca', BAR_LABEL[detail.barraca]],
              detail.compartilharNomes ? ['Companheiros', detail.compartilharNomes] : null,
              ['Pagamento', PAG_LABEL[detail.pagamento]],
              ['Status', STATUS_LABEL[detail.status]||detail.status],
              detail.obs ? ['Obs', detail.obs] : null,
              ['Inscrito em', detail.dataCadastro],
            ].filter(Boolean).map(([l,v]) => (
              <div key={l} style={{ display:'flex', gap:'.5rem', borderBottom:'1px solid var(--gray-line)', padding:'.45rem 0', fontSize:'.88rem' }}>
                <span style={{ fontWeight:800, color:'var(--mid)', minWidth:110 }}>{l}:</span>
                <span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display:'flex', gap:'.6rem', marginTop:'1.2rem' }}>
              <button className="btn btn-primary" style={{ flex:1 }} onClick={() => gerarComprovantePDF(detail)}>
                📄 Baixar PDF
              </button>
              <button className="btn btn-danger" onClick={() => { setDetail(null); setConfirmDel(detail) }}>
                🗑️ Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm delete ── */}
      {confirmDel && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth:360 }}>
            <div className="modal-emoji">🗑️</div>
            <h2 style={{ fontSize:'1.15rem' }}>Excluir inscrição?</h2>
            <p>Tem certeza que quer remover <strong style={{ color:'var(--dark)' }}>{confirmDel.nome}</strong>? Esta ação não pode ser desfeita.</p>
            <div className="btn-row" style={{ marginTop:'1.2rem' }}>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmDel.id)}>Sim, excluir</button>
              <button className="btn btn-secondary" onClick={() => setConfirmDel(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
