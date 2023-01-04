module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/breath/" : "/",
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
      includeLocales: false,
      enableBridge: true,
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
};
