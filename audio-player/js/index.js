import songs from "./music.json" assert { type: "json" };

const playButton = document.querySelector('.button-play');
const nextButton = document.querySelector('.button-next');
const prevButton = document.querySelector('.button-prev');

const audioImg = document.querySelector('.audio-img');
const blur = document.querySelector('.blur');

const nameSong = document.querySelector('.name-song');
const artistSong = document.querySelector('.artist-song');

const progressArea = document.querySelector(".audio-progress-area");
const progressBar = progressArea.querySelector(".audio-progress-bar");

const audio = new Audio();
let isPlay = false;
let currentIndex = 0;
let currentSong = songs[currentIndex];
let currentTime = 0;

window.addEventListener("load", ()=>{
    loadAudio();
  });

function loadAudio() {
   
    audioImg.src =  `../assets/img/${currentSong.img}.jpg`;
    blur.style.backgroundImage=`url(../assets/img/${currentSong.img}.jpg)`;
    nameSong.innerText = `${currentSong.name}`;
    artistSong.innerText = `${currentSong.artist}`;
}

function playAudio() {

    currentSong = songs[currentIndex];

    if (!isPlay) {
        isPlay = true;
        audio.src = `../assets/audio/${currentSong.src}.mp3`;
        audio.currentTime = currentTime;
        audio.play();  
        playButton.innerText = "pause";  
        loadAudio();

    } else {
        pauseAudio();
    }    
}

function pauseAudio() {
    isPlay = false;
    audio.pause();
    playButton.innerText = "play_arrow";
}

function nextAudio() {
    isPlay = false;
    currentTime = 0;

    if (currentIndex === songs.length-1) {
        currentIndex = 0;
    } else currentIndex +=1;
    playAudio();
}

function prevAudio() {
    isPlay = false;
    currentTime = 0;

    if (currentIndex === 0) {
        currentIndex = songs.length-1;
    } else currentIndex -=1;
    playAudio();
}

audio.addEventListener("timeupdate", (e)=>{
    currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;

    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = document.querySelector(".current-time"),
    musicDuration = document.querySelector(".max-duration");

    // audio.addEventListener("loadeddata", ()=>{
    //   // update song total duration
       let mainAdDuration = audio.duration;
       let totalMin = Math.floor(mainAdDuration / 60);
       let totalSec = Math.floor(mainAdDuration % 60);
       if(totalSec < 10){ //if sec is less than 10 then add 0 before it
         totalSec = `0${totalSec}`;
       }
       musicDuration.innerText = `${totalMin}:${totalSec}`;
    // });
     // update playing song current time
     let currentMin = Math.floor(currentTime / 60);
     let currentSec = Math.floor(currentTime % 60);
     if(currentSec < 10){ //if sec is less than 10 then add 0 before it
       currentSec = `0${currentSec}`;
     }
     musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

     if (currentTime === duration) {
        nextAudio();
     }
  });


playButton.addEventListener('click', playAudio);
nextButton.addEventListener('click', nextAudio);
prevButton.addEventListener('click', prevAudio);