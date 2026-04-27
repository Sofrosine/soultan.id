import { Metadata } from 'next';
import ProjectsIndex from './ProjectsIndex';

export const metadata: Metadata = {
    title: 'Work | Soultan Muhammad Albar',
    description: 'Selected and less-selected work, 2020 — 2025. Web and mobile projects across Indonesia, Hong Kong, and South Korea.',
};

export default function ProjectsPage() {
    return <ProjectsIndex />;
}
