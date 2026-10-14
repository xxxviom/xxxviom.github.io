(function(){
var KEY="snd",FR=window.parent!==window;
function on(){try{return localStorage.getItem(KEY)!=="0"}catch(e){return true}}
function set(v){try{localStorage.setItem(KEY,v?"1":"0")}catch(e){}document.dispatchEvent(new CustomEvent("snd",{detail:v}))}
window.icaoSound={on:on,set:set};
if(FR)document.documentElement.classList.add("in-fr");
var go=0,SEL="a.m,a.it,button.r";
function el(e){return e.target.closest&&e.target.closest(SEL)}
function clr(){document.querySelectorAll(".dn").forEach(function(n){n.classList.remove("dn")})}
var sx=0,sy=0,mv=0;
document.addEventListener("pointerdown",function(e){var a=el(e);sx=e.clientX;sy=e.clientY;mv=0;if(a)a.classList.add("dn")});
document.addEventListener("pointermove",function(e){if(!mv&&(Math.abs(e.clientX-sx)>8||Math.abs(e.clientY-sy)>8)){mv=1;clr()}});
["pointerup","pointercancel","pointerleave","scroll","touchmove"].forEach(function(n){document.addEventListener(n,clr,true)});
function leaf(u){return u.split("#")[0].split("?")[0].split("/").pop()||"index.html"}
function nav(h){
 if(!FR){location.href=h;return}
 if(leaf(h)==="index.html"){parent.postMessage({icao:"close"},"*");return}
 location.replace(h)}
document.addEventListener("click",function(e){
 if(e.defaultPrevented)return;
 var a=e.target.closest&&e.target.closest("a[href]");
 if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button>0)return;
 var raw=a.getAttribute("href")||"";
 if(/^(https?:|mailto:|tel:)/i.test(raw)||a.target==="_blank")return;
 var b=el(e);
 if(b&&mv)return;
 if(go)return;
 if(FR||b){
  e.preventDefault();go=1;
  if(b)a.classList.add("dn");
  var h=a.href;
  setTimeout(function(){go=0;clr();nav(h)},b?170:0);
 }
});
addEventListener("pageshow",function(){go=0;clr()});
})();
