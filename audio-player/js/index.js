import songs from "./music.json" assert { type: "json" };

const playButton = document.querySelector('.button-play');

const audio = new Audio();
let isPlay = false;

function playAudio() {

    const currentSong = songs[0];

    if (!isPlay) {
        isPlay = true;
        audio.src = `../assets/audio/${currentSong.src}.mp3`;
        audio.currentTime = 0;
        audio.play();         
    } else {
        pauseAudio();
    }  
}

function pauseAudio() {
    isPlay = false;
    audio.pause();
}

playButton.addEventListener('click', playAudio);