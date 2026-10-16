import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import { getYearsOfExperience } from '@/lib/experience';

const HIGHLIGHTS: [string, string][] = [
    ['Startup pace', 'Pre-Series B founding-team velocity, owning roadmap chunks end-to-end.'],
    ['International work', 'Embedded with teams in Hong Kong, Seoul, and Indonesia across timezones.'],
    ['Stack reach', 'Next.js · React · React Native · Python · Golang · Java · AWS — picked for fit, not fashion.'],
    ['AI products', 'Real-time AI chat streaming, AI document drafting & review, vision-model pipelines.'],
];

const About = () => {
    const years = getYearsOfExperience();
    return (
        <section id="about" className="about">
            <SectionLabel
                num="01"
                kicker="About"
                title={<>I turn product ideas into <em className="serif-it">working</em> software.</>}
            />

            <div className="about-grid">
                <Reveal className="about-prose">
                    <p>
                        With <strong>{years} years</strong> in product development, I&apos;ve contributed to
                        dynamic, fast-paced environments — including pre-Series B startups — and have
                        successfully collaborated with clients from Indonesia, Hong Kong, and South Korea.
                    </p>
                    <p>
                        As a software engineer, I&apos;ve delivered numerous projects with Next.js, React.js,
                        React Native, Python, and Golang — including AI-powered products such as real-time AI
                        chat streaming, AI-assisted document drafting and review, and a vision-model pipeline
                        that validates location data against satellite imagery.
                    </p>
                    <p>
                        What I&apos;m best at: turning fuzzy product asks into well-scoped engineering work,
                        and helping the team around me ship without burning out.
                    </p>
                </Reveal>

                <Reveal className="about-side" delay={120}>
                    <ul className="about-list">
                        {HIGHLIGHTS.map(([h, b], i) => (
                            <li key={h}>
                                <span className="about-list-num mono">0{i + 1}</span>
                                <div>
                                    <div className="about-list-h">{h}</div>
                                    <p className="about-list-b">{b}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
};

export default About;
