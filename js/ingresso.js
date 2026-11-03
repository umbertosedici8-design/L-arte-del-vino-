
/* ============================================================
   INGRESSO: la porta della serata.
   Inquadri il QR del biglietto, il server dice se è valido e segna l'arrivo.
   Il QR del biglietto contiene "CS-2026-XXXXXX | …": si usa solo il codice.
   Lettura del QR: quella del browser (BarcodeDetector) se c'è, altrimenti jsQR.
   ============================================================ */
const $=s=>document.querySelector(s);
const esc=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const API=location.origin+"/api";
let TOKEN="";try{TOKEN=localStorage.getItem("agenda_token")||"";}catch(e){}
const TEMI={vino:"Vino",bolle:"Champagne",fort:"Fortificati"};
const euro=n=>new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(Number(n)||0);
const ora=iso=>iso?new Date(iso).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Berlin"}):"";
const giorno=d=>new Date(d+"T12:00:00Z").toLocaleDateString("it-IT",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"});
const oggi=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Berlin"}).format(new Date());
let PREN=[],REG={};

function avvisa(t){const a=$("#avviso");a.textContent=t;a.classList.add("on");clearTimeout(a._t);a._t=setTimeout(()=>a.classList.remove("on"),2600);}
async function chiama(metodo,corpo){
  let r;
  try{r=await fetch(API+"/agenda",{method:metodo,cache:"no-store",headers:{"Content-Type":"application/json","Authorization":"Bearer "+TOKEN},body:corpo?JSON.stringify(corpo):undefined});}
  catch(e){avvisa("Niente connessione: riprova");return null;}
  if(r.status===401){try{localStorage.removeItem("agenda_token");}catch(e){}TOKEN="";porta("Password non valida");return null;}
  const d=await r.json().catch(()=>null);
  if(!r.ok){avvisa(d&&d.errore?d.errore:"Il server ha un problema ("+r.status+")");return null;}
  return d;
}
function porta(msg){$("#app").hidden=true;$("#porta").hidden=false;const e=$("#err");e.hidden=!msg;e.textContent=msg||"";spegni();}

/* ---------------- la serata di oggi ---------------- */
async function carica(){
  const d=await chiama("GET");if(!d)return false;
  PREN=d.prenotazioni||[];REG=d.regole||{};
  try{localStorage.setItem("agenda_token",TOKEN);}catch(e){}
  $("#porta").hidden=true;$("#app").hidden=false;disegna();return true;
}
const pagata=p=>p.stato==="confermata"||p.stato==="pagata";
const diOggi=()=>PREN.filter(p=>p.data===oggi()&&p.stato!=="annullata"&&p.stato!=="scaduta");
function disegna(){
  const q=diOggi(),pax=p=>Math.max(1,Math.round(Number(p.persone)||1));
  const tot=q.reduce((n,p)=>n+pax(p),0),dentro=q.filter(p=>p.entratoIl).reduce((n,p)=>n+pax(p),0);
  const tema=q[0]?.tema||(REG.temi||{})[new Date(oggi()+"T12:00:00Z").getUTCDay()];
  $("#serata").innerHTML=q.length||tema
    ?`<div><b>${esc(giorno(oggi()))}${tema?" · "+esc(TEMI[tema]||tema):""}</b><br><span>${q.length} ${q.length===1?"prenotazione":"prenotazioni"}</span></div><div class="conta"><b>${dentro}/${tot}</b><br><span>entrati</span></div>`
    :`<div><b>Oggi non c'è serata</b><br><span>Puoi comunque controllare un biglietto.</span></div>`;
  const t=($("#cerca").value||"").trim().toLowerCase();
  const lista=(t?PREN.filter(p=>(p.nome+" "+p.rif).toLowerCase().includes(t)).slice(0,30):q)
    .slice().sort((a,b)=>(!!a.entratoIl-!!b.entratoIl)||String(a.nome).localeCompare(String(b.nome),"it"));
  $("#lista").innerHTML=`<h3>${t?"Risultati":"Ospiti di stasera"}</h3>`+(lista.length?lista.map(p=>`<div class="riga">
      <div class="chi"><b>${esc(p.nome||"—")}</b><span>${pax(p)} ${pax(p)===1?"persona":"persone"} · ${esc(p.rif)}${p.data!==oggi()?" · "+esc(giorno(p.data)):""}${pagata(p)?"":" · da pagare "+euro(p.totale)}</span></div>
      ${p.entratoIl?`<span class="st dentro">dentro ${esc(ora(p.entratoIl))}</span>`:`<button class="b si" data-entra="${esc(p.rif)}">Entra</button>`}
    </div>`).join(""):`<p class="vuoto">${t?"Nessuno con questo nome o codice.":"Nessuna prenotazione per stasera."}</p>`);
}

/* ---------------- l'esito ---------------- */
let inPausa=false,ultimo={c:"",t:0};
function suona(ok){
  try{navigator.vibrate&&navigator.vibrate(ok?80:[60,80,60]);}catch(e){}
  try{const a=new (window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();
    o.frequency.value=ok?880:220;g.gain.value=.08;o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+(ok?.12:.3));}catch(e){}
}
function chiudiEsito(){$("#esito").hidden=true;inPausa=false;clearTimeout(chiudiEsito._t);}
function mostra(d,codice){
  const p=d.prenotazione||{},pax=Math.max(1,Math.round(Number(p.persone)||1));
  const dett=p.rif?`${pax} ${pax===1?"persona":"persone"} · ${esc(TEMI[p.tema]||"")} · ${esc(giorno(p.data))}`:"";
  const tipi={
    ok:["ok","✓","Benvenuti!",`${dett} · pagato`,[["Fatto","chiudi","forte"],["Annulla l'ingresso","togli"]]],
    "gia-entrato":["warn","!",`Già entrati alle ${esc(ora(p.entratoIl))}`,dett,[["Ok","chiudi","forte"],["Annulla l'ingresso","togli"]]],
    "da-pagare":["warn","€",`Non ancora pagato: ${euro(p.totale)}`,dett,[["Incassato ora in contanti, fai entrare","incassa","forte"],["Annulla","chiudi"]]],
    "altra-data":["warn","!",`Il biglietto è per ${esc(giorno(p.data))}`,dett,[["Fai entrare lo stesso","forza","forte"],["Annulla","chiudi"]]],
    passata:["crit","×",`Serata già passata (${esc(giorno(p.data))})`,dett,[["Fai entrare lo stesso","forza"],["Ok","chiudi","forte"]]],
    annullata:["crit","×","Prenotazione annullata",dett,[["Ok","chiudi","forte"]]],
    scaduta:["crit","×","Prenotazione scaduta: non pagata",dett,[["Ok","chiudi","forte"]]],
    tolto:["warn","↺","Ingresso annullato",dett,[["Ok","chiudi","forte"]]],
    sconosciuto:["crit","?","Codice non trovato",codice?`Letto: ${esc(String(codice).slice(0,60))}`:"Non è un biglietto di L'Arte del Vino",[["Ok","chiudi","forte"]]]
  };
  const [cl,ic,tit,det,az]=tipi[d.esito]||tipi.sconosciuto;
  $("#esito-box").className="box "+cl;
  $("#esito-box").innerHTML=`<div class="icona" aria-hidden="true">${ic}</div><h2>${tit}</h2>${p.nome?`<div class="nome">${esc(p.nome)}</div>`:""}<div class="dett">${det}</div>
    <div class="azioni">${az.map(([t,a,f])=>`<button class="b${f?" "+f:""}" data-az="${a}" data-rif="${esc(p.rif||"")}">${t}</button>`).join("")}</div>`;
  $("#esito").hidden=false;inPausa=true;suona(d.esito==="ok");
  $("#esito-box .b.forte")?.focus();
  if(d.esito==="ok"){clearTimeout(chiudiEsito._t);chiudiEsito._t=setTimeout(chiudiEsito,3500);}   /* il prossimo ospite passa da solo */
}
async function controlla(testo,extra={}){
  const rif=(String(testo).toUpperCase().match(/CS-\d{4}-[A-Z0-9]{4,6}/)||[])[0];
  if(!rif){mostra({esito:"sconosciuto"},testo);return;}
  inPausa=true;
  const d=await chiama("POST",{azione:"ingresso",rif,...extra});
  if(!d){inPausa=false;return;}
  if(d.prenotazione){const i=PREN.findIndex(p=>p.rif===d.prenotazione.rif);if(i>=0)PREN[i]={...PREN[i],...d.prenotazione};else PREN.push(d.prenotazione);}
  disegna();mostra(d,testo);
}
document.addEventListener("click",async e=>{
  const b=e.target.closest("button");if(!b)return;
  if(b.dataset.entra){return controlla(b.dataset.entra);}
  const az=b.dataset.az,rif=b.dataset.rif;if(!az)return;
  if(az==="chiudi")return chiudiEsito();
  if(az==="togli"){chiudiEsito();return controlla(rif,{annulla:true});}
  if(az==="forza"){chiudiEsito();return controlla(rif,{forza:true});}
  if(az==="incassa"){
    b.disabled=true;
    const r=await chiama("POST",{azione:"conferma",rif,pagamento:"cash",senzaMail:true});
    if(!r){b.disabled=false;return;}
    const i=PREN.findIndex(p=>p.rif===rif);if(i>=0)PREN[i]={...PREN[i],stato:"confermata",pagamento:"cash"};
    chiudiEsito();return controlla(rif,{forza:true});
  }
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#esito").hidden)chiudiEsito();});
$("#esito").addEventListener("click",e=>{if(e.target.id==="esito")chiudiEsito();});
$("#cerca").addEventListener("input",disegna);

/* ---------------- la fotocamera ---------------- */
let flusso=null,lettore=null,timer=null;
async function caricaJsQR(){
  if(window.jsQR)return true;
  return new Promise(ok=>{const s=document.createElement("script");s.src="js/jsqr.js";s.onload=()=>ok(true);s.onerror=()=>ok(false);document.head.append(s);});
}
async function preparaLettore(){
  if("BarcodeDetector" in window){
    try{const f=await BarcodeDetector.getSupportedFormats();if(f.includes("qr_code")){const d=new BarcodeDetector({formats:["qr_code"]});return v=>d.detect(v).then(r=>r[0]?.rawValue||null);}}catch(e){}
  }
  if(!(await caricaJsQR()))return null;
  const c=document.createElement("canvas"),x=c.getContext("2d",{willReadFrequently:true});
  return async v=>{
    const w=v.videoWidth,h=v.videoHeight;if(!w||!h)return null;
    const lato=Math.min(w,h),s=Math.min(1,720/lato);            /* solo il quadrato centrale, ridotto: più veloce */
    c.width=c.height=Math.round(lato*s);
    x.drawImage(v,(w-lato)/2,(h-lato)/2,lato,lato,0,0,c.width,c.height);
    const im=x.getImageData(0,0,c.width,c.height),r=window.jsQR(im.data,c.width,c.height,{inversionAttempts:"attemptBoth"});
    return r?r.data:null;
  };
}
async function accendi(){
  if(!navigator.mediaDevices?.getUserMedia){avvisa("Questo browser non può usare la fotocamera");return;}
  try{flusso=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}},audio:false});}
  catch(e){avvisa(e.name==="NotAllowedError"?"Permesso negato: consenti la fotocamera nelle impostazioni del browser":"Fotocamera non disponibile");return;}
  const v=$("#video");v.srcObject=flusso;await v.play().catch(()=>{});
  $("#avvio").hidden=true;
  lettore=lettore||await preparaLettore();
  if(!lettore){avvisa("Lettura QR non disponibile: usa la ricerca per nome");return;}
  const tr=flusso.getVideoTracks()[0],cap=tr.getCapabilities?tr.getCapabilities():{};
  $("#luce").hidden=!cap.torch;
  clearInterval(timer);
  timer=setInterval(async()=>{
    if(inPausa||document.hidden||!flusso)return;
    let t=null;try{t=await lettore(v);}catch(e){}
    if(!t)return;
    if(t===ultimo.c&&Date.now()-ultimo.t<6000)return;              /* lo stesso biglietto ancora davanti alla fotocamera */
    ultimo={c:t,t:Date.now()};controlla(t);
  },220);
}
function spegni(){clearInterval(timer);if(flusso){flusso.getTracks().forEach(t=>t.stop());flusso=null;}const a=$("#avvio");if(a)a.hidden=false;}
$("#accendi").addEventListener("click",accendi);
$("#luce").addEventListener("click",async e=>{
  const b=e.currentTarget,on=b.getAttribute("aria-pressed")!=="true",tr=flusso?.getVideoTracks()[0];
  try{await tr.applyConstraints({advanced:[{torch:on}]});b.setAttribute("aria-pressed",String(on));}catch(err){avvisa("Luce non disponibile");}
});
document.addEventListener("visibilitychange",()=>{if(document.hidden)spegni();});

$("#entra").addEventListener("click",async()=>{TOKEN=$("#token").value.trim();if(!TOKEN)return porta("Scrivi la password");if(await carica())accendi();});
$("#token").addEventListener("keydown",e=>{if(e.key==="Enter")$("#entra").click();});
(async()=>{if(!TOKEN)return porta();if(await carica())accendi();})();
setInterval(()=>{if(!document.hidden&&TOKEN&&!$("#app").hidden&&!inPausa)carica();},30000);   /* chi arriva da un altro telefono */
