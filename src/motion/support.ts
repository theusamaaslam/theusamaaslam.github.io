import { gsap } from 'gsap';

export function mountSupport() {
  const root=document.querySelector<HTMLElement>('[data-support-explorer]');
  if(!root)return ()=>{};
  const cleanup:(()=>void)[]=[];
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const buttons=[...root.querySelectorAll<HTMLButtonElement>('[data-component]')];
  const details=[...root.querySelectorAll<HTMLElement>('[data-component-detail]')];
  const parts=[...root.querySelectorAll<SVGGElement>('[data-machine-part]')];
  const readout=root.querySelector<HTMLElement>('[data-machine-readout]')!;
  const status=root.querySelector<HTMLElement>('[data-walk-step]')!;
  const play=root.querySelector<HTMLButtonElement>('[data-walk-play]')!;
  const select=root.querySelector<HTMLSelectElement>('#support-scenario')!;
  const scenarios:Record<string,[string,string][]>={
    knowledge:[['dsm','DSM receives the customer’s WhatsApp message.'],['chat','DSM routes the question to the support chatbot.'],['rag','LightRAG retrieves relevant organizational knowledge.'],['chat','Chatbot uses that context to prepare the response.'],['dsm','The reply reaches the customer through DSM and WhatsApp.']],
    troubleshoot:[['dsm','DSM receives and routes the WhatsApp conversation.'],['chat','Chatbot gathers the customer’s symptoms and context.'],['rag','Custom retrieval supplies relevant troubleshooting knowledge.'],['mcp','Central MCP tools check live customer systems.'],['chat','Chatbot combines the findings and guides troubleshooting.'],['dsm','DSM delivers the response and retains the conversation context.']],
    handover:[['dsm','DSM receives the customer’s WhatsApp conversation.'],['chat','Chatbot establishes the issue and attempts to help.'],['mcp','Connected tools help investigate the customer’s issue.'],['dsm','DSM assigns the conversation to a human agent.'],['dsm','The agent continues with shared context, queues, and reporting.']],
  };
  let step=0,playing=false,visible=false,last=0,elapsed=0,active='chat',visibilityAt=-1;
  const activate=(id:string)=>{
    active=id;
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.component===id)));
    details.forEach(panel=>panel.hidden=panel.dataset.componentDetail!==id);
    parts.forEach(part=>{part.toggleAttribute('data-active',part.dataset.machinePart===id);part.setAttribute('aria-pressed',String(part.dataset.machinePart===id));});
    const button=buttons.find(b=>b.dataset.component===id)!;
    readout.textContent=`${button.querySelector('span')!.textContent} / ${button.childNodes[1].textContent}`;
  };
  const setPlay=(value:boolean)=>{
    playing=value&&!media.matches;elapsed=0;
    play.setAttribute('aria-pressed',String(playing));
    play.textContent=media.matches?'Advance walkthrough':playing?'Pause walkthrough':'Play walkthrough';
    // Automatic steps should not repeatedly interrupt screen-reader reading.
    status.setAttribute('aria-live',playing?'off':'polite');
  };
  const showStep=()=>{
    const sequence=scenarios[select.value];
    activate(sequence[step][0]);
    status.textContent=`${step+1} / ${sequence.length} · ${sequence[step][1]}`;
  };
  const listen=(el:EventTarget,type:string,action:EventListener)=>{el.addEventListener(type,action);cleanup.push(()=>el.removeEventListener(type,action));};
  buttons.forEach(button=>listen(button,'click',()=>{setPlay(false);activate(button.dataset.component!);}));
  parts.forEach(part=>{
    const action=()=>{setPlay(false);activate(part.dataset.machinePart!);};
    listen(part,'click',action);
    listen(part,'keydown',event=>{const key=(event as KeyboardEvent).key;if(key==='Enter'||key===' '){event.preventDefault();action();}});
  });
  listen(select,'change',()=>{setPlay(false);step=0;showStep();});
  listen(root.querySelector('[data-walk-next]')!,'click',()=>{setPlay(false);step=(step+1)%scenarios[select.value].length;showStep();});
  listen(play,'click',()=>{if(media.matches){step=(step+1)%scenarios[select.value].length;showStep();}else setPlay(!playing);});
  const onMotion=()=>{if(media.matches)setPlay(false);play.textContent=media.matches?'Advance walkthrough':playing?'Pause walkthrough':'Play walkthrough';};
  listen(media,'change',onMotion);onMotion();showStep();
  const pulses=[...root.querySelectorAll<SVGCircleElement>('[data-pulse-route]')];
  const paths=pulses.map(pulse=>pulse.closest('svg')!.querySelector<SVGPathElement>(`[data-route="${pulse.dataset.pulseRoute}"]`)!);
  const lengths=paths.map(path=>path.getTotalLength());
  const tick=(time:number)=>{
    // Recheck bounds sparingly: the panel height changes as components are selected.
    // This also handles restored scroll positions without stale observer state.
    if(time-visibilityAt>.25){const bounds=root.getBoundingClientRect();visible=bounds.bottom>0&&bounds.top<innerHeight;visibilityAt=time;}
    const delta=last?Math.min(time-last,.1):0;last=time;
    const motion=visible&&!document.hidden&&!media.matches;
    if(motion&&playing){elapsed+=delta;if(elapsed>5.5){elapsed=0;step=(step+1)%scenarios[select.value].length;showStep();}}
    const route=active==='rag'?0:active==='mcp'?1:active==='dsm'?2:1;
    pulses.forEach((pulse,i)=>{
      const selected=route===Number(pulse.dataset.pulseRoute);
      pulse.style.opacity=motion&&selected?'1':'0';
      if(!motion||!selected)return;
      const point=paths[i].getPointAtLength(((time*.16)%1)*lengths[i]);
      pulse.setAttribute('cx',String(point.x));pulse.setAttribute('cy',String(point.y));
    });
  };
  gsap.ticker.add(tick);
  const input=document.querySelector<HTMLInputElement>('#support-volume')!;
  const number=new Intl.NumberFormat('en-US');
  listen(input,'input',()=>{
    const volume=Number(input.value),handovers=Math.round(volume*.205),without=volume-handovers;
    document.querySelector('[data-volume]')!.textContent=number.format(volume);
    document.querySelector('[data-without]')!.textContent=`≈${number.format(without)}`;
    document.querySelector('[data-handovers]')!.textContent=`≈${number.format(handovers)}`;
    document.querySelector('[data-projection-status]')!.textContent=`At ${number.format(volume)} monthly conversations: approximately ${number.format(handovers)} human handovers.`;
  });
  return ()=>{cleanup.forEach(fn=>fn());gsap.ticker.remove(tick);};
}
