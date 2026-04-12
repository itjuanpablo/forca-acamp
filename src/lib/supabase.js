import { createClient } from '@supabase/supabase-js'

// ── Cole aqui suas credenciais do Supabase ──
// Veja o README para instruções de como obter essas chaves
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null

export const isSupabaseConfigured = () => !!supabase
