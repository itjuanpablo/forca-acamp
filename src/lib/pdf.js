import jsPDF from 'jspdf'

// Frases inspiradas no livro "O Deus que destrói sonhos" - Rodrigo Bibo
const FRASES = [
  "Talvez Deus não esteja destruindo seus sonhos — Ele está destruindo seus ídolos.",
  "Quando Deus destrói o que você construiu, é porque quer edificar o que realmente importa.",
  "O sonho que você precisa largar pode ser exatamente o que impede o sonho que Deus tem para você.",
  "A rendição não é derrota. É o começo de uma história muito maior.",
  "Às vezes o 'não' de Deus é o maior presente que você vai receber na vida.",
  "Deus é bom mesmo quando Ele destrói o que você mais ama.",
  "Quando tudo parece desabar, olhe de novo — talvez seja Ele construindo algo novo.",
]

function getFrase() {
  return FRASES[Math.floor(Math.random() * FRASES.length)]
}

export function gerarComprovantePDF(inscricao) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210, H = 297
  const d = inscricao
  const frase = getFrase()

  // ── Fundo calçada cinza ──
  doc.setFillColor(216, 216, 212)
  doc.rect(0, 0, W, H, 'F')

  // grid calçada
  doc.setDrawColor(200, 200, 195)
  doc.setLineWidth(.06)
  for (let i = 0; i < H; i += 12) doc.line(0, i, W, i)
  for (let i = 0; i < W; i += 12) doc.line(i, 0, i, H)

  // trincas decorativas
  doc.setDrawColor(170, 170, 165)
  doc.setLineWidth(.4)
  doc.line(30, 80, 90, 200)
  doc.line(175, 60, 140, 180)

  // ── Header pink bar ──
  doc.setFillColor(255, 26, 140)
  doc.rect(0, 0, W, 22, 'F')
  doc.setFillColor(168, 0, 90)
  doc.rect(0, 20, W, 3, 'F')

  // Título
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(255, 255, 255)
  doc.text('FORÇA ACAMP 2026', W / 2, 14, { align: 'center' })

  // Tema em italic abaixo do header
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(168, 0, 90)
  doc.text('"O Deus que destrói sonhos"  ·  18 a 20 de Setembro de 2026', W / 2, 32, { align: 'center' })

  // ── White card principal ──
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(30, 30, 30)
  doc.setLineWidth(.7)
  doc.roundedRect(13, 37, W - 26, H - 54, 6, 6, 'FD')

  let y = 52

  // ── Código de inscrição (badge) ──
  doc.setFillColor(255, 26, 140)
  doc.setDrawColor(168, 0, 90)
  doc.setLineWidth(.4)
  doc.roundedRect(W / 2 - 52, y - 8, 104, 24, 4, 4, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(255, 220, 240)
  doc.text('CÓDIGO DE INSCRIÇÃO', W / 2, y - .5, { align: 'center' })
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text(d.id, W / 2, y + 11, { align: 'center' })
  y += 26

  // divisor
  doc.setDrawColor(255, 26, 140)
  doc.setLineWidth(.35)
  doc.line(18, y, W - 18, y)
  y += 9

  // ── Seções de dados ──
  const sections = [
    {
      icon: '●', title: 'PARTICIPANTE',
      rows: [
        ['Nome completo', d.nome],
        ['Líder', d.lider],
        ['Equipe / Sub-equipe', d.equipe],
        d.telefone ? ['WhatsApp', d.telefone] : null,
        d.idade ? ['Idade', d.idade + ' anos'] : null,
      ].filter(Boolean),
    },
    {
      icon: '●', title: 'ALIMENTAÇÃO',
      rows: [
        ['Restrição alimentar', d.alergia === 'sim' ? 'Sim — ' + (d.alergiaDesc || 'ver detalhes') : 'Não possui restrição'],
      ],
    },
    {
      icon: '●', title: 'BARRACA & HOSPEDAGEM',
      rows: [
        ['Situação', {
          sozinho: 'Levará barraca individual',
          compartilhar: 'Levará barraca compartilhada' + (d.compartilharQtd ? ' (' + d.compartilharQtd + ' pessoas)' : ''),
          nao: 'Não levará barraca própria',
        }[d.barraca]],
        d.compartilharNomes ? ['Companheiros de barraca', d.compartilharNomes] : null,
      ].filter(Boolean),
    },
    {
      icon: '●', title: 'PAGAMENTO',
      rows: [
        ['Forma de pagamento', { pix: 'PIX', dinheiro: 'Dinheiro em espécie', debito: 'Cartão de Débito', credito: 'Cartão de Crédito' }[d.pagamento]],
        ['Status', d.status === 'confirmado' ? 'Pagamento confirmado ✓' : 'Aguardando confirmação'],
        d.obs ? ['Observações', d.obs] : null,
      ].filter(Boolean),
    },
  ]

  sections.forEach(sec => {
    // section header
    doc.setFillColor(255, 26, 140)
    doc.roundedRect(17, y - 5.5, W - 34, 10, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(255, 255, 255)
    doc.text(sec.title, W / 2, y + 1, { align: 'center' })
    y += 12

    sec.rows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(130, 130, 130)
      doc.text(label + ':', 21, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(30, 30, 30)
      const lines = doc.splitTextToSize(value || '—', W - 94)
      doc.text(lines, 80, y)
      y += lines.length > 1 ? lines.length * 5.5 + 2 : 7.5
    })
    y += 5
  })

  // ── Frase do livro ──
  y = Math.max(y, H - 70)
  doc.setDrawColor(255, 26, 140)
  doc.setLineWidth(.3)
  doc.line(18, y, W - 18, y)
  y += 8

  // quote block
  doc.setFillColor(255, 240, 250)
  doc.roundedRect(17, y - 4, W - 34, 22, 3, 3, 'F')
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(168, 0, 90)
  const fraseLines = doc.splitTextToSize('"' + frase + '"', W - 46)
  doc.text(fraseLines, W / 2, y + 4, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(200, 100, 150)
  doc.text('— Rodrigo Bibo, O Deus que destrói sonhos', W / 2, y + 16, { align: 'center' })
  y += 26

  // ── Footer ──
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(160, 160, 155)
  doc.text('Inscrito em ' + d.dataCadastro + '  ·  Apresente este código no credenciamento do acampamento', W / 2, H - 18, { align: 'center' })

  doc.setFillColor(255, 26, 140)
  doc.rect(0, H - 10, W, 10, 'F')
  doc.setFontSize(7.5)
  doc.setTextColor(255, 255, 255)
  doc.text('FORÇA ACAMP 2026  ·  "O Deus que destrói sonhos"  ·  Fechamento: 12/09/2026', W / 2, H - 3.5, { align: 'center' })

  doc.save('inscricao-forca-acamp-' + d.id + '.pdf')
}
