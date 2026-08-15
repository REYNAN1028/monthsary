/* CUSTOMIZE HERE */
const correctAnswer="16";
const monthsaryDate="August 16";
const girlfriendName="Shasha";
const senderName="Reyrey";

const memories=[
{image:"images/photo1.jpg",date:"THE BEGINNING OF US",title:"The day you finally said yes.",description:"This will always be one of the memories closest to my heart. The day you said yes to me, and somehow, our little story officially began."},
{image:"images/photo2.jpg",date:"A LITTLE MOMENT I TREASURE",title:"You were so beautiful that day not just then, but always.",description:"I remember looking at you through the screen and thinking how lucky I was to have someone as beautiful and special as you in my life."},
{image:"images/photo3.jpg",date:"OUR SILLY LITTLE MOMENT",title:"Us being our weirdest selves.",description:"We don't always have to look perfect. Sometimes, making funny faces together is enough to make a simple video call one of my favorite memories."},
{image:"images/photo4.jpg",date:"ANOTHER VC I TREASURE",title:"How can you be this cute?",description:"Another ordinary video call that became special just because it was with you. Somehow, you always find a way to make me fall for you all over again."},
{image:"images/photo5.jpg",date:"YOUR BEAUTIFUL SMILE",title:"Your smile will always be one of my favorites..",description:"Out of all the little things I love about you, your smile has a special place in my heart. Seeing you smile, even through a screen, can instantly make my day better."},
{image:"images/photo6.jpg",date:"MY FAVORITE PERSON",title:"And then there's you.",description:"Just you being you. Smiling, being cute, and somehow making me fall for you a little more every time we talk. These little moments mean more to me than you know."}
];

const $=id=>document.getElementById(id);
const screens=document.querySelectorAll(".screen");
const show=id=>{screens.forEach(s=>s.classList.remove("active"));$(id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})};

$("openSurpriseBtn").onclick=()=>{show("secret");setTimeout(()=>$("secretInput").focus(),350)};
function checkSecret(){
 const v=$("secretInput").value.trim();
 if(v.toLowerCase()===correctAnswer.toLowerCase()){
  $("secretMessage").textContent=`You remembered! ${monthsaryDate} 💚`;
  $("unlockBtn").textContent="Welcome, my love 💚";
  setTimeout(()=>show("scrapbook"),850);
 }else{$("secretMessage").textContent="Hmm... that's not it 😚 Try again, love.";$("secretInput").value="";$("secretInput").focus()}
}
$("unlockBtn").onclick=checkSecret;
$("secretInput").onkeydown=e=>{if(e.key==="Enter")checkSecret()};

let currentMemory=0;
function makeDots(){
 $("memoryDots").innerHTML="";
 memories.forEach((_,i)=>{const d=document.createElement("span");d.className="memory-dot";d.onclick=()=>{currentMemory=i;updateMemory()};$("memoryDots").appendChild(d)});
}
function updateMemory(){
 const m=memories[currentMemory];
 $("memoryImageWrapper").classList.remove("swap");$("memoryContent").classList.remove("swap");
 void $("memoryImageWrapper").offsetWidth;
 $("memoryImage").src=m.image;$("memoryImage").alt=m.title;
 $("memoryNumber").textContent=String(currentMemory+1).padStart(2,"0");
 $("memoryDate").textContent=m.date;$("memoryTitle").textContent=m.title;$("memoryDescription").textContent=m.description;
 $("memoryImageWrapper").classList.add("swap");$("memoryContent").classList.add("swap");
 [...$("memoryDots").children].forEach((d,i)=>d.classList.toggle("active",i===currentMemory));
}
$("nextMemory").onclick=()=>{currentMemory=(currentMemory+1)%memories.length;updateMemory()};
$("previousMemory").onclick=()=>{currentMemory=(currentMemory-1+memories.length)%memories.length;updateMemory()};
$("continueMemoriesBtn").onclick=()=>show("ldrMemories");
$("continueLetterBtn").onclick=()=>show("letter");
document.querySelectorAll("[data-back]").forEach(b=>b.onclick=()=>show(b.dataset.back));

