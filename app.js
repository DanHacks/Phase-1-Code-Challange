// Variables
const contentDisplay = document.getElementById("content-display");
const searchInput = document.getElementById("search");
let currentlyPlayingAudio = null; // To track the currently playing audio

// Fetch Media from db.json
async function fetchMedia() {
    try {
        const response = await fetch('http://localhost:3000/media'); // Ensure the correct JSON server URL
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

// Load All Songs on Page Load
async function loadAllSongs() {
    const media = await fetchMedia();
    displayContent(media); // Display all media items by default
}

// Search and Display Content
async function searchContent() {
    const query = searchInput.value.trim().toLowerCase();

    // Show an error message if input is empty
    if (!query) {
        contentDisplay.innerHTML = "<p style='color: red;'>Please enter the name of the song.</p>";
        return;
    }

    const media = await fetchMedia();

    // Filter results based on query
    const results = media.filter(item => item.title.toLowerCase().includes(query));

    // Display results
    displayContent(results);
}

// Display Content
function displayContent(results) {
    contentDisplay.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        contentDisplay.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach(item => {
        // Create a container for each media item
        const contentItem = document.createElement("div");
        contentItem.className = "content-item";

        // Add logo as a poster
        const poster = document.createElement("img");
        poster.src = "images/logo.png";
        poster.alt = "Song Poster";
        poster.style.width = "100px";
        poster.style.height = "100px";

        // Add title
        const title = document.createElement("h3");
        title.textContent = item.title;

        // Create audio element
        const audioElement = document.createElement("audio");
        audioElement.src = item.url;
        audioElement.preload = "metadata";

        // Add Play Button
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        playButton.onclick = async () => {
            // Prevent multiple songs from playing simultaneously
            if (currentlyPlayingAudio && currentlyPlayingAudio !== audioElement) {
                alert("Please pause the currently playing song before starting a new one.");
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

        // Add Pause Button
        const pauseButton = document.createElement("button");
        pauseButton.textContent = "Pause";
        pauseButton.disabled = true; // Initially disabled
        pauseButton.onclick = () => {
            audioElement.pause();
            currentlyPlayingAudio = null;
            playButton.disabled = false;
            pauseButton.disabled = true;
        };

        // Volume Control
        const volumeContainer = document.createElement("div");
        volumeContainer.className = "volume-control";

        const volumeIcon = document.createElement("img");
        volumeIcon.src = "images/speaker-medium.jpeg"; // Default speaker icon
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

            // Update speaker icon based on volume level
            if (volume == 0) {
                volumeIcon.src = "images/speaker-mute.jpeg";
            } else if (volume < 0.5) {
                volumeIcon.src = "images/speaker-low.png";
            } else {
                volumeIcon.src = "images/speaker-medium.jpeg";
            }
        };

        // Append volume controls to the container
        volumeContainer.appendChild(volumeIcon);
        volumeContainer.appendChild(volumeSlider);

        // Append all elements to the content item
        contentItem.appendChild(poster);
        contentItem.appendChild(title);
        contentItem.appendChild(audioElement);
        contentItem.appendChild(playButton);
        contentItem.appendChild(pauseButton);
        contentItem.appendChild(volumeContainer);

        // Append content item to the display
        contentDisplay.appendChild(contentItem);
    });
}

// Initial Load
document.addEventListener("DOMContentLoaded", loadAllSongs);
