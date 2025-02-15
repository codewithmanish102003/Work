console.log("I am script");

let currentSong = new Audio();
let Songs = [];

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    try {
        let response = await fetch("http://127.0.0.1:3000/api/songs/");
        let songs = await response.json();
        console.log("Fetched songs from API:", songs);
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

document.getElementById("play").disabled = false;

const playMusic = (song, pause = false) => {
    if (!pause) {
        currentSong.pause(); // Pause the current song before loading a new one
    }

    currentSong.src = song.url;
    currentSong.load(); // Ensure the audio is loaded

    currentSong.onerror = (e) => {
        console.error("Error loading audio source:", e);
    };

    currentSong.oncanplay = () => {
        if (!pause) {
            currentSong.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
            play.src = "pause.svg";
        } else {
            currentSong.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        }
    };

    currentSong.ontimeupdate = () => {
        if (!isNaN(currentSong.duration)) {
            document.querySelector(".songduration").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }
    };

    document.querySelector(".songinfo").innerHTML = song.title;
    document.querySelector(".songduration").innerHTML = "00:00 / 00:00";
};

async function main() {
    Songs = await getSongs();
    console.log("Songs to display:", Songs);

    // Show all the songs in playlist
    let songUl = document.querySelector(".songList ul");
    songUl.innerHTML = ""; // Clear existing list
    for (const song of Songs) {
        let li = document.createElement("li");
        li.innerHTML = `
            <img class="invert" src="musical-notes-outline.svg" alt="">
            <div class="info">
                <div>${song.title}</div>
                <div>${song.artist}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="play">
            </div>
        `;
        li.addEventListener("click", () => playMusic(song));
        songUl.appendChild(li);
    }
}

// Attach an event listener to each song
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", (element) => {
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(Songs.find(song => song.title === e.querySelector(".info").firstElementChild.innerHTML.trim()));
    });
});

// Attach event listeners for play, pause, previous, next, etc.
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
        play.src = "pause.svg";
    } else {
        currentSong.pause();
        play.src = "play.svg";
    }
});

currentSong.addEventListener("timeupdate", () => {
    if (!isNaN(currentSong.duration)) {
        document.querySelector(".songduration").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    }
});

document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    if (!isNaN(currentSong.duration)) {
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    }
});

document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-130%";
});

previoues.addEventListener("click", () => {
    currentSong.pause();
    console.log("Previous clicked");

    let index = Songs.findIndex(song => song.url === currentSong.src);
    if ((index - 1) >= 0) {
        playMusic(Songs[index - 1]);
    } else if ((index - 1) < 0) {
        index = (index - 1) + Songs.length;
        playMusic(Songs[index]);
    }
});

next.addEventListener("click", () => {
    currentSong.pause();
    console.log("Next clicked");

    let index = Songs.findIndex(song => song.url === currentSong.src);
    if ((index + 1) < Songs.length) {
        playMusic(Songs[index + 1]);
    } else if ((index + 1) >= Songs.length) {
        index = Songs.length - (index + 1);
        playMusic(Songs[index]);
    }
});

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", () => {
    currentSong.volume = document.querySelector(".range").getElementsByTagName("input")[0].value / 100;
});

main();