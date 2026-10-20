// Hardware modules illustrate software roles, not company equipment.
import { hardware } from './support-hardware.mjs';
const escape=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const text=(x,y,value,cls='map-copy')=>`<text x="${x}" y="${y}" class="${cls}">${escape(value)}</text>`;
const moduleNode=({id,x,y,w,h,title,eyebrow,kind,lines=[]})=>{
 const interactive=id?`data-machine-part="${id}" data-select-component="${id}" role="button" tabindex="0" aria-pressed="false" aria-label="Explore ${title}" aria-controls="support-${id}"`:'';
 const scale=Math.min(w/220,1),offset=(w-220*scale)/2,labelY=165*scale+22;
 return `<g class="diagram-node ${id?'interactive-node':''}" ${interactive} transform="translate(${x} ${y})"><rect class="node-body" width="${w}" height="${h}" rx="12"/><g transform="translate(${offset} 0) scale(${scale})">${hardware(kind)}</g>${text(w/2,labelY,title,'map-title')}${text(w/2,labelY+21,eyebrow,'map-eyebrow')}${lines.map((line,i)=>text(w/2,labelY+43+i*20,line)).join('')}</g>`;
};
function routes(paths,prefix){
  return `<defs><marker id="${prefix}-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto-start-reverse"><path d="M0 0 7 3.5 0 7Z" class="map-arrow"/></marker></defs>`+paths.map(({d,label,x,y,route,both=false})=>`<g><path d="${d}" class="support-route" ${route!==undefined?`data-route="${route}"`:''} marker-end="url(#${prefix}-arrow)" ${both?`marker-start="url(#${prefix}-arrow)"`:''}/>${label?text(x,y,label,'map-edge-label'):''}${route!==undefined?`<circle class="support-pulse" data-pulse-route="${route}" r="5"/>`:''}</g>`).join('');
}
export function supportFigure({mobile=false}={}){
 const prefix=mobile?'support-phone':'support-wide';let body='';
 if(mobile){
 body=routes([
 {d:'M195 226V272',label:'WhatsApp messages',x:208,y:254,both:true},
 {d:'M195 526V575',label:'AI routing / handover',x:207,y:556,route:2,both:true},
 {d:'M95 900V861H125V829',label:'Context',x:27,y:853,route:0,both:true},
 {d:'M295 900V861H265V829',label:'Tools',x:309,y:853,route:1,both:true}],prefix);
 body+=moduleNode({x:55,y:10,w:280,h:216,title:'WhatsApp',eyebrow:'CUSTOMER CONVERSATIONS',kind:'user'});
 body+=moduleNode({id:'dsm',x:45,y:272,w:300,h:254,title:'DSM agent dashboard',eyebrow:'MESSAGING & HUMAN OPERATIONS',kind:'dsm',lines:['Queues · agents · reports']});
 body+=moduleNode({id:'chat',x:45,y:575,w:300,h:254,title:'AI support chatbot',eyebrow:'REASON · RETRIEVE · ACT',kind:'chat',lines:['Connected through DSM']});
 body+=moduleNode({id:'rag',x:8,y:900,w:174,h:250,title:'LightRAG',eyebrow:'KNOWLEDGE ENGINE',kind:'rag',lines:['Custom ingestion','Custom retrieval']});
 body+=moduleNode({id:'mcp',x:208,y:900,w:174,h:250,title:'Central MCP',eyebrow:'INTEGRATION SERVER',kind:'mcp',lines:['Legacy systems','Checks & troubleshooting']});
 }else{
 body=routes([
 {d:'M195 474H285',label:'Messages',x:207,y:451,both:true},
 {d:'M530 474H630',label:'AI routing',x:547,y:451,route:2,both:true},
 {d:'M752 274V360',label:'Retrieve context',x:770,y:323,route:0,both:true},
 {d:'M975 474H875',label:'Tool calls',x:895,y:451,route:1,both:true},
 {d:'M1090 614V700',label:'Legacy APIs',x:1106,y:664,both:true},
 {d:'M530 151H630',label:'Ingestion',x:545,y:129}],prefix);
 body+=moduleNode({x:285,y:20,w:245,h:254,title:'Support knowledge',eyebrow:'CONTENT PREPARATION',kind:'source',lines:['Organizational knowledge']});
 body+=moduleNode({id:'rag',x:630,y:20,w:245,h:254,title:'LightRAG',eyebrow:'KNOWLEDGE ENGINE',kind:'rag',lines:['Custom ingestion & retrieval']});
 body+=moduleNode({x:10,y:360,w:185,h:254,title:'WhatsApp',eyebrow:'CUSTOMER CHANNEL',kind:'user',lines:['Questions & service issues']});
 body+=moduleNode({id:'dsm',x:285,y:360,w:245,h:254,title:'DSM agent dashboard',eyebrow:'MESSAGING & HUMAN OPERATIONS',kind:'dsm',lines:['Queues · agents · reporting']});
 body+=moduleNode({id:'chat',x:630,y:360,w:245,h:254,title:'AI support chatbot',eyebrow:'REASON · RETRIEVE · ACT',kind:'chat',lines:['Knowledge & live tool use']});
 body+=moduleNode({id:'mcp',x:975,y:360,w:230,h:254,title:'Central MCP server',eyebrow:'TOOLS & INTEGRATION',kind:'mcp',lines:['Checks & troubleshooting']});
 body+=moduleNode({x:975,y:700,w:230,h:254,title:'Legacy systems',eyebrow:'CUSTOMER BACKENDS',kind:'legacy',lines:['Connected tools & services']});
 body+=text(405,657,'Conversation routing · human handover · shared context','map-flow-note');
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mobile?'390 1180':'1240 985'}" class="support-machine iso ${mobile?'support-map-mobile':'support-map-desktop'}" role="group" aria-label="Support infrastructure: WhatsApp connects to DSM. DSM routes conversations to the chatbot or human agents. LightRAG and MCP connect to the chatbot; MCP connects legacy customer systems. Select a labeled module to explore.">${body}</svg>`;
}
