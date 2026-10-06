const $=id=>document.getElementById(id);
const controls={temp:$('temp'),rain:$('rain'),sun:$('sun'),plants:$('plants'),herb:$('herb'),pred:$('pred')};
const outputs={temp:$('tempOut'),rain:$('rainOut'),sun:$('sunOut'),plants:$('plantOut'),herb:$('herbOut'),pred:$('predOut')};
const presets={
 balanced:{temp:24,rain:65,sun:70,plants:500,herb:80,pred:12},
 drought:{temp:28,rain:25,sun:82,plants:500,herb:80,pred:12},
 warming:{temp:34,rain:55,sun:72,plants:500,herb:80,pred:12},
 predators:{temp:24,rain:65,sun:70,plants:500,herb:80,pred:0}
};
let lastResult=null, log=[];
function sync(){outputs.temp.textContent=controls.temp.value+'°C';outputs.rain.textContent=controls.rain.value+'%';outputs.sun.textContent=controls.sun.value+'%';outputs.plants.textContent=controls.plants.value;outputs.herb.textContent=controls.herb.value;outputs.pred.textContent=controls.pred.value}
Object.values(controls).forEach(x=>x.addEventListener('input',sync));
document.querySelectorAll('.preset').forEach(btn=>btn.addEventListener('click',()=>{const p=presets[btn.dataset.preset];Object.keys(p).forEach(k=>controls[k].value=p[k]);document.querySelectorAll('.preset').forEach(b=>b.classList.remove('active'));btn.classList.add('active');sync()}));
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function simulate(){
 const c={temp:+controls.temp.value,rain:+controls.rain.value,sun:+controls.sun.value,plants:+controls.plants.value,herb:+controls.herb.value,pred:+controls.pred.value};
 let P=c.plants,H=c.herb,R=c.pred;const data=[{P,H,R}];
 for(let day=1;day<=100;day++){
   const climate=clamp(1-Math.abs(c.temp-24)/22,0,1)*.55+(c.rain/100)*.25+(c.sun/100)*.20;
   const plantGrowth=.11*climate*P*(1-P/1000);
   const herbFood=.00042*P*H;
   const predation=.0018*H*R;
   const plantLoss=.00022*P*H;
   P=clamp(P+plantGrowth-plantLoss,1,1200);
   H=clamp(H+.00075*herbFood-.018*H-predation*.18,0,400);
   R=clamp(R+.006*predation-.025*R,0,100);
   data.push({P,H,R});
 }
 const final=data[100],avgP=data.reduce((a,x)=>a+x.P,0)/data.length,avgH=data.reduce((a,x)=>a+x.H,0)/data.length,avgR=data.reduce((a,x)=>a+x.R,0)/data.length;
 const swing=(Math.max(...data.map(x=>x.P))-Math.min(...data.map(x=>x.P)))/Math.max(avgP,1);
 const survival=(final.P>20?35:10)+(final.H>5?35:10)+(c.pred===0?15:(final.R>1?20:5));
 const stability=Math.round(clamp(survival-(swing*20),0,100));
 return {data,final,stability,c};
}
function draw(result){
 const canvas=$('chart'),ctx=canvas.getContext('2d'),W=canvas.clientWidth,H=360,dpr=devicePixelRatio||1;canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
 ctx.clearRect(0,0,W,H);ctx.strokeStyle='#244336';ctx.lineWidth=1;
 for(let i=0;i<5;i++){const y=30+i*(H-65)/4;ctx.beginPath();ctx.moveTo(45,y);ctx.lineTo(W-15,y);ctx.stroke()}
 const max=Math.max(...result.data.flatMap(x=>[x.P,x.H*4,x.R*8]),100);
 const series=[['P','#65e6a2',x=>x.P],['H','#e7d77a',x=>x.H*4],['R','#ef8d8d',x=>x.R*8]];
 series.forEach(([key,color,fn])=>{ctx.beginPath();result.data.forEach((x,i)=>{const px=45+i*(W-60)/100,py=H-35-(fn(x)/max)*(H-70);i?ctx.lineTo(px,py):ctx.moveTo(px,py)});ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.stroke()});
 ctx.fillStyle='#718c7d';ctx.font='10px Segoe UI';ctx.fillText('Day 0',45,H-14);ctx.fillText('Day 100',W-58,H-14);
}
function update(result){
 $('dayHero').textContent='100';$('plantNow').textContent=Math.round(result.final.P);$('herbNow').textContent=Math.round(result.final.H);$('predNow').textContent=Math.round(result.final.R);$('stability').textContent=result.stability+'%';
 $('stabilityText').textContent=result.stability>=70?'stable':result.stability>=45?'under pressure':'unstable';
 $('resultTag').textContent='COMPLETE';
 let title='A balanced ecosystem',text='Populations remain viable under these conditions.';
 if(result.c.rain<40){title='Rainfall is the pressure point';text='Low rainfall reduces plant growth. Herbivores then lose food, showing how a climate change can propagate through a food web.'}
 else if(result.c.temp>30){title='Heat is stressing the system';text='The model moves conditions away from the plant temperature optimum. Lower plant growth eventually affects consumers.'}
 else if(result.c.pred===0){title='Removing predators changes the food web';text='Without predators, herbivores face less pressure. Their increase can intensify plant consumption and destabilize the system.'}
 else if(result.stability>=75){title='A resilient food web';text='The populations fluctuate but remain connected by feedback loops between resources, consumers and predators.'}
 $('insightTitle').textContent=title;$('insightText').textContent=text;draw(result);
}
function run(){lastResult=simulate();update(lastResult);addLog(lastResult)}
function addLog(r){const item={time:new Date().toLocaleString(),stability:r.stability,P:Math.round(r.final.P),H:Math.round(r.final.H),R:Math.round(r.final.R),hyp:$('hypothesis').value.trim()};log.unshift(item);renderLog()}
function renderLog(){$('log').innerHTML=log.length?log.map(x=>'<div class="log-item"><div class="date">'+x.time+'</div><div><strong>Plants '+x.P+' · Herbivores '+x.H+' · Predators '+x.R+'</strong><span>'+((x.hyp)||'No hypothesis recorded')+'</span></div><b>'+x.stability+'%</b></div>').join(''):'<div class="empty">No experiments recorded yet. Run a simulation to create your first result.</div>'}
$('runBtn').addEventListener('click',run);$('resetBtn').addEventListener('click',()=>{Object.keys(presets.balanced).forEach(k=>controls[k].value=presets.balanced[k]);document.querySelectorAll('.preset').forEach(b=>b.classList.toggle('active',b.dataset.preset==='balanced'));sync();lastResult=null;$('dayHero').textContent='0';$('resultTag').textContent='READY'});
$('saveBtn').addEventListener('click',()=>{if(lastResult)addLog(lastResult);else alert('Run an experiment first.')});$('clearLog').addEventListener('click',()=>{log=[];renderLog()});window.addEventListener('resize',()=>{if(lastResult)draw(lastResult)});sync();renderLog();