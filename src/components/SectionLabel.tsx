import { ReactNode } from 'react';
import Reveal from './Reveal';

type SectionLabelProps = {
    num: string;
    kicker: string;
    title: ReactNode;
    lede?: ReactNode;
};

const SectionLabel = ({ num, kicker, title, lede }: SectionLabelProps) => (
    <Reveal className="section-head">
        <div className="section-head-row">
            <span className="num">§{num}</span>
            <span className="kicker">{kicker}</span>
        </div>
        <h2 className="section-title">{title}</h2>
        {lede && <p className="section-lede">{lede}</p>}
    </Reveal>
);

export default SectionLabel;
