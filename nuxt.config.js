import bodyParser from 'body-parser';
require('dotenv').config();

let config = {
  mode: 'universal',
  env: {
    DEEPAI_KEY: process.env.DEEPAI_KEY
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    script: [{src: "https://plausible.io/js/plausible.js", "data-domain": 'justincovell.com', async: true, defer: true}]
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    // ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/http'
  ],
  serverMiddleware: [
    bodyParser.urlencoded({
      extended: true
    }),
    '~/api/_parseImages.js',
    '~/api/_cors.js',
    {
      path: '/generate',
      handler: '~/api/generate.js'
    },
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}

if (process.env.VERCEL_URL) {
  config.http = {
    host: process.env.VERCEL_URL,
    port: 443,
    https: true
  }
}

export default config
