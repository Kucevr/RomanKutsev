import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';

export default function Expertise() {
  const container = useRef(null);
  const { t } = useLang();
  const services = t.services;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      gsap.set('.exp-inner', { y: '100%' });
      
      gsap.to('.exp-inner', { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
      gsap.fromTo('.service-row', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: 'power4.out', delay: 0.2 });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-full md:h-full md:overflow-hidden flex flex-col justify-start pt-4 pb-4 md:pb-0 relative px-4 md:px-12 w-full max-w-[1600px] mx-auto z-10">
      
      <div className="absolute top-10 right-4 md:right-12 text-[10px] md:text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-gray-500 text-right overflow-hidden hidden md:block">
        <div className="exp-inner">{t.expertiseLabel1}</div>
        <div className="exp-inner">{t.expertiseLabel2}</div>
      </div>

      <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-['Oswald'] tracking-tighter uppercase font-normal text-left mt-8 mb-8 md:mb-12 flex flex-wrap md:flex-nowrap whitespace-nowrap items-center gap-4">
        <div className="exp-line pb-2 overflow-hidden"><div className="exp-inner flex items-center">
          DIGITAL EXPERTISE <span className="font-['Instrument_Serif'] italic lowercase ml-6 text-gray-500 translate-y-1 lg:translate-y-2 text-[13vw] md:text-[9vw] font-light">{t.expertiseItalic}</span>
        </div></div>
      </h1>

      <div className="w-full mt-2 md:mt-4 flex flex-col">
        {services.map((item, i) => (
          <div key={i} className="service-row group border-t border-black/20 py-4 md:py-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8 transition-colors duration-500 hover:border-black">
            
            <div className="flex items-end md:items-center justify-start gap-4 md:gap-8 flex-1">
              <span className="text-[10px] md:text-[11px] font-['JetBrains_Mono'] text-gray-500 tracking-widest mb-1 md:mb-0 shrink-0">
                [ 0{i + 1} ]
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-['Oswald'] tracking-tighter uppercase transition-colors duration-500 group-hover:italic">
                {item.title}
              </h2>
            </div>
            
            <p className="text-sm md:text-base font-['JetBrains_Mono'] text-gray-600 flex-1 md:text-right max-w-full md:max-w-[400px] lg:max-w-[500px] opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              {item.desc}
            </p>

          </div>
        ))}
        <div className="border-t border-black/20"></div>
      </div>

    </div>
  );
}