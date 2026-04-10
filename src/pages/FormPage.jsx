import { useState } from 'react'
import HeroIllustration from '../components/HeroIllustration'
import SuccessModal from '../components/SuccessModal'
import { saveInscricao, generateId } from '../lib/storage'

const initForm = {
  nome: '', lider: '', equipe: '', telefone: '', idade: '',
  alergia: null, alergiaDesc: '',
  barraca: null, compartilharQtd: '', compartilharNomes: '',
  pagamento: null, obs: '',
}

export default function FormPage() {
  const [form, setForm] = useState(initForm)
  const [errors, setErrors] = useState({})
  const [inscricaoFeita, setInscricaoFeita] = useState(null)

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: null }))
  }

  function validate() {
    const e = {}
    if (!form.nome.trim())   e.nome   = 'Informe seu nome completo'
    if (!form.lider.trim())  e.lider  = 'Informe o nome do seu líder'
    if (!form.equipe.trim()) e.equipe = 'Informe sua equipe'
    if (!form.alergia)       e.alergia  = 'Responda sobre alimentação'
    if (!form.barraca)       e.barraca  = 'Indique sua situação com barraca'
    if (!form.pagamento)     e.pagamento = 'Selecione a forma de pagamento'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (!validate()) {
      document.querySelector('.field-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const inscricao = {
      ...form,
      id: generateId(),
      dataCadastro: new Date().toLocaleString('pt-BR'),
    }
    saveInscricao(inscricao)
    setInscricaoFeita(inscricao)
    setForm(initForm)
  }

  const OptButton = ({ group, value, label }) => (
    <button
      type="button"
      className={`opt-btn ${form[group] === value ? 'active' : ''}`}
      onClick={() => set(group, value)}
    >
      {label}
    </button>
  )

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        <HeroIllustration />
        <div className="drip-title" style={{ marginTop: '.6rem' }}>FORÇA ACAMP</div>
        <br />
        <div className="sub-badge">🍦 "O Deus que destrói sonhos"</div>
        <br /><br />
        <div className="dates-pill">📅 18, 19 e 20 de Setembro de 2026</div>
      </div>

      {/* ── FORM ── */}
      <div className="container">

        {/* Identificação */}
        <div className="card">
          <div className="card-header"><span>👤</span><h2>Quem é você?</h2></div>
          <div className="card-body">
            <div className="field">
              <label>Nome Completo <span className="req">*</span></label>
              <input
                type="text"
                value={form.nome}
                onChange={e => set('nome', e.target.value)}
                placeholder="Como está no seu documento"
                style={errors.nome ? { borderColor: '#C62828' } : {}}
              />
              {errors.nome && <div className="field-error" style={{ color: '#C62828', fontSize: '.8rem', fontWeight: 900, marginTop: '.25rem' }}>{errors.nome}</div>}
            </div>

            <div className="row2">
              <div className="field">
                <label>Meu Líder <span className="req">*</span></label>
                <input
                  type="text"
                  value={form.lider}
                  onChange={e => set('lider', e.target.value)}
                  placeholder="Nome do seu líder"
                  style={errors.lider ? { borderColor: '#C62828' } : {}}
                />
                {errors.lider && <div style={{ color: '#C62828', fontSize: '.8rem', fontWeight: 900, marginTop: '.25rem' }}>{errors.lider}</div>}
              </div>
              <div className="field">
                <label>Equipe / Sub-equipe <span className="req">*</span></label>
                <input
                  type="text"
                  value={form.equipe}
                  onChange={e => set('equipe', e.target.value)}
                  placeholder="Ex: Louvor, Mídia, Kids..."
                  style={errors.equipe ? { borderColor: '#C62828' } : {}}
                />
                {errors.equipe && <div style={{ color: '#C62828', fontSize: '.8rem', fontWeight: 900, marginTop: '.25rem' }}>{errors.equipe}</div>}
              </div>
            </div>

            <div className="row2">
              <div className="field">
                <label>WhatsApp</label>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={e => set('telefone', e.target.value)}
                  placeholder="(XX) 9XXXX-XXXX"
                />
              </div>
              <div className="field">
                <label>Idade</label>
                <input
                  type="number"
                  value={form.idade}
                  onChange={e => set('idade', e.target.value)}
                  placeholder="Sua idade"
                  min="1" max="120"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alimentação */}
        <div className="card">
          <div className="card-header"><span>🍔</span><h2>Alimentação</h2></div>
          <div className="card-body">
            <div className="field">
              <label>Tem alergia ou não come algum alimento? <span className="req">*</span></label>
              <div className="toggle-row">
                <button
                  type="button"
                  className={`tog ${form.alergia === 'nao' ? 'active-nao' : ''}`}
                  onClick={() => set('alergia', 'nao')}
                >
                  ✅ Não, como de tudo!
                </button>
                <button
                  type="button"
                  className={`tog ${form.alergia === 'sim' ? 'active-sim' : ''}`}
                  onClick={() => set('alergia', 'sim')}
                >
                  ⚠️ Sim, tenho restrição
                </button>
              </div>
              {errors.alergia && <div style={{ color: '#C62828', fontSize: '.8rem', fontWeight: 900 }}>{errors.alergia}</div>}
            </div>

            {form.alergia === 'sim' && (
              <div className="field">
                <label>Qual alergia ou restrição?</label>
                <textarea
                  value={form.alergiaDesc}
                  onChange={e => set('alergiaDesc', e.target.value)}
                  placeholder="Ex: alergia a amendoim, não como carne, intolerante à lactose..."
                />
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
                <OptButton group="barraca" value="sozinho"     label="🏕️ Sim, só pra mim" />
                <OptButton group="barraca" value="compartilhar" label="👥 Sim, vou dividir" />
                <OptButton group="barraca" value="nao"         label="🚫 Não vou levar" />
              </div>
              {errors.barraca && <div style={{ color: '#C62828', fontSize: '.8rem', fontWeight: 900, marginTop: '.4rem' }}>{errors.barraca}</div>}
            </div>

            {form.barraca === 'compartilhar' && (
              <div className="row2" style={{ marginTop: '.8rem' }}>
                <div className="field">
                  <label>Com quantas pessoas?</label>
                  <input
                    type="number"
                    value={form.compartilharQtd}
                    onChange={e => set('compartilharQtd', e.target.value)}
                    placeholder="Nº de pessoas"
                    min="1" max="10"
                  />
                </div>
                <div className="field">
                  <label>Nomes (opcional)</label>
                  <input
                    type="text"
                    value={form.compartilharNomes}
                    onChange={e => set('compartilharNomes', e.target.value)}
                    placeholder="Ex: João, Maria..."
                  />
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
                <OptButton group="pagamento" value="pix"      label="📱 PIX" />
                <OptButton group="pagamento" value="dinheiro" label="💵 Dinheiro" />
                <OptButton group="pagamento" value="debito"   label="💳 Débito" />
                <OptButton group="pagamento" value="credito"  label="💳 Crédito" />
              </div>
              {errors.pagamento && <div style={{ color: '#C62828', fontSize: '.8rem', fontWeight: 900, marginTop: '.4rem' }}>{errors.pagamento}</div>}
            </div>

            <div className="field" style={{ marginTop: '1rem' }}>
              <label>Observações (opcional)</label>
              <textarea
                value={form.obs}
                onChange={e => set('obs', e.target.value)}
                placeholder="Algum recado para a organização..."
              />
            </div>
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          🍦 CONFIRMAR INSCRIÇÃO!
        </button>
      </div>

      {inscricaoFeita && (
        <SuccessModal
          inscricao={inscricaoFeita}
          onClose={() => setInscricaoFeita(null)}
        />
      )}
    </>
  )
}
