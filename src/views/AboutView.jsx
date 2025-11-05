import { useEffect, useState } from "react"
import AboutSection from "../components/AboutSection"
import { getSiteConfig } from "../lib/request/siteConfig"

const AboutView = function () {
    const [config, setConfig] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const { data, error } = await getSiteConfig()

            console.log(data);
            localStorage.setItem('config_site', JSON.stringify(data))

            if (!error && data) setConfig(data)

            setLoading(false)
        }

        fetch()
    }, [])

    if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>


    return (
        <AboutSection
            biography_footer={config.biography_footer || ''}
            biography_paragraph={config.biography_paragraph || ''}
            biography_src={config.biography_src || ''}
        />
    )
}

export default AboutView