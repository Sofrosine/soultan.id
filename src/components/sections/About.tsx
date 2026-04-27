import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import { getYearsOfExperience } from '@/lib/experience';

const HIGHLIGHTS: [string, string][] = [
    ['Startup pace', 'Pre-Series B founding-team velocity, owning roadmap chunks end-to-end.'],
    ['International work', 'Embedded with teams in Hong Kong, Seoul, and Indonesia across timezones.'],
    ['Stack reach', 'Next.js · React Native · Go · Postgres · AWS — picked for fit, not fashion.'],
    ['Product lifecycle', 'Discovery → architecture → ship → measure → iterate.'],
];

const About = () => {
    const years = getYearsOfExperience();
    return (
        <section id="about" className="about">
            <SectionLabel
                num="01"
                kicker="About"
                title={<>Engineer first, with the <em className="serif-it">judgment</em> of someone who has shipped a lot of products.</>}
            />

            <div className="about-grid">
                <Reveal className="about-prose">
                    <p>
                        With <strong>{years} years</strong> in product development, I&apos;ve contributed to
                        dynamic, fast-paced environments — including pre-Series B startups — and have
                        successfully collaborated with clients from Hong Kong and South Korea.
                    </p>
                    <p>
                        I work fluently across the stack: Next.js and React for the web, React Native for
                        mobile, Golang for the systems behind them. My instinct is to keep architecture small,
                        types tight, and the shipping cadence boring — in the good way.
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
