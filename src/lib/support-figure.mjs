import * as k from './anatomy/iso-kit.mjs';

// A physical metaphor, built once at compile time; no private system topology.
export function supportFigure() {
  const bench = {x:-235,y:-110,w:500,d:280,r:7};
  const P=k.fitProjection([...k.boxCorners(bench,0,18),...k.boxCorners({x:-205,y:-65,w:440,d:200},18,146)],960,590,{pad:25,azimuth:45,elevation:32});
  const at=p=>k.iso(p,P);
  const S=(x,y,w,d,z,h,cls='',inner='')=>k.solidSvg(k.slabOf({x,y,w,d,r:Math.min(2,w/6,d/6)},z,h,P,4,.5),{tone:'mid',crease:'lo',className:cls,inner});
  const flat=(points,cls='')=>`<path class="surface-mark ${cls}" d="${k.pathOf(points.map(at),true)}"/>`;
  const front=(x,y,z,w,h,cls='')=>flat([[x,y,z],[x+w,y,z],[x+w,y,z+h],[x,y,z+h]],cls);
  const rim=k.lineSvg(k.planOutline(k.insetPlan(bench,6),18,P),{tone:'lo'});
  const feet=[[-220,-95],[235,-95],[-220,145],[235,145]].sort((a,b)=>k.depthOf([...a,0],P)-k.depthOf([...b,0],P)).map(([x,y])=>S(x,y,15,15,0,10)).join('');
  const base=feet+S(bench.x,bench.y,bench.w,bench.d,10,8,'bench',rim);
  // Printed conductive tracks, closed loops with terminal pads, not loose wires.
  const routes=[
    [[-160,10,18.2],[-160,82,18.2],[88,82,18.2],[88,12,18.2]],
    [[-35,8,18.2],[-35,62,18.2],[68,62,18.2],[68,12,18.2]],
    [[108,13,18.2],[127,13,18.2],[127,115,18.2],[175,115,18.2]],
  ];
  const tracks=routes.map((route,i)=>{
    const endpoints=[route[0],route.at(-1)];
    const dots=endpoints.map(p=>{const [x,y]=at(p);return `<circle class="route-terminal" cx="${x}" cy="${y}" r="3"/>`;}).join('');
    const path=k.pathOf(route.map(at));
    const [a,b]=[route[1],route[2]].map(at),dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len;
    const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    const arrow=k.pathOf([[mx+ux*6,my+uy*6],[mx-ux*5-uy*3.5,my-uy*5+ux*3.5],[mx-ux*5+uy*3.5,my-uy*5-ux*3.5]],true);
    return `<g>${dots}<path class="iso-line support-route" data-route="${i}" d="${path}"/><path class="route-arrow" d="${arrow}"/><circle class="support-pulse" data-pulse-route="${i}" r="4" cx="${at(route[0])[0]}" cy="${at(route[0])[1]}"/></g>`;
  }).join('');
  const assemblies=[];
  const add=(id,point,body)=>assemblies.push({depth:k.depthOf(point,P),body:`<g data-machine-part="${id}">${body}</g>`});
  let cabinet=S(-205,-65,90,76,18,5)+S(-202,-62,84,70,23,93);
  for(let i=0;i<3;i++){
    cabinet+=S(-198,7,76,3,30+i*27,22,'drawer');
    cabinet+=S(-173,10,26,4,40+i*27,3,'handle');
    cabinet+=S(-193,-52+i*5,61,41,116+i*2.5,2,'document');
  }
  cabinet+=k.dotsSvg([at([-197,10,110]),at([-124,10,110])],{size:1,tone:'hi'});
  add('rag',[-160,-28,70],cabinet);
  let rack=S(-80,-68,88,76,18,5)+S(-77,-65,82,70,23,68);
  for(let row=0;row<3;row++){
    rack+=S(-73,5,74,3,29+row*19,15,'panel');
    for(let port=0;port<2;port++)rack+=front(-65+port*22,8.1,34+row*19,16,7,'socket');
    rack+=k.dotsSvg([at([-8,8.2,37+row*19])],{size:1.5,tone:'hi'});
  }
  rack+=k.lineSvg(k.planOutline({x:-67,y:-54,w:62,d:45,r:1},91,P),{tone:'lo'});
  add('mcp',[-36,-30,55],rack);
  function terminal(id,x,y,dashboard){
    let body=S(x+13,y+4,52,35,18,3)+S(x+33,y+12,12,14,21,31);
    body+=S(x,y,78,20,52,75,'monitor');
    body+=front(x+5,y+20.1,59,68,61,'glass');
    // Closed shapes in the monitor face read as messages / queue rows.
    for(let i=0;i<3;i++)body+=front(x+10+(dashboard?0:i%2*13),y+20.2,103-i*15,dashboard?53:42-i*5,8,'screen-content');
    body+=S(x-2,y+36,82,39,18,3,'keyboard');
    for(let row=0;row<3;row++)for(let col=0;col<4;col++)body+=S(x+4+col*18,y+41+row*10,14,7,21,2,'key');
    body+=k.dotsSvg([at([x+69,y+20.3,55])],{size:1.2,tone:'hi'});
    add(id,[x+39,y+25,70],body);
  }
  terminal('chat',48,-62,false);
  terminal('dsm',150,53,true);
  const markers=[[-160,-28,139],[-36,-30,110],[87,-40,148],[189,75,148]].map((p,i)=>{const [x,y]=at(p);return `<g class="machine-marker" transform="translate(${x} ${y})"><circle r="20"/><text text-anchor="middle" dominant-baseline="central">0${i+1}</text></g>`;}).join('');
  const body=base+tracks+assemblies.sort((a,b)=>a.depth-b.depth).map(a=>a.body).join('')+markers;
  return k.figureSvg({width:960,height:590,label:'Illustrated support workbench: LightRAG knowledge cabinet, MCP integration rack, chatbot terminal and DSM operator terminal. Explore each component using the buttons below.',body,className:'support-machine'});
}
