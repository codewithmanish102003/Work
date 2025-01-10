console.log("I am script")

let currentSong = new Audio()

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


// D:\Work\Spotify\Songs
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/Spotify/Songs/")

    let response = await a.text()

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let Songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i]
        if (element.href.endsWith(".mp3")) {
            Songs.push(element.href.split("/Songs/")[1])
        }
    }

    return Songs
}

document.getElementById("play").disabled = false;

const playMusic = (track, pause = false) => {
    currentSong.src = "http://127.0.0.1:5500/Spotify/Songs/" + track
    if (!pause) {
        currentSong.play()
        play.src = "pause.svg"
    }
    currentSong.play()
        .catch((error) => {
            console.error("Error playing audio:", error)
        })

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songduration").innerHTML = "00:00 / 00:00"

}

async function main() {
    let Songs = await getSongs()
    console.log(Songs)

    // playMusic(Songs[0], true)

    // Show all the songs in playlist
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of Songs) {
        songUl.innerHTML = songUl.innerHTML + ` <li>
                            <img class="invert" src="musical-notes-outline.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="play">
                            </div>
                        </li>`

    }

    // Attach an event listener to each songs
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", (element) => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    //Attach a eventlistener to play pause previoues and next
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })


    //Listen for timeupdate
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songduration").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })


    //Add an Event Listener
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100

        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //EventListener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //EventListener for close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%"
    })

    //add event listener to previoues
    previoues.addEventListener("click", () => {
        currentSong.pause()
        console.log("previoes clicked")

        let index = Songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(Songs[index - 1])
        }
        else if((index-1) < 0){
            index=(index-1)+Songs.length;
            playMusic(Songs[index])
        }
    })


    //adding event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("next clicked")

        let index = Songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < Songs.length) {
            playMusic(Songs[index + 1])
        }
        else if((index+1)>=Songs.length){
            index=Songs.length-(index+1)
            playMusic(Songs[index])
        }
    })


    //add an event listener to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",()=>{
        currentSong.volume = document.querySelector(".range").getElementsByTagName("input")[0].value/100
        
    })

}

main()