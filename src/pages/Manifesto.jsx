import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';

export default function Manifesto() {
  const container = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      gsap.set('.man-inner', { y: '100%' });
      
      gsap.to('.man-inner', { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
      
      gsap.fromTo('.man-paragraph', 
        { opacity: 0, y: 40 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: 'power3.out', 
          delay: 0.8 
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-full md:h-full md:overflow-hidden flex flex-col justify-start pt-4 pb-4 md:pb-0 relative px-4 md:px-12 w-full max-w-[1600px] mx-auto z-10">
      
      <div className="absolute top-10 right-4 md:right-12 text-[10px] md:text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-gray-500 text-right overflow-hidden hidden md:block">
        <div className="man-inner">{t.manifestoLabel1}</div>
        <div className="man-inner">{t.manifestoLabel2}</div>
      </div>

      <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-['Oswald'] tracking-tighter uppercase font-normal text-left mt-8 mb-8 md:mb-14 flex whitespace-nowrap items-center">
        <div className="man-line pb-2 overflow-hidden"><div className="man-inner flex items-center">
          DESIGN MANIFESTO <span className="font-['Instrument_Serif'] italic lowercase ml-6 text-gray-500 translate-y-1 lg:translate-y-2 text-[13vw] md:text-[9vw] font-light">{t.manifestoItalic}</span>
        </div></div>
      </h1>

      <div className="w-full flex flex-col md:flex-row justify-between items-start mt-0 md:mt-0 gap-12 md:gap-24">
        
        <div className="flex-1 text-[11px] md:text-[13px] font-['JetBrains_Mono'] uppercase tracking-widest text-black/50 leading-relaxed md:max-w-[300px]">
          <div className="man-line overflow-hidden"><div className="man-inner">{t.manifestoPrinciple1}</div></div>
          <br/>
          <div className="man-line overflow-hidden"><div className="man-inner">{t.manifestoPrinciple2}</div></div>
          <br/>
          <div className="man-line overflow-hidden"><div className="man-inner">{t.manifestoPrinciple3}</div></div>
        </div>

        <div className="flex-[2] flex flex-col gap-4 md:gap-8">
          <p className="man-paragraph text-xl md:text-3xl lg:text-4xl font-['Instrument_Serif'] italic leading-[1.1] text-black w-full max-w-[800px]">
            {t.manifestoP1}
          </p>
          <p className="man-paragraph text-base md:text-2xl lg:text-3xl font-['Oswald'] uppercase font-normal tracking-tight leading-[1.1] text-black w-full max-w-[700px] md:pl-[10%]">
            {t.manifestoP2}
          </p>
          <p className="man-paragraph text-sm md:text-lg font-['JetBrains_Mono'] text-gray-600 leading-[1.2] max-w-[600px] md:pl-[20%] mt-2 md:mt-2">
            {t.manifestoP3}
          </p>
        </div>

      </div>

    </div>
  );
}