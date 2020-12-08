import {BModal} from "bootstrap-vue";

export default {

  //loading: false,

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  //target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  * removed
  * sap-ui-core.js
  * sap-ui-core-lean.js
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet"', href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,300&display=swap'}
    ],
    // script: [{
    //   id: "sap-ui-bootstrap",
    //   type: "text/javascript",
    //   src: "/resources/sap-ui-core.js",
    //   'data-sap-ui-theme': "sap_bluecrystal",
    //   'data-sap-ui-libs': "sap.m",
    //   'data-sap-ui-compatVersion': "edge"
    // }]
  },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/Vuelidate',
    '~/plugins/UurlaBEApi'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [

    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-i18n',
    'bootstrap-vue/nuxt', '@nuxtjs/moment',
    '@neneos/nuxt-animate.css'

  ],
  bootstrapVue: {
    icons: true, // Install the IconsPlugin (in addition to BootStrapVue plugin
    bootstrapCSS: true, // Or `css: false`
    bootstrapVueCSS: true // Or `bvCSS: false`
    // Add the desired icon components to the `components` array
    // components: ['BIcon', 'BIconAlertFill', 'BIconCalendar', 'BAvatar', 'BPopover','BModal','BButton','ModalPlugin'],
    // directives: ['VBModal']

  },
  i18n: {
    lazy: true,
    parsePages: false,
    locales: [
      {
        name: 'Italiano',
        code: 'it',
        iso: 'it-IT',
        file: 'it-IT.js'
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js'
      },
    ],
    langDir: 'lang/',
    defaultLocale: 'it',
  },
  axios: {
    proxy: true
  },
  proxy: {
    "/uurla-api": {
      target:
        "http://localhost:8080",
      pathRewrite: {"^/uurla-api": ""}
    }
  },
  publicRuntimeConfig: {
    baseUrl: 'http://localhost:3000/uurla-api',
    apiAdminAppBaseUrl: '/admin.svc',
    apiProjManAppBaseUrl: '/projman.svc'
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {},
  //srcDir: 'src/'//,
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src/'),
  //     '~': path.resolve(__dirname, 'src/')
  //   }
  // }

}

