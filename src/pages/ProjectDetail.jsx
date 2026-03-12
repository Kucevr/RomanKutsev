import React, { useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useLang } from '../LanguageContext';

// Mock DB for the projects (normally you'd fetch this or import from a shared data config)
const projectsData = [
  {
    id: 'nyc-atmosphere',
    year: '2025',
    name: 'NYC ATMOSPHERE',
    role: 'SITE, BRANDING',
    image: 'https://kutsev-studio.by/sitephotos/nyc-atmosphere.avif',
    description: "A digital exploration of New York's brutalist architecture mixed with modern high-end editorial aesthetics. This project redefines how spatial volume translates to the web.",
    client: 'Atmosphere Agency',
    stack: 'React, GSAP, WebGL, Tailwind'
  },
  {
    id: 'focusflow',
    year: '2024',
    name: 'FOCUSFLOW',
    role: 'DIGITAL PRODUCT',
    image: 'https://kutsev-studio.by/sitephotos/focusflow.avif',
    description: "An intricate productivity tool interface where animation dictates flow. FocusFlow brings a tactile, physical snap to digital interactions.",
    client: 'Focus Inc.',
    stack: 'Next.js, Framer Motion, TypeScript'
  },
  {
    id: 'lumos-series',
    year: '2023',
    name: 'LUMOS SERIES',
    role: 'BRAND DESIGN, 3D',
    image: 'https://kutsev-studio.by/sitephotos/lumos.avif',
    description: "A purely visual typographic and 3D exploration. Lumos challenges the boundaries of light, shadow, and typographic scale on the web.",
    client: 'Lumos Art Gallery',
    stack: 'Cinema 4D, Three.js, React'
  },
  {
    id: 'metal-scapes',
    year: '2023',
    name: 'METAL SCAPES',
    role: 'CREATIVE DEV',
    image: 'https://kutsev-studio.by/sitephotos/metal.avif',
    description: "Experimental creative development pushing browser rendering limits. Heavy textures meeting delicate, smooth scroll dynamics.",
    client: 'Studio Personal',
    stack: 'Vanilla JS, GSAP, OGL'
  },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const container = useRef(null);
  const { t } = useLang();

  const project = projectsData.find(p => p.id === id);
  const description = t.projects[id]?.description || project?.description;

  useLayoutEffect(() => {
    if (!project) return;
    let ctx = gsap.context(() => {

      gsap.set('.pd-inner', { y: '100%' });
      
      gsap.to('.pd-inner', { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });

      gsap.fromTo('.pd-hero-img', 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo('.pd-fade', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
      );
    }, container);
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="flex-grow flex items-center justify-center font-['JetBrains_Mono']">
        {t.pdNotFound}
      </div>
    );
  }

  return (
    <div ref={container} className="flex flex-col min-h-full md:h-full md:overflow-hidden pt-2 relative px-4 md:px-12 w-full max-w-[1600px] mx-auto z-10">
      
      <div className="w-full flex justify-between items-end mb-2 md:mb-4">
        <h1 className="text-[12vw] md:text-[9vw] leading-[0.9] font-['Oswald'] tracking-tighter uppercase font-normal text-left max-w-[80%]">
          <div className="pd-line pb-2 overflow-hidden"><div className="pd-inner">{project.name}</div></div>
        </h1>
        <div className="text-[10px] md:text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-gray-500 text-right overflow-hidden hidden md:block pb-4">
          <div className="pd-inner">{t.pdCaseStudy}</div>
          <div className="pd-inner">[ 0{projectsData.findIndex(p => p.id === id) + 1} ]</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:flex-1 md:min-h-0 gap-6 md:gap-12 mt-4 md:mt-6">
        
        {/* Left Column (Sticky Text) */}
        <div className="w-full md:w-[35%] lg:w-[30%] flex flex-col gap-3 md:gap-4 pd-fade z-20 md:overflow-y-auto no-scrollbar">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-['Instrument_Serif'] italic leading-[1.15] text-black w-full">
            {description}
          </h2>
          <p className="text-xs md:text-sm font-['JetBrains_Mono'] text-gray-600 leading-relaxed">
            {t.pdBody}
          </p>
          
          <div className="w-full grid grid-cols-2 gap-3 text-[10px] font-['JetBrains_Mono'] tracking-widest uppercase">
            <div className="flex flex-col gap-1">
              <span className="text-gray-400">{t.pdRole}</span>
              <span className="text-black text-sm">{project.role}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400">{t.pdClient}</span>
              <span className="text-black text-sm">{project.client}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400">{t.pdYear}</span>
              <span className="text-black text-sm">{project.year}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400">{t.pdStack}</span>
              <span className="text-black text-sm">{project.stack}</span>
            </div>
          </div>
        </div>

        {/* Right Column (Scrolling Photos) */}
        <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col gap-4 md:gap-8 md:overflow-y-auto pb-6 z-10 no-scrollbar">
          {[project.image, project.image, project.image].map((img, idx) => (
            <div key={idx} className="w-full aspect-video flex-shrink-0 overflow-hidden bg-gray-200 relative mix-blend-multiply opacity-90">
              <img 
                src={img} 
                alt={`${project.name} ${idx}`} 
                className="pd-hero-img w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}