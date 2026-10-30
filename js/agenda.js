
"use strict";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* Qui dentro arrivano nomi e note scritti dai clienti: passa tutto da esc(),
   altrimenti uno che si chiama <img onerror=...> farebbe girare codice nella TUA dashboard. */
const esc=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=n=>Number.isFinite(+n)?+n:0;
const API=location.origin+"/api";
let TOKEN="";
try{TOKEN=localStorage.getItem("agenda_token")||"";}catch(e){}
TOKEN=new URLSearchParams(location.search).get("token")||TOKEN;
let DATI={prenotazioni:[],regole:null};
let ANNO=String(new Date().getFullYear());
let VISTA="panoramica";
const GG=["dom","lun","mar","mer","gio","ven","sab"];
const GGL=["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
const TEMI={vino:"Vino",bolle:"Champagne",fort:"Fortificati"};
const MESI=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];

const fEuro=new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0});
const euro=n=>fEuro.format(Math.round(num(n)));
const fEuroC=new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:2});
const euroC=n=>fEuroC.format(num(n));   /* per i piccoli importi, con i centesimi */
const corto=n=>{n=Math.round(num(n));return n>=1000?(Math.round(n/100)/10).toLocaleString("it-IT")+"k":String(n);};
const oggi=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Berlin"}).format(new Date());
const dUTC=iso=>{const[y,m,d]=String(iso).split("-").map(Number);return new Date(Date.UTC(y,(m||1)-1,d||1));};
const piuGiorni=(iso,n)=>{const d=dUTC(iso);d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
const giornoSett=iso=>dUTC(iso).getUTCDay();
const dataBreve=iso=>{const d=dUTC(iso);return `${GG[d.getUTCDay()]} ${d.getUTCDate()} ${MESI[d.getUTCMonth()]}`;};
const dataLunga=iso=>dUTC(iso).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});

function avvisa(t){const a=$("#avviso");a.textContent=t;a.classList.add("on");clearTimeout(a._t);a._t=setTimeout(()=>a.classList.remove("on"),2600);}

/* ---------- dal server ---------- */
async function chiama(metodo,corpo,query=""){
  let r;
  try{
    r=await fetch(`${API}/agenda${query}`,{method:metodo,cache:"no-store",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+TOKEN},
      body:corpo?JSON.stringify(corpo):undefined});
  }catch(e){avvisa("Niente connessione, riprova");return null;}
  if(r.status===401){try{localStorage.removeItem("agenda_token");}catch(e){}TOKEN="";mostraPorta();avvisa("Password non valida");return null;}
  if(r.status===429){avvisa("Troppi tentativi, aspetta un minuto");return null;}
  try{return await r.json();}catch(e){return null;}
}

/* ---------- le regole del gioco ---------- */
const R=()=>DATI.regole||{};
const POSTI=()=>num(R().posti)||40;
const CONTI=()=>{const c=R().conti||{};return{viniSerata:5,limiteKU:25000,obiettivoMese:0,...c,
  ml:{vino:100,bolle:100,fort:50,...(c.ml||{})},bottiglia:{vino:15,bolle:18,fort:15,...(c.bottiglia||{})}};};
const temaDi=p=>p.tema||(R().temi||{})[giornoSett(p.data)]||"vino";
const pagata=p=>p.stato==="confermata"||p.stato==="pagata";
const inAttesa=p=>p.stato==="tenuta"&&p.occupa!==false;
const viva=p=>pagata(p)||inAttesa(p);
const pax=p=>Math.max(1,Math.round(num(p.persone)||1));
const chiave=p=>p.data+" "+p.ora;
/* Per il Kleinunternehmer conta quando i soldi entrano: la data della conferma. */
const dataIncasso=p=>String(p.confermataIl||p.pagatoIl||p.creata||p.data).slice(0,10);

/* Le serate dei prossimi giorni, anche quelle ancora vuote. */
function serateFuture(giorni){
  const o=oggi(),fine=piuGiorni(o,giorni),r=R(),mappa=new Map();
  for(let g=o;g<=fine;g=piuGiorni(g,1)){
    if((r.chiusure||[]).includes(g))continue;
    for(const ora of ((r.settimana||{})[giornoSett(g)]||[]))
      mappa.set(g+" "+ora,{data:g,ora,tema:(r.temi||{})[giornoSett(g)]||"vino",pren:[]});
  }
  for(const p of DATI.prenotazioni){
    if(p.data<o||p.data>fine)continue;
    if(!viva(p))continue;
    const k=chiave(p);
    if(!mappa.has(k))mappa.set(k,{data:p.data,ora:p.ora,tema:temaDi(p),pren:[]});
    mappa.get(k).pren.push(p);
  }
  return [...mappa.values()].sort((a,b)=>(a.data+a.ora).localeCompare(b.data+b.ora)).map(s=>conta(s));
}
function conta(s){
  s.pagati=s.pren.filter(pagata).reduce((n,p)=>n+pax(p),0);
  s.attesa=s.pren.filter(inAttesa).reduce((n,p)=>n+pax(p),0);
  s.ospiti=s.pagati+s.attesa;
  s.posti=POSTI();s.liberi=Math.max(0,s.posti-s.ospiti);
  s.incasso=s.pren.filter(pagata).reduce((n,p)=>n+num(p.totale),0);
  s.incassoAttesa=s.pren.filter(inAttesa).reduce((n,p)=>n+num(p.totale),0);
  return s;
}
/* Bottiglie da 0,75 l per ogni etichetta della serata, arrotondate in su: una bottiglia aperta si paga intera. */
function fabbisogno(ospiti,tema){
  const c=CONTI(),t=TEMI[tema]?tema:"vino";
  const perEtichetta=ospiti>0?Math.ceil(ospiti*num(c.ml[t])/750):0,bottiglie=perEtichetta*c.viniSerata;
  return{perEtichetta,bottiglie,vino:bottiglie*num(c.bottiglia[t])};
}

