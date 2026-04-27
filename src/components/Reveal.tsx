'use client';

import { ElementType, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type RevealProps = {
    children: ReactNode;
    delay?: number;
    as?: ElementType;
    className?: string;
};

const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '' }: RevealProps) => {
    const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
    return (
        <Tag
            ref={ref}
            className={`${className} reveal${inView ? ' in' : ''}`}
            style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
