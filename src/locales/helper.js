const supportedLocales = {
  en: "English",
  fr: "Français",
};

export function getSupportedLocales() {
  let annotatedLocales = [];
  for (const code of Object.keys(supportedLocales)) {
    annotatedLocales.push({
      code,
      name: supportedLocales[code],
    });
  }
  return annotatedLocales;
}

export function supportedLocalesInclude(locale) {
  return Object.keys(supportedLocales).includes(locale);
}

export function getBrowserLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false };
  const opt = { ...defaultOptions, ...options };
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
  if (!navigatorLocale) {
    return undefined;
  }
  const trimmedLocale = opt.countryCodeOnly ? navigatorLocale.trim().split(/-|_/)[0] : navigatorLocale.trim();
  return trimmedLocale;
}
