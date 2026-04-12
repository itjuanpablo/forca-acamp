import { useState } from 'react'
import HeroIllustration from '../components/HeroIllustration'
import SuccessModal from '../components/SuccessModal'
import { saveInscricao, generateId } from '../lib/storage'

const initForm = {
  nome:'', lider:'', equipe:'', telefone:'', idade:'',
  alergia:null, alergiaDesc:'',
  barraca:null, compartilharQtd:'', compartilharNomes:'',
  pagamento:null, obs:'',
}

export default function FormPage() {
  const [form, setForm]   = useState(initForm)
  const [errors, setErrors] = useState({})
  const [inscricaoFeita, setInscricaoFeita] = useState(null)
  const [loading, setLoading] = useState(false)
  const [serverErr, setServerErr] = useState('')

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: null }))
  }

  function validate() {
    const e = {}
    if (!form.nome.trim())   e.nome      = 'Informe seu nome completo'
    if (!form.lider.trim())  e.lider     = 'Informe o nome do seu líder'
    if (!form.equipe.trim()) e.equipe    = 'Informe sua equipe'
    if (!form.alergia)       e.alergia   = 'Responda sobre alimentação'
    if (!form.barraca)       e.barraca   = 'Indique sua situação com barraca'
    if (!form.pagamento)     e.pagamento = 'Selecione a forma de pagamento'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) {
      document.querySelector('[data-err]')?.scrollIntoView({ behavior:'smooth', block:'center' })
      return
    }
    setLoading(true)
    setServerErr('')
    try {
      const inscricao = {
        ...form,
        id: generateId(),
        dataCadastro: new Date().toLocaleString('pt-BR'),
        status: 'pendente',
      }
      const saved = await saveInscricao(inscricao)
      setInscricaoFeita(saved)
      setForm(initForm)
    } catch (err) {
      setServerErr('Erro ao salvar inscrição. Tente novamente. (' + err.message + ')')
    } finally {
      setLoading(false)
    }
  }

  const OptBtn = ({ group, value, label }) => (
    <button type="button"
      className={`opt-btn ${form[group] === value ? 'active' : ''}`}
      onClick={() => set(group, value)}>
      {label}
    </button>
  )

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        <HeroIllustration />

        <div style={{ position:'relative', zIndex:1, marginTop:'.8rem' }}>
          <div className="hero-title">FORÇA ACAMP</div>
          <div className="hero-subtitle">Acampamento da equipe · 2026</div>
          <div className="hero-theme-badge">🍦 "O Deus que destrói sonhos"</div>
          <br/><br/>
          <div className="hero-dates">📅 18, 19 e 20 de Setembro de 2026</div>
        </div>

        {/* ── AVISOS ── */}
        <div className="container">
          <div className="avisos-wrap" style={{ marginTop:'1.4rem' }}>
            <div className="aviso aviso-red">
              <span className="aviso-icon">🔒</span>
              <div className="aviso-text">
                <strong>Fechamento das inscrições</strong>
                <span>Prazo final: <span className="date-highlight">12 de setembro de 2026</span></span>
              </div>
            </div>
            <div className="aviso aviso-yellow">
              <span className="aviso-icon">💸</span>
              <div className="aviso-text">
                <strong>Reembolso por desistência</strong>
                <span>Solicite até <span className="date-highlight">20 de agosto de 2026</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FORM ── */}
      <div className="container">

        {/* Identificação */}
        <div className="card">
          <div className="card-header"><span>👤</span><h2>Quem é você?</h2></div>
          <div className="card-body">
            <div className="field">
              <label>Nome Completo <span className="req">*</span></label>
              <input type="text" value={form.nome} onChange={e => set('nome', e.target.value)}
                placeholder="Como está no seu documento"
                className={errors.nome ? 'err' : ''}/>
              {errors.nome && <div className="field-error" data-err>{errors.nome}</div>}
            </div>
            <div className="row2">
              <div className="field">
                <label>Meu Líder <span className="req">*</span></label>
                <input type="text" value={form.lider} onChange={e => set('lider', e.target.value)}
                  placeholder="Nome do seu líder" className={errors.lider ? 'err' : ''}/>
                {errors.lider && <div className="field-error" data-err>{errors.lider}</div>}
              </div>
              <div className="field">
                <label>Equipe / Sub-equipe <span className="req">*</span></label>
                <input type="text" value={form.equipe} onChange={e => set('equipe', e.target.value)}
                  placeholder="Ex: Louvor, Mídia, Kids..." className={errors.equipe ? 'err' : ''}/>
                {errors.equipe && <div className="field-error" data-err>{errors.equipe}</div>}
              </div>
            </div>
            <div className="row2">
              <div className="field">
                <label>WhatsApp</label>
                <input type="tel" value={form.telefone} onChange={e => set('telefone', e.target.value)}
                  placeholder="(XX) 9XXXX-XXXX"/>
              </div>
              <div className="field">
                <label>Idade</label>
                <input type="number" value={form.idade} onChange={e => set('idade', e.target.value)}
                  placeholder="Sua idade" min="1" max="120"/>
              </div>
            </div>
          </div>
        </div>

        {/* Alimentação */}
        <div className="card">
          <div className="card-header"><span>🍽️</span><h2>Alimentação</h2></div>
          <div className="card-body">
            <div className="field">
              <label>Tem alergia ou não come algum alimento? <span className="req">*</span></label>
              <div className="toggle-row">
                <button type="button" className={`tog ${form.alergia === 'nao' ? 'active-nao' : ''}`}
                  onClick={() => set('alergia','nao')}>
                  ✅ Não, como de tudo!
                </button>
                <button type="button" className={`tog ${form.alergia === 'sim' ? 'active-sim' : ''}`}
                  onClick={() => set('alergia','sim')}>
                  ⚠️ Sim, tenho restrição
                </button>
              </div>
              {errors.alergia && <div className="field-error" data-err>{errors.alergia}</div>}
            </div>
            {form.alergia === 'sim' && (
              <div className="field">
                <label>Qual alergia ou restrição?</label>
                <textarea value={form.alergiaDesc} onChange={e => set('alergiaDesc', e.target.value)}
                  placeholder="Ex: alergia a amendoim, não como carne, intolerante à lactose..."/>
              </div>
            )}
          </div>
        </div>

        {/* Hospedagem */}
        <div className="card">
          <div className="card-header"><span>⛺</span><h2>Hospedagem</h2></div>
          <div className="card-body">
            <div className="field">
              <label>Vai levar barraca? <span className="req">*</span></label>
              <div className="opts">
                <OptBtn group="barraca" value="sozinho"      label="🏕️ Sim, só pra mim"/>
                <OptBtn group="barraca" value="compartilhar" label="👥 Sim, vou dividir"/>
                <OptBtn group="barraca" value="nao"          label="🚫 Não vou levar"/>
              </div>
              {errors.barraca && <div className="field-error" data-err>{errors.barraca}</div>}
            </div>
            {form.barraca === 'compartilhar' && (
              <div className="row2" style={{ marginTop:'.8rem' }}>
                <div className="field">
                  <label>Com quantas pessoas?</label>
                  <input type="number" value={form.compartilharQtd}
                    onChange={e => set('compartilharQtd', e.target.value)}
                    placeholder="Nº de pessoas" min="1" max="10"/>
                </div>
                <div className="field">
                  <label>Nomes (opcional)</label>
                  <input type="text" value={form.compartilharNomes}
                    onChange={e => set('compartilharNomes', e.target.value)}
                    placeholder="Ex: João, Maria..."/>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pagamento */}
        <div className="card">
          <div className="card-header"><span>💳</span><h2>Pagamento</h2></div>
          <div className="card-body">
            <div className="field">
              <label>Como vai pagar? <span className="req">*</span></label>
              <div className="opts">
                <OptBtn group="pagamento" value="pix"      label="📱 PIX"/>
                <OptBtn group="pagamento" value="dinheiro" label="💵 Dinheiro"/>
                <OptBtn group="pagamento" value="debito"   label="💳 Débito"/>
                <OptBtn group="pagamento" value="credito"  label="💳 Crédito"/>
              </div>
              {errors.pagamento && <div className="field-error" data-err>{errors.pagamento}</div>}
            </div>
            <div className="field" style={{ marginTop:'1rem' }}>
              <label>Observações (opcional)</label>
              <textarea value={form.obs} onChange={e => set('obs', e.target.value)}
                placeholder="Algum recado para a organização..."/>
            </div>
          </div>
        </div>

        {serverErr && (
          <div style={{ background:'#FFEBEE', border:'2px solid #C62828', borderRadius:8, padding:'.8rem 1rem', marginBottom:'1rem', color:'#C62828', fontWeight:700, fontSize:'.88rem' }}>
            ⚠️ {serverErr}
          </div>
        )}

        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '⏳ Salvando inscrição...' : '🍦 CONFIRMAR INSCRIÇÃO!'}
        </button>

        <p style={{ textAlign:'center', color:'var(--mid)', fontSize:'.78rem', fontWeight:600, marginTop:'1rem' }}>
          🔒 Fechamento: <strong style={{ color:'var(--red)' }}>12/09/2026</strong> &nbsp;·&nbsp; Reembolso até: <strong style={{ color:'var(--yellow-dark)' }}>20/08/2026</strong>
        </p>
      </div>

      {inscricaoFeita && (
        <SuccessModal inscricao={inscricaoFeita} onClose={() => setInscricaoFeita(null)}/>
      )}
    </>
  )
}
