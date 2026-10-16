import { Metadata } from 'next';
import ContactView from './ContactView';
import { getDictionary } from '@/i18n';
import { alternates, type Locale } from '@/i18n/config';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang).meta;
    return {
        title: t.contactTitle,
        description: t.contactDescription,
        alternates: alternates('/contact', lang),
    };
}

export default async function ContactPage({ params }: Props) {
    const { lang } = await params;
    const dict = getDictionary(lang);
    return <ContactView t={dict.contact} root={dict.nav.index} />;
}
