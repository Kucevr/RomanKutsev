import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';

export default function Contact() {
  const container = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      gsap.set('.contact-inner', { y: '100%' });
      
      gsap.to('.contact-inner', { 
        y: '0%', 
        duration: 1.2, 
        stagger: 0.1, 
        ease: 'power4.out', 
        delay: 0.2 
      });

      gsap.fromTo('.contact-link',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.6 }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-full md:h-full md:overflow-hidden flex flex-col justify-center pt-4 pb-4 md:pb-0 relative px-4 md:px-12 w-full max-w-[1600px] mx-auto z-10">
      
      <div className="absolute top-40 right-24 md:right-60 text-[10px] md:text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-gray-500 w-[150px] text-right overflow-hidden">
        <div className="contact-inner">{t.contactAvail1}</div>
        <div className="contact-inner">{t.contactAvail2}</div>
        <div className="contact-inner">{t.contactAvail3}</div>
      </div>

      <h1 className="text-[8vw] md:text-[8vw] leading-[0.9] font-['Oswald'] tracking-tighter uppercase font-normal text-left w-full">
        <div className="contact-line pb-2 overflow-hidden"><div className="contact-inner flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-6">
          {t.contactTitle1}
          <span className="font-['Instrument_Serif'] italic lowercase font-light text-gray-500 translate-y-1 lg:translate-y-2">{t.contactTitleItalic}</span>
          {t.contactTitle2}
        </div></div>
      </h1>

      <div className="flex flex-col gap-4 md:gap-6 mt-8 md:mt-10 w-full px-2 md:pl-[5%]">
          <a href="mailto:hello@kutsev-studio.by" className="contact-link group flex items-center gap-4 cursor-pointer">
            <span className="text-[11px] font-['JetBrains_Mono'] tracking-widest text-gray-400 mt-2">[ 01 / EMAIL ]</span>
            <span className="text-2xl md:text-4xl lg:text-4xl font-['Oswald'] font-normal tracking-tight uppercase relative group-hover:italic transition-all duration-300 group-hover:text-gray-600">
              hello@kutsev-studio.by
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </span>
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-link group flex items-center gap-4 cursor-pointer md:ml-[8%]">
            <span className="text-[11px] font-['JetBrains_Mono'] tracking-widest text-gray-400 mt-2">[ 02 / INSTAGRAM ]</span>
            <span className="text-2xl md:text-4xl lg:text-4xl font-['Oswald'] font-normal tracking-tight uppercase relative group-hover:italic transition-all duration-300 group-hover:text-gray-600">
              @romankutsev
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </span>
          </a>
          
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link group flex items-center gap-4 cursor-pointer md:ml-[16%]">
            <span className="text-[11px] font-['JetBrains_Mono'] tracking-widest text-gray-400 mt-2">[ 03 / LINKEDIN ]</span>
            <span className="text-2xl md:text-4xl lg:text-4xl font-['Oswald'] font-normal tracking-tight uppercase relative group-hover:italic transition-all duration-300 group-hover:text-gray-600">
              Roman Kutsev
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </span>
          </a>

          <a href="https://kutsev-studio.by" target="_blank" rel="noreferrer" className="contact-link group flex items-center gap-4 cursor-pointer md:ml-[24%]">
            <span className="text-[11px] font-['JetBrains_Mono'] tracking-widest text-gray-400 mt-2">[ 04 / STUDIO ]</span>
            <span className="text-2xl md:text-4xl lg:text-4xl font-['Oswald'] font-normal tracking-tight uppercase relative group-hover:italic transition-all duration-300 group-hover:text-gray-600">
              kutsev-studio.by
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full"></span>
            </span>
          </a>
      </div>

    </div>
  );
}
