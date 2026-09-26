const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

const state={
  theme:localStorage.getItem("sky-theme")||"dark",
  wallpaper:localStorage.getItem("sky-wallpaper")||"plain",
  fontSize:localStorage.getItem("sky-font-size")||"100",
  font:localStorage.getItem("sky-font")||"inter",
  notifications:localStorage.getItem("sky-notifications")==="1"
};

function apply(){
  document.body.classList.toggle("light",state.theme==="light" || (state.theme==="auto" && matchMedia("(prefers-color-scheme: light)").matches));
  document.body.classList.remove("wallpaper-paper","wallpaper-violet","wallpaper-sunset","wallpaper-ocean","wallpaper-mint");
  if(state.wallpaper!=="plain") document.body.classList.add("wallpaper-"+state.wallpaper);
  document.body.classList.remove("font-serif","font-system");
  if(state.font!=="inter") document.body.classList.add("font-"+state.font);
  document.documentElement.style.fontSize=state.fontSize+"%";
  localStorage.setItem("sky-theme",state.theme);
  localStorage.setItem("sky-wallpaper",state.wallpaper);
  localStorage.setItem("sky-font-size",state.fontSize);
  localStorage.setItem("sky-font",state.font);
  localStorage.setItem("sky-notifications",state.notifications?"1":"0");
}
apply();

const settings=$("#settingsOverlay");
const search=$("#searchOverlay");
function open(el){el.classList.add("open");el.setAttribute("aria-hidden","false")}
function close(el){el.classList.remove("open");el.setAttribute("aria-hidden","true")}
$("#settingsBtn").onclick=()=>open(settings);
$("#footerSettings").onclick=()=>open(settings);
$("#footerDeveloper").onclick=()=>{open(settings);setTimeout(()=>document.querySelector(".developer-settings")?.setAttribute("open",""),50)};
$("#closeSettings").onclick=()=>close(settings);
$("#searchBtn").onclick=()=>{open(search);setTimeout(()=>$("#searchInput").focus(),80)};
$("#closeSearch").onclick=()=>close(search);

$("#themeSelect").value=state.theme;
$("#wallpaperSelect").value=state.wallpaper;
$("#fontSize").value=state.fontSize;
$("#fontSelect").value=state.font;
$("#notifyToggle").checked=state.notifications;
$("#themeSelect").onchange=e=>{state.theme=e.target.value;apply()};
$("#wallpaperSelect").onchange=e=>{state.wallpaper=e.target.value;apply()};
$("#fontSize").oninput=e=>{state.fontSize=e.target.value;apply()};
$("#fontSelect").onchange=e=>{state.font=e.target.value;apply()};
$("#notifyToggle").onchange=e=>{state.notifications=e.target.checked;apply()};

$("#resetBtn").onclick=()=>{
  state.theme="dark";state.wallpaper="plain";state.fontSize="100";state.font="inter";state.notifications=false;
  $("#themeSelect").value=state.theme;$("#wallpaperSelect").value=state.wallpaper;$("#fontSize").value=100;$("#fontSelect").value="inter";$("#notifyToggle").checked=false;apply();
};

$("#backupBtn").onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="sky-academy-preferencias.json";a.click();URL.revokeObjectURL(a.href);
};

const sections=$$("main section[id]");
const progress=$("#progress");
addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max>0?(scrollY/max)*100:0)+"%";
});

const index=[
 ["Fundamentos","fundamentos"],["Puberdade","puberdade"],["Masturbação","masturbacao"],
 ["Pornografia e internet","pornografia"],["ISTs","ists"],["Saúde vaginal","vaginal"],
 ["Consentimento","consentimento"],["Exploração sexual","exploracao"],["Educação sexual","educacao"],
 ["Ciência e Bíblia","biblia"],["Método de pesquisa","metodo"],["Fontes","fontes"]
];
$("#searchInput").oninput=e=>{
  const q=e.target.value.trim().toLowerCase();
  const box=$("#searchResults");
  if(!q){box.innerHTML="<p class='source-note'>Digite um termo para pesquisar nesta página.</p>";return}
  const found=index.filter(([name,id])=>{
    const el=document.getElementById(id);
    return (name+" "+el.innerText).toLowerCase().includes(q);
  });
  box.innerHTML=found.length?found.map(([name,id])=>`<a class="result" href="#${id}" data-id="${id}"><small>SECÇÃO</small><b>${name}</b><span>Abrir esta parte da pesquisa.</span></a>`).join(""):"<p class='source-note'>Nenhuma secção encontrada. Tente outro termo.</p>";
  $$(".result").forEach(a=>a.onclick=()=>close(search));
};

$("#menuBtn").onclick=()=>{
  const nav=$("#mainNav");
  nav.style.display=nav.style.display==="flex"?"none":"flex";
  if(nav.style.display==="flex"){nav.style.position="absolute";nav.style.top="64px";nav.style.left="0";nav.style.right="0";nav.style.padding="14px 18px";nav.style.background="var(--bg2)";nav.style.borderBottom="1px solid var(--line)";nav.style.flexWrap="wrap"}
};

addEventListener("keydown",e=>{
  if(e.key==="Escape"){close(settings);close(search)}
});
