import * as k from './anatomy/iso-kit.mjs';

// Distinct hardware illustrations for the software's actual responsibilities.
// Labels outside the art describe software, not the company's physical equipment.
const P=k.fitProjection(k.boxCorners({x:-74,y:-52,w:148,d:104},0,112),220,165,{pad:5,azimuth:48,elevation:30});
const at=p=>k.iso(p,P);
const S=(x,y,w,d,z,h,cls='')=>k.solidSvg(k.slabOf({x,y,w,d,r:1.8},z,h,P,4,.7),{tone:'mid',crease:'lo',className:cls});
const face=(x,y,z,w,h,cls='hw-panel')=>`<path class="${cls}" d="${k.pathOf([[x,y,z],[x+w,y,z],[x+w,y,z+h],[x,y,z+h]].map(at),true)}"/>`;
const dot=(p,r=1.4)=>{const [x,y]=at(p);return `<circle class="hw-led" cx="${x}" cy="${y}" r="${r}"/>`;};
const base=()=>S(-70,-46,140,92,0,5,'hw-base')+k.lineSvg(k.planOutline({x:-64,y:-40,w:128,d:80,r:2},5,P),{tone:'mid'});
export function hardware(kind){
  let art=base();
  if(kind==='mcp'||kind==='legacy'){
    const rack=(x,y,z,w=63,d=45,h=87)=>{
      let body=S(x,y,w,d,z,h,'hw-rack');
      for(let i=0;i<3;i++){
        const level=z+12+i*24;
        body+=face(x+5,y+d+.1,level,w-10,18,'hw-bay');
        body+=face(x+10,y+d+.2,level+5,w-33,2,'hw-vent');
        body+=face(x+10,y+d+.2,level+10,w-33,2,'hw-vent');
        body+=dot([x+w-12,y+d+.3,level+9]);
      }
      body+=k.lineSvg(k.planOutline({x:x+8,y:y+8,w:w-16,d:d-16,r:1},z+h,P),{tone:'mid'});
      return body;
    };
    if(kind==='mcp')art+=rack(-31,-22,5);
    else {art+=S(-49,-28,83,56,5,23,'hw-rack');art+=S(-43,-23,72,47,28,22,'hw-rack');art+=S(-36,-18,59,37,50,21,'hw-rack');for(let i=0;i<3;i++)art+=dot([20-i*5,28-i*5,17+i*23]);}
  }else if(kind==='chat'){
    art+=S(-45,-30,90,60,5,7,'hw-board');
    for(let i=0;i<5;i++){
      art+=S(-32+i*14,-39,7,10,7,3,'hw-pin');art+=S(-32+i*14,30,7,10,7,3,'hw-pin');
      art+=S(-55,-24+i*11,10,6,7,3,'hw-pin');art+=S(45,-24+i*11,10,6,7,3,'hw-pin');
    }
    art+=S(-25,-21,50,42,12,18,'hw-processor');
    art+=S(-18,-15,36,30,30,2,'hw-core');
    // A conversation hologram anchored to the AI processor.
    art+=face(-22,10,48,47,44,'hw-hologram');
    art+=face(-14,10.1,75,30,3,'hw-message');
    art+=face(-14,10.1,66,23,3,'hw-message');
    art+=face(-5,10.1,57,21,3,'hw-message');
    const tether=k.pathOf([at([0,10,32]),at([0,10,48])]);
    art+=`<path d="${tether}" class="hw-beam"/>`;
  }else if(kind==='rag'){
    for(let i=0;i<3;i++){
      art+=S(-42+i*4,-29+i*3,84-i*8,58-i*6,5+i*13,5,'hw-index');
      if(i<2)art+=S(-6,-5,12,10,10+i*13,8,'hw-support');
    }
    const points=[[-28,16,62],[0,16,83],[29,16,62],[0,16,46],[-14,16,102],[23,16,103]];
    for(const [a,b] of [[0,1],[1,2],[2,3],[3,0],[1,4],[4,5],[5,1]]){
      art+=`<path class="hw-graph-link" d="${k.pathOf([at(points[a]),at(points[b])])}"/>`;
    }
    art+=points.map(p=>dot(p,3)).join('');
  }else if(kind==='dsm'){
    art+=S(-17,-12,34,24,5,16,'hw-support');
    art+=S(-57,-16,114,17,21,63,'hw-display');
    art+=face(-51,1.1,27,102,51,'hw-glass');
    art+=face(-48,1.2,30,21,44,'hw-sidebar');
    for(let row=0;row<3;row++){
      art+=face(-18,1.3,63-row*12,58,7,'hw-queue');
      art+=dot([-38,1.4,65-row*12],2.5);
    }
  }else if(kind==='user'){
    art+=S(-23,-13,46,13,5,93,'hw-phone');
    art+=face(-19,.1,14,38,74,'hw-glass');
    art+=face(-16,.2,62,29,15,'hw-chat-in');art+=face(-10,.2,38,26,15,'hw-chat-out');
    art+=dot([0,.3,10],1.5);
  }else{
    for(let i=0;i<3;i++)art+=S(-35+i*5,-22+i*3,70-i*10,44-i*6,5+i*9,7,'hw-index');
    art+=face(-22,12,38,44,48,'hw-hologram');
    for(let i=0;i<3;i++)art+=face(-15,12.1,73-i*11,29,3,'hw-message');
  }
  return art;
}
