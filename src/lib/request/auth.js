import { supabase } from "../supabase"

/**
 * Verificar si el usuario está autenticado
 */
export const isAuthenticated = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        return { data: !!user, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

/**
 * Iniciar sesión
 */
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Error signing in:', error)
        return { user: null, error }
    }

    return { user: data.user, error: null }
}

/**
 * Cerrar sesión
 */
export const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Error signing out:', error)
        return { user: false, error }
    }

    return { user: true, error: null }
}