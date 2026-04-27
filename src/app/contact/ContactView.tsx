'use client';

import { FormEvent, useState } from 'react';
import Reveal from '@/components/Reveal';

const ContactView = () => {
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
        <section className="page">
            <div className="page-head">
                <div className="mono dim crumbs">Index / <span>Contact</span></div>
                <Reveal as="h1" className="page-h">
                    Let&apos;s <em className="serif-it">talk</em>.
                </Reveal>
                <Reveal className="page-lede" delay={120}>
                    <p>
                        Open to engineering work, contract or full-time. I read everything that lands in my
                        inbox and reply within two business days.
                    </p>
                </Reveal>
            </div>

            <div className="contact-grid">
                <Reveal className="contact-channels">
                    <div className="ch-h mono">Direct channels</div>
                    <ul className="ch-list">
                        <li>
                            <a href="mailto:soultanmuh@gmail.com">
                                <span className="ch-k mono">email</span>
                                <span className="ch-v">soultanmuh@gmail.com</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/6281227711071" target="_blank" rel="noreferrer">
                                <span className="ch-k mono">whatsapp</span>
                                <span className="ch-v">+62 812 2771 1071</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/sofrosine" target="_blank" rel="noreferrer">
                                <span className="ch-k mono">github</span>
                                <span className="ch-v">github.com/sofrosine</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com/in/soultanma" target="_blank" rel="noreferrer">
                                <span className="ch-k mono">linkedin</span>
                                <span className="ch-v">linkedin.com/in/soultanma</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/soultan.muh" target="_blank" rel="noreferrer">
                                <span className="ch-k mono">instagram</span>
                                <span className="ch-v">@soultan.muh</span>
                            </a>
                        </li>
                    </ul>

                    <div className="ch-h mono ch-h-2">Availability</div>
                    <ul className="ch-status">
                        <li><span className="dot dot-on" /> Frontend &amp; full-stack engineering</li>
                        <li><span className="dot dot-on" /> Contract React Native work</li>
                        <li><span className="dot dot-warn" /> Full-time relocation (case-by-case)</li>
                    </ul>
                </Reveal>

                <Reveal className="contact-form" delay={120}>
                    <form onSubmit={submit}>
                        <div className="form-row">
                            <label className="mono">name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div className="form-row">
                            <label className="mono">email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="jane@company.com"
                            />
                        </div>
                        <div className="form-row">
                            <label className="mono">message</label>
                            <textarea
                                rows={6}
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                required
                                placeholder="Tell me about the project, timeline, and team you're working with…"
                            />
                        </div>
                        <button type="submit" className="btn-prim btn-block">
                            Send via WhatsApp →
                        </button>
                        {sent && <div className="form-ok mono">✓ WhatsApp opened with your message.</div>}
                        <p className="form-fine mono dim">
                            Submitting opens a WhatsApp tab with the message pre-filled. Prefer email?{' '}
                            <a href="mailto:soultanmuh@gmail.com">soultanmuh@gmail.com</a>.
                        </p>
                    </form>
                </Reveal>
            </div>
        </section>
    );
};

export default ContactView;
