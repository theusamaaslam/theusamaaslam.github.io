import { gsap } from 'gsap';
import Lenis from 'lenis';
import { mountSupport } from './support';
import { mountHome } from './home';
let started = false;
let dispose: (() => void) | undefined;
const descriptions = [
  'A useful answer starts with understanding the person on the other end.',
  'Models, memory, and retrieval turn a request into an informed next step.',
  'Inference, tools, and reliable infrastructure make the answer useful in practice.',
];

function onPage() {
  dispose?.();
  const cleanups: (()=>void)[]=[];
  cleanups.push(mountSupport());
  cleanups.push(mountHome());
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let lenis: Lenis | undefined;
  let animationContext: gsap.Context | undefined;
  let signalClock: ((time:number)=>void) | undefined;
  let tick: ((time:number)=>void) | undefined;
  let observer: IntersectionObserver | undefined;
  const configureMotion=()=>{
    lenis?.destroy();
    if(tick) gsap.ticker.remove(tick);
    if(signalClock) gsap.ticker.remove(signalClock);
    observer?.disconnect();
    animationContext?.revert();
    if(media.matches) return;
    // Section links use native hash navigation; competing anchor handlers can
    // update the URL while leaving Lenis at the previous scroll position.
    lenis = new Lenis({duration:0.85, smoothWheel:true, anchors:false});
    tick=(time)=>lenis?.raf(time*1000);
    gsap.ticker.add(tick);
    animationContext=gsap.context(()=>{
      gsap.from('.hero h1,.case-header h1,.not-found h1',{y:18,opacity:.65,duration:.65,ease:'power3.out',clearProps:'all'});
    });
    const packets=document.querySelectorAll<SVGCircleElement>('.signal-packet');
    const states=new Map<SVGCircleElement,boolean>();
    observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      entry.target.querySelectorAll<SVGCircleElement>('.signal-packet').forEach(p=>states.set(p,entry.isIntersecting));
    }));
    document.querySelectorAll('.signal-figure').forEach(el=>observer?.observe(el));
    signalClock=(time)=>{
      if(document.hidden)return;
      packets.forEach((packet,i)=>{
        if(!states.get(packet))return;
        const path=packet.closest('svg')?.querySelector<SVGPathElement>('.signal-route');
        if(!path)return;
        const point=path.getPointAtLength(((time*.085+i*.19)%1)*path.getTotalLength());
        packet.setAttribute('cx',String(point.x));packet.setAttribute('cy',String(point.y));
      });
    };
    gsap.ticker.add(signalClock);
  };
  configureMotion();
  media.addEventListener('change',configureMotion);
  cleanups.push(()=>media.removeEventListener('change',configureMotion));

  const layerButtons=document.querySelectorAll<HTMLButtonElement>('[data-layer]');
  layerButtons.forEach(button=>{
    const action=()=>{
      layerButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      const index=Number(button.dataset.layer);
      const text=document.querySelector('.layer-description');
      if(text)text.textContent=descriptions[index];
      const drawing=document.querySelector('.hero-system svg');
      if(drawing){
        drawing.setAttribute('data-active-layer',String(index));
        const route=drawing.querySelector('.signal-route');
        if(route){
          const paths=['M70 205H180V99H300V205H410V311H530','M70 205H180V311H300V99H410V205H530','M70 205H300V311H410V99H530'];
          route.setAttribute('d',paths[index]);
          if(!media.matches)gsap.fromTo(route,{opacity:.25},{opacity:1,duration:.35,ease:'power3.out'});
        }
      }
    };
    button.addEventListener('click',action);cleanups.push(()=>button.removeEventListener('click',action));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button=>{
    const action=()=>{
      document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      let count=0;
      document.querySelectorAll<HTMLElement>('.project[data-category]').forEach(project=>{
        const show=button.dataset.filter==='all'||button.dataset.filter===project.dataset.category;
        project.hidden=!show;if(show)count++;
      });
      const label=document.querySelector('.project-count');if(label)label.textContent=`${count} ${count===1?'project':'projects'}`;
    };
    button.addEventListener('click',action);cleanups.push(()=>button.removeEventListener('click',action));
  });
  dispose=()=>{
    cleanups.forEach(fn=>fn());lenis?.destroy();if(tick)gsap.ticker.remove(tick);if(signalClock)gsap.ticker.remove(signalClock);observer?.disconnect();animationContext?.revert();gsap.killTweensOf('.signal-route');
  };
}
export function start(){
  if(started)return;started=true;
  // Static pages keep navigation and scroll restoration with the browser.
  onPage();
  window.addEventListener('pagehide',()=>dispose?.());
  window.addEventListener('pageshow',event=>{if(event.persisted)onPage();});
}
