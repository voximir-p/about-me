'use client';
import RevealWrapper from './RevealWrapper';

export default function Footer() {
  return (
    <footer>
      <RevealWrapper>
        <div className="footer-content">
          <div className="footer-line" />
          <p>
            Designed &amp; built with <span className="footer-heart">♥</span> by{' '}
            <strong><span className="gradient-text footer-name">Voximir</span></strong> · 2026
          </p>
        </div>
      </RevealWrapper>
    </footer>
  );
}
