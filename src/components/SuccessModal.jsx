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
          <strong style={{ color: 'var(--dark)' }}>
            {inscricao.nome.split(' ')[0]}
          </strong>
          !<br />Te vejo no acampamento 🔥
        </p>

        <div className="id-box">
          <div className="id-label">seu código de inscrição</div>
          <div className="id-num">{inscricao.id}</div>
        </div>

        <p style={{ fontSize: '.82rem', color: '#888' }}>
          Guarda esse código! É seu comprovante na entrada.
        </p>

        <div className="btn-row">
          <button
            className="btn btn-primary"
            onClick={() => gerarComprovantePDF(inscricao)}
            style={{ flex: 2 }}
          >
            📄 Baixar Comprovante PDF
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            ✕ Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
