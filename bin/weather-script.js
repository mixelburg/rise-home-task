(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const p=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var s=(t=>(t.Clear="Clear",t.Clouds="Clouds",t.Rain="Rain",t.Snow="Snow",t.Thunderstorm="Thunderstorm",t))(s||{});const h="fbf712a5a83d7305c3cda4ca8fe7ef29",g=t=>{const o=new Date(t*1e3);return p[o.getUTCDay()]},f=t=>{const o=[];for(const r of t.list){const n=g(r.dt),e=r.weather[0];o.push({weekday:n,weatherType:e.main,description:e.description,temperature:r.temp.day,windSpeed:r.speed})}return{city:t.city.name,days:o}},w=t=>{const o=p.reduce((n,e)=>(n[e]={tempSum:0,windSum:0,count:0,weatherType:[],description:[]},n),{});for(const n of t.days){const e=o[n.weekday];e.tempSum+=n.temperature,e.windSum+=n.windSpeed,e.weatherType.push(n.weatherType),e.description.push(n.description),e.count+=1}const r=p.map(n=>{const e=o[n],a=e.count?e.tempSum/e.count:0,i=e.count?e.windSum/e.count:0;return{weekday:n,temperature:a,weatherType:e.weatherType[0],description:e.description[0],windSpeed:i}});return{city:t.city,days:r}},b=async t=>{const o=`https://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=1&appid=${h}`,r=await fetch(o);if(!r.ok)throw new Error("Failed to fetch coordinates");const n=await r.json();return n.length?{lat:n[0].lat,lon:n[0].lon}:null},C=async({lat:t,lon:o})=>{const r=`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${t}&lon=${o}&cnt=16&units=metric&APPID=${h}`,n=await fetch(r);if(!n.ok)throw new Error("Failed to fetch weather data");return await n.json()},S=async t=>{const o=await C(t),r=f(o);return w(r)},x=t=>t?document.getElementById(t):null,v=()=>{const t=document.createElement("div");return t.id="weather-forecast",document.body.insertBefore(t,document.body.firstChild),t},I=t=>{const o=x(t);return o||v()},y=t=>/^-?\d+(\.\d+)?$/.test(t),m={[s.Clear]:"https://openweathermap.org/img/wn/01d@2x.png",[s.Clouds]:"https://openweathermap.org/img/wn/04d@2x.png",[s.Rain]:"https://openweathermap.org/img/wn/10d@2x.png",[s.Snow]:"https://openweathermap.org/img/wn/13d@2x.png",[s.Thunderstorm]:"https://openweathermap.org/img/wn/11d@2x.png"},E=t=>m[t]||m[s.Clear],F=(t,o)=>{o.innerHTML="",o.style.fontFamily="Roboto, Arial, sans-serif";const r=document.createElement("div");r.style.display="flex",r.style.flexDirection="row",r.style.gap="5px";for(const n of t.days){const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.gap="5px",e.style.border="1px solid #ccc",e.style.padding="5px",e.style.textAlign="center",e.style.width="100px";const a=document.createElement("div");a.style.fontSize="1em",a.style.fontWeight="700",a.textContent=n.weekday,e.appendChild(a);const i=document.createElement("img");i.src=E(n.weatherType),i.alt=n.weatherType,e.appendChild(i);const d=document.createElement("div");d.style.fontWeight="700",d.textContent=n.description,d.style.height="50px",e.appendChild(d);const c=document.createElement("div");c.style.fontSize="2em",c.textContent=`${Math.ceil(n.temperature)}°C`,e.appendChild(c);const l=document.createElement("div");l.style.fontSize="0.8em",l.textContent=`${Math.ceil(n.windSpeed)} km/h wind`,e.appendChild(l),r.appendChild(e)}o.appendChild(r)},D=()=>{const t=document.createElement("link");t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",t.rel="stylesheet",document.head.appendChild(t)},T=t=>{t.innerHTML=`
<div style="width: 300px">
        <label for="cityInput">Enter city:</label>
        <input type="text" id="cityInput" placeholder="City" value="london  ">
        <br>
        <label for="latitudeInput">Enter latitude:</label>
        <input type="text" id="latitudeInput" placeholder="Latitude">
        <br>
        <label for="longitudeInput">Enter longitude:</label>
        <input type="text" id="longitudeInput" placeholder="Longitude">
        <br>
        <button id="submitButton">Submit</button>
</div>
    `,t.querySelector("#submitButton").addEventListener("click",async()=>{const r=t.querySelector("#cityInput").value,n=t.querySelector("#latitudeInput").value,e=t.querySelector("#longitudeInput").value;let a=null;if(r)try{a=await b(r)}catch(i){console.error("Failed to get coordinates:",i),alert(`Failed to get coordinates: ${i}`)}else{if(!y(n)){alert("Invalid latitude");return}if(!y(e)){alert("Invalid longitude");return}a={lat:parseFloat(n),lon:parseFloat(e)}}if(!a){alert("Failed to get coordinates");return}console.log("City:",r),console.log("Coords",a);try{const i=await S(a);console.log(i),F(i,t)}catch(i){console.error("Failed to get weather:",i),alert(`Failed to get weather: ${i}`)}})},L=t=>{D();const o=I(t);T(o)},u=document.currentScript,$=u==null?void 0:u.getAttribute("data-div-id");L($);
