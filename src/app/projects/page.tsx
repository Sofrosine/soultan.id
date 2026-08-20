import { Metadata } from 'next';
import StormShell from '@/components/storm/StormShell';
import ProjectsStorm from '@/components/storm/pages/ProjectsStorm';

export const metadata: Metadata = {
    title: 'Work | Soultan Muhammad Albar',
    description: 'Selected and less-selected work, 2020 — 2025. Web and mobile projects across Indonesia, Hong Kong, and South Korea.',
};

export default function ProjectsPage() {
    return (
        <StormShell>
            <ProjectsStorm />
        </StormShell>
    );
}
