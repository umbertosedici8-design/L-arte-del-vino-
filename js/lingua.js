
/* Prima di disegnare la pagina: se la lingua non è l'italiano, la pagina aspetta
   un istante invece di mostrare il testo italiano e poi cambiarlo davanti agli occhi. */
(function(){try{var L=["it","de","en","es"],l=localStorage.getItem("lang");
 if(L.indexOf(l)<0){l="en";var n=navigator.languages||[navigator.language||""];for(var i=0;i<n.length;i++){var c=String(n[i]).slice(0,2).toLowerCase();if(L.indexOf(c)>=0){l=c;break;}}}
 if(l!=="it"){document.documentElement.classList.add("attesa-lingua");document.documentElement.lang=l;}}catch(e){}})();
