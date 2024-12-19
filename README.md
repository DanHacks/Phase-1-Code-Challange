## Music Streaming Website
A dynamic, interactive music streaming web application where users can search, play, and control audio playback. The project demonstrates modern web development practices, including dynamic UI updates, media controls, and local storage for state persistence.
## Features
## 🎵 Search and Play Music
    Users can search for songs by title using the search bar.
    Results are dynamically displayed with song titles, posters, and controls.
## ▶️ Media Controls
    Play/Pause Buttons: Play or pause audio playback.
    Volume Control: Adjust volume using a slider. Volume icons update dynamically to reflect mute, low, or medium volume levels.
## 🔒 Single Playback Enforcement
    Prevents multiple songs from playing simultaneously.
    Displays an alert: "Please pause the currently playing song before starting a new one." if the user attempts to play another song.
## 🔄 State Persistence
    The search results are preserved across page refreshes using localStorage.
## 🖼️ Song Poster
    Each song is displayed with a logo image of my website.

## File Structure
Project directory is structured as follows:
project/
├── index.html          # Main HTML file
├── app.js              # JavaScript file for dynamic functionality
├── style.css           # CSS file for styling
├── db.json             # JSON file containing song data
├── music/              # Folder containing MP3 audio files
│   ├── Song 1.mp3
│   ├── Song 2.mp3
│   └── ... (up to Song 10.mp3)
├── images/             # Folder for images
    ├── logo.png         # Poster image for each song
    ├── speaker-mute.jpeg
    ├── speaker-low.png
    ├── speaker-medium.jpeg

## Setup and Usage
## Prerequisites
    A web browser (e.g., Chrome, Firefox, Edge).
    A local server to serve the files (e.g., Live Server extension in VS Code or Python HTTP server).

## Running the Project
    Clone or Download the Project:

git clone https://github.com/DanHacks/Phase-1-Code-Challange.git
cd music-streaming-website

## Start a Local Server:
    Using Live Server (VS Code extension): Right-click index.html and select "Open with Live Server."
    Using Python HTTP Server:

        python3 -m http.server

    Open in Browser: Navigate to http://localhost:8000 or the URL provided by your server.

    Add Music:
        Place .mp3 files in the music/ folder.
        Update db.json with the new songs (see below for format).

## Data Format (db.json)
The db.json file contains metadata for all songs. Example:

{
  "media": [
    {
      "id": "audio-1",
      "title": "Song 1",
      "type": "audio",
      "url": "music/Song 1.mp3"
    },
    {
      "id": "audio-2",
      "title": "Song 2",
      "type": "audio",
      "url": "music/Song 2.mp3"
    }
  ]
}

## How It Works
## Dynamic Song Display
    The app fetches data from db.json and displays the songs as clickable blocks.
## Playback Controls
    Clicking Play starts playback and disables the button until Pause is clicked.
    Clicking Pause stops playback and re-enables the Play button.
## Volume Slider
    Adjusts audio volume.
    Updates the volume icon to reflect the current level:
        Mute: Volume is 0.
        Low Volume: Volume is between 0.1 and 0.4.
        Medium Volume: Volume is 0.5 or higher.
## Single Playback
    Ensures only one song plays at a time.
    Alerts the user if they try to play another song while one is already playing.
## State Persistence
    The app saves search results in localStorage and reloads them after a page refresh.
## Customization
## Adding New Songs
    Place the .mp3 file in the music/ folder.
    Add an entry in db.json:
    {
      "id": "audio-3",
      "title": "Song 3",
      "type": "audio",
      "url": "music/Song 3.mp3"
    }

## Changing the Logo
    Replace logo.png in the images/ folder with your desired logo image.
## Updating Volume Icons
    Replace speaker-mute.jpeg, speaker-low.jpeg, and speaker-medium.jpeg in the images/ folder with custom icons.
## Known Issues
    Browser Restrictions: Some browsers block media playback for local files. Always use a local server to run the app.
    Case Sensitivity: Ensure file names and paths in db.json match exactly.
## Technologies Used
    HTML: Structure of the app.
    CSS: Styling for the layout, buttons, and volume controls.
    JavaScript: Dynamic functionality, including playback and UI interactions.
    JSON: Data storage for songs.
## License
This project is licensed ME. Use it as you want.