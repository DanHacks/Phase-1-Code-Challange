const contentDisplay = document.getElementById("content-display");
const searchInput = document.getElementById("search");
let currentlyPlayingAudio = null;
async function fetchMedia() {
    try {
        const response = await fetch('http://localhost:3000/media');
        if (!response.ok) {
            throw new Error(`Failed to fetch media: ${response.statusText}`);
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching media:", error);
        return [];
    }
}

async function loadAllSongs() {
    const media = await fetchMedia();
    displayContent(media);
}

async function searchContent() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        contentDisplay.innerHTML = "<p style='color: yellow;'>Please type in any number from 1 to 10 to get the songs you want to listen to.</p>";
        return;
    }

    const media = await fetchMedia();
    const results = media.filter(item => item.title.toLowerCase().includes(query));

    displayContent(results);}

function displayContent(results) {
    contentDisplay.innerHTML = "";

    if (results.length === 0) {
        contentDisplay.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach(item => {
        const contentItem = document.createElement("div");
        contentItem.className = "content-item";
        const poster = document.createElement("img");
        poster.src = "images/logo.png";
        poster.alt = "Song Poster";
        poster.style.width = "100px";
        poster.style.height = "100px";
        const title = document.createElement("h3");
        title.textContent = item.title;
        const audioElement = document.createElement("audio");
        audioElement.src = item.url;
        audioElement.preload = "metadata";
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        playButton.onclick = async () => {
            if (currentlyPlayingAudio && currentlyPlayingAudio !== audioElement) {
                alert("Pause the current playing song first or refresh the page!.");
                return;
            }

            try {
                await audioElement.play();
                currentlyPlayingAudio = audioElement;
                playButton.disabled = true;
                pauseButton.disabled = false;
            } catch (error) {
                console.error("Error playing audio:", error);
            }
        };
        const pauseButton = document.createElement("button");
        pauseButton.textContent = "Pause";
        pauseButton.disabled = true;
        pauseButton.onclick = () => {
            audioElement.pause();
            currentlyPlayingAudio = null;
            playButton.disabled = false;
            pauseButton.disabled = true;
        };
        const volumeContainer = document.createElement("div");
        volumeContainer.className = "volume-control";
        const volumeIcon = document.createElement("img");
        volumeIcon.src = "images/speaker-medium.jpeg";
        volumeIcon.alt = "Volume Icon";
        volumeIcon.style.width = "20px";
        volumeIcon.style.marginRight = "10px";
        const volumeSlider = document.createElement("input");
        volumeSlider.type = "range";
        volumeSlider.min = "0";
        volumeSlider.max = "1";
        volumeSlider.step = "0.1";
        volumeSlider.value = "0.5";
        volumeSlider.oninput = () => {
            const volume = volumeSlider.value;
            audioElement.volume = volume;
            if (volume == 0) {
                volumeIcon.src = "images/speaker-mute.jpeg";
            } else if (volume < 0.5) {
                volumeIcon.src = "images/speaker-low.png";
            } else {
                volumeIcon.src = "images/speaker-medium.jpeg";
            }
        };

        volumeContainer.appendChild(volumeIcon);
        volumeContainer.appendChild(volumeSlider);
        contentItem.appendChild(poster);
        contentSItem.appendChild(title);
        contentItem.appendChild(audioElement);
        contentItem.appendChild(playButton);
        contentItem.appendChild(pauseButton);
        contentItem.appendChild(volumeContainer);
        contentDisplay.appendChild(contentItem);

    });

}

document.addEventListener("DOMContentLoaded", loadAllSongs);
