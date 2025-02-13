console.log("I am script");

let currentSong = new Audio();

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
        let response = await fetch("http://localhost:3000/api/songs");
        let songs = await response.json();
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

const playMusic = async (id) => {
    try {
        let response = await fetch(`http://localhost:3000/api/songs/${id}`);
        let song = await response.json();
        currentSong.src = song.url; // Assuming the song object has a URL field
        currentSong.play()
            .catch((error) => {
                console.error("Error playing audio:", error);
            });

        document.querySelector(".songinfo").innerHTML = decodeURI(song.title);
        document.querySelector(".songduration").innerHTML = "00:00 / 00:00";
    } catch (error) {
        console.error("Error playing song:", error);
    }
}

async function main() {
    let songs = await getSongs();
    console.log(songs);

    // Show all the songs in playlist
    let songUl = document.querySelector(".songList ul");
    songUl.innerHTML = ""; // Clear existing list
    for (const song of songs) {
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
        li.addEventListener("click", () => playMusic(song._id));
        songUl.appendChild(li);
    }

    // Attach event listeners for play, pause, previous, next, etc.
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songduration").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%";
    });

    previoues.addEventListener("click", () => {
        currentSong.pause();
        console.log("previoes clicked");

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]._id);
        } else if ((index - 1) < 0) {
            index = (index - 1) + songs.length;
            playMusic(songs[index]._id);
        }
    });

    next.addEventListener("click", () => {
        currentSong.pause();
        console.log("next clicked");

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]._id);
        } else if ((index + 1) >= songs.length) {
            index = songs.length - (index + 1);
            playMusic(songs[index]._id);
        }
    });

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", () => {
        currentSong.volume = document.querySelector(".range").getElementsByTagName("input")[0].value / 100;
    });
}

main();