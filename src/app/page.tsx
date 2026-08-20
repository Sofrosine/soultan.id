import { Metadata } from 'next';
import StormExperience from '@/components/storm/StormExperience';
import { getYearsOfExperience } from '@/lib/experience';

const yearsOfExperience = getYearsOfExperience();

export const metadata: Metadata = {
    title: 'Soultan Muhammad Albar | Software Engineer',
    description: `Personal portfolio of Soultan Muhammad Albar, a Software Engineer with ${yearsOfExperience}+ years of experience`,
};

export default function Home() {
    return <StormExperience />;
}
