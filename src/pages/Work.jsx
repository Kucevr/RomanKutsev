import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';

const projects = [
  { 
    id: 'nyc-atmosphere',
    year: '2025', 
    name: 'NYC ATMOSPHERE', 
    role: 'SITE, BRANDING', 
    image: 'https://kutsev-studio.by/sitephotos/nyc-atmosphere.avif'
  },
  { 
    id: 'focusflow',
    year: '2024', 
    name: 'FOCUSFLOW', 
    role: 'DIGITAL PRODUCT', 
    image: 'https://kutsev-studio.by/sitephotos/focusflow.avif'
  },
  { 
    id: 'lumos-series',
    year: '2023', 
    name: 'LUMOS SERIES', 
    role: 'BRAND DESIGN, 3D', 
    image: 'https://kutsev-studio.by/sitephotos/lumos.avif'
  },
  { 
    id: 'metal-scapes',
    year: '2023', 
    name: 'METAL SCAPES', 
    role: 'CREATIVE DEV', 
    image: 'https://kutsev-studio.by/sitephotos/metal.avif'
  },
];

const infiniteProjects = Array(12).fill(projects).flat();

export default function Work() {
  const container = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useLang();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      gsap.set('.work-inner', { y: '100%' });
      
      gsap.to('.work-inner', { 
        y: '0%', 
        duration: 1.2, 
        stagger: 0.1, 
        ease: 'power4.out', 
        delay: 0.1 
      });

      gsap.fromTo('.proj-card', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          stagger: isMobile ? 0.1 : { each: 0.05, from: 'center' },
          ease: 'power4.out',
          delay: 0.2
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || window.innerWidth < 768) return;

    // Start near the middle to allow scrolling left and right infinitely
    setTimeout(() => {
      if (el) el.scrollLeft = el.scrollWidth / 2 - el.clientWidth / 2;
    }, 100);

    const onWheel = (e) => {
      // Allow vertical scroll if we are at the ends
      const isAtStart = el.scrollLeft === 0;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      // Infinite loop logic: wrap around if reaching ends
      if (el.scrollLeft < el.scrollWidth * 0.1) {
        el.scrollLeft += el.scrollWidth * 0.4;
      } else if (el.scrollLeft > el.scrollWidth * 0.9) {
        el.scrollLeft -= el.scrollWidth * 0.4;
      }

      if (e.deltaY !== 0) {
        if ((e.deltaY < 0 && isAtStart) || (e.deltaY > 0 && isAtEnd)) {
          // let normal vertical scroll happen
          return;
        }
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -window.innerWidth * 0.4, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: window.innerWidth * 0.4, behavior: 'smooth' });
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div ref={container} className="h-full md:overflow-hidden flex flex-col pt-4 relative px-4 md:px-12 w-full max-w-[1600px] mx-auto z-10">
      
      <div className="absolute top-4 right-4 md:right-12 text-[10px] md:text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-gray-500 w-[150px] text-right overflow-hidden hidden md:block">
        <div className="work-inner">{t.workArchive}</div>
        <div className="work-inner">{t.workYears}</div>
      </div>

      <div className="flex justify-between items-end mb-8 lg:mb-12 pointer-events-none">
        <h1 className="text-[14vw] md:text-[8vw] leading-[0.9] font-['Oswald'] tracking-tighter uppercase font-normal text-left mix-blend-difference mt-8 md:mt-0">
          <div className="work-line pb-2 overflow-hidden"><div className="work-inner">{t.workTitle}</div></div>
        </h1>

        <div className="hidden md:flex gap-4 pointer-events-auto pb-4">
           <button onClick={scrollLeft} className="w-12 h-12 flex items-center justify-center border border-black rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer text-lg group">
             <span className="group-hover:-translate-x-1 transition-transform">←</span>
           </button>
           <button onClick={scrollRight} className="w-12 h-12 flex items-center justify-center border border-black rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer text-lg group">
             <span className="group-hover:translate-x-1 transition-transform">→</span>
           </button>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-x-auto gap-12 md:gap-6 lg:gap-12 relative z-20 pb-20 md:pb-8 hide-scrollbar scroll-smooth snap-y md:snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        
        {(isMobile ? projects : infiniteProjects).map((p, i) => (
          <div key={i} onClick={() => navigate('/work/' + p.id)} className="proj-card group flex flex-col cursor-pointer flex-shrink-0 w-full md:w-[60vw] lg:w-[45vw] snap-center">
             <div className="w-full aspect-video overflow-hidden bg-gray-200">
               <img 
                 src={p.image} 
                 alt={p.name}
                 className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
               />
             </div>
             
             <div className="flex flex-col mt-4">
                <div className="flex justify-between items-center pb-2">
                   <h2 className="text-xl md:text-2xl lg:text-3xl font-['Oswald'] tracking-tighter uppercase transition-all duration-500">
                     {p.name}
                   </h2>
                </div>

                <div className="relative w-full h-[1px] bg-transparent overflow-hidden my-2">
                  <div className="absolute inset-0 bg-black/20 transition-transform duration-[0.6s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-full"></div>
                  <div className="absolute inset-0 bg-black -translate-x-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0"></div>
                </div>

                <div className="flex justify-between items-center text-[9px] md:text-[11px] font-['JetBrains_Mono'] tracking-widest uppercase text-gray-500 mt-2 gap-2">
                   <span className="shrink-0">{p.year}</span>
                   <span className="truncate text-right">[ {p.role} ]</span>
                </div>
             </div>
          </div>
        ))}
      </div>

    </div>
  );
}
