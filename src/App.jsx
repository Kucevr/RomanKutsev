import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from './LanguageContext';
import Home from './pages/Home';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Expertise from './pages/Expertise';
import Manifesto from './pages/Manifesto';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';

const photos = [
  'https://kutsev-studio.by/sitephotos/nyc-atmosphere.avif',
  'https://kutsev-studio.by/sitephotos/focusflow.avif',
  'https://kutsev-studio.by/sitephotos/metal.avif',
  'https://kutsev-studio.by/sitephotos/lumos.avif',
  'https://kutsev-studio.by/sitephotos/l-homme.avif'
];

const positions = [
  'top-[12%] left-[8%] md:top-[15%] md:left-[5%] w-[120px] h-[160px] md:w-[160px] md:h-[220px] lg:w-[240px] lg:h-[320px]',
  'bottom-[12%] left-[12%] md:bottom-[15%] md:left-[15%] w-[90px] h-[120px] md:w-[120px] md:h-[160px] lg:w-[160px] lg:h-[220px]',
  'top-[35%] right-[5%] md:top-[30%] md:right-[5%] w-[140px] h-[180px] md:w-[180px] md:h-[240px] lg:w-[260px] lg:h-[360px]'
];

const linksMeta = [
  { path: '/work',      images: [photos[0], photos[1], photos[2]], offset: 'translate-x-[4vw]',  numPos: 'right' },
  { path: '/expertise', images: [photos[3], photos[4], photos[0]], offset: '-translate-x-[6vw]', numPos: 'left'  },
  { path: '/manifesto', images: [photos[2], photos[3], photos[4]], offset: 'translate-x-[1vw]',  numPos: 'right' },
  { path: '/about',     images: [photos[1], photos[2], photos[3]], offset: '-translate-x-[8vw]', numPos: 'left'  },
  { path: '/contact',   images: [photos[4], photos[0], photos[1]], offset: 'translate-x-[5vw]',  numPos: 'right' },
];

const defaultImages = [photos[0], photos[4], photos[1]];

