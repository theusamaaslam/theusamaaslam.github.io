import * as k from './anatomy/iso-kit.mjs';

export function homeSystem(){
  const board={x:-190,y:-85,w:390,d:225,r:6};
  const P=k.fitProjection([...k.boxCorners(board,0,9),...k.boxCorners({x:-154,y:-53,w:315,d:120},9,103)],640,440,{pad:25,azimuth:48,elevation:30});
  const at=p=>k.iso(p,P);
  const S=(x,y,w,d,z,h,cls='')=>k.solidSvg(k.slabOf({x,y,w,d,r:Math.min(2,w/5,d/5)},z,h,P,4,.7),{tone:'mid',crease:'lo',className:cls});
  const face=(x,y,z,w,h,cls)=>`<path class="${cls}" d="${k.pathOf([[x,y,z],[x+w,y,z],[x+w,y,z+h],[x,y,z+h]].map(at),true)}"/>`;
  const D=(p,r=1.5)=>{const [x,y]=at(p);return `<circle class="home-led" cx="${x}" cy="${y}" r="${r}"/>`;};
  let body=[[-178,-73],[176,-73],[-178,116],[176,116]].sort((a,b)=>k.depthOf([...a,0],P)-k.depthOf([...b,0],P)).map(([x,y])=>S(x,y,12,12,0,4,'carrier-foot')).join('');
  body+=S(board.x,board.y,board.w,board.d,4,5,'carrier');
  body+=k.lineSvg(k.planOutline(k.insetPlan(board,6),9,P),{tone:'lo'});
  const traces=[
    [[-115,63,9.1],[-115,95,9.1],[22,95,9.1],[22,25,9.1]],
    [[22,-23,9.1],[22,-64,9.1],[125,-64,9.1],[125,-3,9.1]],
  ];
  traces.forEach((points,i)=>{
    body+=k.lineSvg(k.pathOf(points.map(at)),{className:'home-trace',tone:'mid'});
    body+=points.filter((_,j)=>j===0||j===points.length-1).map(p=>D(p,2)).join('');
    body+=`<path class="home-live-route" data-home-route="${i}" d="${k.pathOf(points.map(at))}"/><circle class="home-packet" data-home-packet="${i}" r="3.5"/>`;
  });
  const assemblies=[];
  const add=(layer,p,art)=>assemblies.push({depth:k.depthOf(p,P),art:`<g data-home-part="${layer}"${layer===0?' data-active':''}>${art}</g>`});
  let conversation=S(-155,29,86,43,9,4)+S(-124,35,22,15,13,16)+S(-156,20,88,14,29,64,'conversation-screen');
  conversation+=face(-151,34.1,35,78,52,'home-glass');
  conversation+=face(-144,34.2,69,49,6,'home-message')+face(-132,34.2,57,47,6,'home-message')+face(-144,34.2,45,36,6,'home-message');
  conversation+=D([-79,34.3,32],1.2);
  // A seated display mount and key bed make the interface a physical console.
  conversation+=S(-145,51,66,17,13,2,'console-keybed');
  for(let row=0;row<2;row++)for(let col=0;col<9;col++)conversation+=S(-141+col*6.6,54+row*5.5,4.5,3.5,15,1.4,'console-key');
  conversation+=S(-116,65,27,2.5,15,1.4,'console-key');
  add(0,[-113,40,50],conversation);
  let processor=S(-22,-25,88,61,9,5,'processor-board');
  for(let i=0;i<5;i++){
    processor+=S(-10+i*14,-34,7,9,10,3,'processor-pin');processor+=S(-10+i*14,36,7,9,10,3,'processor-pin');
    processor+=S(-31,-18+i*11,9,6,10,3,'processor-pin');processor+=S(66,-18+i*11,9,6,10,3,'processor-pin');
  }
  processor+=S(-3,-12,49,37,14,17,'processor-package');
  for(let i=0;i<3;i++)processor+=S(2+i*2,-8+i*2,39-i*4,29-i*4,31+i*3,3,'compute-layer');
  processor+=S(12,0,20,13,40,1.4,'processor-core');
  processor+=D([22,6,41.5],2);
  add(1,[23,5,30],processor);
  let server=S(94,-48,69,58,9,4)+S(98,-45,61,50,13,83,'server-case');
  for(let row=0;row<3;row++){
    const z=22+row*23;
    server+=face(103,5.1,z,51,18,'home-server-bay');
    server+=face(109,5.2,z+5,29,2,'home-server-vent')+face(109,5.2,z+10,29,2,'home-server-vent');
    server+=D([147,5.3,z+9],1.4);
    server+=face(104,5.4,z+3,1.8,12,'home-server-handle');
    server+=D([151,5.4,z+3],.55)+D([151,5.4,z+15],.55);
  }
  server+=k.lineSvg(k.planOutline({x:106,y:-37,w:45,d:34,r:1},96,P),{tone:'mid'});
  add(2,[128,-20,55],server);
  body+=assemblies.sort((a,b)=>a.depth-b.depth).map(item=>item.art).join('');
  // Direct, readable labels connect the controls to the drawn assemblies.
  const labels=[{p:[-113,28,108],name:'Conversation'},{p:[22,6,57],name:'Intelligence'},{p:[128,-20,112],name:'Infrastructure'}];
  body+=labels.map(({p,name},i)=>{const [x,y]=at(p);return `<text class="home-part-label" data-home-label="${i}" x="${x}" y="${y-8}" text-anchor="middle">${name}</text>`;}).join('');
  return k.figureSvg({width:640,height:440,label:'An interconnected AI carrier board with a conversation interface, compute processor, and inference server. Select Conversation, Intelligence, or Infrastructure below to explore Usama’s work at that layer.',body,className:'home-system-svg'});
}
