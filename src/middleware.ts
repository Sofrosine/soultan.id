import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale } from '@/i18n/config';

/**
 * English stays on the unprefixed URLs the site has always used, so existing links and search
 * results keep working. Those requests are rewritten internally to `/en/...`; other locales are
 * served from their own prefix, and an explicit `/en/...` is redirected to its canonical URL.
 */
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const seg = pathname.split('/')[1];

    if (seg === defaultLocale) {
        const url = req.nextUrl.clone();
        url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
        return NextResponse.redirect(url, 308);
    }
    if (isLocale(seg)) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
}

export const config = {
    // Skip Next internals, the generated icons/sitemap/robots, and anything with a file extension.
    matcher: ['/((?!_next|api|icon|apple-icon|sitemap.xml|robots.txt|.*\\..*).*)'],
};
