import songs from "./music.json" assert { type: "json" };

const playButton = document.querySelector('.button-play');
const nextButton = document.querySelector('.button-next');
const prevButton = document.querySelector('.button-prev');
const repeatButton = document.querySelector(".button-repeat");
const volumeButton = document.querySelector(".button-volume");
const volumeButtonMin = document.querySelector(".volume-min");

const audioImg = document.querySelector('.audio-img');
const blur = document.querySelector('.blur');

const nameSong = document.querySelector('.name-song');
const artistSong = document.querySelector('.artist-song');

const progressArea = document.querySelector(".audio-progress-area");
const progress = document.querySelector(".audio-progress");

const progressVolumeWrapper = document.querySelector(".audio-volume-wrapper");
const progressVolume = document.querySelector(".audio-progress-volume");

const audio = new Audio();

let isPlay = false;
let isShuffle = false;
let currentIndex = 0;
let currentSong = songs[currentIndex];
let currentTime = 0;
let currentVolume = 40;
progress.value = 0;
audio.src = `./assets/audio/${currentSong.src}.mp3`;


window.addEventListener("load", ()=>{
    loadAudio();
   
  });

function loadAudio() {
   
    audioImg.src =  `./assets/img/${currentSong.img}.jpg`;
    blur.style.backgroundImage=`url(./assets/img/${currentSong.img}.jpg)`;
    nameSong.innerText = `${currentSong.name}`;
    artistSong.innerText = `${currentSong.artist}`;  
    
    document.querySelector('.volume-count').innerText = `${currentVolume}`;
}

function playAudio() {

    currentSong = songs[currentIndex];

    if (!isPlay) {
        isPlay = true;
        audio.src = `./assets/audio/${currentSong.src}.mp3`;
        audio.currentTime = currentTime;
        audio.play();
        audio.volume = currentVolume / 100;  
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
function changeRandomPlay () {
    return Math.floor((Math.random() * songs.length));
}

function nextAudio() {
    isPlay = false;
    currentTime = 0;
    if (isShuffle) {
        currentIndex = changeRandomPlay ();
    }

    if (currentIndex === songs.length-1) {
        currentIndex = 0;
    } else currentIndex +=1;
    
    playAudio();
}

function prevAudio() {
    isPlay = false;
    currentTime = 0;

    if (isShuffle) {
        currentIndex = changeRandomPlay ();
    }

    if (currentIndex === 0) {
        currentIndex = songs.length-1;
    } else currentIndex -=1;
   
    playAudio();
}

 audio.addEventListener("timeupdate", (e) => {


    currentTime = e.target.currentTime; //getting playing song currentTime  
     
    const duration = e.target.duration; 

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
    
    progress.value = 0;
    let musicDuration = document.querySelector(".max-duration");
    let mainAdDuration = audio.duration;

    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
});

progress.addEventListener("input", (e) => {
    progress.value = e.target.value;

    audio.currentTime = e.target.value * audio.duration / 100;  

    let musicCurrentTime = document.querySelector(".current-time");    
   
     // update playing song current time
     let currentMin = Math.floor(audio.currentTime  / 60);
     let currentSec = Math.floor(audio.currentTime  % 60);
     if(currentSec < 10) {
       currentSec = `0${currentSec}`;
     }
     musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

     if (audio.currentTime  === audio.duration) {
        repeatAudio();
     }
});

function volumeShowAudio () {
    progressVolumeWrapper.classList.toggle('show');
}

progressVolume.addEventListener("input", (e) => {

    currentVolume = e.target.value;
    audio.volume = currentVolume / 100;
    document.querySelector('.volume-count').innerText = `${currentVolume}`;

    if (currentVolume == 0) {
        volumeButton.innerText = "volume_off";
        volumeButtonMin.innerText = "volume_off"; 
    } else if (currentVolume > 60) {
        volumeButton.innerText = "volume_up";
        volumeButtonMin.innerText = "volume_up"; 
    } else {
        volumeButton.innerText = "volume_down";
        volumeButtonMin.innerText = "volume_down"; 
    }
    e._isClickMenu = true;
        
    // setTimeout(() => {   
    //     progressVolumeWrapper.classList.remove('show');
    // }, 3000); 
        
});

volumeButtonMin.addEventListener('click', () => {
    if (audio.volume != 0) {
      volumeButton.innerText = "volume_off";
      volumeButtonMin.innerText = "volume_off";
      audio.volume = 0;      
    } else {
        volumeButton.innerText = "volume_down";
        volumeButtonMin.innerText = "volume_down";
        audio.volume = currentVolume / 100;
    }
    document.querySelector('.volume-count').innerText = `${currentVolume}`;
    progressVolume.value = currentVolume;  
    
});

// Закрыть volume при клике вне меню
volumeButton.addEventListener('click', event => {
    event._isClickMenu = true;
});

document.body.addEventListener('click', event => {
    if (event._isClickMenu) return;
    
    if (!event.target.closest('.audio-volume-wrapper')) {
        progressVolumeWrapper.classList.remove('show');
    };
    
});


repeatButton.addEventListener("click", () => {
  let text = repeatButton.innerText;

  switch (text) {
    case "repeat":
        isShuffle = false;
        repeatButton.innerText = "repeat_one";
      break;
    case "repeat_one":
        isShuffle = true;
        repeatButton.innerText = "shuffle";
      break;
    case "shuffle":
        isShuffle = false;
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
        currentIndex = changeRandomPlay();
        currentTime = 0;
        isPlay = false;
        playAudio();
      break;
    }
};

playButton.addEventListener('click', playAudio);
nextButton.addEventListener('click', nextAudio);
prevButton.addEventListener('click', prevAudio);
volumeButton.addEventListener('click', volumeShowAudio);