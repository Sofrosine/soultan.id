import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import FeaturedWork from '@/components/sections/FeaturedWork';
import { getYearsOfExperience } from '@/lib/experience';

const yearsOfExperience = getYearsOfExperience();

export const metadata: Metadata = {
    title: 'Soultan Muhammad Albar | Product & Software Engineer',
    description: `Soultan Muhammad Albar — Product & Software Engineer with ${yearsOfExperience}+ years of product development across Indonesia, Hong Kong, and South Korea. Next.js, React, React Native, Python, Golang, and AI-powered products.`,
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
