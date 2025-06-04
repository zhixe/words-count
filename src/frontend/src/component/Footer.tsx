import React from "react";

const Footer: React.FC = () => (
    <footer className="footer-style">
        <small style={{ fontWeight: "bold" }}>Version: {__APP_VERSION__}</small>
        <span className="footer-divider">|</span>
        <small>Last updated: {__APP_DATE__}</small>
    </footer>
);

export default Footer;