import { Metadata } from 'next';
import ProjectsIndex from './ProjectsIndex';
import { getDictionary } from '@/i18n';
import { alternates, type Locale } from '@/i18n/config';
import { getProjects } from '@/lib/localized';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang).meta;
    return {
        title: t.workTitle,
        description: t.workDescription,
        alternates: alternates('/projects', lang),
    };
}

export default async function ProjectsPage({ params }: Props) {
    const { lang } = await params;
    const t = getDictionary(lang);
    return <ProjectsIndex lang={lang} t={t.work} root={t.nav.index} kinds={t.project.kinds} projects={getProjects(lang)} />;
}
