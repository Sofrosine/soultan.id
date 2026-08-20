'use client';

import { useEffect, useRef } from 'react';

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number };

/** A glowing electric cursor that trails ball-lightning and throws sparks. */
export default function CursorStorm() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // skip on touch / coarse-pointer devices
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const smooth = { x: pos.x, y: pos.y };
        const trail: Array<[number, number]> = [];
        const sparks: Spark[] = [];
        let visible = false;
        let lastMove = 0;

        const onMove = (e: MouseEvent) => {
            pos.x = e.clientX;
            pos.y = e.clientY;
            visible = true;
            lastMove = performance.now();
            // spawn a couple of sparks proportional to speed
            const speed = Math.hypot(e.movementX, e.movementY);
            const n = Math.min(3, Math.floor(speed / 6));
            for (let i = 0; i < n; i++) {
                const ang = Math.random() * Math.PI * 2;
                const sp = 0.5 + Math.random() * 2.5;
                sparks.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(ang) * sp,
                    vy: Math.sin(ang) * sp,
                    life: 0,
                    max: 22 + Math.random() * 20,
                });
            }
        };
        const onLeave = () => {
            visible = false;
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseout', onLeave);

        const jag = (
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            disp: number,
            out: Array<[number, number]>
        ) => {
            if (disp < 2) {
                out.push([x2, y2]);
                return;
            }
            const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * disp;
            const my = (y1 + y2) / 2 + (Math.random() - 0.5) * disp;
            jag(x1, y1, mx, my, disp / 2, out);
            jag(mx, my, x2, y2, disp / 2, out);
        };

        let raf = 0;
        const loop = () => {
            // ease the glow toward the pointer
            smooth.x += (pos.x - smooth.x) * 0.35;
            smooth.y += (pos.y - smooth.y) * 0.35;

            trail.push([smooth.x, smooth.y]);
            if (trail.length > 14) trail.shift();

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            const idle = performance.now() - lastMove > 1500;
            const alpha = visible ? 1 : 0;

            if (alpha > 0) {
                // jagged lightning through the recent trail
                if (trail.length > 2) {
                    const pts: Array<[number, number]> = [trail[0]];
                    for (let i = 1; i < trail.length; i++) {
                        jag(trail[i - 1][0], trail[i - 1][1], trail[i][0], trail[i][1], 7, pts);
                    }
                    const stroke = (lw: number, color: string, blur: number, a: number) => {
                        ctx.beginPath();
                        ctx.moveTo(pts[0][0], pts[0][1]);
                        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
                        ctx.lineWidth = lw;
                        ctx.strokeStyle = color;
                        ctx.globalAlpha = a * (idle ? 0.5 : 1);
                        ctx.shadowColor = color;
                        ctx.shadowBlur = blur;
                        ctx.lineJoin = 'round';
                        ctx.lineCap = 'round';
                        ctx.stroke();
                    };
                    stroke(5, '#5a7cff', 18, 0.25);
                    stroke(2.2, '#46e6ff', 12, 0.5);
                    stroke(1, '#eaffff', 6, 0.85);
                }

                // glowing core
                ctx.globalAlpha = 1;
                const pulse = 5 + Math.sin(performance.now() / 120) * 1.6;
                const grad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 22);
                grad.addColorStop(0, 'rgba(220,245,255,0.95)');
                grad.addColorStop(0.3, 'rgba(70,230,255,0.55)');
                grad.addColorStop(1, 'rgba(90,124,255,0)');
                ctx.fillStyle = grad;
                ctx.shadowColor = '#46e6ff';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(smooth.x, smooth.y, 22, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = '#f2ffff';
                ctx.arc(smooth.x, smooth.y, pulse, 0, Math.PI * 2);
                ctx.fill();
            }

            // sparks
            ctx.shadowColor = '#46e6ff';
            ctx.shadowBlur = 8;
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.life++;
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.04;
                s.vx *= 0.96;
                s.vy *= 0.96;
                const p = 1 - s.life / s.max;
                if (p <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }
                ctx.globalAlpha = p;
                ctx.fillStyle = '#ade9ff';
                ctx.beginPath();
                ctx.arc(s.x, s.y, 1.6 * p + 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseout', onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="storm-cursor" aria-hidden style={{ width: '100%', height: '100%' }} />;
}
