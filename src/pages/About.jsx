import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';

export default function About() {
  const container = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      gsap.set('.abt-inner', { y: '100%' });
      
      gsap.to('.abt-inner', { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
      
      gsap.fromTo('.ph-image', 
        { filter: 'grayscale(100%)', scale: 1.1 },
        { 
          filter: 'grayscale(0%)',
          scale: 1, 
          duration: 2, 
          ease: 'power3.out', 
          delay: 0.8 
        }
      );
      gsap.to('.ph-overlay', { 
        height: 0, 
        duration: 1.5, 
        ease: 'power4.inOut', 
        delay: 0.3 
      });
      
      gsap.fromTo('.abt-fade', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15, 
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
        <div className="abt-inner">{t.aboutLabel1}</div>
        <div className="abt-inner">{t.aboutLabel2}</div>
      </div>

      <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-['Oswald'] tracking-tighter uppercase font-normal text-left mt-8 mb-8 md:mb-12">
        <div className="abt-line pb-2 overflow-hidden"><div className="abt-inner flex items-center gap-6">
          ROMAN
          <span className="font-['Instrument_Serif'] italic lowercase text-gray-500 text-[13vw] md:text-[9vw] font-light translate-y-2">Kutsev</span>
        </div></div>
      </h1>

      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 items-start">
        
        {/* Photo Container */}
        <div className="w-full bg-[#E5E5E5] relative overflow-hidden aspect-[4/3] md:aspect-[3/4] md:flex-1 md:max-w-[450px] max-h-[280px] md:max-h-none">
          <div className="ph-overlay absolute inset-0 bg-[#F4F4F0] z-10 origin-top h-full w-full pointer-events-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1887&auto=format&fit=crop" 
            alt="Portrait" 
            className="ph-image object-cover w-full h-full mix-blend-multiply"
          />
        </div>

        {/* Text Details */}
        <div className="flex-[1.5] flex flex-col gap-6 md:gap-8 justify-start pr-[5%]">
            <h2 className="abt-fade text-3xl md:text-4xl lg:text-5xl font-['Instrument_Serif'] italic leading-[1.1] text-black w-full">
              {t.aboutHeadline}
            </h2>
            <div className="w-full flex flex-col sm:flex-row gap-8 md:gap-16 mt-4">
              <div className="flex flex-col gap-2 flex-1">
                <span className="abt-fade text-[10px] md:text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#999]">{t.aboutRole}</span>
                <span className="abt-fade text-xl md:text-2xl font-['Oswald'] uppercase tracking-tight">{t.aboutRoleVal}</span>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <span className="abt-fade text-[10px] md:text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#999]">{t.aboutLocation}</span>
                <span className="abt-fade text-xl md:text-2xl font-['Oswald'] uppercase tracking-tight">{t.aboutLocationVal}</span>
              </div>
            </div>
            <p className="abt-fade text-sm md:text-base font-['JetBrains_Mono'] text-gray-600 leading-relaxed max-w-[500px] mt-4">
              {t.aboutBio}
            </p>
        </div>

      </div>

    </div>
  );
}