/* ================= GRAFICI (SVG disegnato a mano: niente librerie esterne) ================= */
function arrotonda(max){
  if(max<=0)return{max:100,passo:25};
  const grezzo=max/4,pot=Math.pow(10,Math.floor(Math.log10(grezzo))),n=grezzo/pot;
  const passo=(n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*pot;
  return{max:Math.ceil(max/passo)*passo,passo};
}
/* Rettangolo con 4px tondi solo dalla parte del dato, dritto sulla base. */
function barraV(x,y,w,h,tondo){
  if(h<=0)return"";const r=tondo?Math.min(4,h,w/2):0;
  return `M${x},${y+h}V${y+r}${r?`Q${x},${y} ${x+r},${y}`:""}H${x+w-r}${r?`Q${x+w},${y} ${x+w},${y+r}`:""}V${y+h}Z`;
}
function barraH(x,y,w,h,tondoDx,tondoSx){
  if(w<=0)return"";const r=Math.min(4,w/2,h/2),a=tondoSx?r:0,b=tondoDx?r:0;
  return `M${x+a},${y}H${x+w-b}${b?`Q${x+w},${y} ${x+w},${y+b}`:""}V${y+h-b}${b?`Q${x+w},${y+h} ${x+w-b},${y+h}`:""}H${x+a}${a?`Q${x},${y+h} ${x},${y+h-a}`:""}V${y+a}${a?`Q${x},${y} ${x+a},${y}`:""}Z`;
}
const larghezza=el=>Math.max(280,Math.floor(el.clientWidth||el.parentElement.clientWidth||600));

/* 1. Posti venduti per le prossime serate: barre orizzontali, pagati + in attesa + liberi */
function graficoRiempimento(el,serate){
  if(!serate.length){el.innerHTML=`<p class="vuoto">Nessuna serata in programma: controlla "Quando lavori" nelle impostazioni.</p>`;return;}
  const W=larghezza(el),stretto=W<480,eti=stretto?92:176,dx=52,riga=stretto?44:38,bh=14;
  const x0=eti,pw=W-eti-dx,H=serate.length*riga+4;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">`;
  serate.forEach((v,i)=>{
    const y=i*riga+(riga-bh)/2,k=pw/v.posti;
    const w1=v.pagati*k,w2=v.attesa*k,libero=Math.max(0,pw-w1-w2);
    const ty=i*riga+riga/2;
    s+=`<text class="lab" x="0" y="${stretto?ty-3:ty+4}">${esc(dataBreve(v.data))}</text>`;
    s+=`<text class="lab2" x="${stretto?0:90}" y="${stretto?ty+12:ty+4}">${esc(TEMI[v.tema]||v.tema)}${v.ora!=="18:00"?" · "+esc(v.ora):""}</text>`;
    s+=`<g data-gruppo="${i}">`;
    /* binario dei posti liberi (tono chiaro); le parti piene ci stanno dentro, separate da 2px */
    s+=`<clipPath id="cr${i}"><path d="${barraH(x0,y,pw,bh,true,true)}"/></clipPath><path class="tr" d="${barraH(x0,y,pw,bh,true,true)}"/>`;
    const gap=2;
    s+=`<g clip-path="url(#cr${i})">`;
    if(w1>0)s+=`<rect class="c1" x="${x0}" y="${y}" width="${Math.max(0,w1-(w2>0||libero>0?gap:0))}" height="${bh}"/>`;
    if(w2>0)s+=`<rect class="c2" x="${x0+w1}" y="${y}" width="${Math.max(0,w2-(libero>0?gap:0))}" height="${bh}"/>`;
    s+=`</g>`;
    s+=`<text class="forte" x="${W}" y="${ty+4}" text-anchor="end">${v.ospiti}/${v.posti}</text>`;
    const tv=`${v.ospiti} su ${v.posti} posti`;
    const tl=`${dataLunga(v.data)} · ${TEMI[v.tema]||v.tema}`;
    s+=`<rect class="hit" x="0" y="${i*riga}" width="${W}" height="${riga}" tabindex="0" data-tv="${esc(tv)}" data-tl="${esc(tl)}" data-k1="${v.pagati} pagati" data-k2="${v.attesa} in attesa" data-k3="${v.liberi} liberi" data-g="${i}"/>`;
    s+=`</g>`;
  });
  el.innerHTML=s+"</svg>";
  el.setAttribute("aria-label",`Posti venduti nelle prossime ${serate.length} serate`);
}

/* 2. Incassi per mese: colonne impilate pagato + in attesa, con l'obiettivo come riga sottile */
function graficoMesi(el,mesi,obiettivo){
  const W=larghezza(el),H=Math.round(Math.min(260,Math.max(190,W*.42))),sx=42,basso=26,alto=18;
  const pw=W-sx,ph=H-basso-alto;
  const massimo=Math.max(obiettivo||0,...mesi.map(m=>m.pagato+m.attesa));
  const sc=arrotonda(massimo),y=v=>alto+ph-(v/sc.max)*ph;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">`;
  for(let v=0;v<=sc.max+0.001;v+=sc.passo){
    s+=`<line class="${v===0?"base":"griglia-l"}" x1="${sx}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/>`;
    s+=`<text x="${sx-8}" y="${y(v)+4}" text-anchor="end">${corto(v)}</text>`;
  }
  const banda=pw/mesi.length,bw=Math.min(24,banda*.62);
  const top=mesi.reduce((b,m,i)=>m.pagato+m.attesa>(mesi[b].pagato+mesi[b].attesa)?i:b,0);
  const mo=oggi().slice(0,7);
  mesi.forEach((m,i)=>{
    const cx=sx+banda*i+banda/2,x=cx-bw/2,tot=m.pagato+m.attesa;
    s+=`<g data-gruppo="m${i}">`;
    const h1=(m.pagato/sc.max)*ph,h2=(m.attesa/sc.max)*ph;
    if(h1>0)s+=`<path class="c1" d="${barraV(x,alto+ph-h1,bw,h1,h2<=0)}"/>`;
    if(h2>0)s+=`<path class="c2" d="${barraV(x,alto+ph-h1-h2,bw,Math.max(0,h2-(h1>0?2:0)),true)}"/>`;
    /* un'etichetta sola sul mese migliore e su quello in corso, il resto nel tooltip e nella tabella */
    if(tot>0&&(i===top||m.chiave===mo))s+=`<text class="forte" x="${cx}" y="${alto+ph-h1-h2-6}" text-anchor="middle">${corto(tot)}</text>`;
    const passo=mesi.length>8&&W<520?2:1;
    if(i%passo===0||m.chiave===mo)s+=`<text x="${cx}" y="${H-8}" text-anchor="middle" class="${m.chiave===mo?"forte":""}">${MESI[+m.chiave.slice(5)-1]}</text>`;
    s+=`<rect class="hit" x="${sx+banda*i}" y="${alto}" width="${banda}" height="${ph}" tabindex="0" data-tv="${esc(euro(tot))}" data-tl="${esc(m.nome)}" data-k1="${esc(euro(m.pagato))} pagato" data-k2="${esc(euro(m.attesa))} in attesa" data-g="m${i}"/>`;
    s+=`</g>`;
  });
  if(obiettivo>0){
    s+=`<line class="obiettivo" x1="${sx}" x2="${W}" y1="${y(obiettivo)}" y2="${y(obiettivo)}"/>`;
    s+=`<text x="${W}" y="${y(obiettivo)-5}" text-anchor="end">obiettivo ${corto(obiettivo)}</text>`;
  }
  if(massimo<=0)s+=`<text class="lab2" x="${sx+pw/2}" y="${alto+ph/2}" text-anchor="middle">Ancora nessun incasso in questo periodo</text>`;
  el.innerHTML=s+"</svg>";
  el.setAttribute("aria-label","Incassi mese per mese");
}

/* 3. Ospiti medi per tema: una serie sola, un colore solo */
function graficoTemi(el,righe){
  if(!righe.some(r=>r.serate)){el.innerHTML=`<p class="vuoto">Ancora nessuna serata in questo periodo.</p>`;return;}
  const W=larghezza(el),eti=92,dx=40,riga=46,bh=14,pw=W-eti-dx,H=righe.length*riga;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">`;
  righe.forEach((r,i)=>{
    const ty=i*riga+riga/2,y=ty-bh/2-4,w=r.media/POSTI()*pw;
    s+=`<text class="lab" x="0" y="${ty}">${esc(r.nome)}</text>`;
    s+=`<text class="lab2" x="0" y="${ty+14}">${r.serate} ${r.serate===1?"serata":"serate"}</text>`;
    s+=`<clipPath id="ct${i}"><path d="${barraH(eti,y,pw,bh,true,true)}"/></clipPath><path class="tr" d="${barraH(eti,y,pw,bh,true,true)}"/>`;
    if(w>0)s+=`<path class="c1" clip-path="url(#ct${i})" d="${barraH(eti,y,Math.min(w,pw),bh,true,false)}"/>`;
    s+=`<text class="forte" x="${W}" y="${ty}" text-anchor="end">${r.serate?Math.round(r.media):"—"}</text>`;
    s+=`<rect class="hit" x="0" y="${i*riga}" width="${W}" height="${riga}" tabindex="0" data-tv="${r.serate?Math.round(r.media)+" ospiti a serata":"nessuna serata"}" data-tl="${esc(r.nome)}" data-k1="${esc(euro(r.incasso))} incassati" data-k2="${r.ospiti} ospiti in tutto"/>`;
  });
  el.innerHTML=s+"</svg>";
  el.setAttribute("aria-label","Ospiti medi per serata, per tema");
}

/* Tooltip unico: valore in evidenza, poi l'etichetta. Testo inserito con textContent. */
const tip=$("#tip");
function mostraTip(t,cx,cy){
  tip.replaceChildren();
  const b=document.createElement("b");b.textContent=t.dataset.tv;tip.append(b);
  const sp=document.createElement("span");sp.textContent=t.dataset.tl;tip.append(sp);
  [["k1","var(--s1)"],["k2","var(--s2)"],["k3","var(--track)"]].forEach(([k,c])=>{
    if(!t.dataset[k])return;const d=document.createElement("div");d.className="k";
    const i=document.createElement("i");i.style.background=c;d.append(i,document.createTextNode(t.dataset[k]));tip.append(d);
  });
  tip.classList.add("on");
  const r=tip.getBoundingClientRect();
  let x=cx+14,y=cy+14;
  if(x+r.width>innerWidth-8)x=cx-r.width-14;
  if(y+r.height>innerHeight-8)y=cy-r.height-14;
  tip.style.left=Math.max(8,x)+"px";tip.style.top=Math.max(8,y)+"px";
  $$(".grafico g.su").forEach(g=>g.classList.remove("su"));
  t.closest("g")?.classList.add("su");
}
function nascondiTip(){tip.classList.remove("on");$$(".grafico g.su").forEach(g=>g.classList.remove("su"));}
document.addEventListener("pointermove",e=>{
  const t=e.target.closest?.(".grafico [data-tv]");
  if(t)mostraTip(t,e.clientX,e.clientY);else if(tip.classList.contains("on")&&e.pointerType==="mouse")nascondiTip();
});
document.addEventListener("pointerdown",e=>{const t=e.target.closest?.(".grafico [data-tv]");if(t)mostraTip(t,e.clientX,e.clientY);else nascondiTip();});
document.addEventListener("focusin",e=>{const t=e.target.closest?.(".grafico [data-tv]");if(t){const r=t.getBoundingClientRect();mostraTip(t,r.left+r.width/2,r.top);}});
document.addEventListener("focusout",nascondiTip);
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches&&e.target.matches("[data-vsel]")){e.preventDefault();e.target.dispatchEvent(new MouseEvent("click",{bubbles:true}));}});
addEventListener("scroll",nascondiTip,{passive:true});

