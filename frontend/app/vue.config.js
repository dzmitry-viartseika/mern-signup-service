const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  runtimeCompiler: true,
  css: {
    requireModuleExtension: true,
  },
  transpileDependencies: ['vue-meta'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        styles: path.resolve('src/assets/scss'),
      },
      extensions: ['.js', '.vue', '.json'],
    },
  },
  pluginOptions: {
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE,
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false, // Enable locale messages in Single file components
    },
  },
};
/* eslint-enable */
