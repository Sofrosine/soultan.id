import Reveal from '@/components/Reveal';
import RichText from '@/components/RichText';
import SectionLabel from '@/components/SectionLabel';
import type { Dictionary } from '@/i18n';
import type { Experience as ExperienceItem } from '@/lib/data';
import { getYearsOfExperience } from '@/lib/experience';

type Props = { t: Dictionary['experience']; experiences: ExperienceItem[] };

const Experience = ({ t, experiences }: Props) => {
    const years = getYearsOfExperience();
    return (
        <section id="experience" className="exp">
            <SectionLabel
                num="03"
                kicker={t.kicker}
                title={<RichText value={t.title} />}
                lede={t.lede(experiences.length, years)}
            />

            <div className="exp-list">
                {experiences.map((e, i) => (
                    <Reveal className="exp-row" delay={i * 50} key={`${e.company}-${e.duration}`}>
                        <div className="exp-when mono">
                            <div className="exp-dur">{e.duration}</div>
                            <div className="exp-loc dim">{e.location}</div>
                            <div className="exp-type dim">{e.type}</div>
                        </div>
                        <div className="exp-body">
                            <div className="exp-title-row">
                                <h3 className="exp-title">{e.title}</h3>
                                <div className="exp-co">
                                    {e.companyUrl ? (
                                        <a href={e.companyUrl} target="_blank" rel="noreferrer">
                                            {e.company} <em>↗</em>
                                        </a>
                                    ) : (
                                        <span>{e.company}</span>
                                    )}
                                </div>
                            </div>
                            <ul className="exp-desc">
                                {e.description.map((d, j) => <li key={j}>{d}</li>)}
                            </ul>
                            <div className="exp-tech">
                                {e.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};

export default Experience;
