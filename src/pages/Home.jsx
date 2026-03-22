import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';

export default function Home() {
  const container = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('.line-inner', { y: '121%' });
      
      gsap.from('.tag-text', { x: -20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
      
      const lines = gsap.utils.toArray('.line-inner');
      gsap.to(lines, { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.6 });
      
      gsap.from('.br-image', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 1 });
      gsap.from('.bio-text', { opacity: 0, duration: 1.5, ease: 'power3.out', delay: 1.2 });
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="h-full overflow-hidden flex flex-col justify-center relative px-2 md:px-12 z-10 w-full max-w-[1600px] mx-auto">
      <div className="text-[10px] md:text-[13px] uppercase tracking-widest mb-0 md:mb-2 tag-text font-medium text-gray-700 font-['JetBrains_Mono']">
        {t.homeTag}
      </div>

      <h1 className="text-[9vw] md:text-[8vw] lg:text-[7.5vw] leading-[0.85] font-['Oswald'] tracking-tighter uppercase font-500 text-left w-full mix-blend-difference z-20 pointer-events-none mt-12 md:mt-0">
        <div className="main-line pb-1 overflow-hidden"><div className="line-inner">{t.homeLine1}</div></div>
        <div className="main-line pb-1 overflow-hidden"><div className={`line-inner flex ${t.homeLine2indent}`}>{t.homeLine2}</div></div>
        <div className="main-line pb-1 overflow-hidden"><div className={`line-inner flex items-center ${t.homeLine3indent}`}>
          {t.homeLine3word1} <span className="font-['Instrument_Serif'] italic lowercase mx-2 md:mx-4 font-light text-gray-500 transform translate-y-2 lg:translate-y-4 text-[10vw] lg:text-[8.5vw]">&amp;</span> {t.homeLine3word2}
        </div></div>
        <div className="main-line pb-1 pl-4 md:pl-0 overflow-hidden"><div className="line-inner flex text-left lg:pl-[5%]">{t.homeLine4}</div></div>
        <div className="main-line pb-1 overflow-hidden"><div className={`line-inner flex items-end ${t.homeLine5indent}`}>
           {t.homeLine5word1} <span className="font-['Instrument_Serif'] italic lowercase ml-2 md:ml-4 font-light tracking-normal leading-[0.85] transform translate-y-1 lg:translate-y-2">{t.homeLine5word2}</span>
        </div></div>
      </h1>

      <div className="absolute bottom-24 md:bottom-2 left-2 md:left-16 lg:left-24 w-[160px] md:w-[320px] text-[8px] md:text-[10px] leading-relaxed uppercase bio-text z-30 bg-transparent md:bg-transparent p-3 md:p-5 font-medium tracking-wide text-gray-800 font-['JetBrains_Mono']">
        <div className="absolute top-0 left-0 w-2 h-[1px] bg-black"></div>
        <div className="absolute top-0 left-0 w-[1px] h-2 bg-black"></div>
        <div className="absolute top-0 right-0 w-2 h-[1px] bg-black"></div>
        <div className="absolute top-0 right-0 w-[1px] h-2 bg-black"></div>
        <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-black"></div>
        <div className="absolute bottom-0 left-0 w-[1px] h-2 bg-black"></div>
        <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-black"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-black"></div>
        <p className="mb-1 md:mb-2">{t.homeBio1}</p>
        <p>{t.homeBio2}</p>
      </div>

      <div className="absolute bottom-4 right-2 md:right-0 lg:right-0 w-[160px] h-[210px] md:w-[220px] md:h-[250px] lg:w-[250px] lg:h-[250px] overflow-hidden br-image z-0 shadow-2xl">
        <div className="w-full h-full bg-black">
          <picture>
            <source srcSet="/images/me.avif" type="image/avif" />
            <source srcSet="/images/me.webp" type="image/webp" />
            <img 
              src="/images/me.jpg" 
              alt="Roman Kutsev"
              className="w-full h-full object-cover origin-center opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-[1.5s] ease-out"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
