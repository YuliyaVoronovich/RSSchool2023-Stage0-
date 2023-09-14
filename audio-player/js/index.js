import songs from "./music.json" assert { type: "json" };

const playButton = document.querySelector('.button-play');
const nextButton = document.querySelector('.button-next');
const prevButton = document.querySelector('.button-prev');
const repeatButton = document.querySelector(".button-repeat");
const volumeButton = document.querySelector(".button-volume");

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
audio.src = `./assets/audio/${currentSong.src}.mp3`;


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
        audio.src = `./assets/audio/${currentSong.src}.mp3`;
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

function volumeAudio () {
    audio.volume = 0;
    volumeButton.innerText = "volume_off";  
}

audio.addEventListener("timeupdate", (e) => {

    currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;

    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = document.querySelector(".current-time");    
   
     // update playing song current time
     let currentMin = Math.floor(currentTime / 60);
     let currentSec = Math.floor(currentTime % 60);
     if(currentSec < 10) {
       currentSec = `0${currentSec}`;
     }
     musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

     if (currentTime === duration) {
        repeatAudio();
     }
});

audio.addEventListener("loadeddata", () => {
    
    let musicDuration = document.querySelector(".max-duration");
    let mainAdDuration = audio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = audio.duration; //getting song total duration
    
    isPlay = false;
    currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playAudio();
});


repeatButton.addEventListener("click", () => {
  let text = repeatButton.innerText;

  switch (text) {
    case "repeat":
        repeatButton.innerText = "repeat_one";
      break;
    case "repeat_one":
        repeatButton.innerText = "shuffle";
      break;
    case "shuffle":
        repeatButton.innerText = "repeat";
      break;
  }
});

function repeatAudio() {
    let text = repeatButton.innerText;

    switch (text) {
      case "repeat":
        nextAudio();
      break;
      case "repeat_one":
        currentTime = 0;
        isPlay = false;
        playAudio();
      break;
      case "shuffle":
        currentIndex = Math.floor((Math.random() * songs.length));
        currentTime = 0;
        isPlay = false;
        playAudio();
      break;
    }
};

playButton.addEventListener('click', playAudio);
nextButton.addEventListener('click', nextAudio);
prevButton.addEventListener('click', prevAudio);
volumeButton.addEventListener('click', volumeAudio);