const path = require('path');

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
      locale: 'ru', // The locale of project localization
      fallbackLocale: 'ru', // The fallback locale of project localization
      localeDir: 'locales', // The directory where store localization messages of project
      enableInSFC: false, // Enable locale messages in Single file components
    },
  },
};
/* eslint-enable */
