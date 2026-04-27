const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className="footer-col footer-col-wide">
                        <div className="footer-mark">Soultan.id</div>
                        <p className="footer-tag">
                            Building durable web &amp; mobile products. Currently shipping legal AI at{' '}
                            <a href="https://gani.ai" target="_blank" rel="noreferrer">Gani.ai</a> and platform work for XL Axiata via{' '}
                            <a href="https://www.yindjin.tech" target="_blank" rel="noreferrer">Yindjin</a>.
                        </p>
                    </div>
                    <div className="footer-col">
                        <div className="footer-h">Elsewhere</div>
                        <ul>
                            <li><a href="https://github.com/sofrosine" target="_blank" rel="noreferrer">GitHub <em>↗</em></a></li>
                            <li><a href="https://linkedin.com/in/soultanma" target="_blank" rel="noreferrer">LinkedIn <em>↗</em></a></li>
                            <li><a href="https://instagram.com/soultan.muh" target="_blank" rel="noreferrer">Instagram <em>↗</em></a></li>
                            <li><a href="https://wa.me/6281227711071" target="_blank" rel="noreferrer">WhatsApp <em>↗</em></a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <div className="footer-h">Direct</div>
                        <ul>
                            <li><a href="mailto:soultanmuh@gmail.com">soultanmuh@gmail.com</a></li>
                            <li><span className="mono dim">+62 812 2771 1071</span></li>
                            <li><span className="mono dim">Yogyakarta · Remote</span></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-rule" />
                <div className="footer-bottom">
                    <span className="mono">© {year} Soultan Muhammad Albar — All rights reserved.</span>
                    <span className="mono dim">v2.0 · Editorial revamp</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