/* ================= PANORAMICA ================= */
function disegnaPanoramica(){
  const c=CONTI(),o=oggi();
  /* ---- prossime serate ---- */
  const prossime=serateFuture(35).slice(0,10);
  $("#posti-lbl").textContent=POSTI();
  $("#prox-sotto").textContent=prossime.length?`da ${dataBreve(prossime[0].data)} a ${dataBreve(prossime[prossime.length-1].data)}`:"";
  graficoRiempimento($("#g-riemp"),prossime);
  $("#t-riemp").innerHTML=tabella(["Serata","Tema","Pagati","In attesa","Liberi"],
    prossime.map(v=>[dataBreve(v.data)+" · "+v.ora,TEMI[v.tema]||v.tema,v.pagati,v.attesa,v.liberi]),[0,0,1,1,1]);

  const quattro=serateFuture(28);
  const osp=quattro.reduce((n,v)=>n+v.ospiti,0);
  const bott=quattro.reduce((n,v)=>n+fabbisogno(v.ospiti,v.tema).bottiglie,0);
  const vino=quattro.reduce((n,v)=>n+fabbisogno(v.ospiti,v.tema).vino,0);
  const capienza=quattro.reduce((n,v)=>n+v.posti,0);
  $("#bisogno-tiles").innerHTML=
    tessera("Ospiti nelle prossime 4 settimane",String(osp),capienza?`${Math.round(osp/capienza*100)} % dei ${capienza} posti`:"")+
    tessera("Bottiglie da preparare",String(bott),`${c.viniSerata} calici a testa · ${c.ml.vino} ml (fortificati ${c.ml.fort} ml)`)+
    tessera("Vino da pagare a Partenope",euro(vino),osp?`${euroC(vino/osp)} a ospite in media`:"");
  $("#bisogno-sotto").textContent="Conta anche chi deve ancora fare il bonifico. I numeri si cambiano in Impostazioni.";
  const righeB=prossime.filter(v=>v.ospiti>0);
  $("#t-bisogno").innerHTML=righeB.length?tabella(
    ["Serata","Ospiti","Bottiglie","Per etichetta","Vino","Incasso","Margine"],
    righeB.map(v=>{const fb=fabbisogno(v.ospiti,v.tema),inc=v.incasso+v.incassoAttesa;
      return[`${dataBreve(v.data)} · ${TEMI[v.tema]||v.tema}`,v.ospiti,fb.bottiglie,fb.perEtichetta,euro(fb.vino),euro(inc),euro(inc-fb.vino)];}),
    [0,1,1,1,1,1,1],
    ["Totale",righeB.reduce((n,v)=>n+v.ospiti,0),righeB.reduce((n,v)=>n+fabbisogno(v.ospiti,v.tema).bottiglie,0),"",
     euro(righeB.reduce((n,v)=>n+fabbisogno(v.ospiti,v.tema).vino,0)),euro(righeB.reduce((n,v)=>n+v.incasso+v.incassoAttesa,0)),
     euro(righeB.reduce((n,v)=>n+v.incasso+v.incassoAttesa-fabbisogno(v.ospiti,v.tema).vino,0))],[3,5])
    :`<p class="vuoto">Ancora nessun ospite nelle prossime serate.</p>`;

  /* ---- i conti, per anno ---- */
  const anni=[...new Set([String(new Date().getFullYear()),...DATI.prenotazioni.map(p=>String(p.data).slice(0,4))])].filter(a=>/^\d{4}$/.test(a)).sort();
  if(!anni.includes(ANNO)&&ANNO!=="tutto")ANNO=anni[anni.length-1];
  $("#anni").innerHTML=[...anni,"tutto"].map(a=>`<button aria-pressed="${a===ANNO}" data-anno="${a}">${a==="tutto"?"Tutto":a}</button>`).join("");
  const nel=p=>ANNO==="tutto"||String(p.data).startsWith(ANNO);
  const P=DATI.prenotazioni.filter(p=>nel(p));
  const pag=P.filter(pagata),att=P.filter(inAttesa);
  const incassato=pag.reduce((n,p)=>n+num(p.totale),0),attesa=att.reduce((n,p)=>n+num(p.totale),0);
  const ospitiPag=pag.reduce((n,p)=>n+pax(p),0);
  /* serate svolte: quelle già passate con almeno un ospite pagato */
  const perSerata=new Map();
  for(const p of P){if(!viva(p))continue;const k=chiave(p);if(!perSerata.has(k))perSerata.set(k,{data:p.data,ora:p.ora,tema:temaDi(p),pren:[]});perSerata.get(k).pren.push(p);}
  const tutte=[...perSerata.values()].map(conta);
  const vinoPagato=tutte.reduce((n,v)=>n+fabbisogno(v.pagati,v.tema).vino,0);
  const utile=incassato-vinoPagato;
  $("#hero").innerHTML=`<span>Incassato ${ANNO==="tutto"?"in tutto":"nel "+esc(ANNO)}</span><b>${euro(incassato)}</b>
    <p>${attesa>0?`+ ${euro(attesa)} in attesa di bonifico · `:""}${euro(utile)} restano dopo il vino</p>`;
  const svolte=tutte.filter(s=>s.data<o&&s.pagati>0);
  const riemp=svolte.length?svolte.reduce((n,s)=>n+s.pagati/s.posti,0)/svolte.length:0;
  const medioSerata=svolte.length?svolte.reduce((n,s)=>n+s.incasso,0)/svolte.length:0;
  $("#kpi").innerHTML=
    tessera("Ospiti che hanno pagato",ospitiPag.toLocaleString("it-IT"),`${pag.length} prenotazioni`)+
    tessera("Serate svolte",String(svolte.length),svolte.length?`${Math.round(riemp*100)} % di sala piena in media`:"ancora nessuna")+
    tessera("Incasso medio a serata",svolte.length?euro(medioSerata):"—",svolte.length?`${euro(ospitiPag?incassato/ospitiPag:0)} a ospite`:"")+
    tessera("Vino pagato a Partenope",euro(vinoPagato),ospitiPag?`${euroC(vinoPagato/ospitiPag)} a ospite`:"");

  disegnaKU(anni);

  /* mesi da mostrare */
  let mesi=[];
  if(ANNO==="tutto"){
    const date=DATI.prenotazioni.filter(viva).map(p=>p.data.slice(0,7)).sort();
    const da=date[0]||o.slice(0,7),a=date[date.length-1]||o.slice(0,7);
    let [y,m]=da.split("-").map(Number);
    while(`${y}-${String(m).padStart(2,"0")}`<=a&&mesi.length<60){mesi.push(`${y}-${String(m).padStart(2,"0")}`);m++;if(m>12){m=1;y++;}}
  }else for(let m=1;m<=12;m++)mesi.push(`${ANNO}-${String(m).padStart(2,"0")}`);
  const datiMesi=mesi.map(k=>{const q=P.filter(p=>p.data.startsWith(k));
    return{chiave:k,nome:`${MESI[+k.slice(5)-1]} ${k.slice(0,4)}`,pagato:q.filter(pagata).reduce((n,p)=>n+num(p.totale),0),attesa:q.filter(inAttesa).reduce((n,p)=>n+num(p.totale),0)};});
  $("#leg-obiettivo").hidden=!(c.obiettivoMese>0);
  graficoMesi($("#g-mesi"),datiMesi,c.obiettivoMese);
  $("#t-mesi").innerHTML=tabella(["Mese","Pagato","In attesa","Totale"],
    datiMesi.map(m=>[m.nome,euro(m.pagato),euro(m.attesa),euro(m.pagato+m.attesa)]),[0,1,1,1],
    ["Totale",euro(datiMesi.reduce((n,m)=>n+m.pagato,0)),euro(datiMesi.reduce((n,m)=>n+m.attesa,0)),euro(datiMesi.reduce((n,m)=>n+m.pagato+m.attesa,0))]);

  const temiRighe=Object.keys(TEMI).map(t=>{const q=tutte.filter(s=>s.tema===t);
    return{nome:TEMI[t],serate:q.length,ospiti:q.reduce((n,s)=>n+s.ospiti,0),media:q.length?q.reduce((n,s)=>n+s.ospiti,0)/q.length:0,incasso:q.reduce((n,s)=>n+s.incasso,0)};});
  graficoTemi($("#g-temi"),temiRighe);
  $("#t-temi").innerHTML=tabella(["Tema","Serate","Ospiti","Media","Incassato"],
    temiRighe.map(r=>[r.nome,r.serate,r.ospiti,r.serate?Math.round(r.media):"—",euro(r.incasso)]),[0,1,1,1,1]);
}

