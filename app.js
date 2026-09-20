const app = document.getElementById("app");
let tab = localStorage.getItem("tab") || "Inicio";
let completed = Number(localStorage.getItem("completed") || 7);
let streak = Number(localStorage.getItem("streak") || 3);
let privacy = localStorage.getItem("privacy") !== "false";
let running = false, step = 0, remaining = 120, timer = null;
const exercises = [
  ["Preparación y relajación",120],
  ["Progresión suave",180],
  ["Pausa y recuperación",120]
];

function fmt(n){return `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`}

function shell(content){
  app.innerHTML = `<div class="app">${content}</div>`;
  document.querySelectorAll(".nav button").forEach(b=>{
    b.classList.toggle("active",b.dataset.tab===tab);
    b.onclick=()=>{tab=b.dataset.tab;render()}
  });
}

function home(){
  return `<div class="brand">Bienestar Diario</div>
  <div class="subtitle">Tu bienestar también es parte del placer.</div>
  <button id="install" class="install">＋ Instalar app</button>
  <section class="hero"><div class="eyebrow">TU SESIÓN DE HOY</div>
  <h2>Nivel 1 · 10 min</h2>
  <p class="body">Una rutina progresiva y suave. Ve despacio, escucha a tu cuerpo y detente si sientes dolor.</p>
  <button class="primary" id="start">▶ Comenzar sesión</button></section>
  ${running?session():''}
  <div class="grid"><div class="info"><div class="muted">🔥 Racha</div><div class="value">${streak} días</div></div>
  <div class="info"><div class="muted">✓ Sesiones</div><div class="value">${completed}</div></div></div>
  <div class="notice"><strong>Seguridad primero</strong><p class="body">No fuerces ni continúes ante dolor, sangrado o molestias importantes. Si aparecen síntomas preocupantes, consulta a un profesional sanitario.</p></div>`;
}

function session(){
  const pct=((step+1)/exercises.length)*100;
  return `<section class="session"><div class="row"><b>Sesión en curso</b><b>${step+1}/${exercises.length}</b></div>
  <div class="progress"><div class="fill" style="width:${pct}%"></div></div>
  <div class="step">${exercises[step][0]}</div><div class="timer">${fmt(remaining)}</div>
  <div class="muted" style="text-align:center">Tiempo restante</div>
  <div class="actions"><button class="secondary" id="pause">${running?"Ⅱ Pausa":"▶ Continuar"}</button><button class="danger" id="stop">■ Detener</button></div></section>`;
}

function progress(){
 return `<div class="title">Progreso</div>
 <div class="grid"><div class="info"><div class="muted">🔥 Racha actual</div><div class="value">${streak} días</div></div>
 <div class="info"><div class="muted">✓ Completadas</div><div class="value">${completed}</div></div></div>
 <section class="card"><h3>Nivel actual</h3><div style="font-size:50px;font-weight:900">1</div><div class="progress"><div class="fill" style="width:42%"></div></div><span class="muted">210 / 500 XP</span></section>
 <section class="card"><h3>Sensaciones</h3><p class="body">Registra cómo te sentiste después de cada sesión para observar tu evolución.</p></section>`;
}

function library(){
 const items=[["Anatomía básica","Conoce tu cuerpo y cómo funciona."],["Preparación","Información general antes de una sesión."],["Lubricación","Tipos, uso y recomendaciones generales."],["Higiene","Cuidados antes y después."],["Señales de alerta","Cuándo parar y cuándo consultar."],["Preguntas frecuentes","Respuestas a dudas habituales."]];
 return `<div class="title">Biblioteca</div>`+items.map(x=>`<section class="list-card"><h3>${x[0]}</h3><p class="body">${x[1]}</p></section>`).join("");
}

function profile(){
 return `<div class="title">Perfil</div><section class="card profile"><div class="avatar">🌿</div><h2>Usuario</h2><div class="muted">Nivel 1 · Explorador</div></section>
 <section class="card"><div class="row"><div><h3>Privacidad</h3><div class="muted">Modo privado</div></div><button id="privacy" class="switch ${privacy?"on":""}"><div class="knob"></div></button></div></section>
 <section class="card"><h3>Recordatorios</h3><p class="body">Puedes añadir notificaciones diarias en una versión posterior.</p></section>`;
}

function render(){
 let content=tab==="Inicio"?home():tab==="Progreso"?progress():tab==="Biblioteca"?library():profile();
 shell(content);
 document.getElementById("start")?.addEventListener("click",start);
 document.getElementById("pause")?.addEventListener("click",()=>{running=!running;running?tick():clearInterval(timer);render()});
 document.getElementById("stop")?.addEventListener("click",()=>{running=false;clearInterval(timer);render()});
 document.getElementById("privacy")?.addEventListener("click",()=>{privacy=!privacy;localStorage.setItem("privacy",privacy);render()});
 if(running) tick();
}

function start(){step=0;remaining=exercises[0][1];running=true;tick();render()}
function tick(){
 clearInterval(timer);
 timer=setInterval(()=>{
  if(!running)return;
  remaining--;
  if(remaining<=0){
   if(step<exercises.length-1){step++;remaining=exercises[step][1]}
   else {running=false;completed++;streak++;localStorage.setItem("completed",completed);localStorage.setItem("streak",streak);clearInterval(timer)}
  }
  render();
 },1000);
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{
 e.preventDefault();deferredPrompt=e;
 const btn=document.getElementById("install"); if(btn) btn.style.display="block";
});
document.addEventListener("click",async e=>{
 if(e.target.id==="install" && deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}
});
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
render();
