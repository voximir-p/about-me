'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

const NAV_ICONS = [
  { href: 'https://bitcalc.voximir.org', icon: '/svg/calculator.svg', title: 'Bit Size Calculator' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);

  const [mobileNav, setMobileNav] = useState(false);
  const [active, setActive]       = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const linksRef                  = useRef<HTMLUListElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(window.scrollY / scrollHeight, 1) : 0;
      setScrollProgress(progress);
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      let current = '';
      sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function updateUnderline() {
      if (!linksRef.current) return;
      const activeEl = linksRef.current.querySelector(`a[href="#${active || 'hero'}"]`) as HTMLElement | null;
      if (activeEl) {
        const ul = linksRef.current.getBoundingClientRect();
        const a = activeEl.getBoundingClientRect();
        setUnderline({ left: a.left - ul.left, width: a.width });
      }
    }

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [active]);



  useEffect(() => {
    document.body.classList.toggle('nav-locked', mobileNav);
    return () => { document.body.classList.remove('nav-locked'); };
  }, [mobileNav]);

  const smoothScroll = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileNav(false);
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <span className="nav-scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* Icon links (left) */}
      <div className="nav-icons">
        {NAV_ICONS.map(item => (
          <a key={item.title} href={item.href} target="_blank" rel="noopener" title={item.title} className="nav-icon-link">
            <Image src={item.icon} alt={item.title} width={20} height={20} />
          </a>
        ))}
      </div>

      {/* Mobile overlay */}
      {mobileNav && (
        <button
          type="button"
          className="nav-overlay visible"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        />
      )}

      {/* Nav links (right) */}
      <ul ref={linksRef} className={`nav-links${mobileNav ? ' mobile-open' : ''}`}>
        {NAV_LINKS.map(link => {
          const id = link.href.replace('#', '');
          const isActive = active === id || (active === '' && id === 'hero');
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={isActive ? 'active' : ''}
                onClick={e => { e.preventDefault(); smoothScroll(link.href); }}
              >
                {link.label}
              </a>
            </li>
          );
        })}
        <span
          className="nav-underline"
          style={{ left: underline.left, width: underline.width }}
        />
      </ul>

      {/* Mobile nav toggle */}
      <button
        type="button"
        className={`nav-toggle${mobileNav ? ' open' : ''}`}
        onClick={() => setMobileNav(o => !o)}
        aria-label="Toggle navigation"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