function openLetter(){
 if($("envelopeWrapper").classList.contains("open"))return;
 $("envelopeWrapper").classList.add("open");$("envelopeHint").textContent="A little something from my heart... 💚";$("openLetterBtn").classList.add("hidden");
 setTimeout(()=>{$("loveLetter").classList.add("show");$("continueMusicBtn").classList.remove("hidden")},700);
}
$("openLetterBtn").onclick=openLetter;$("envelopeWrapper").onclick=openLetter;
$("continueMusicBtn").onclick=()=>show("music");

const audio=$("audioPlayer"),player=document.querySelector(".music-player");
const fmt=s=>isNaN(s)||s<0?"0:00":`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
$("playBtn").onclick=()=>{
 if(audio.paused){audio.play().then(()=>{$("playBtn").textContent="Ⅱ";$("audioStatus").textContent="Playing our song... 💚";player.classList.add("playing")}).catch(()=>$("audioStatus").textContent="Please check audio/our-song.mp3")}
 else{audio.pause();$("playBtn").textContent="▶";$("audioStatus").textContent="Music paused.";player.classList.remove("playing")}
};
audio.onloadedmetadata=()=>{$("duration").textContent=fmt(audio.duration)};
audio.ontimeupdate=()=>{if(audio.duration){$("progressBar").style.width=`${audio.currentTime/audio.duration*100}%`;$("currentTime").textContent=fmt(audio.currentTime)}};
audio.onended=()=>{$("playBtn").textContent="▶";player.classList.remove("playing");$("audioStatus").textContent="Song finished. 💚";$("progressBar").style.width="0%"};
$("progressTrack").onclick=e=>{if(audio.duration){const r=$("progressTrack").getBoundingClientRect();audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration}};

$("continueFinalBtn").onclick=()=>show("final");
$("finalSurpriseBtn").onclick=()=>{$("finalSurpriseBtn").classList.add("hidden");$("finalMessage").classList.add("show");celebrate()};
function celebrate(){
 const symbols=["♥","♡","✦","✧","✿","🍃"];
 for(let i=0;i<50;i++){const x=document.createElement("div");x.className="celebration-item";x.textContent=symbols[Math.floor(Math.random()*symbols.length)];x.style.setProperty("--x",`${(Math.random()-.5)*900}px`);x.style.setProperty("--y",`${(Math.random()-.5)*900}px`);x.style.setProperty("--rotate",`${(Math.random()-.5)*180}deg`);$("celebration").appendChild(x);setTimeout(()=>x.remove(),3000)}
}
$("replayBtn").onclick=()=>{
 audio.pause();audio.currentTime=0;$("playBtn").textContent="▶";$("audioStatus").textContent="Tap play to start our song.";player.classList.remove("playing");$("progressBar").style.width="0%";$("currentTime").textContent="0:00";
 $("envelopeWrapper").classList.remove("open");$("loveLetter").classList.remove("show");$("continueMusicBtn").classList.add("hidden");$("openLetterBtn").classList.remove("hidden");$("envelopeHint").textContent="Tap the envelope to open it.";
 $("finalMessage").classList.remove("show");$("finalSurpriseBtn").classList.remove("hidden");currentMemory=0;updateMemory();show("opening");
};

function floatParticle(){
 const h=document.createElement("div");h.className="floating-heart";h.textContent=["♡","♥","✦","✿","·"][Math.floor(Math.random()*5)];
 h.style.left=`${Math.random()*100}%`;h.style.fontSize=`${12+Math.random()*18}px`;
 const d=7+Math.random()*7;h.style.animationDuration=`${d}s`;$("floatingHearts").appendChild(h);setTimeout(()=>h.remove(),d*1000)
}
setInterval(floatParticle,1200);

document.querySelectorAll("img").forEach(img=>img.onerror=()=>{img.style.display="none";const p=img.parentElement;if(p&&!p.querySelector(".image-placeholder")){const x=document.createElement("div");x.className="image-placeholder";x.textContent="Your memory photo goes here 🌿";p.appendChild(x)}});

makeDots();updateMemory();
