import { gsap } from 'gsap';

export function mountHome(){
  const root=document.querySelector<HTMLElement>('[data-home-system]');
  if(!root)return ()=>{};
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const buttons=[...root.querySelectorAll<HTMLButtonElement>('[data-home-layer]')];
  const parts=[...root.querySelectorAll<SVGGElement>('[data-home-part]')];
  const captions=[
    'Support and voice agents connect a customer’s question to knowledge, tools, and a useful next step.',
    'Retrieval, memory, and Urdu speech turn models into capabilities people can use.',
    'Inference, connected tools, and reliable infrastructure carry the work into production.',
  ];
  const cases=[['/work/customer-support/','Explore customer support'],['/work/urdu-speech/','Meet Ghalib'],['/work/nayacode/','Explore NayaCode']];
  let active=0,visible=true,visibilityAt=-1;
  const select=(index:number)=>{
    active=index;
    const label=document.querySelector('[data-work-layer]');
    if(label)label.textContent=['Conversation','Intelligence','Infrastructure'][index];
    document.querySelectorAll<HTMLElement>('[data-project-layer]').forEach(project=>project.toggleAttribute('data-layer-match',Number(project.dataset.projectLayer)===index));
    buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    parts.forEach(part=>part.toggleAttribute('data-active',Number(part.dataset.homePart)===index));
    root.querySelector('.layer-description')!.textContent=captions[index];
    const link=root.querySelector<HTMLAnchorElement>('[data-home-case]')!;
    link.href=cases[index][0];link.firstChild!.textContent=cases[index][1]+' ';
    root.querySelectorAll<SVGTextElement>('[data-home-label]').forEach(label=>label.toggleAttribute('data-active',Number(label.dataset.homeLabel)===index));
  };
  const listeners=buttons.map((button,index)=>{const action=()=>select(index);button.addEventListener('click',action);return ()=>button.removeEventListener('click',action);});
  const packets=[...root.querySelectorAll<SVGCircleElement>('[data-home-packet]')];
  const paths=packets.map(packet=>root.querySelector<SVGPathElement>(`[data-home-route="${packet.dataset.homePacket}"]`)!);
  const lengths=paths.map(path=>path.getTotalLength());
  const tick=(time:number)=>{
    if(time-visibilityAt>.25){const bounds=root.getBoundingClientRect();visible=bounds.bottom>0&&bounds.top<innerHeight;visibilityAt=time;}
    packets.forEach((packet,i)=>{
      const moving=visible&&!document.hidden&&!media.matches&&(active===1||(active===0&&i===0)||(active===2&&i===1));
      packet.style.opacity=moving?'1':'0';if(!moving)return;
      const point=paths[i].getPointAtLength(((time*.1+i*.4)%1)*lengths[i]);
      packet.setAttribute('cx',String(point.x));packet.setAttribute('cy',String(point.y));
    });
  };
  select(0);gsap.ticker.add(tick);
  return ()=>{listeners.forEach(fn=>fn());gsap.ticker.remove(tick);};
}
