'use client';

import { FormEvent, useState } from 'react';

const CHANNELS: [string, string, string][] = [
    ['email', 'soultanmuh@gmail.com', 'mailto:soultanmuh@gmail.com'],
    ['whatsapp', '+62 812 2771 1071', 'https://wa.me/6281227711071'],
    ['github', 'github.com/sofrosine', 'https://github.com/sofrosine'],
    ['linkedin', 'linkedin.com/in/soultanma', 'https://linkedin.com/in/soultanma'],
    ['instagram', '@soultan.muh', 'https://instagram.com/soultan.muh'],
];

export default function ContactStorm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [sent, setSent] = useState(false);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tpl = `Hi Soultan!\nI'm ${name} (${email}),\n${msg}`;
        window.open(`https://wa.me/6281227711071?text=${encodeURIComponent(tpl)}`, '_blank');
        setSent(true);
    };

    return (
        <div className="sp-wrap">
            <div className="sp-head">
                <div className="sp-crumb">
                    Index / <span>Contact</span>
                </div>
                <h1 className="sp-title">
                    Let&apos;s <em>talk</em>.
                </h1>
                <p className="sp-lede">
                    Open to engineering work, contract or full-time. I read everything that lands in my inbox and
                    reply within two business days.
                </p>
            </div>

            <div className="sp-contact st-panel-card">
                <div>
                    <div className="sp-ch-h">Direct channels</div>
                    <ul className="sp-ch-list">
                        {CHANNELS.map(([k, v, href]) => (
                            <li key={k}>
                                <a
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                                >
                                    <span className="sp-ch-k">{k}</span>
                                    <span className="sp-ch-v">{v}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="sp-ch-h mt">Availability</div>
                    <ul className="sp-status">
                        <li>
                            <span className="dot dot-on" /> Frontend &amp; full-stack engineering
                        </li>
                        <li>
                            <span className="dot dot-on" /> Contract React Native work
                        </li>
                        <li>
                            <span className="dot dot-warn" /> Full-time relocation (case-by-case)
                        </li>
                    </ul>
                </div>

                <form className="sp-form" onSubmit={submit}>
                    <div className="sp-frow">
                        <label>name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Doe" />
                    </div>
                    <div className="sp-frow">
                        <label>email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="jane@company.com"
                        />
                    </div>
                    <div className="sp-frow">
                        <label>message</label>
                        <textarea
                            rows={5}
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            required
                            placeholder="Tell me about the project, timeline, and team…"
                        />
                    </div>
                    <button type="submit" className="sp-btn sp-btn-prim sp-btn-block">
                        Send via WhatsApp →
                    </button>
                    {sent && <div className="sp-form-ok">✓ WhatsApp opened with your message.</div>}
                    <p className="sp-form-fine">
                        Submitting opens a WhatsApp tab with the message pre-filled. Prefer email?{' '}
                        <a href="mailto:soultanmuh@gmail.com">soultanmuh@gmail.com</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}
