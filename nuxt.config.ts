// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
    css: ['vuetify/styles'],
    vite: {
        ssr: {
            noExternal: ['vuetify']
        }
    },
    ssr: true,
    modules: [
        '@nuxtjs/critters',
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
                vuetify()
            ))
        }
    ],
    nitro: {
        minify: true
    },
    critters: {
        config: {
            preload: 'swap',
            inlineFonts: true
        },
    },

})
