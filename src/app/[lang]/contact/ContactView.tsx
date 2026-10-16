'use client';

import { FormEvent, useState } from 'react';
import Reveal from '@/components/Reveal';
import RichText from '@/components/RichText';
import type { Dictionary } from '@/i18n';

type Props = { t: Dictionary['contact']; root: string };

const ContactView = ({ t, root }: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [sent, setSent] = useState(false);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tpl = t.waTemplate
            .replace('{name}', name)
            .replace('{email}', email)
            .replace('{msg}', msg);
        window.open(`https://wa.me/6281227711071?text=${encodeURIComponent(tpl)}`, '_blank');
        setSent(true);
    };

    return (
        <section className="page">
            <div className="page-head">
                <div className="mono dim crumbs">{root} / <span>{t.crumb}</span></div>
                <Reveal as="h1" className="page-h">
                    <RichText value={t.title} />
                </Reveal>
                <Reveal className="page-lede" delay={120}>
                    <p>{t.lede}</p>
                </Reveal>
            </div>

            <div className="contact-grid">
                <Reveal className="contact-channels">
                    <div className="ch-h mono">{t.channels}</div>
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

                    <div className="ch-h mono ch-h-2">{t.availability}</div>
                    <ul className="ch-status">
                        <li><span className="dot dot-on" /> {t.statusOn1}</li>
                        <li><span className="dot dot-warn" /> {t.statusWarn}</li>
                    </ul>
                </Reveal>

                <Reveal className="contact-form" delay={120}>
                    <form onSubmit={submit}>
                        <div className="form-row">
                            <label className="mono">{t.name}</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder={t.namePh}
                            />
                        </div>
                        <div className="form-row">
                            <label className="mono">{t.email}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder={t.emailPh}
                            />
                        </div>
                        <div className="form-row">
                            <label className="mono">{t.message}</label>
                            <textarea
                                rows={6}
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                required
                                placeholder={t.messagePh}
                            />
                        </div>
                        <button type="submit" className="btn-prim btn-block">
                            {t.send}
                        </button>
                        {sent && <div className="form-ok mono">{t.sent}</div>}
                        <p className="form-fine mono dim">
                            {t.fineBefore}
                            <a href="mailto:soultanmuh@gmail.com">soultanmuh@gmail.com</a>.
                        </p>
                    </form>
                </Reveal>
            </div>
        </section>
    );
};

export default ContactView;