const ICONE={
  ok:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  att:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v5M12 16.5v.5"/><path d="M10.3 3.9L2.6 17.5A2 2 0 004.3 20.5h15.4a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>`,
  stop:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.5"/></svg>`,
  banca:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>`,
  mega:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"/></svg>`,
  ora:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`
};

/* Il tetto del Kleinunternehmer conta l'anno solare e i soldi entrati. */
function disegnaKU(anni){
  const c=CONTI(),el=$("#ku");
  const anno=ANNO==="tutto"?String(new Date().getFullYear()):ANNO;
  const limite=c.limiteKU||25000;
  const entrati=DATI.prenotazioni.filter(p=>pagata(p)&&dataIncasso(p).startsWith(anno)).reduce((n,p)=>n+num(p.totale),0);
  const attesi=DATI.prenotazioni.filter(p=>inAttesa(p)&&p.data.startsWith(anno)).reduce((n,p)=>n+num(p.totale),0);
  const quota=entrati/limite,quotaTot=(entrati+attesi)/limite;
  const st=quota>=1?["ku-crit","stop","Limite superato"]:quota>=.9?["ku-crit","stop","Quasi al limite"]:quota>=.7?["ku-warn","att","Ti stai avvicinando"]:["ku-good","ok","Sotto il limite"];
  /* ritmo delle ultime 4 settimane, per stimare quando si arriva al tetto */
  const da=piuGiorni(oggi(),-28);
  const ritmo=DATI.prenotazioni.filter(p=>pagata(p)&&dataIncasso(p)>=da).reduce((n,p)=>n+num(p.totale),0)/4;
  let stima="";
  if(quota<1&&ritmo>0&&anno===String(new Date().getFullYear())){
    const settimane=(limite-entrati)/ritmo,giorno=piuGiorni(oggi(),Math.ceil(settimane*7));
    stima=giorno.startsWith(anno)
      ?`Al ritmo delle ultime 4 settimane (${euro(ritmo)} a settimana) arrivi al limite verso <b>${esc(dataLunga(giorno))}</b>.`
      :`Al ritmo delle ultime 4 settimane (${euro(ritmo)} a settimana) quest'anno resti sotto il limite.`;
  }
  const w1=Math.min(100,quota*100),w2=Math.max(0,Math.min(100-w1,(quotaTot-quota)*100));
  el.innerHTML=`<div class="testa"><div><h3>Limite Kleinunternehmer ${esc(anno)}</h3><p class="sotto">soldi entrati, per data di conferma</p></div>
      <span class="stato-ku ${st[0]}">${ICONE[st[1]]}${st[2]}</span></div>
    <p style="font-size:15px"><b style="font-size:22px">${euro(entrati)}</b> <span class="sotto">di ${euro(limite)} · ${Math.round(quota*100)} %</span></p>
    <div class="metro" role="img" aria-label="${Math.round(quota*100)} per cento del limite">${w1>0?`<i class="m1" style="width:${w1}%"></i>`:""}${w2>0?`<i class="m2" style="width:${w2}%"></i>`:""}</div>
    <div class="legenda"><span><i style="background:var(--s1)"></i>Entrati ${euro(entrati)}</span>${attesi?`<span><i style="background:var(--s2)"></i>In attesa ${euro(attesi)}</span>`:""}<span>Restano ${euro(Math.max(0,limite-entrati))}</span></div>
    ${stima?`<p class="nota">${stima}</p>`:""}
    <p class="nota">Oltre il limite la regola del Kleinunternehmer non vale più e scatta l'IVA. Non è una consulenza fiscale: verifica con il tuo Steuerberater.</p>`;
}