export default function App() {
  const container = useRef(null);
  const menuRef = useRef(null);
  const menuTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, toggle, t } = useLang();
  const links = linksMeta.map((m, i) => ({ ...m, name: t.menuLinks[i] }));

  useLayoutEffect(() => {
    // Header/Footer intro
    const ctx = gsap.context(() => {
      gsap.from('.header-text', { y: -20, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
      gsap.from('.footer-link', { opacity: 0, y: 10, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 1.4 });
    }, container);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const blackLayer = menu.querySelector('.menu-black');
    const whiteLayer = menu.querySelector('.menu-white');
    const linkInners = menu.querySelectorAll('.menu-link-inner');
    const imgContainer = menu.querySelector('.menu-image-container');

    gsap.set(blackLayer, { yPercent: 100 });
    gsap.set(whiteLayer, { yPercent: 100 });
    gsap.set(linkInners, { yPercent: 100 });
    gsap.set(imgContainer, { autoAlpha: 0, scale: 0.9 });

    menuTl.current = gsap.timeline({ paused: true })
      .to(blackLayer, { yPercent: 0, duration: 0.8, ease: 'power4.inOut' })
      .to(whiteLayer, { yPercent: 0, duration: 0.8, ease: 'power4.inOut' }, '-=0.6')
      .to(linkInners, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'power4.out' }, '-=0.4')
      .to(imgContainer, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power4.out' }, '-=0.6');

    return () => { menuTl.current?.kill(); };
  }, []);

  useEffect(() => {
    if (!menuTl.current) return;
    if (isOpen) menuTl.current.play();
    else menuTl.current.reverse();
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);
  
  const handleNav = (path) => {
    if (location.pathname === path) {
      toggleMenu();
      return;
    }
    toggleMenu();
    setTimeout(() => {
      navigate(path);
    }, 800); // wait for menu animation out
  };

  return (
    <div ref={container} className="h-screen overflow-hidden bg-[#E5E4DE] text-[#111] p-4 md:p-8 flex flex-col justify-between font-['JetBrains_Mono'] relative selection:bg-black selection:text-[#E5E4DE]">
      
      {/* ----------------- GLOBAL HEADER ----------------- */}
      <div className="flex justify-between items-start text-[10px] md:text-[13px] uppercase tracking-widest header-text font-medium relative z-40 w-full font-['JetBrains_Mono']">
        <Link to="/" className="link-strike">[ ROMAN KUTSEV ]</Link>
        <span className="text-center absolute left-1/2 transform -translate-x-1/2 hidden md:block text-[10px] md:text-[13px]">{t.tagline}</span>
        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={toggle} className="link-strike uppercase tracking-widest cursor-pointer text-gray-500 hover:text-black transition-colors">
            {lang === 'en' ? '[ RU ]' : '[ EN ]'}
          </button>
          <button onClick={toggleMenu} className="link-strike uppercase tracking-widest cursor-pointer">{t.menu}</button>
        </div>
      </div>

      {/* ----------------- ROUTER VIEW ----------------- */}
      <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden flex flex-col no-scrollbar">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      </div>
      {/* ----------------- GLOBAL FOOTER ----------------- */}
      <div className="flex justify-between items-end text-[10px] md:text-[11px] font-medium uppercase tracking-widest z-10 relative mt-auto pt-6 font-['JetBrains_Mono']">
        <div className="flex gap-4 md:gap-12">
          {location.pathname !== '/' && (
             <button onClick={() => navigate(-1)} className="footer-link link-strike transition-all">{t.back}</button>
          )}
          <Link to="/contact" className="footer-link link-strike transition-all">{t.contact}</Link>
        </div>
        <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 footer-link hidden md:block">{t.location}</span>
        <Link to="/work" className="footer-link link-strike transition-all lg:pr-[300px]">{t.works}</Link>
      </div>

      {/* ----------------- MENU OVERLAY ----------------- */}
      <div ref={menuRef} className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        
        <div className="menu-black absolute inset-0 bg-[#111]"></div>
        <div className="menu-white absolute inset-0 bg-[#E5E4DE] text-[#111] flex flex-col items-center justify-center p-4 md:p-8">
          
          <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 flex justify-between z-30 text-[10px] md:text-[13px] uppercase font-['JetBrains_Mono'] tracking-widest">
            <span>{t.navigation}</span>
            <button onClick={toggleMenu} className="link-strike cursor-pointer">{t.close}</button>
          </div>

          <div className="menu-image-container absolute inset-0 z-10 pointer-events-none hidden md:block">
            {defaultImages.map((src, i) => (
              <div 
                key={`default-img-${i}`}
                className={`absolute overflow-hidden shadow-2xl transition-all duration-[1s] ease-out bg-black ${positions[i]} ${hoveredIndex === null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              >
                <img src={src} alt={`default-${i}`} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
            {links.map((link, linkIndex) => (
              link.images.map((imgSrc, imgPosIndex) => (
                <div 
                  key={`${link.name}-img-${imgPosIndex}`}
                  className={`absolute overflow-hidden shadow-2xl transition-all duration-[1s] ease-out bg-black ${positions[imgPosIndex]} ${hoveredIndex === linkIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <img src={imgSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))
            ))}
          </div>

          <div className="flex flex-col items-center justify-center w-full h-full z-20 font-['Instrument_Serif'] mt-12 md:mt-0 font-normal uppercase">
            {links.map((link, i) => (
              <div 
                key={link.name}
                className={`menu-link-line py-1 md:py-2 z-20 ${link.offset}`}
                style={{ clipPath: 'inset(-50% -50% 0 -50%)' }}
              >
                <div className={`menu-link-inner flex items-start md:items-center justify-center text-[14vw] md:text-[8vw] lg:text-[7vw] leading-[1] tracking-tighter transition-all duration-500 ${hoveredIndex === null || hoveredIndex === i ? 'opacity-100' : 'opacity-25'}`}>
                  {link.numPos === 'left' && (
                    <span className="text-[9px] md:text-[11px] font-['JetBrains_Mono'] font-normal tracking-widest mr-2 md:mr-6 translate-y-2 md:-translate-y-8 opacity-60">({String(i + 1).padStart(2, '0')})</span>
                  )}
                  <span 
                    className="hover:italic transition-all duration-300 cursor-pointer pointer-events-auto px-4"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleNav(link.path)}
                  >
                    {link.name}
                  </span>
                  {link.numPos === 'right' && (
                    <span className="text-[9px] md:text-[11px] font-['JetBrains_Mono'] font-normal tracking-widest ml-2 md:ml-6 translate-y-2 md:-translate-y-8 opacity-60">({String(i + 1).padStart(2, '0')})</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex justify-between z-30 text-[10px] md:text-[11px] uppercase font-['JetBrains_Mono'] tracking-widest">
            <span>{t.systemOverride}</span>
            <span>[ 2026 ]</span>
          </div>

        </div>
      </div>
    </div>
  );
}
