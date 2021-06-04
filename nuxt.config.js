export default {
  ssr:true,  
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'recipe',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vue2-editor", ssr: false },
    {src:'~/plugins/axios.js'}
  ],
  /*
   ** Nuxt.js modules
   */
  buildModules: [
    '@nuxtjs/date-fns'
  ],
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
			apiKey: "AIzaSyBgbT9G-GrnMfCfa61zgXsD4Md4oNXhOyM",
			authDomain: "fyp1234567-e68ed.firebaseapp.com",
			projectId: "fyp1234567-e68ed",
			storageBucket: "fyp1234567-e68ed.appspot.com",
			messagingSenderId: "792440741877",
			appId: "1:792440741877:web:a6a51871e795be618d8abc",
			measurementId: "G-Y0VBP7EYFV"
        },
        services: {
          auth: true, // Just as example. Can be any other service..
          database: true,
        }
      }
    ],
    '@nuxtjs/toast',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/date-fns',
    '@nuxtjs/cloudinary'
  ],
  database: {
    emulatorPort: 9000,
    emulatorHost: 'localhost',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
   /*
   ** router configuration
   */
  router:{
    middleware:["authenticated"]
  },
  toast: {
    position: 'bottom-center',
    duration:2000,
    keepOnHover:true,
    fullWidth:true,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  cloudinary: {
    cloudName: 'dmjbbqhyd',
    apiKey: '176285268727879',
    apiSecret:'exr63x7uOWfGRvCqvXCrytYyirs',
    secure: false,
    useComponent: true
  }
};