function tessera(etichetta,valore,sotto){
  return `<div class="tile"><span>${esc(etichetta)}</span><b>${esc(valore)}</b>${sotto?`<small>${esc(sotto)}</small>`:""}</div>`;
}
function tabella(teste,righe,numeriche,piede,nascondi=[]){
  const cl=i=>{const c=[numeriche&&numeriche[i]?"n":"",nascondi.includes(i)?"m-hide":""].filter(Boolean).join(" ");return c?` class="${c}"`:"";};
  return `<table class="tabella"><thead><tr>${teste.map((t,i)=>`<th${cl(i)}>${esc(t)}</th>`).join("")}</tr></thead>
    <tbody>${righe.map(r=>`<tr>${r.map((c,i)=>`<td${cl(i)}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
    ${piede?`<tfoot><tr>${piede.map((c,i)=>`<td${cl(i)}>${esc(c)}</td>`).join("")}</tr></tfoot>`:""}</table>`;
}

/* ================= SERATE ================= */
function pren(p,opzioni={}){
  const rif=esc(p.rif),stato=esc(p.stato),tel=esc(p.tel||"");
  const fatta=p.stato==="confermata"||p.stato==="pagata";
  const etichetta=stato==="tenuta"?"in attesa":stato.replace("_"," ");
  return `<details class="pren">
    <summary><span class="nome">${esc(p.nome)||"—"}</span><span class="stato s-${stato.replace(/[^a-z_]/g,"")}">${etichetta}</span>
      <span class="dx">${opzioni.data?esc(dataBreve(p.data))+" · ":""}${pax(p)} · ${euro(p.totale)}</span></summary>
    <div class="dentro">
      <p>${pax(p)} ${pax(p)===1?"persona":"persone"} · ${euro(p.totale)} · ${p.pagamento==="cash"?"contanti":p.pagamento==="card"?"carta":"bonifico"}${p.aMano?" · a mano":""}${opzioni.data?" · "+esc(dataLunga(p.data))+" "+esc(p.ora):""}</p>
      ${tel||p.email?`<p>${tel?`<a href="tel:${encodeURIComponent(p.tel)}">${tel}</a>`:""}${tel&&p.email?" · ":""}${p.email?`<a href="mailto:${encodeURIComponent(p.email)}">${esc(p.email)}</a>`:""}</p>`:""}
      ${p.note?`<p><i>${esc(p.note)}</i></p>`:""}
      <p class="piccolo">${rif}</p>
      <div class="azioni">
        ${!fatta&&p.stato!=="annullata"?`<button class="b si" data-conferma="${rif}">Bonifico arrivato</button>`:""}
        ${p.stato!=="annullata"&&p.stato!=="scaduta"?`<button class="b no" data-annulla="${rif}">Annulla</button>`:""}
      </div>
    </div>
  </details>`;
}
function disegnaSerate(){
  const serate=serateFuture(42);
  const aperte=new Set($$("#lista-serate details.ospiti[open]").map(d=>d.dataset.k));
  const primo=!$("#lista-serate").childElementCount;
  $("#lista-serate").innerHTML=serate.length?serate.map((v,i)=>{
    const d=dUTC(v.data),p1=v.pagati/v.posti*100,p2=v.attesa/v.posti*100;
    const fb=fabbisogno(v.ospiti,v.tema),k=esc(v.data+" "+v.ora);
    const apri=primo?i===0:aperte.has(v.data+" "+v.ora);
    return `<div class="serata" data-idx="${i}">
      <div class="testa">
        <div class="quando"><i>${GG[d.getUTCDay()]}</i><b>${d.getUTCDate()}</b><u>${MESI[d.getUTCMonth()]} · ${esc(v.ora)}</u></div>
        <div class="info">
          <b>${esc(TEMI[v.tema]||v.tema)}</b> <span class="sotto">· ${v.ospiti}/${v.posti} posti${v.attesa?` · ${v.attesa} in attesa`:""}</span>
          <div class="mini" aria-hidden="true">${p1>0?`<i class="m1" style="width:${p1}%"></i>`:""}${p2>0?`<i class="m2" style="width:${p2}%"></i>`:""}</div>
          ${v.ospiti?`<p class="piccolo" style="margin-top:6px">${fb.bottiglie} bottiglie · ${euro(fb.vino)} di vino · incasso ${euro(v.incasso+v.incassoAttesa)}</p>`:""}
        </div>
        ${v.pren.length?`<button class="b no-stampa" data-stampa="${i}" aria-label="Stampa la lista ospiti">Stampa</button>`:""}
      </div>
      ${v.pren.length?`<details class="ospiti" data-k="${k}"${apri?" open":""}><summary>${v.pren.length} ${v.pren.length===1?"prenotazione":"prenotazioni"}</summary>
        ${v.pren.slice().sort((a,b)=>String(a.nome).localeCompare(String(b.nome),"it")).map(p=>pren(p)).join("")}</details>`:""}
    </div>`;}).join(""):`<div class="card vuoto">Nessuna serata in programma.</div>`;

  const o=oggi();
  const archivio=DATI.prenotazioni.filter(p=>p.data<o||!viva(p)).sort((a,b)=>(b.data+b.ora).localeCompare(a.data+a.ora)).slice(0,60);
  $("#archivio").innerHTML=archivio.length?`<div class="serata">${archivio.map(p=>pren(p,{data:true})).join("")}</div>`:`<div class="card vuoto">Archivio vuoto.</div>`;
}

/* ================= DA FARE ================= */
function tempoRimasto(iso){
  const ms=Date.parse(iso)-Date.now();
  if(!Number.isFinite(ms))return["",""];
  if(ms<=0)return["t-poco","scaduto"];
  const h=ms/36e5;
  return [h<12?"t-poco":"t-ok",h<1?`${Math.max(1,Math.round(ms/6e4))} min`:h<48?`${Math.round(h)} h`:`${Math.round(h/24)} giorni`];
}
function disegnaDaFare(){
  const o=oggi();
  const attesa=DATI.prenotazioni.filter(inAttesa).sort((a,b)=>String(a.scade).localeCompare(String(b.scade)));
  const b=$("#badge");b.hidden=!attesa.length;b.textContent=attesa.length;
  $("#todo-bonifici").innerHTML=attesa.length?attesa.map(p=>{const[t,txt]=tempoRimasto(p.scade);
    return `<div class="todo"><div class="ico" style="color:var(--s2)">${ICONE.banca}</div><div class="cosa">
      <div class="su"><b>${euro(p.totale)} · ${esc(p.nome)||"—"}</b>${txt?`<span class="tempo ${t}">${txt==="scaduto"?"scaduto":"scade tra "+esc(txt)}</span>`:""}</div>
      <p>Causale <button class="copia" data-copia="${esc(p.rif)}" aria-label="Copia la causale ${esc(p.rif)}">${esc(p.rif)}</button> · ${esc(dataBreve(p.data))} · ${pax(p)} ${pax(p)===1?"persona":"persone"}</p>
      <div class="azioni"><button class="b si" data-conferma="${esc(p.rif)}">Bonifico arrivato</button><button class="b no" data-annulla="${esc(p.rif)}">Annulla</button></div>
    </div></div>`;}).join("")
    :`<p class="vuoto">Niente da controllare: tutti i bonifici sono arrivati.</p>`;

  const fra14=serateFuture(14).filter(v=>v.ospiti<v.posti/2);
  $("#todo-spingere").innerHTML=fra14.length?fra14.map(v=>`<div class="todo"><div class="ico" style="color:var(--s1)">${ICONE.mega}</div><div class="cosa">
      <b>${esc(dataLunga(v.data))} · ${esc(TEMI[v.tema]||v.tema)}</b>
      <p>${v.ospiti}/${v.posti} posti venduti: ne mancano ${v.liberi}. Una storia su Instagram o un messaggio ai clienti di Partenope aiuta.</p>
    </div></div>`).join(""):`<p class="vuoto">Tutte le serate dei prossimi 14 giorni sono almeno a metà sala.</p>`;

  const da=piuGiorni(o,-7);
  const scadute=DATI.prenotazioni.filter(p=>p.stato==="scaduta"&&String(p.scade||p.creata).slice(0,10)>=da&&p.data>=o);
  const prox=new Map(serateFuture(120).map(v=>[v.data+" "+v.ora,v]));
  $("#todo-scadute").innerHTML=scadute.length?scadute.map(p=>{const s=prox.get(chiave(p));const liberi=s?s.liberi:POSTI();
    return `<div class="todo"><div class="ico" style="color:var(--muted)">${ICONE.ora}</div><div class="cosa">
      <b>${esc(p.nome)||"—"} · ${euro(p.totale)}</b>
      <p>${esc(dataBreve(p.data))} · ${pax(p)} ${pax(p)===1?"persona":"persone"} · causale <button class="copia" data-copia="${esc(p.rif)}" aria-label="Copia la causale ${esc(p.rif)}">${esc(p.rif)}</button></p>
      <p class="piccolo">${liberi>=pax(p)?`Ci sono ancora ${liberi} posti liberi.`:`Attenzione: restano solo ${liberi} posti.`}</p>
      <div class="azioni"><button class="b si" data-conferma="${esc(p.rif)}">Bonifico arrivato</button>${p.tel?`<a class="b" href="tel:${encodeURIComponent(p.tel)}">Chiama</a>`:""}${p.email?`<a class="b" href="mailto:${encodeURIComponent(p.email)}">Scrivi</a>`:""}</div>
    </div></div>`;}).join(""):`<p class="vuoto">Nessuna prenotazione scaduta negli ultimi 7 giorni.</p>`;
}

/* ================= IMPOSTAZIONI ================= */
function disegnaImpostazioni(){
  const r=R(),c=CONTI();
  $("#c-obiettivo").value=c.obiettivoMese;$("#c-vini").value=c.viniSerata;$("#c-ku").value=c.limiteKU;
  for(const t of Object.keys(TEMI)){$("#c-ml-"+t).value=c.ml[t];$("#c-bt-"+t).value=c.bottiglia[t];}
  $("#settimana").innerHTML=[1,2,3,4,5,6,0].map(n=>`<label><b>${GG[n]}</b>
    <input type="text" inputmode="numeric" data-g="${n}" value="${esc(((r.settimana||{})[n]||[]).join(","))}" placeholder="—" aria-label="Ore di ${GGL[n]}">
    <select data-tema="${n}" aria-label="Tema di ${GGL[n]}">${Object.entries(TEMI).map(([k,v])=>`<option value="${k}"${((r.temi||{})[n]||"vino")===k?" selected":""}>${v}</option>`).join("")}</select></label>`).join("");
  $("#r-posti").value=POSTI();$("#r-anticipo").value=r.anticipoGiorni??1;$("#r-durata").value=r.durataMin??150;
  const ch=(r.chiusure||[]).filter(g=>/^\d{4}-\d{2}-\d{2}$/.test(g)&&g>=oggi());
  $("#chiusure").innerHTML=ch.length?ch.map(g=>`<span>${esc(dataBreve(g))} ${esc(g.slice(0,4))}<button data-apri="${esc(g)}" aria-label="Riapri ${esc(g)}">×</button></span>`).join("")
    :`<span style="background:none;padding-left:0;color:var(--muted)">Nessun giorno chiuso in arrivo.</span>`;
}


/* ================= VISITE ================= */
const NOMI_PAG={home:"Home",privati:"Per privati",ristoranti:"Per ristoranti",corso:"Corso e ripetizioni",info:"Info",contatto:"Richiedi una data",
  carrello:"Carrello",pagamento:"Pagamento",ticket:"Biglietto",impressum:"Impressum",datenschutz:"Datenschutz"};
const VIS={giorni:30,dati:null,live:null,sel:null};
let timerLive=null;
async function caricaVisite(){
  const d=await chiama("GET",null,`?vista=visite&giorni=${VIS.giorni}`);
  if(!d||!Array.isArray(d.giorni))return;
  VIS.dati=d.giorni;VIS.live=d.live;
  if(VIS.sel&&!VIS.dati.some(g=>g.giorno===VIS.sel))VIS.sel=null;
  if(VISTA==="visite")disegnaVisite();
  liveTab();
}
async function aggiornaLive(){
  const d=await chiama("GET",null,"?vista=live");
  if(!d||!d.live)return;
  VIS.live=d.live;if(VISTA==="visite")disegnaLive();liveTab();
}
function liveTab(){const t=$("#tab-live");if(t)t.hidden=!(VIS.live&&VIS.live.totale>0);}
/* "adesso sul sito" si aggiorna ogni 15 secondi, ma solo con la scheda Visite aperta davanti */
function avviaLive(){clearInterval(timerLive);timerLive=setInterval(()=>{if(!document.hidden&&VISTA==="visite")aggiornaLive();},15000);}

function disegnaLive(){
  const L=VIS.live||{totale:0,pagine:{}},n=num(L.totale);
  $("#live").innerHTML=`<span class="etichetta">Adesso sul sito</span>
    <div class="grande"><b class="n">${n}</b><i class="punto${n?"":" spento"}" aria-hidden="true"></i></div>
    <p class="sotto">${n===1?"persona":"persone"} negli ultimi 2 minuti · si aggiorna da solo ogni 15 secondi</p>`;
  const pag=Object.entries(L.pagine||{}).sort((a,b)=>b[1]-a[1]);
  const pagando=num((L.pagine||{}).pagamento);
  $("#live-pagine").innerHTML=`<h3>Su che pagina sono</h3>${pag.length
      ?`<div class="pill-pag">${pag.map(([p,c])=>`<span>${esc(NOMI_PAG[p]||p)}<b>${num(c)}</b></span>`).join("")}</div>`
      :`<p class="sotto" style="margin-top:8px">In questo momento non c'è nessuno.</p>`}
    ${pagando?`<p class="nota">${pagando===1?"Una persona sta pagando":pagando+" persone stanno pagando"} proprio adesso.</p>`:""}`;
}

/* Colonne con una serie sola. Tocchi una colonna: si vede il dettaglio (e, se previsto, si filtra quel giorno). */
function colonne(el,punti,o={}){
  const W=larghezza(el),H=o.altezza||Math.round(Math.min(230,Math.max(170,W*.34))),sx=34,basso=24,alto=20,pw=W-sx,ph=H-basso-alto;
  const max=Math.max(0,...punti.map(p=>p.v)),sc=arrotonda(Math.max(max,o.minimo||4)),y=v=>alto+ph-(v/sc.max)*ph;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">`;
  for(let v=0;v<=sc.max+0.001;v+=sc.passo){
    s+=`<line class="${v===0?"base":"griglia-l"}" x1="${sx}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/>`;
    s+=`<text x="${sx-8}" y="${y(v)+4}" text-anchor="end">${corto(v)}</text>`;
  }
  const banda=pw/punti.length,bw=Math.max(2,Math.min(24,banda*.64)),top=punti.reduce((b,p,i)=>p.v>punti[b].v?i:b,0);
  const passo=Math.max(1,Math.ceil(punti.length/Math.max(1,Math.floor(pw/46))));
  punti.forEach((p,i)=>{
    const cx=sx+banda*i+banda/2,x=cx-bw/2,h=(p.v/sc.max)*ph;
    const cl="c1"+(o.sel?(p.k===o.sel?" sel":" spento"):"");
    s+=`<g>`;
    if(h>0)s+=`<path class="${cl}" d="${barraV(x,alto+ph-h,bw,h,true)}"/>`;
    if(p.v>0&&(i===top||p.k===o.sel))s+=`<text class="forte" x="${cx}" y="${alto+ph-h-6}" text-anchor="middle">${corto(p.v)}</text>`;
    if(o.etichetteFisse?p.lab:(i%passo===0||p.k===o.oggi))s+=`<text x="${cx}" y="${H-7}" text-anchor="middle" class="${p.k===o.oggi?"forte":""}">${esc(p.lab)}</text>`;
    s+=`<rect class="hit" x="${sx+banda*i}" y="${alto}" width="${banda}" height="${ph}" tabindex="0" data-tv="${esc(p.tv)}" data-tl="${esc(p.tl)}"${p.k1?` data-k1="${esc(p.k1)}"`:""}${p.k2?` data-k2="${esc(p.k2)}"`:""}${o.clic?` data-vsel="${esc(p.k)}" role="button" aria-label="${esc(p.tl)}"`:""}/>`;
    s+=`</g>`;
  });
  if(max<=0)s+=`<text class="lab2" x="${sx+pw/2}" y="${alto+ph/2}" text-anchor="middle">${esc(o.vuoto||"Ancora nessun dato")}</text>`;
  el.innerHTML=s+"</svg>";
}
/* Barre orizzontali con una serie sola, su binario chiaro. */
function barre(el,righe,o={}){
  if(!righe.length){el.innerHTML=`<p class="vuoto">${esc(o.vuoto||"Ancora nessun dato")}</p>`;return;}
  if(o.sopra){
    const W=larghezza(el),riga=52,bh=14,H=righe.length*riga;
    let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">`;
    righe.forEach((r,i)=>{
      const y0=i*riga,yy=y0+24,w=r.max>0?Math.min(1,r.v/r.max)*W:0,id=(o.id||"b")+i;
      s+=`<text class="lab" x="0" y="${y0+15}">${esc(r.nome)}</text><text class="forte" x="${W}" y="${y0+15}" text-anchor="end">${esc(r.testo)}</text>`;
      s+=`<clipPath id="${id}"><path d="${barraH(0,yy,W,bh,true,true)}"/></clipPath><path class="tr" d="${barraH(0,yy,W,bh,true,true)}"/>`;
      if(w>0)s+=`<path class="c1" clip-path="url(#${id})" d="${barraH(0,yy,w,bh,true,false)}"/>`;
      s+=`<rect class="hit" x="0" y="${y0}" width="${W}" height="${riga}" tabindex="0" data-tv="${esc(r.tv)}" data-tl="${esc(r.tl||r.nome)}"${r.k1?` data-k1="${esc(r.k1)}"`:""}/>`;
    });
    el.innerHTML=s+"</svg>";return;
  }
  const W=larghezza(el),eti=o.eti||(W<480?118:156),dx=o.dx||92,riga=o.sotto?46:38,bh=14,pw=Math.max(40,W-eti-dx),H=righe.length*riga;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true">`;
  righe.forEach((r,i)=>{
    const ty=i*riga+riga/2,yy=ty-bh/2-(r.sotto?4:0),w=r.max>0?Math.min(1,r.v/r.max)*pw:0,id=(o.id||"b")+i;
    s+=`<text class="lab" x="0" y="${r.sotto?ty:ty+4}">${esc(r.nome)}</text>`;
    if(r.sotto)s+=`<text class="lab2" x="0" y="${ty+14}">${esc(r.sotto)}</text>`;
    s+=`<clipPath id="${id}"><path d="${barraH(eti,yy,pw,bh,true,true)}"/></clipPath><path class="tr" d="${barraH(eti,yy,pw,bh,true,true)}"/>`;
    if(w>0)s+=`<path class="c1" clip-path="url(#${id})" d="${barraH(eti,yy,w,bh,true,false)}"/>`;
    s+=`<text class="forte" x="${W}" y="${r.sotto?ty:ty+4}" text-anchor="end">${esc(r.testo)}</text>`;
    s+=`<rect class="hit" x="0" y="${i*riga}" width="${W}" height="${riga}" tabindex="0" data-tv="${esc(r.tv)}" data-tl="${esc(r.tl||r.nome)}"${r.k1?` data-k1="${esc(r.k1)}"`:""}/>`;
  });
  el.innerHTML=s+"</svg>";
}
const pct=(a,b)=>b?Math.round(a/b*100)+" %":"—";

function disegnaVisite(){
  disegnaLive();
  $("#vis-filtri").innerHTML=`<div class="seg" role="group" aria-label="Periodo">${[7,30,90].map(n=>`<button data-vgiorni="${n}" aria-pressed="${VIS.giorni===n}">${n} giorni</button>`).join("")}</div>`+
    (VIS.sel?`<span class="chip-sel">Solo ${esc(dataBreve(VIS.sel))}<button data-vselx aria-label="Torna a tutto il periodo">×</button></span>`:"");
  const G=VIS.dati;
  if(!G){$("#vis-kpi").innerHTML=`<div class="tile"><span>Carico le visite…</span></div>`;return;}
  const S=VIS.sel?G.filter(g=>g.giorno===VIS.sel):G;
  const somma=(arr,f)=>arr.reduce((n,g)=>n+num(f(g)),0);
  const unici=somma(S,g=>g.unici),viste=somma(S,g=>g.viste),da=S[0].giorno,a=S[S.length-1].giorno;
  /* prenotazioni fatte dal sito nel periodo (quelle aggiunte a mano no) */
  const prenDi=(d1,d2)=>DATI.prenotazioni.filter(p=>!p.aMano&&String(p.creata||"").slice(0,10)>=d1&&String(p.creata||"").slice(0,10)<=d2);
  const pren=prenDi(da,a),m=somma(S,g=>g.disp&&g.disp.m),dd=somma(S,g=>g.disp&&g.disp.d);
  $("#vis-sotto").textContent=VIS.sel?dataLunga(VIS.sel):`dal ${dataBreve(da)} a oggi`;
  $("#vis-kpi").innerHTML=
    tessera("Visitatori",unici.toLocaleString("it-IT"),VIS.sel?"in quel giorno":`${Math.round(unici/Math.max(1,S.length))} al giorno in media`)+
    tessera("Pagine viste",viste.toLocaleString("it-IT"),unici?`${(viste/unici).toLocaleString("it-IT",{maximumFractionDigits:1})} a visitatore`:"")+
    tessera("Prenotazioni dal sito",String(pren.length),unici?`${(pren.length/unici*100).toLocaleString("it-IT",{maximumFractionDigits:1})} % dei visitatori`:"")+
    tessera("Dal telefono",m+dd?pct(m,m+dd):"—",m+dd?`${dd} dal computer`:"");

  /* visitatori al giorno: si può toccare un giorno */
  const o=oggi(),cnt={};for(const p of DATI.prenotazioni)if(!p.aMano){const c=String(p.creata||"").slice(0,10);cnt[c]=(cnt[c]||0)+1;}
  colonne($("#g-giorni"),G.map(g=>({k:g.giorno,v:num(g.unici),lab:G.length>14?String(dUTC(g.giorno).getUTCDate()):dataBreve(g.giorno).split(" ").slice(0,2).join(" "),
    tv:`${num(g.unici)} visitatori`,tl:dataLunga(g.giorno),k1:`${num(g.viste)} pagine viste`,k2:`${cnt[g.giorno]||0} prenotazioni`})),
    {sel:VIS.sel,oggi:o,clic:true,vuoto:"Ancora nessuna visita: si conta da quando pubblichi l'aggiornamento"});
  $("#t-giorni").innerHTML=tabella(["Giorno","Visitatori","Pagine viste","Prenotazioni"],
    G.slice().reverse().map(g=>[dataBreve(g.giorno),num(g.unici),num(g.viste),cnt[g.giorno]||0]),[0,1,1,1]);

  /* il percorso verso la prenotazione */
  const st=[0,1,2,3].map(i=>somma(S,g=>(g.stadi||[])[i]));
  const passi=["Hanno visitato il sito","Hanno aperto il carrello","Sono arrivati al pagamento","Hanno prenotato"];
  barre($("#g-imbuto"),passi.map((n,i)=>({nome:n,v:st[i],max:st[0],testo:`${st[i]} · ${pct(st[i],st[0])}`,
    tv:`${st[i]} visitatori`,tl:n,k1:i?`${pct(st[i],st[i-1])} di quelli del passo prima`:""})),{id:"im",sopra:true,vuoto:"Ancora nessuna visita"});
  const perso=st[1]?st[1]-st[3]:0;
  $("#imbuto-sotto").textContent=st[1]?`${perso} ${perso===1?"persona ha":"persone hanno"} aperto il carrello senza prenotare`:"quanti arrivano a ogni passo";
  $("#t-imbuto").innerHTML=tabella(["Passo","Visitatori","Sul totale","Sul passo prima"],passi.map((n,i)=>[n,st[i],pct(st[i],st[0]),i?pct(st[i],st[i-1]):"—"]),[0,1,1,1]);

  /* da dove arrivano */
  const fonti={};for(const g of S)for(const[k,v]of Object.entries(g.fonti||{}))fonti[k]=(fonti[k]||0)+num(v);
  let ord=Object.entries(fonti).sort((x,y)=>y[1]-x[1]);
  if(ord.length>7){const resto=ord.slice(6).reduce((n,x)=>n+x[1],0);ord=[...ord.slice(0,6),["Altro",resto]];}
  const totF=ord.reduce((n,x)=>n+x[1],0);
  barre($("#g-fonti"),ord.map(([k,v])=>({nome:k,v,max:totF,testo:`${v} · ${pct(v,totF)}`,tv:`${v} visitatori`,tl:k})),{id:"fo",vuoto:"Ancora nessuna visita"});
  $("#t-fonti").innerHTML=tabella(["Provenienza","Visitatori","Quota"],ord.map(([k,v])=>[k,v,pct(v,totF)]),[0,1,1]);

  /* a che ora */
  const ore=Array.from({length:24},(_,h)=>somma(S,g=>(g.ore||{})[String(h).padStart(2,"0")]));
  const picco=ore.reduce((b,v,i)=>v>ore[b]?i:b,0);
  colonne($("#g-ore"),ore.map((v,h)=>({k:String(h),v,lab:h%6===0?h+":00":"",tv:`${v} pagine viste`,tl:`dalle ${h}:00 alle ${h}:59`})),{altezza:180,etichetteFisse:true,vuoto:"Ancora nessuna visita"});
  $("#ore-sotto").textContent=ore[picco]?`più movimento verso le ${picco}:00: il momento giusto per pubblicare una storia`:"pagine viste per ora del giorno";
  $("#t-ore").innerHTML=tabella(["Ora","Pagine viste"],ore.map((v,h)=>[`${h}:00`,v]).filter(r=>r[1]>0),[0,1]);

  /* pagine */
  const pagine={};for(const g of S)for(const[k,v]of Object.entries(g.pagine||{}))pagine[k]=(pagine[k]||0)+num(v);
  const op=Object.entries(pagine).sort((x,y)=>y[1]-x[1]),totP=op.reduce((n,x)=>n+x[1],0);
  $("#t-pagine").innerHTML=op.length?tabella(["Pagina","Viste","Quota"],op.map(([k,v])=>[NOMI_PAG[k]||k,v,pct(v,totP)]),[0,1,1]):`<p class="vuoto">Ancora nessuna visita.</p>`;
}

/* ---------- tutto insieme ---------- */
function chips(){
  const prox=serateFuture(60).find(v=>v.data>=oggi());
  const attesa=DATI.prenotazioni.filter(inAttesa);
  const anno=String(new Date().getFullYear());
  const inc=DATI.prenotazioni.filter(p=>pagata(p)&&p.data.startsWith(anno)).reduce((n,p)=>n+num(p.totale),0);
  $("#chips").innerHTML=
    (prox?`<button class="chip" data-vai="serate"><b>${esc(dataBreve(prox.data))} · ${prox.ospiti}/${prox.posti}</b>prossima serata</button>`:"")+
    `<button class="chip" data-vai="dafare"><b>${attesa.length} ${attesa.length===1?"bonifico":"bonifici"}</b>da controllare</button>`+
    `<button class="chip" data-vai="panoramica"><b>${euro(inc)}</b>incassato nel ${anno}</button>`;
}
function disegna(){
  chips();
  if(VISTA==="panoramica")disegnaPanoramica();
  if(VISTA==="serate")disegnaSerate();
  if(VISTA==="impostazioni")disegnaImpostazioni();
  if(VISTA==="visite")disegnaVisite();
  disegnaDaFare();
  $("#aggiornato").textContent="aggiornata alle "+new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"});
}
function vai(v){
  VISTA=v;
  $$(".tab").forEach(t=>t.setAttribute("aria-selected",String(t.dataset.vista===v)));
  $$(".vista").forEach(s=>s.hidden=s.id!=="v-"+v);
  try{sessionStorage.setItem("dash_vista",v);}catch(e){}
  disegna();
  if(v==="visite"){caricaVisite();avviaLive();}
}
async function carica(){
  $("#contenuto").classList.add("caricando");
  const d=await chiama("GET");
  $("#contenuto").classList.remove("caricando");
  if(!d||!Array.isArray(d.prenotazioni))return;
  DATI=d;disegna();
  if(VISTA==="visite")caricaVisite();
}

/* ---------- clic ---------- */
document.addEventListener("click",async e=>{
  const sel=e.target.closest&&e.target.closest("[data-vsel]");
  if(sel){VIS.sel=VIS.sel===sel.dataset.vsel?null:sel.dataset.vsel;disegnaVisite();
    const nuovo=$(`#g-giorni [data-vsel="${CSS.escape(sel.dataset.vsel)}"]`);if(nuovo&&VIS.sel){const r=nuovo.getBoundingClientRect();mostraTip(nuovo,r.left+r.width/2,r.top+20);}return;}
  const t=e.target.closest("button,a");if(!t)return;
  if(t.dataset.vgiorni){VIS.giorni=+t.dataset.vgiorni;VIS.sel=null;VIS.dati=null;disegnaVisite();return caricaVisite();}
  if(t.dataset.vselx!==undefined){VIS.sel=null;return disegnaVisite();}
  if(t.dataset.vista)return vai(t.dataset.vista);
  if(t.dataset.vai)return vai(t.dataset.vai);
  if(t.dataset.anno){ANNO=t.dataset.anno;return disegnaPanoramica();}
  if(t.dataset.tabella){const g=$("#g-"+t.dataset.tabella),tb=$("#t-"+t.dataset.tabella);
    const ora=tb.hidden;tb.hidden=!ora;g.hidden=ora;t.textContent=ora?"Grafico":"Tabella";return;}
  if(t.dataset.conferma){
    t.disabled=true;const r=await chiama("POST",{azione:"conferma",rif:t.dataset.conferma});
    if(r&&r.ok){avvisa("Confermata: al cliente è partita la mail");carica();}else{t.disabled=false;avvisa(r?.errore||"Non ha funzionato");}
    return;}
  if(t.dataset.annulla){
    if(!confirm("Annullo questa prenotazione e avviso il cliente per mail?"))return;
    const r=await chiama("POST",{azione:"annulla",rif:t.dataset.annulla});
    if(r&&r.ok){avvisa("Annullata");carica();}else avvisa(r?.errore||"Non ha funzionato");return;}
  if(t.dataset.copia){try{await navigator.clipboard.writeText(t.dataset.copia);avvisa("Causale copiata");}catch(err){avvisa(t.dataset.copia);}return;}
  if(t.dataset.apri){const r=await chiama("POST",{azione:"apri",data:t.dataset.apri});if(r&&r.ok){avvisa("Giorno riaperto");carica();}return;}
  if(t.dataset.stampa!==undefined){
    $$(".serata").forEach(s=>{const si=s.dataset.idx===t.dataset.stampa;s.classList.toggle("da-stampare",si);if(si)s.querySelectorAll("details.ospiti").forEach(d=>d.open=true);});
    document.body.classList.add("stampa-serata");print();
    setTimeout(()=>document.body.classList.remove("stampa-serata"),500);return;}
});

$("#chiudi").addEventListener("click",async()=>{
  const g=$("#c-data").value;if(!g)return avvisa("Scegli un giorno");
  const r=await chiama("POST",{azione:"chiudi",data:g});if(r&&r.ok){avvisa("Giorno chiuso");carica();}
});
$("#salvaregole").addEventListener("click",async()=>{
  const settimana={},temi={};
  $$("#settimana input[data-g]").forEach(i=>{
    settimana[i.dataset.g]=i.value.split(",").map(x=>x.trim()).filter(x=>/^\d{1,2}[:.]\d{2}$/.test(x)).map(x=>x.replace(".",":").padStart(5,"0"));
  });
  $$("#settimana select[data-tema]").forEach(s=>{temi[s.dataset.tema]=s.value;});
  const r=await chiama("POST",{azione:"regole",regole:{settimana,temi,posti:+$("#r-posti").value||40,
    anticipoGiorni:+$("#r-anticipo").value||0,durataMin:+$("#r-durata").value||150}});
  if(r&&r.ok){avvisa("Orari salvati");carica();}else avvisa(r?.errore||"Non ha funzionato");
});
$("#salvaconti").addEventListener("click",async()=>{
  const ml={},bottiglia={};for(const t of Object.keys(TEMI)){ml[t]=+$("#c-ml-"+t).value;bottiglia[t]=+$("#c-bt-"+t).value;}
  const conti={ml,bottiglia,viniSerata:+$("#c-vini").value,
    limiteKU:+$("#c-ku").value,obiettivoMese:+$("#c-obiettivo").value};
  const r=await chiama("POST",{azione:"regole",regole:{conti}});
  if(r&&r.ok){avvisa("Numeri salvati");carica();}else avvisa(r?.errore||"Non ha funzionato");
});
function prezzoSuggerito(){
  const d=$("#a-data").value;if(!d)return;
  const tema=(R().temi||{})[giornoSett(d)]||"vino",prezzi={vino:55,bolle:75,fort:64};
  const n=Math.max(1,+$("#a-pax").value||1);
  $("#a-tot").value=prezzi[tema]*n;
  $("#a-tot-aiuto").textContent=`${TEMI[tema]}: ${prezzi[tema]} € a persona`;
}
$("#a-data").addEventListener("change",prezzoSuggerito);$("#a-pax").addEventListener("input",prezzoSuggerito);
$("#aggiungi").addEventListener("click",async()=>{
  const b={azione:"aggiungi",data:$("#a-data").value,ora:$("#a-ora").value,nome:$("#a-nome").value.trim(),
    tel:$("#a-tel").value.trim(),persone:+$("#a-pax").value,totale:+$("#a-tot").value,pagamento:$("#a-pag").value,note:$("#a-note").value.trim()};
  if(!b.data||!b.ora)return avvisa("Servono giorno e ora");
  if(!b.nome)return avvisa("Scrivi il nome");
  const s=serateFuture(120).find(v=>v.data===b.data&&v.ora===b.ora);
  if(s&&s.liberi<b.persone&&!confirm(`Restano ${s.liberi} posti: la aggiungo lo stesso?`))return;
  const r=await chiama("POST",b);
  if(r&&r.ok){avvisa("Messa in agenda");$("#a-nome").value=$("#a-tel").value=$("#a-note").value="";carica();}
  else avvisa(r?.errore||"Non ha funzionato");
});

/* CSV per Excel tedesco: punto e virgola, BOM, e niente formule nascoste nei nomi. */
$("#esporta").addEventListener("click",()=>{
  const cella=v=>{let s=String(v??"");if(/^[=+\-@\t\r]/.test(s))s="'"+s;return /[;"\n\r]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;};
  const teste=["Numero","Data serata","Ora","Tema","Stato","Persone","Totale €","Pagamento","Nome","Email","Telefono","Prenotata il","Confermata il","Note"];
  const righe=DATI.prenotazioni.slice().sort((a,b)=>(a.data+a.ora).localeCompare(b.data+b.ora)).map(p=>[p.rif,p.data,p.ora,TEMI[temaDi(p)]||"",p.stato,pax(p),
    String(num(p.totale)).replace(".",","),p.pagamento,p.nome,p.email,p.tel,String(p.creata||"").slice(0,16).replace("T"," "),String(p.confermataIl||"").slice(0,16).replace("T"," "),p.note]);
  const csv="﻿"+[teste,...righe].map(r=>r.map(cella).join(";")).join("\r\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  a.download=`prenotazioni-${oggi()}.csv`;document.body.append(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);
});
$("#esci").addEventListener("click",()=>{if(!confirm("Esco da questo dispositivo? Poi servirà di nuovo la password."))return;
  try{localStorage.removeItem("agenda_token");}catch(e){}TOKEN="";mostraPorta();});

/* ---------- entrata ---------- */
function mostraPorta(){$("#porta").hidden=false;$("#app").hidden=true;setTimeout(()=>$("#token").focus(),50);}
$("#entra").addEventListener("click",()=>{TOKEN=$("#token").value.trim();if(TOKEN)avvia();});
$("#token").addEventListener("keydown",e=>{if(e.key==="Enter")$("#entra").click();});
let timer=null,larghezzaVista=innerWidth;
async function avvia(){
  if(!TOKEN)return mostraPorta();
  const d=await chiama("GET");
  if(!d||!Array.isArray(d.prenotazioni))return mostraPorta();
  try{localStorage.setItem("agenda_token",TOKEN);}catch(e){}
  history.replaceState(null,"",location.pathname);
  $("#porta").hidden=true;$("#app").hidden=false;
  DATI=d;prezzoSuggerito();
  let v="panoramica";try{v=sessionStorage.getItem("dash_vista")||v;}catch(e){}
  vai(["panoramica","visite","serate","dafare","impostazioni"].includes(v)?v:"panoramica");
  caricaVisite();
  clearInterval(timer);timer=setInterval(()=>{if(!document.hidden)carica();},60000);
}
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&TOKEN&&!$("#app").hidden)carica();});
addEventListener("resize",()=>{if(Math.abs(innerWidth-larghezzaVista)<20)return;larghezzaVista=innerWidth;clearTimeout(window._rs);window._rs=setTimeout(()=>{if($("#app").hidden)return;if(VISTA==="panoramica")disegnaPanoramica();if(VISTA==="visite")disegnaVisite();},150);});
$("#a-data").value=oggi();
avvia();
