'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import './storm.css';
import CursorStorm from './CursorStorm';
import LightningTransition from './LightningTransition';
import StormTopNav from './StormTopNav';

const StormScene = dynamic(() => import('./StormScene'), {
    ssr: false,
    loading: () => <div className="storm-loading">summoning the storm…</div>,
});

/**
 * Full-viewport storm frame for interior routes: fixed 3D background,
 * chrome, cursor, and a storm-entrance lightning flash on mount.
 */
export default function StormShell({ children }: { children: React.ReactNode }) {
    const energyRef = useRef(0);
    const [playToken, setPlayToken] = useState(0);

    useEffect(() => {
        // storm entrance
        energyRef.current = 1;
        setPlayToken(1);
        const prevHtml = document.documentElement.style.overflow;
        const prevBody = document.body.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = prevHtml;
            document.body.style.overflow = prevBody;
        };
    }, []);

    return (
        <div className="storm-root">
            <div className="storm-canvas">
                <StormScene energy={energyRef} />
            </div>
            <div className="storm-veil" />

            <header className="storm-chrome">
                <Link href="/" className="storm-brand">
                    <span className="storm-brand-mark">S</span>
                    <span className="storm-brand-meta">
                        <span className="storm-brand-name">Soultan Muhammad Albar</span>
                        <span className="storm-brand-role">Software Engineer</span>
                    </span>
                </Link>
                <StormTopNav />
                <div className="storm-status">
                    <span className="st-dot" />
                    Available for work
                </div>
            </header>

            <div className="storm-page">{children}</div>

            <LightningTransition playToken={playToken} dir={1} />
            <CursorStorm />
        </div>
    );
}
