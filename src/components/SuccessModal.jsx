import { gerarComprovantePDF } from '../lib/pdf'

export default function SuccessModal({ inscricao, onClose }) {
  if (!inscricao) return null
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-emoji">🎉</div>
        <h2>Arrasou!</h2>
        <p>
          Inscrição confirmada,{' '}
          <strong style={{ color:'var(--dark)', fontWeight:800 }}>
            {inscricao.nome?.split(' ')[0]}
          </strong>!<br/>
          Te vejo no acampamento 🔥
        </p>
        <div className="id-box">
          <div className="id-label">seu código de inscrição</div>
          <div className="id-num">{inscricao.id}</div>
        </div>
        <p style={{ fontSize:'.8rem' }}>
          📌 Guarda esse código — é seu comprovante na entrada.
        </p>
        <p style={{ fontSize:'.75rem', marginTop:'.3rem', color:'var(--red)', fontWeight:700 }}>
          🔒 Fechamento das inscrições: 12/09/2026
        </p>
        <div className="btn-row">
          <button className="btn btn-primary" style={{ flex:2 }}
            onClick={() => gerarComprovantePDF(inscricao)}>
            📄 Baixar Comprovante PDF
          </button>
          <button className="btn btn-secondary" onClick={onClose}>✕</button>
        </div>
      </div>
    </div>
  )
}
