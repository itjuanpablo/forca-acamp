import * as XLSX from 'xlsx'

const PAGAMENTO_LABEL = { pix: 'PIX', dinheiro: 'Dinheiro', debito: 'Débito', credito: 'Crédito' }
const BARRACA_LABEL = { sozinho: 'Sim (individual)', compartilhar: 'Sim (compartilhada)', nao: 'Não' }

export function exportarExcel(inscricoes) {
  const rows = inscricoes.map((i, idx) => ({
    '#': idx + 1,
    'ID': i.id,
    'Nome Completo': i.nome,
    'Líder': i.lider,
    'Equipe / Sub-equipe': i.equipe,
    'WhatsApp': i.telefone || '—',
    'Idade': i.idade || '—',
    'Restrição Alimentar': i.alergia === 'sim' ? 'Sim' : 'Não',
    'Detalhes da Restrição': i.alergiaDesc || '—',
    'Barraca': BARRACA_LABEL[i.barraca] || i.barraca,
    'Companheiros de Barraca': i.compartilharNomes || '—',
    'Qtd. na Barraca': i.compartilharQtd || '—',
    'Forma de Pagamento': PAGAMENTO_LABEL[i.pagamento] || i.pagamento,
    'Observações': i.obs || '—',
    'Data de Inscrição': i.dataCadastro,
  }))

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)

  // Column widths
  ws['!cols'] = [
    { wch: 4 }, { wch: 18 }, { wch: 32 }, { wch: 20 }, { wch: 22 },
    { wch: 16 }, { wch: 6 }, { wch: 18 }, { wch: 30 }, { wch: 20 },
    { wch: 25 }, { wch: 14 }, { wch: 20 }, { wch: 30 }, { wch: 20 },
  ]

  XLSX.utils.book_append_sheet(wb, ws, 'Inscrições')

  // ── Summary sheet ──
  const pagCount = { pix: 0, dinheiro: 0, debito: 0, credito: 0 }
  const barracaCount = { sozinho: 0, compartilhar: 0, nao: 0 }
  let comRestricao = 0

  inscricoes.forEach(i => {
    if (pagCount[i.pagamento] !== undefined) pagCount[i.pagamento]++
    if (barracaCount[i.barraca] !== undefined) barracaCount[i.barraca]++
    if (i.alergia === 'sim') comRestricao++
  })

  const summary = [
    ['FORÇA ACAMP 2026 — Resumo Financeiro', ''],
    ['Gerado em', new Date().toLocaleString('pt-BR')],
    ['', ''],
    ['TOTAL DE INSCRIÇÕES', inscricoes.length],
    ['', ''],
    ['— PAGAMENTOS —', ''],
    ['PIX', pagCount.pix],
    ['Dinheiro', pagCount.dinheiro],
    ['Débito', pagCount.debito],
    ['Crédito', pagCount.credito],
    ['', ''],
    ['— BARRACA —', ''],
    ['Com barraca (individual)', barracaCount.sozinho],
    ['Com barraca (compartilhada)', barracaCount.compartilhar],
    ['Sem barraca', barracaCount.nao],
    ['', ''],
    ['— ALIMENTAÇÃO —', ''],
    ['Com restrição alimentar', comRestricao],
    ['Sem restrição', inscricoes.length - comRestricao],
  ]

  const ws2 = XLSX.utils.aoa_to_sheet(summary)
  ws2['!cols'] = [{ wch: 32 }, { wch: 14 }]
  XLSX.utils.book_append_sheet(wb, ws2, 'Resumo')

  XLSX.writeFile(wb, 'forca-acamp-2026-inscricoes.xlsx')
}
