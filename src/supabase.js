import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const cloudConfigured = Boolean(url && key)
export const supabase = cloudConfigured
  ? createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null

export async function loadCurrentUser() {
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (error && error.code !== 'PGRST116') throw error
  return data ? { id: data.id, name: data.display_name, username: data.username } : null
}

export async function createCloudProfile(name) {
  if (!supabase) throw new Error('Cloud-databasen er ikke konfigureret endnu.')
  let { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    user = data.user
  }
  const base = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'koncertven'
  let username = base
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data, error } = await supabase.from('profiles').upsert({ id: user.id, display_name: name, username }, { onConflict: 'id' }).select().single()
    if (!error) return { id: data.id, name: data.display_name, username: data.username }
    if (error.code !== '23505') throw error
    username = `${base}-${Math.floor(1000 + Math.random() * 9000)}`
  }
  throw new Error('Kunne ikke finde et ledigt brugernavn.')
}

export async function loadRsvps(userId) {
  if (!supabase || !userId) return {}
  const { data, error } = await supabase.from('rsvps').select('concert_id,type').eq('user_id', userId)
  if (error) throw error
  return Object.fromEntries(data.map(row => [row.concert_id, row.type]))
}

export async function saveRsvp(userId, concertId, type) {
  if (!supabase) throw new Error('Cloud-databasen er ikke konfigureret.')
  if (!type) {
    const { error } = await supabase.from('rsvps').delete().eq('user_id', userId).eq('concert_id', concertId)
    if (error) throw error
    return
  }
  const { error } = await supabase.from('rsvps').upsert({ user_id: userId, concert_id: concertId, type }, { onConflict: 'user_id,concert_id' })
  if (error) throw error
}

export async function loadPublicProfile(username) {
  if (!supabase || !username) return null
  const { data: profile, error } = await supabase.from('profiles').select('id,display_name,username').eq('username', username).single()
  if (error) return null
  return {
    user: { id: profile.id, name: profile.display_name, username: profile.username },
    rsvps: await loadRsvps(profile.id),
  }
}
