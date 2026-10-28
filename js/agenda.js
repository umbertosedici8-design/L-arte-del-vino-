
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* Qui dentro arrivano nomi, note e indirizzi scritti dai clienti. Senza
   disinnescarli, uno che prenota chiamandosi <img src=x onerror=...> farebbe
   girare il suo codice dentro la TUA agenda, dove c'è il token. */
const esc=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=n=>Number.isFinite(+n)?+n:0;
const API=location.origin+"/api";
let TOKEN=localStorage.getItem("agenda_token")||new URLSearchParams(location.search).get("token")||"";
let DATI={prenotazioni:[],regole:null};
const GG=["dom","lun","mar","mer","gio","ven","sab"];

const euro=n=>new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
const oggi=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Berlin"}).format(new Date());
function avvisa(t){const a=$("#avviso");a.textContent=t;a.classList.add("on");clearTimeout(a._t);a._t=setTimeout(()=>a.classList.remove("on"),2600);}

async function chiama(metodo,corpo){
  const r=await fetch(`${API}/agenda?token=${encodeURIComponent(TOKEN)}`,{
    method:metodo,headers:{"Content-Type":"application/json"},
    body:corpo?JSON.stringify(corpo):undefined});
  if(r.status===401){localStorage.removeItem("agenda_token");location.reload();return null;}
  return r.json();
}

function riga(p){
  const d=new Date(p.data+"T12:00:00");
  const art=(p.articoli||[]).map(a=>`${esc(a.n)} × ${num(a.q)}`).join(" · ");
  const rif=esc(p.rif), stato=esc(p.stato), tel=esc(p.tel||"");
  return `<div class="card pren">
    <div class="quando"><i>${GG[d.getDay()]}</i><b>${d.getDate()}</b><u>${d.toLocaleDateString("it-IT",{month:"short"})} · ${esc(p.ora)}</u></div>
    <div class="chi">
      <b>${esc(p.nome)||"—"}</b><span class="stato s-${stato.replace(/[^a-z_]/g,"")}">${stato.replace("_"," ")}</span>
      <p>${num(p.persone)} pers. · ${euro(num(p.totale))} · ${esc(p.pagamento)} · ${esc(p.lingua)}${p.aMano?" · a mano":""}</p>
      ${art?`<p>${art}</p>`:""}
      ${p.luogo?`<p>${esc(p.luogo)}</p>`:""}
      <p>${tel?`<a href="tel:${encodeURIComponent(tel)}">${tel}</a> · `:""}${p.email?`<a href="mailto:${encodeURIComponent(p.email)}">${esc(p.email)}</a>`:""}</p>
      ${p.note?`<p><i>${esc(p.note)}</i></p>`:""}
      <p style="font-size:11.5px;color:var(--faint)">${rif}</p>
    </div>
    <div class="azioni">
      ${stato!=="confermata"&&stato!=="annullata"?`<button class="b si" data-conferma="${rif}">Confermata</button>`:""}
      ${stato!=="annullata"?`<button class="b no" data-annulla="${rif}">Annulla</button>`:""}
      ${tel?`<a class="b" href="tel:${encodeURIComponent(tel)}">Chiama</a>`:""}
    </div>
  </div>`;
}
function disegna(){
  const o=oggi(),P=DATI.prenotazioni;
  const vive=p=>["tenuta","pagata","confermata"].includes(p.stato);
  const prossime=P.filter(p=>p.data>=o&&vive(p));
  const passate=P.filter(p=>p.data<o||!vive(p)).reverse();
  $("#prossime").innerHTML=prossime.length?prossime.map(riga).join(""):`<div class="card vuoto">Ancora niente in arrivo.</div>`;
  $("#passate").innerHTML=passate.length?passate.slice(0,25).map(riga).join(""):`<div class="card vuoto">Archivio vuoto.</div>`;
  $("#k1").textContent=prossime.length;
  $("#k2").textContent=prossime.filter(p=>p.stato==="tenuta").length;
  $("#k3").textContent=euro(P.filter(p=>p.stato==="pagata"||p.stato==="confermata").reduce((s,p)=>s+p.totale,0));
  $("#k4").textContent=P.filter(p=>vive(p)&&p.data.slice(0,7)===o.slice(0,7)).length;
  $("#aggiornato").textContent="aggiornata alle "+new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"});

  const R=DATI.regole||{};
  $("#settimana").innerHTML=[1,2,3,4,5,6,0].map(n=>
    `<label><b>${GG[n]}</b><input type="text" data-g="${n}" value="${esc((R.settimana?.[n]||[]).join(","))}" placeholder="—"></label>`).join("");
  $("#r-anticipo").value=R.anticipoGiorni??3;
  $("#r-durata").value=R.durataMin??150;
  $("#chiusure").innerHTML=(R.chiusure||[]).length
    ? R.chiusure.filter(g=>/^\d{4}-\d{2}-\d{2}$/.test(g)).map(g=>`<span>${g}<button data-apri="${g}" aria-label="riapri">×</button></span>`).join("")
    : `<span style="background:none;color:var(--faint)">nessuno</span>`;
}

