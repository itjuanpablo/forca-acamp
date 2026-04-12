import { supabase, isSupabaseConfigured } from './supabase'

const LOCAL_KEY = 'forca_acamp_inscricoes'

export function generateId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = 'FA26-'
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) id += chars[Math.floor(Math.random() * chars.length)]
    if (i < 2) id += '-'
  }
  return id
}

function localGet() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]') } catch { return [] }
}
function localSet(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}

export async function getInscricoes() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('inscricoes')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data || []).map(normalizeInscricao)
  }
  return localGet()
}

export async function saveInscricao(inscricao) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('inscricoes')
      .insert([{
        codigo:             inscricao.id,
        nome:               inscricao.nome,
        lider:              inscricao.lider,
        equipe:             inscricao.equipe,
        telefone:           inscricao.telefone || null,
        idade:              inscricao.idade ? parseInt(inscricao.idade) : null,
        alergia:            inscricao.alergia,
        alergia_desc:       inscricao.alergiaDesc || null,
        barraca:            inscricao.barraca,
        barraca_comp_qtd:   inscricao.compartilharQtd ? parseInt(inscricao.compartilharQtd) : null,
        barraca_comp_nomes: inscricao.compartilharNomes || null,
        pagamento:          inscricao.pagamento,
        obs:                inscricao.obs || null,
        status:             'pendente',
      }])
      .select()
      .single()
    if (error) throw error
    return normalizeInscricao(data)
  }
  const lista = localGet()
  lista.unshift({ ...inscricao, status: 'pendente' })
  localSet(lista)
  return inscricao
}

export async function deleteInscricao(id) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('inscricoes').delete().eq('codigo', id)
    if (error) throw error
    return
  }
  localSet(localGet().filter(i => i.id !== id))
}

export async function updateStatus(id, status) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('inscricoes').update({ status }).eq('codigo', id)
    if (error) throw error
    return
  }
  localSet(localGet().map(i => i.id === id ? { ...i, status } : i))
}

export function normalizeInscricao(row) {
  if (!row) return null
  if (row.id && !row.codigo) return row
  return {
    id:                row.codigo,
    nome:              row.nome,
    lider:             row.lider,
    equipe:            row.equipe,
    telefone:          row.telefone || '',
    idade:             row.idade ? String(row.idade) : '',
    alergia:           row.alergia,
    alergiaDesc:       row.alergia_desc || '',
    barraca:           row.barraca,
    compartilharQtd:   row.barraca_comp_qtd ? String(row.barraca_comp_qtd) : '',
    compartilharNomes: row.barraca_comp_nomes || '',
    pagamento:         row.pagamento,
    obs:               row.obs || '',
    status:            row.status || 'pendente',
    dataCadastro:      row.created_at
      ? new Date(row.created_at).toLocaleString('pt-BR')
      : row.dataCadastro || '',
  }
}
