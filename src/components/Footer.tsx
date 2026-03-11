'use client';
import Image from 'next/image';
import RevealWrapper from './RevealWrapper';

export default function Footer() {
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || "11d747cdd5d85fa9f464cd90529e66376dd7e414";
  const commit = commitHash.slice(0, 7);
  const commitUrl = `https://www.github.com/voximir-p/about-me/commit/${commitHash}`;

  return (
    <footer>
      <RevealWrapper>
        <div className="footer-content">
          <div className="footer-line" />
          <div className="footer-meta">
            <p className="footer-credit">
              Made with <span className="footer-heart"><Image src="/svg/heart.svg" alt="" aria-hidden="true" width={14} height={14} className="footer-heart-icon" /></span> by{' '}
              <strong><span className="gradient-text footer-name">Voximir</span></strong> · 2026
            </p>
            <a className="footer-build" href={commitUrl} target="_blank" rel="noreferrer">
              Build {commit}
            </a>
          </div>
        </div>
      </RevealWrapper>
    </footer>
  );
}
