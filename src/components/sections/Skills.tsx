import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import { skillGroups } from '@/lib/data';

const Skills = () => (
    <section id="skills" className="skills">
        <SectionLabel
            num="02"
            kicker="Stack"
            title={<>The tools I keep <em className="serif-it">sharp</em>.</>}
            lede="Grouped by what they actually do — not by trend cycle."
        />

        <div className="skills-grid">
            {skillGroups.map((g, i) => (
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
