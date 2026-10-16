/**
 * A heading with one word set in the serif italic: [before, emphasised, after].
 * Kept as data so each language can put the emphasis on its own word.
 */
export type Rich = readonly [string, string, string];

const en = {
    meta: {
        siteName: 'Soultan Muhammad Albar',
        homeTitle: 'Soultan Muhammad Albar | Product & Software Engineer',
        homeDescription: (years: number) =>
            `Soultan Muhammad Albar — Product & Software Engineer with ${years}+ years of product development across Indonesia, Hong Kong, and South Korea. Next.js, React, React Native, Python, Golang, and AI-powered products.`,
        ogLocale: 'en_US',
        workTitle: 'Work | Soultan Muhammad Albar',
        workDescription: 'Selected and less-selected work, 2020 — now. Web and mobile projects across Indonesia, Hong Kong, and South Korea.',
        writingTitle: 'Writing | Soultan Muhammad Albar',
        writingDescription: 'Notes on building things — TypeScript, React Native, and the boring infrastructure that keeps shipped products alive.',
        contactTitle: 'Contact | Soultan Muhammad Albar',
        contactDescription: 'Open to engineering work, contract or full-time. Email, WhatsApp, or send a message.',
        projectTitle: (title: string) => `${title} | Work | Soultan Muhammad Albar`,
        projectNotFound: 'Project Not Found',
        postTitle: (title: string) => `${title} | Writing | Soultan Muhammad Albar`,
        postNotFound: 'Post Not Found',
    },
    nav: {
        index: 'Index',
        work: 'Work',
        writing: 'Writing',
        contact: 'Contact',
        role: 'Product & Software Engineer · est. 2020',
        menu: 'Menu',
        switchTo: 'Bahasa Indonesia',
    },
    hero: {
        meta: '—  Personal Index  /  v2.0',
        location: 'Yogyakarta · ID  ·  GMT+7  ·  Available now',
        tagline: 'Open to new opportunities',
        lede: (years: number) =>
            `${years} years in product development — from pre-Series B startups to enterprise clients in Indonesia, Hong Kong & South Korea. I ship web, mobile, and AI-powered products with Next.js, React Native, Python, and Golang.`,
        browse: 'Browse work →',
        talk: 'Start a conversation',
        statYears: 'Years shipping software',
        statProjects: 'Projects shipped',
        statCountries: 'Countries collaborated with',
    },
    about: {
        kicker: 'About',
        title: ['I turn product ideas into ', 'working', ' software.'] as Rich,
        p1Before: 'With ',
        p1Years: (years: number) => `${years} years`,
        p1After: " in product development, I've contributed to dynamic, fast-paced environments — including pre-Series B startups — and have successfully collaborated with clients from Indonesia, Hong Kong, and South Korea.",
        p2: "As a software engineer, I've delivered numerous projects with Next.js, React.js, React Native, Python, and Golang — including AI-powered products such as real-time AI chat streaming, AI-assisted document drafting and review, and a vision-model pipeline that validates location data against satellite imagery.",
        p3: "What I'm best at: turning fuzzy product asks into well-scoped engineering work, and helping the team around me ship without burning out.",
        highlights: [
            ['Startup pace', 'Pre-Series B founding-team velocity, owning roadmap chunks end-to-end.'],
            ['International work', 'Embedded with teams in Hong Kong, Seoul, and Indonesia across timezones.'],
            ['Stack reach', 'Next.js · React · React Native · Python · Golang · Java · AWS — picked for fit, not fashion.'],
            ['AI products', 'Real-time AI chat streaming, AI document drafting & review, vision-model pipelines.'],
        ] as [string, string][],
    },
    skills: {
        kicker: 'Stack',
        title: ['The tools I keep ', 'sharp', '.'] as Rich,
        lede: 'Grouped by what they actually do — not by trend cycle.',
    },
    experience: {
        kicker: 'Trajectory',
        title: ['A career, in ', 'chronological', ' order.'] as Rich,
        lede: (positions: number, years: number) =>
            `From mobile engineer in Yogyakarta to senior contracts spanning Hong Kong and Seoul — ${positions} positions, ${years} years.`,
    },
    featured: {
        kicker: 'Selected Work',
        title: ['Recent ', 'things', ' I shipped.'] as Rich,
        ledeBefore: (total: number) => `Four highlights from ${total} total — full archive in `,
        ledeLink: 'Work',
        seeAll: (total: number) => `See all ${total} projects →`,
    },
    work: {
        crumb: 'Work',
        title: ['', 'Selected', ' & less-selected work, '] as Rich,
        titleDim: '2020 — now.',
        lede: (count: number) =>
            `${count} projects across web and mobile, for clients in Indonesia, Hong Kong, and South Korea.`,
    },
    project: {
        technologies: (n: number) => `${n} technologies`,
        live: 'live ↗',
        source: 'source ↗',
        stack: 'Stack',
        year: 'Year',
        kind: 'Kind',
        visit: 'Visit live site →',
        viewSource: 'View source on GitHub ↗',
        overview: 'Overview',
        features: 'Key features',
        challenges: 'Challenges & solutions',
        previous: '← previous',
        next: 'next →',
        kinds: {
            'AI / LLM': 'AI / LLM',
            Conference: 'Conference',
            Mobile: 'Mobile',
            Personal: 'Personal',
            SaaS: 'SaaS',
            Web: 'Web',
        } as Record<string, string>,
    },
    writing: {
        crumb: 'Writing',
        title: ['Notes on ', 'building', ' things.'] as Rich,
        lede: "Occasional essays on TypeScript, React Native, and the boring infrastructure that keeps shipped products alive. New posts arrive when there's something actually worth saying.",
        minRead: (n: number) => `${n} min read`,
        read: 'Read →',
        soon: '— soon',
        moreTitle: 'More notes in progress.',
        moreBody: 'React Native CodePush in production · designing CI/CD templates · what I learned from migrating Mobx to Recoil. Drafts in the editor.',
        by: 'by Soultan Muhammad Albar',
        end: '— end —',
        all: '← All writing',
    },
    contact: {
        crumb: 'Contact',
        title: ["Let's ", 'talk', '.'] as Rich,
        lede: 'Open to engineering work, contract or full-time. I read everything that lands in my inbox and reply within two business days.',
        channels: 'Direct channels',
        availability: 'Availability',
        statusOn1: 'Product & software engineering',
        statusWarn: 'Full-time relocation (case-by-case)',
        name: 'name',
        email: 'email',
        message: 'message',
        namePh: 'Jane Doe',
        emailPh: 'jane@company.com',
        messagePh: "Tell me about the project, timeline, and team you're working with…",
        send: 'Send via WhatsApp →',
        sent: '✓ WhatsApp opened with your message.',
        fineBefore: 'Submitting opens a WhatsApp tab with the message pre-filled. Prefer email? ',
        /** Filled in the browser; {name}, {email} and {msg} are replaced. */
        waTemplate: "Hi Soultan!\nI'm {name} ({email}),\n{msg}",
    },
    footer: {
        tagBefore: 'Building durable web & mobile products. Currently working at ',
        elsewhere: 'Elsewhere',
        direct: 'Direct',
        location: 'Yogyakarta · Remote',
        rights: (year: number) => `© ${year} Soultan Muhammad Albar — All rights reserved.`,
        version: 'v2.0 · Editorial revamp',
    },
};

export type Dictionary = typeof en;
export default en;
