import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = ({ title, desc, img, reverse }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textContent = textRef.current;
    const imageContent = imageRef.current;

    if (!section || !textContent || !imageContent) return;

    // Set initial state - sections start off-screen
    if (reverse) {
      gsap.set(imageContent, { x: '-100%', opacity: 0 });
      gsap.set(textContent, { x: '100%', opacity: 0 });
    } else {
      gsap.set(textContent, { x: '-100%', opacity: 0 });
      gsap.set(imageContent, { x: '100%', opacity: 0 });
    }

    // Create entrance animation
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'center center',
        scrub: 1.5,
      }
    });

    if (reverse) {
      entranceTl.to(imageContent, { x: '0%', opacity: 1 }, 0);
      entranceTl.to(textContent, { x: '0%', opacity: 1 }, 0);
    } else {
      entranceTl.to(textContent, { x: '0%', opacity: 1 }, 0);
      entranceTl.to(imageContent, { x: '0%', opacity: 1 }, 0);
    }

    // Create exit animation - slower and smoother
   const exitTl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: 'center center',
    end: '+=400',   // hold duration
    scrub: 2,
    pin: true,      // <--- THIS prevents section from moving upward
    pinSpacing: true
  }
});


    if (reverse) {
      exitTl.to(imageContent, { x: '-200%', opacity: 0 }, 0);
      exitTl.to(textContent, { x: '200%', opacity: 0 }, 0);
    } else {
      exitTl.to(textContent, { x: '-200%', opacity: 0 }, 0);
      exitTl.to(imageContent, { x: '200%', opacity: 0 }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [reverse]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6"
    >
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto mb-0 w-full`}>
        {/* Text Content */}
        <div 
          ref={textRef}
          className="flex-1 w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed drop-shadow-md">
            {desc}
          </p>
        </div>
        
        {/* Image Content */}
        <div 
          ref={imageRef}
          className="flex-1 w-full"
        >
          <img 
            src={img}
            alt={title}
            className="w-full h-auto object-cover rounded-xl md:rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;