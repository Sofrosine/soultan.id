'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import './storm.css';
import { PANELS, PANEL_COMPONENTS } from './panels';
import LightningTransition from './LightningTransition';
import CursorStorm from './CursorStorm';
import StormTopNav from './StormTopNav';

const StormScene = dynamic(() => import('./StormScene'), {
    ssr: false,
    loading: () => <div className="storm-loading">summoning the storm…</div>,
});

const COUNT = PANELS.length;
const LOCK_MS = 900;

export default function StormExperience() {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1);
    const [playToken, setPlayToken] = useState(0);

    const energyRef = useRef(0);
    const pendingRef = useRef<number | null>(null);
    const lockRef = useRef(false);
    const wheelAccum = useRef(0);
    const touchStartX = useRef(0);

    const goTo = useCallback(
        (next: number) => {
            const target = Math.max(0, Math.min(COUNT - 1, next));
            if (target === index || lockRef.current) return;
            lockRef.current = true;
            pendingRef.current = target;
            setDir(target > index ? 1 : -1);
            energyRef.current = 1; // spike the orb
            setPlayToken((t) => t + 1);
            window.setTimeout(() => {
                lockRef.current = false;
            }, LOCK_MS);
        },
        [index]
    );

    const onPeak = useCallback(() => {
        if (pendingRef.current !== null) {
            setIndex(pendingRef.current);
            pendingRef.current = null;
        }
    }, []);

    // Lock the underlying page scroll while the experience is mounted.
    useEffect(() => {
        const prevHtml = document.documentElement.style.overflow;
        const prevBody = document.body.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = prevHtml;
            document.body.style.overflow = prevBody;
        };
    }, []);

    // Wheel navigation (horizontal panels).
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement;
            // let the experience rail scroll horizontally on its own
            if (target.closest('.st-exp-rail')) return;
            e.preventDefault();
            if (lockRef.current) return;
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            wheelAccum.current += delta;
            if (Math.abs(wheelAccum.current) > 60) {
                goTo(index + (wheelAccum.current > 0 ? 1 : -1));
                wheelAccum.current = 0;
            }
        };
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, [goTo, index]);

    // Keyboard navigation.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                goTo(index + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                goTo(index - 1);
            } else if (e.key === 'Home') {
                goTo(0);
            } else if (e.key === 'End') {
                goTo(COUNT - 1);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [goTo, index]);

    // Touch swipe navigation.
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 60) goTo(index + (dx < 0 ? 1 : -1));
    };

    return (
        <div className="storm-root" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="storm-canvas">
                <StormScene energy={energyRef} />
            </div>
            <div className="storm-veil" />

            {/* Top chrome */}
            <header className="storm-chrome">
                <div className="storm-brand">
                    <span className="storm-brand-mark">S</span>
                    <span className="storm-brand-meta">
                        <span className="storm-brand-name">Soultan Muhammad Albar</span>
                        <span className="storm-brand-role">Software Engineer</span>
                    </span>
                </div>
                <StormTopNav />
                <div className="storm-status">
                    <span className="st-dot" />
                    Available for work
                </div>
            </header>

            {/* Panels */}
            <div className="storm-viewport">
                <div className="storm-track" style={{ transform: `translateX(-${index * 100}%)` }}>
                    {PANEL_COMPONENTS.map((Panel, i) => (
                        <section
                            className={`storm-panel${i === index ? ' is-active' : ''}`}
                            key={PANELS[i].id}
                            aria-hidden={i !== index}
                        >
                            <div className="storm-panel-inner">
                                <Panel />
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* Side nav */}
            <nav className="storm-nav" aria-label="Sections">
                {PANELS.map((p, i) => (
                    <button
                        key={p.id}
                        className={`storm-nav-item${i === index ? ' is-on' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={p.label}
                        aria-current={i === index}
                    >
                        <span className="storm-nav-label">{p.label}</span>
                        <span className="storm-nav-tick" />
                    </button>
                ))}
            </nav>

            {/* Hint */}
            <div className="storm-hint">
                <span className="st-key">scroll</span> or <span className="st-key">← →</span> to travel the storm
            </div>

            {/* Lightning page transition */}
            <LightningTransition playToken={playToken} dir={dir} onPeak={onPeak} />

            {/* Storm cursor */}
            <CursorStorm />
        </div>
    );
}
