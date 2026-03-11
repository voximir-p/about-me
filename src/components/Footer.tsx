'use client';
import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

export default function Footer() {
  const commit = process.env.NEXT_PUBLIC_COMMIT_HASH?.slice(0, 7) || "62d7f54";

  return (
    <footer>
      <RevealWrapper>
        <div className="footer-content">
          <div className="footer-line" />
          <div className="footer-meta">
            <p className="footer-build">Build {commit}</p>
            <p className="footer-credit">
              Made with <span className="footer-heart"><Image src="/svg/heart.svg" alt="" aria-hidden="true" width={14} height={14} className="footer-heart-icon" /></span> by{' '}
              <strong><span className="gradient-text footer-name">Voximir</span></strong> · 2026
            </p>
          </div>
        </div>
      </RevealWrapper>
    </footer>
  );
}
