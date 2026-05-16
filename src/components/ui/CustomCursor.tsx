'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
    };

    const animateFollower = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(follower, { x: cursorX, y: cursorY });
      requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', onMouseMove);
    const raf = requestAnimationFrame(animateFollower);

    const handleHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorText = target.getAttribute('data-cursor');
      
      if (cursorText && textRef.current) {
        textRef.current.innerText = cursorText;
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
        gsap.to(follower, { 
          scale: 2.5, 
          borderColor: 'transparent', 
          backgroundColor: '#D85A30', 
          duration: 0.3 
        });
        gsap.to(textRef.current, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(cursor, { scale: 0.5, backgroundColor: '#D85A30', duration: 0.3 });
        gsap.to(follower, { scale: 1.5, borderColor: '#D85A30', backgroundColor: 'rgba(216, 90, 48, 0.2)', duration: 0.3 });
      }
    };
    
    const handleLeave = () => {
      if (textRef.current) {
        textRef.current.innerText = '';
        gsap.to(textRef.current, { opacity: 0, duration: 0.3 });
      }
      gsap.to(cursor, { scale: 1, opacity: 1, backgroundColor: '#F5F0E8', duration: 0.3 });
      gsap.to(follower, { scale: 1, borderColor: 'rgba(245, 240, 232, 0.5)', backgroundColor: 'transparent', duration: 0.3 });
    };

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    attachListeners();
    
    // MutationObserver to attach listeners to newly added elements (like Next.js route changes)
    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-[#F5F0E8] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-[#F5F0E8]/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference flex items-center justify-center hidden md:flex" 
      >
        <span ref={textRef} className="text-[10px] font-mono text-white opacity-0 uppercase tracking-widest font-bold whitespace-nowrap" />
      </div>
    </>
  );
}
