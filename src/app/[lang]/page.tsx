import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import FeaturedWork from '@/components/sections/FeaturedWork';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { getExperiences, getProjects, getSkillGroups } from '@/lib/localized';
import { getYearsOfExperience } from '@/lib/experience';

type Props = { params: Promise<{ lang: Locale }> };

export default async function Home({ params }: Props) {
    const { lang } = await params;
    const t = getDictionary(lang);
    const projects = getProjects(lang);
    // Functions cannot cross into a client component, so the hero's lede is filled in here.
    const { lede, ...hero } = t.hero;
    return (
        <>
            <Hero
                t={hero}
                lede={lede(getYearsOfExperience())}
                lang={lang}
                projectCount={projects.length}
            />
            <About t={t.about} />
            <Skills t={t.skills} groups={getSkillGroups(lang)} />
            <Experience t={t.experience} experiences={getExperiences(lang)} />
            <FeaturedWork lang={lang} t={t.featured} kinds={t.project.kinds} projects={projects} />
        </>
    );
}
