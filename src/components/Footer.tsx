import type { Dictionary } from '@/i18n';

const Footer = ({ t }: { t: Dictionary['footer'] }) => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className="footer-col footer-col-wide">
                        <div className="footer-mark">Soultan.id</div>
                        <p className="footer-tag">
                            {t.tagBefore}
                            <a href="https://www.yindjin.tech" target="_blank" rel="noreferrer">Yindjin</a>.
                        </p>
                    </div>
                    <div className="footer-col">
                        <div className="footer-h">{t.elsewhere}</div>
                        <ul>
                            <li><a href="https://github.com/sofrosine" target="_blank" rel="noreferrer">GitHub <em>↗</em></a></li>
                            <li><a href="https://linkedin.com/in/soultanma" target="_blank" rel="noreferrer">LinkedIn <em>↗</em></a></li>
                            <li><a href="https://instagram.com/soultan.muh" target="_blank" rel="noreferrer">Instagram <em>↗</em></a></li>
                            <li><a href="https://wa.me/6281227711071" target="_blank" rel="noreferrer">WhatsApp <em>↗</em></a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <div className="footer-h">{t.direct}</div>
                        <ul>
                            <li><a href="mailto:soultanmuh@gmail.com">soultanmuh@gmail.com</a></li>
                            <li><span className="mono dim">+62 812 2771 1071</span></li>
                            <li><span className="mono dim">{t.location}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-rule" />
                <div className="footer-bottom">
                    <span className="mono">{t.rights(year)}</span>
                    <span className="mono dim">{t.version}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
