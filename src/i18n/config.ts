export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const baseUrl = 'https://soultan.id';

export const isLocale = (value: string): value is Locale =>
    (locales as readonly string[]).includes(value);

/**
 * English keeps the unprefixed URLs the site has always had; every other locale lives under
 * its own prefix. `path` is the English path, e.g. `/projects/seenara`.
 */
export const localePath = (lang: Locale, path: string): string => {
    if (lang === defaultLocale) return path;
    return path === '/' ? `/${lang}` : `/${lang}${path}`;
};

/** The same page in every locale, for `<link rel="alternate" hreflang>` and the sitemap. */
export const alternates = (path: string, lang: Locale) => ({
    canonical: localePath(lang, path),
    languages: {
        en: localePath('en', path),
        id: localePath('id', path),
        'x-default': localePath(defaultLocale, path),
    },
});

/** Strip the locale prefix from a browser pathname, giving back the English path. */
export const stripLocale = (pathname: string): { lang: Locale; path: string } => {
    const seg = pathname.split('/')[1];
    if (seg && seg !== defaultLocale && isLocale(seg)) {
        const rest = pathname.slice(seg.length + 1);
        return { lang: seg, path: rest || '/' };
    }
    return { lang: defaultLocale, path: pathname || '/' };
};
