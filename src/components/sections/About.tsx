import Reveal from '@/components/Reveal';
import RichText from '@/components/RichText';
import SectionLabel from '@/components/SectionLabel';
import type { Dictionary } from '@/i18n';
import { getYearsOfExperience } from '@/lib/experience';

const About = ({ t }: { t: Dictionary['about'] }) => {
    const years = getYearsOfExperience();
    return (
        <section id="about" className="about">
            <SectionLabel
                num="01"
                kicker={t.kicker}
                title={<RichText value={t.title} />}
            />

            <div className="about-grid">
                <Reveal className="about-prose">
                    <p>
                        {t.p1Before}<strong>{t.p1Years(years)}</strong>{t.p1After}
                    </p>
                    <p>{t.p2}</p>
                    <p>{t.p3}</p>
                </Reveal>

                <Reveal className="about-side" delay={120}>
                    <ul className="about-list">
                        {t.highlights.map(([h, b], i) => (
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
