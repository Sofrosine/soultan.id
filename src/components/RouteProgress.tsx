'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Thin progress bar pinned to the top of the viewport during client-side navigation.
 * The App Router exposes no "navigation started" event, so we start on clicks to internal
 * links and finish when the pathname (or query) actually changes.
 */
const RouteProgress = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopTimer = () => {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
    };

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as HTMLElement).closest('a');
            if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
            const url = new URL(a.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname && url.search === window.location.search) return;

            stopTimer();
            setVisible(true);
            setProgress(8);
            // Creep toward 90% so long loads still look alive; completion jumps to 100%.
            timer.current = setInterval(() => {
                setProgress((p) => (p < 90 ? p + (90 - p) * 0.12 : p));
            }, 200);
        };
        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('click', onClick);
            stopTimer();
        };
    }, []);

    useEffect(() => {
        if (!timer.current) return;
        stopTimer();
        setProgress(100);
        const hide = setTimeout(() => {
            setVisible(false);
            setProgress(0);
        }, 300);
        return () => clearTimeout(hide);
    }, [pathname, searchParams]);

    return (
        <div
            className="route-progress"
            style={{ transform: `scaleX(${progress / 100})`, opacity: visible ? 1 : 0 }}
            aria-hidden
        />
    );
};

export default RouteProgress;
