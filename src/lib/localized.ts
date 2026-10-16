import type { Locale } from '@/i18n/config';
import { blogPosts, experiences, projects, skillGroups } from './data';
import type { BlogPost, Experience, Project, SkillGroup } from './data';
import { blogPostsId, experienceCompanyId, experiencesId, projectsId, skillGroupsId, techId } from './content.id';

const tech = (list: string[]) => list.map((t) => techId[t] ?? t);

/**
 * Every read of `data.ts` for a page goes through here. A missing Indonesian entry throws
 * instead of quietly showing English, so a new project or post cannot ship half-translated:
 * the build prerenders every page in both languages and fails on the first gap.
 */
const missing = (what: string): never => {
    throw new Error(`Missing Indonesian translation for ${what} (src/lib/content.id.ts)`);
};

export const getProjects = (lang: Locale): Project[] => {
    if (lang === 'en') return projects;
    return projects.map((p) => {
        const t = projectsId[p.slug ?? ''] ?? missing(`project "${p.slug ?? p.title}"`);
        if (p.features && !t.features) missing(`features of project "${p.slug}"`);
        if (p.challenges && !t.challenges) missing(`challenges of project "${p.slug}"`);
        return {
            ...p,
            title: t.title ?? p.title,
            description: t.description,
            features: t.features,
            challenges: t.challenges,
            technologies: tech(p.technologies),
        };
    });
};

export const getExperiences = (lang: Locale): Experience[] => {
    if (lang === 'en') return experiences;
    return experiences.map((e) => {
        const key = `${e.company}|${e.duration}`;
        const t = experiencesId[key] ?? missing(`experience "${key}"`);
        return { ...e, ...t, company: experienceCompanyId[e.company] ?? e.company, tech: tech(e.tech) };
    });
};

export const getSkillGroups = (lang: Locale): SkillGroup[] => {
    if (lang === 'en') return skillGroups;
    return skillGroups.map((g) => {
        const t = skillGroupsId[g.group] ?? missing(`skill group "${g.group}"`);
        return { group: t.group, items: g.items.map((it) => t.items?.[it] ?? it) };
    });
};

export const getBlogPosts = (lang: Locale): BlogPost[] => {
    if (lang === 'en') return blogPosts;
    return blogPosts.map((p) => {
        const t = blogPostsId[p.slug] ?? missing(`blog post "${p.slug}"`);
        return { ...p, ...t };
    });
};
