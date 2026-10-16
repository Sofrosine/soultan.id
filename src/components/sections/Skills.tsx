import Reveal from '@/components/Reveal';
import RichText from '@/components/RichText';
import SectionLabel from '@/components/SectionLabel';
import type { Dictionary } from '@/i18n';
import type { SkillGroup } from '@/lib/data';

const Skills = ({ t, groups }: { t: Dictionary['skills']; groups: SkillGroup[] }) => (
    <section id="skills" className="skills">
        <SectionLabel
            num="02"
            kicker={t.kicker}
            title={<RichText value={t.title} />}
            lede={t.lede}
        />

        <div className="skills-grid">
            {groups.map((g, i) => (
                <Reveal className="skill-block" delay={i * 60} key={g.group}>
                    <div className="skill-h">
                        <span className="mono dim">0{i + 1} /</span>
                        <span>{g.group}</span>
                    </div>
                    <ul className="skill-items">
                        {g.items.map((it) => (
                            <li key={it}>
                                <span className="skill-bullet" />
                                {it}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            ))}
        </div>
    </section>
);

export default Skills;
