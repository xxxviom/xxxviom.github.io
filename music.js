(function(){
var S=window.icaoSound,btn=document.getElementById("sb"),au=new Audio("audio/menu.mp3"),started=0,fr=null;
au.loop=true;au.volume=.6;au.preload="auto";
function ui(){var o=S.on();btn.classList.toggle("off",!o);btn.setAttribute("aria-pressed",o?"false":"true");btn.setAttribute("aria-label",o?"Вимкнути звук":"Увімкнути звук")}
function play(){
 if(!S.on())return;
 var p;try{p=au.play()}catch(e){return}
 if(p&&p.then)p.then(function(){started=1;unbind()},function(){started=0;bind()});
 else{started=1;unbind()}
}
var EV=["pointerup","click","touchend","keydown","mousedown"];
function gesture(){if(!started)play()}
function bind(){EV.forEach(function(n){document.addEventListener(n,gesture,true)})}
function unbind(){EV.forEach(function(n){document.removeEventListener(n,gesture,true)})}
bind();
/* try right away (works when the browser allows autoplay), then retry as soon as audio is ready / page shown */
au.addEventListener("canplay",function(){if(!started)play()});
document.addEventListener("DOMContentLoaded",function(){if(!started)play()});
addEventListener("load",function(){if(!started)play()});
addEventListener("pageshow",function(){if(!started)play()});
btn.addEventListener("click",function(){var o=!S.on();S.set(o);ui();if(o)play();else{au.pause();started=0}});
document.addEventListener("snd",ui);
document.addEventListener("visibilitychange",function(){if(document.hidden)au.pause();else if(S.on())play()});
ui();

/* sections open in an overlay frame, so this page (and the music) is never reloaded */
function openPage(u){
 if(fr)return;
 fr=document.createElement("iframe");fr.className="fr";fr.setAttribute("title","Розділ");
 fr.src=u;document.body.appendChild(fr);history.pushState({fr:1},"");
 if(S.on())play();
}
function close(fromPop){
 if(!fr)return;fr.remove();fr=null;
 if(!fromPop)try{history.back()}catch(e){}
}
document.querySelector("main").addEventListener("click",function(e){
 var a=e.target.closest("a.m");if(!a)return;
 e.preventDefault();
 if(a.dataset.busy)return;
 a.dataset.busy=1;a.classList.add("dn");
 var h=a.getAttribute("href");
 setTimeout(function(){a.classList.remove("dn");delete a.dataset.busy;openPage(h)},170);
},true);
addEventListener("message",function(e){if(fr&&e.source===fr.contentWindow&&e.data&&e.data.icao==="close")close(false)});
addEventListener("popstate",function(){
 if(!fr)return;
 var w;try{w=fr.contentWindow;var l=w.location;
  if(l.hash&&l.hash!=="#"){l.replace(l.href.split("#")[0]+"#");history.pushState({fr:1},"");return}
  if(/emg\.html$/.test(l.pathname)){l.replace(new URL("atc.html",l.href).href);history.pushState({fr:1},"");return}
 }catch(x){}
 close(true);
});
})();
