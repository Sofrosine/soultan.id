'use client';

import { useEffect, useRef } from 'react';

type Props = {
    /** increments each time a transition should play */
    playToken: number;
    /** +1 => sweep left→right, -1 => right→left */
    dir: number;
    /** called at the animation midpoint, when content should swap */
    onPeak?: () => void;
};

const DURATION = 720; // ms

/** Build a jagged poly-line between two points with recursive midpoint offset. */
function boltPoints(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    displace: number,
    out: Array<[number, number]>
) {
    if (displace < 4) {
        out.push([x2, y2]);
        return;
    }
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;
    boltPoints(x1, y1, midX, midY, displace / 2, out);
    boltPoints(midX, midY, x2, y2, displace / 2, out);
}

export default function LightningTransition({ playToken, dir, onPeak }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const peakFiredRef = useRef(false);
    const onPeakRef = useRef(onPeak);
    onPeakRef.current = onPeak;

    useEffect(() => {
        if (playToken === 0) return;
        const canvas = canvasRef.current;
        const flash = flashRef.current;
        if (!canvas || !flash) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.scale(dpr, dpr);

        const midY = h * (0.42 + Math.random() * 0.16);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        peakFiredRef.current = false;
        const start = performance.now();

        // main bolt travels across; branches spark off its head
        const draw = (now: number) => {
            const p = Math.min((now - start) / DURATION, 1);
            ctx.clearRect(0, 0, w, h);

            // fire the swap at the midpoint (screen is brightest / covered)
            if (!peakFiredRef.current && p >= 0.5) {
                peakFiredRef.current = true;
                onPeakRef.current?.();
            }

            // envelope: quick ramp, hold, fade
            const env = p < 0.5 ? p / 0.5 : 1 - (p - 0.5) / 0.5;

            // leading head position across the width
            const headP = dir >= 0 ? p : 1 - p;
            const headX = headP * w;
            const fromX = dir >= 0 ? 0 : w;

            // radial flash follows the head
            flash.style.setProperty('--fx', `${(headX / w) * 100}%`);
            flash.style.opacity = String(env * 0.9);

            if (!reduce) {
                // main jagged bolt from the entry edge to the head
                const pts: Array<[number, number]> = [[fromX, midY]];
                boltPoints(fromX, midY, headX, midY + (Math.random() - 0.5) * 40, 220, pts);

                const drawPath = (lw: number, color: string, blur: number, alpha: number) => {
                    ctx.beginPath();
                    ctx.moveTo(pts[0][0], pts[0][1]);
                    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
                    ctx.lineWidth = lw;
                    ctx.strokeStyle = color;
                    ctx.globalAlpha = alpha * env;
                    ctx.shadowColor = color;
                    ctx.shadowBlur = blur;
                    ctx.lineJoin = 'round';
                    ctx.lineCap = 'round';
                    ctx.stroke();
                };

                // outer indigo glow, then cyan core, then white hot center
                drawPath(9, '#5a7cff', 34, 0.6);
                drawPath(4, '#46e6ff', 22, 0.85);
                drawPath(1.6, '#eaffff', 10, 1);

                // branches near the head
                const branchCount = 4;
                for (let b = 0; b < branchCount; b++) {
                    const bx = headX - (dir >= 0 ? 1 : -1) * Math.random() * w * 0.35;
                    const by = midY + (Math.random() - 0.5) * 30;
                    const ex = bx - (dir >= 0 ? 1 : -1) * (40 + Math.random() * 130);
                    const ey = by + (Math.random() - 0.5) * 260;
                    const bp: Array<[number, number]> = [[bx, by]];
                    boltPoints(bx, by, ex, ey, 90, bp);
                    ctx.beginPath();
                    ctx.moveTo(bp[0][0], bp[0][1]);
                    for (let i = 1; i < bp.length; i++) ctx.lineTo(bp[i][0], bp[i][1]);
                    ctx.lineWidth = 1.6;
                    ctx.strokeStyle = '#9fe8ff';
                    ctx.globalAlpha = 0.5 * env * Math.random();
                    ctx.shadowColor = '#46e6ff';
                    ctx.shadowBlur = 14;
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }

            if (p < 1) {
                rafRef.current = requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, w, h);
                flash.style.opacity = '0';
                // safety: ensure swap happened even if a frame was skipped
                if (!peakFiredRef.current) {
                    peakFiredRef.current = true;
                    onPeakRef.current?.();
                }
            }
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playToken]);

    return (
        <div className="storm-transition" aria-hidden>
            <div className="storm-flash" ref={flashRef} />
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
