const img = document.querySelector("img");
const music = document.querySelector("audio");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
let progress_div = document.getElementById("progress_div");

const songs = [
    {
    name : "1",
    title : "96 BGM Whatsapp",
    artist : "Arijith Sing",
  },
  {
    name : "2",
    title : "Middle class",
    artist : "Dnush",
   },
  {
    name : "3",
    title : "Sad Whatsapp",
    artist : "Monir khan",
}
];

let isPlaying = false ;

// for play function
const playMusic = () =>{
    isPlaying = true ;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
};

// for pause function
const pauseMusic = () =>{
    isPlaying = false ;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click", () =>{

    isPlaying ? pauseMusic() : playMusic() ;
});

// change the song data
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "audio/" + songs.name + ".opus";
    img.src = "images/" + songs.name + ".jpg";
}
songIndex = 0 ;

// loadSong(songs[1]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length ;
    loadSong(songs[songIndex]);
    playMusic() ;
}
const prevtSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length ;
    loadSong(songs[songIndex]);
    playMusic() ;
}

// progress js start 

music.addEventListener("timeupdate", (event) => {
    const {currentTime,duration} = event.srcElement;
    let progress_time = (currentTime/duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration update
    
    let min_duration = Math.floor(duration / 60) ;
    let sec_duration = Math.floor(duration % 60) ;
    let tot_duration = `${min_duration}: ${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`
    };

    // current time update
    
    let min_currentTime = Math.floor(currentTime / 60) ;
    let sec_currentTime = Math.floor(currentTime % 60) ;

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`
});

// progress onclick function 
progress_div.addEventListener("click",(event) => {
    const {duration} = music;
    
    let move_progress = (event.offsetX / event.srcElement.clientWidth)* duration;
    music.currentTime = move_progress ;
    
});

// if music end start next song
music.addEventListener("ended",nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevtSong);