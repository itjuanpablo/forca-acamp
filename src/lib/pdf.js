import jsPDF from 'jspdf'

export function gerarComprovantePDF(inscricao) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210, H = 297
  const d = inscricao

  // ── Background calçada ──
  doc.setFillColor(232, 232, 228)
  doc.rect(0, 0, W, H, 'F')
  for (let i = 0; i < H; i += 10) {
    doc.setDrawColor(210, 210, 206); doc.setLineWidth(.08); doc.line(0, i, W, i)
  }
  for (let i = 0; i < W; i += 10) {
    doc.setDrawColor(210, 210, 206); doc.setLineWidth(.08); doc.line(i, 0, i, H)
  }

  // ── Top bar pink ──
  doc.setFillColor(255, 45, 155); doc.rect(0, 0, W, 20, 'F')
  doc.setFillColor(196, 0, 110); doc.rect(0, 18, W, 3, 'F')

  // ── Logo / title ──
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(32); doc.setTextColor(255, 255, 255)
  doc.text('FORÇA ACAMP', W / 2, 13, { align: 'center' })

  // ── White card ──
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(42, 42, 42); doc.setLineWidth(.8)
  doc.roundedRect(14, 28, W - 28, H - 42, 6, 6, 'FD')

  let y = 42

  // ── ID badge ──
  doc.setFillColor(255, 45, 155); doc.setDrawColor(196, 0, 110); doc.setLineWidth(.4)
  doc.roundedRect(W / 2 - 50, y - 7, 100, 22, 4, 4, 'FD')
  doc.setFontSize(7.5); doc.setTextColor(255, 255, 255)
  doc.text('CÓDIGO DE INSCRIÇÃO', W / 2, y - .5, { align: 'center' })
  doc.setFontSize(17)
  doc.text(d.id, W / 2, y + 10, { align: 'center' })
  y += 22

  // ── Theme ──
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(196, 0, 110)
  doc.text('"O Deus que destrói sonhos"  ·  18 a 20 de Setembro de 2026', W / 2, y, { align: 'center' })
  y += 6
  doc.setDrawColor(255, 45, 155); doc.setLineWidth(.4); doc.line(20, y, W - 20, y)
  y += 8

  const sections = [
    {
      title: '  PARTICIPANTE',
      rows: [
        ['Nome', d.nome],
        ['Líder', d.lider],
        ['Equipe / Sub-equipe', d.equipe],
        d.telefone ? ['WhatsApp', d.telefone] : null,
        d.idade ? ['Idade', d.idade + ' anos'] : null,
      ].filter(Boolean),
    },
    {
      title: '  ALIMENTAÇÃO',
      rows: [
        ['Restrição alimentar', d.alergia === 'sim' ? 'Sim — ' + (d.alergiaDesc || 'ver detalhes') : 'Não possui'],
      ],
    },
    {
      title: '  HOSPEDAGEM',
      rows: [
        ['Barraca', { sozinho: 'Levará barraca (individual)', compartilhar: 'Levará barraca (compartilhada' + (d.compartilharQtd ? ' — ' + d.compartilharQtd + ' pessoas' : '') + ')', nao: 'Não levará barraca' }[d.barraca]],
        d.compartilharNomes ? ['Companheiros', d.compartilharNomes] : null,
      ].filter(Boolean),
    },
    {
      title: '  PAGAMENTO',
      rows: [
        ['Forma de pagamento', { pix: 'PIX', dinheiro: 'Dinheiro', debito: 'Cartão de Débito', credito: 'Cartão de Crédito' }[d.pagamento]],
        d.obs ? ['Observações', d.obs] : null,
      ].filter(Boolean),
    },
  ]

  sections.forEach(sec => {
    doc.setFillColor(255, 45, 155)
    doc.roundedRect(18, y - 5, W - 36, 9, 2, 2, 'F')
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(255, 255, 255)
    doc.text(sec.title, 22, y)
    y += 11

    sec.rows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5); doc.setTextColor(120, 120, 120)
      doc.text(label + ':', 22, y)
      doc.setFont('helvetica', 'normal'); doc.setTextColor(42, 42, 42)
      const lines = doc.splitTextToSize(value || '—', W - 90)
      doc.text(lines, 78, y)
      y += lines.length > 1 ? lines.length * 5.5 + 2 : 8
    })
    y += 5
  })

  // ── Footer ──
  doc.setDrawColor(255, 45, 155); doc.setLineWidth(.4); doc.line(20, H - 22, W - 20, H - 22)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(150, 150, 150)
  doc.text('Inscrito em ' + d.dataCadastro + '  ·  Apresente este código no credenciamento', W / 2, H - 16, { align: 'center' })
  doc.setFillColor(255, 45, 155); doc.rect(0, H - 9, W, 9, 'F')
  doc.setFontSize(7.5); doc.setTextColor(255, 255, 255)
  doc.text('FORÇA ACAMP 2026  ·  "O Deus que destrói sonhos"', W / 2, H - 3.5, { align: 'center' })

  doc.save('inscricao-forca-acamp-' + d.id + '.pdf')
}
