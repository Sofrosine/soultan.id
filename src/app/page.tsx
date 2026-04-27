import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import FeaturedWork from '@/components/sections/FeaturedWork';
import { getYearsOfExperience } from '@/lib/experience';

const yearsOfExperience = getYearsOfExperience();

export const metadata: Metadata = {
    title: 'Soultan Muhammad Albar | Software Engineer',
    description: `Personal portfolio of Soultan Muhammad Albar, a Software Engineer with ${yearsOfExperience}+ years of experience`,
};

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <FeaturedWork />
        </>
    );
}
