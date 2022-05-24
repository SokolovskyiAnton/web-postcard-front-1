const ESLintPlugin = require('eslint-webpack-plugin')
const { configure } = require('quasar/wrappers');

module.exports = configure(function (ctx) {
  return {
    supportTS: false,
    boot: [
      'axios'
    ],
    css: ['app.styl'],
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      env: {
        ...require('dotenv').config().parsed
      },
      distDir: ctx.mode.spa ? 'dist' : null,

      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
      }

    },
    devServer: {
      server: {
        type: 'http'
      },
      port: 8080,
      open: true // opens browser window automatically
    },
    framework: {
      config: {},
      plugins: ['Notify', 'Dialog', 'LocalStorage']
    },
    animations: [],
    ssr: {
      pwa: false,
      prodPort: 3000,

      maxAge: 1000 * 60 * 60 * 24 * 30,
      chainWebpackWebserver (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },


      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },
    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {},

      chainWebpackCustomSW (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },


      manifest: {
        name: `Postcard`,
        short_name: `Postcard`,
        description: `Postcard for R.`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: []
      }
    },
    cordova: {
    },
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      bundler: 'packager',
      packager: {
      },
      builder: {
        appId: 'web-postcard-front'
      },
      chainWebpackMain (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      chainWebpackPreload (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },

    }
  }
});
