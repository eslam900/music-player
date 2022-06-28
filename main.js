// creat the array for thr music
const musicList = [
  {
    name: "أنا بعشق البحر",
    url: "music/أنا بعشق البحر.mp3",
  },
  {
    name: "ابكى",
    url: "music/ابكى.mp3",
  },
  {
    name: "El-Bo3d Naar",
    url: "music/06.El-Bo3d Naar.mp3",
  },
  {
    name: "فى عنيكى",
    url: "music/فى عنيكى.mp3",
  },
  {
    name: "تحت الياسمين",
    url: "music/محمد منير تحت الياسمين.mp3",
  },
  {
    name: "محمد منير طعم البيوت",
    url: "music/محمد منير طعم البيوت.mp3",
  },
  {
    name: "قلب الحياة",
    url: "music/قلب الحياة.mp3",
  },
  {
    name: "Fe 3eneki 3'rba",
    url: "music/08.Fe 3eneki 3'rba.mp3",
  },
  {
    name: "Layaly1",
    url: "music/09.Layaly1.mp3",
  },
];
// creat the var
let menuBtn = document.getElementById("menu-btn");
let hiddenBtn = document.getElementById("hidden-btn");
let menu = document.querySelector(".music-menu");
let audio = document.querySelector("audio");
let musicIcon = document.querySelector(".music-info img");
let musicName = document.querySelector(".music-info h1");
let rangTime = document.getElementById("time");
let volume = document.getElementById("volume");
let totalTime = document.getElementById("totalTime");
let timeNow = document.getElementById("timeNow");
let volumeIcon = document.getElementById("volume-icon")
let btnPlay = document.getElementById("play");
let btnNext = document.getElementById("next");
let btnPrev = document.getElementById("prevend");
let muteVolume = document.getElementById("mute");
let count = 0;
// set the music
const setMusic = () => {
  rangTime.value = 0;
  volume.value = 1
  musicName.innerHTML = musicList[count].name;
  audio.src = musicList[count].url;
   setInterval(() => {
    rangTime.max = audio.duration;
    totalTime.textContent = musicTime(audio.duration);
    timeNow.textContent = musicTime(audio.currentTime);
    rangTime.value = audio.currentTime;
    audio.ended ? btnNext.click() : "";
  }, 500);
};
// handdel music time
const musicTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

setMusic();
// create btn play function
btnPlay.addEventListener("click", () => {
  if (btnPlay.classList.contains("play")) {
    musicIcon.classList.add("activ");
    audio.play();
    btnPlay.classList = "fa-solid fa-circle-pause";
  } else {
    btnPlay.classList = "fa-solid fa-circle-play play";
    musicIcon.classList.remove("activ");
    audio.pause();
  }
});
// click on btn volume-icon
volumeIcon.addEventListener("click",()=>{
  volume.classList.toggle("activ")
  volumeIcon.classList.toggle("activ")
})
// create btn next music
btnNext.addEventListener("click", () => {
  if (count < musicList.length - 1 && !btnPlay.classList.contains("play")) {
    count++;
    setMusic();
    audio.play();
  } else if (count === musicList.length - 1) {
    count = 0;
    setMusic();
    audio.play();
  }
});
// create btn prevent music
btnPrev.addEventListener("click", () => {
  if (count > 0 && !btnPlay.classList.contains("play")) {
    count--;
    setMusic();
    audio.play();
  } else if (count === 0) {
    count = musicList.length - 1;
    setMusic();
    audio.play();
  }
});
// create btn mute volume
muteVolume.addEventListener("click",()=>{
  if(audio.volume > 0 ){
    audio.volume = 0
  }else{
    audio.volume = volume.value
  }
})
// change range & time music
rangTime.addEventListener("change", () => {
  audio.currentTime = rangTime.value;
});
// show music menu
menuBtn.addEventListener("click", () => {
  if (menu.innerHTML === "") {
    menu.classList.add("show-menu");
    let ul = document.createElement("ul");
    musicList.map((el, idx) => {
      let li = document.createElement("li");
      let icon = document.createElement("i");
      let text = document.createTextNode(el.name);
      icon.classList = "fa-solid fa-music";
      li.appendChild(icon);
      li.appendChild(text);
      ul.appendChild(li);
      menu.appendChild(ul);
      // create click on li
      li.addEventListener("click", () => {
        count = idx;
        btnPlay.classList = "fa-solid fa-circle-pause";
        musicIcon.classList.add("activ");
        setMusic();
        audio.play();
      });
    });
  }
});
// hidden music menu
hiddenBtn.addEventListener("click", () => {
  menu.classList.remove("show-menu");
  menu.innerHTML = "";
});
volume.addEventListener("change",()=>{
  audio.volume = volume.value
})
