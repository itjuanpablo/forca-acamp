const STORAGE_KEY = 'forca_acamp_inscricoes'

export function getInscricoes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveInscricao(inscricao) {
  const lista = getInscricoes()
  lista.push(inscricao)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
}

export function deleteInscricao(id) {
  const lista = getInscricoes().filter(i => i.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
}

export function generateId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = 'FA26-'
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) id += chars[Math.floor(Math.random() * chars.length)]
    if (i < 2) id += '-'
  }
  return id
}