async function carica(){
  const d=await chiama("GET");
  if(!d)return;
  DATI=d;disegna();
}

document.addEventListener("click",async e=>{
  const c=e.target.closest("[data-conferma]");
  if(c){await chiama("POST",{azione:"conferma",rif:c.dataset.conferma});avvisa("Confermata, mail partita");return carica();}
  const a=e.target.closest("[data-annulla]");
  if(a){if(!confirm("Annullo questa prenotazione e avviso il cliente?"))return;
    await chiama("POST",{azione:"annulla",rif:a.dataset.annulla});avvisa("Annullata");return carica();}
  const ap=e.target.closest("[data-apri]");
  if(ap){await chiama("POST",{azione:"apri",data:ap.dataset.apri});avvisa("Giorno riaperto");return carica();}
});

$("#chiudi").onclick=async()=>{
  const g=$("#c-data").value;if(!g)return avvisa("Scegli un giorno");
  await chiama("POST",{azione:"chiudi",data:g});avvisa("Giorno chiuso");carica();
};
$("#salvaregole").onclick=async()=>{
  const settimana={};
  $$("#settimana input[data-g]").forEach(i=>{
    settimana[i.dataset.g]=i.value.split(",").map(x=>x.trim()).filter(x=>/^\d{1,2}:\d{2}$/.test(x))
      .map(x=>x.padStart(5,"0"));
  });
  await chiama("POST",{azione:"regole",regole:{settimana,
    anticipoGiorni:+$("#r-anticipo").value||0,durataMin:+$("#r-durata").value||150}});
  avvisa("Orari salvati");carica();
};
$("#aggiungi").onclick=async()=>{
  const b={azione:"aggiungi",data:$("#a-data").value,ora:$("#a-ora").value,nome:$("#a-nome").value,
    tel:$("#a-tel").value,persone:+$("#a-pax").value,totale:+$("#a-tot").value,note:$("#a-note").value};
  if(!b.data||!b.ora)return avvisa("Servono giorno e ora");
  const r=await chiama("POST",b);
  if(r&&r.ok){avvisa("Messa in agenda");$("#a-nome").value=$("#a-tel").value=$("#a-note").value="";carica();}
  else avvisa(r?.errore||"Non ha funzionato");
};
$("#entra").onclick=()=>{
  TOKEN=$("#token").value.trim();if(!TOKEN)return;
  localStorage.setItem("agenda_token",TOKEN);avvia();
};
$("#token").addEventListener("keydown",e=>{if(e.key==="Enter")$("#entra").click();});

async function avvia(){
  if(!TOKEN){$("#porta").hidden=false;$("#app").hidden=true;return;}
  const d=await chiama("GET");
  if(!d){$("#porta").hidden=false;return;}
  localStorage.setItem("agenda_token",TOKEN);
  history.replaceState(null,"",location.pathname);
  $("#porta").hidden=true;$("#app").hidden=false;
  DATI=d;disegna();
  setInterval(carica,60000);
}
$("#a-data").value=oggi();
avvia();
