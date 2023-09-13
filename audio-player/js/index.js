import songs from "./music.json" assert { type: "json" };

const playButton = document.querySelector('.button-play');
const nextButton = document.querySelector('.button-next');
const prevButton = document.querySelector('.button-prev');

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
    currentIndex +=1;
    playAudio();
}

function prevAudio() {
    isPlay = false;
    currentIndex -=1;
    playAudio();
}

playButton.addEventListener('click', playAudio);
nextButton.addEventListener('click', nextAudio);
prevButton.addEventListener('click', prevAudio);