import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import {getYearsOfExperience} from '@/lib/experience';

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
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}