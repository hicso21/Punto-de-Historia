import { supabase } from "../supabase"

/**
 * Obtener la configuración del sitio (siempre hay un solo registro)
 */
export const getSiteConfig = async () => {
    const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .single()

    if (error) {
        console.error('Error fetching site config:', error)
        return { data: null, error }
    }

    return { data, error }
}

/**
 * Actualizar la configuración del sitio
 */
export const updateSiteConfig = async (updates) => {
    // Primero obtenemos el ID del registro actual
    const current = await getSiteConfig()

    if (!current) {
        console.error('No site config found to update')
        return { data: null, error: null }
    }

    const { data, error } = await supabase
        .from('site_config')
        .update(updates)
        .eq('id', current.id)
        .select()
        .single()

    if (error) {
        console.error('Error updating site config:', error)
        return { data: null, error }
    }

    return { data, error }
}

/**
 * Subir imagen de biografía a Supabase Storage
 */
export const uploadBiographyImage = async (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `biography-${Date.now()}.${fileExt}`
    const filePath = `biography/${fileName}`

    const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

    if (uploadError) {
        console.error('Error uploading image:', uploadError)
        return { data: null, error: uploadError }
    }

    const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

    return { data: data.publicUrl, error: uploadError }
}
