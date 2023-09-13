import songs from "./music.json" assert { type: "json" };

const playButton = document.querySelector('.button-play');
const nextButton = document.querySelector('.button-next');
const prevButton = document.querySelector('.button-prev');

const audioImg = document.querySelector('.audio-img');
const blur = document.querySelector('.blur');

const nameSong = document.querySelector('.name-song');
const artistSong = document.querySelector('.artist-song');

const audio = new Audio();
let isPlay = false;
let currentIndex = 0;

function playAudio() {    

    const currentSong = songs[currentIndex];
    if (!isPlay) {
        isPlay = true;
        audio.src = `../assets/audio/${currentSong.src}.mp3`;
        audio.currentTime = 0;
        audio.play();  
        playButton.innerText = "pause";  
        audioImg.src =  `../assets/img/${currentSong.img}.jpg`;
        blur.style.backgroundImage=`url(../assets/img/${currentSong.img}.jpg)`;
        nameSong.innerText = `${currentSong.name}`;
        artistSong.innerText = `${currentSong.artist}`;

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

    if (currentIndex === songs.length-1) {
        currentIndex = 0;
    } else currentIndex +=1;
    playAudio();
}

function prevAudio() {
    isPlay = false;
    
    if (currentIndex === 0) {
        currentIndex = songs.length-1;
    } else currentIndex -=1;
    playAudio();
}

playButton.addEventListener('click', playAudio);
nextButton.addEventListener('click', nextAudio);
prevButton.addEventListener('click', prevAudio);