'use client';

import { createElement, ElementType, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type RevealProps = {
    children: ReactNode;
    delay?: number;
    as?: ElementType;
    className?: string;
};

const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '' }: RevealProps) => {
    const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
    // createElement avoids a JSX prop-inference collision introduced by
    // @react-three/fiber's global element augmentation on polymorphic `as` tags.
    return createElement(
        Tag,
        {
            ref,
            className: `${className} reveal${inView ? ' in' : ''}`,
            style: { transitionDelay: inView ? `${delay}ms` : '0ms' },
        },
        children
    );
};

export default Reveal;
