import sunIcon from './assets/sun.png';
import moonIcon from './assets/moon.png';

const iframe = document.getElementById("dyanoFrame");
const button = document.getElementById("changeChannel");
const addChannelForm = document.getElementById("addChannelForm");
const channelInput = document.getElementById("channelInput");
const titleInput = document.getElementById("titleInput")
const channelList = document.getElementById("channelList");

//default channels

const lofiChannels = JSON.parse(localStorage.getItem("lofiChannels")) || [
  { url: "https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?si=RTPb4tYeWK15lZeV", title: "Lofi Girl – Chill Beats" },
  { url: "https://www.youtube-nocookie.com/embed/rPjez8z61rI?si=Nyna9kFGtDVp1dxW", title: "Lofi Chillhop Radio" },
  { url: "https://www.youtube-nocookie.com/embed/4xDzrJKXOOY?si=sBstVPROJm7d-if2", title: "Night Vibes Lofi Mix" },
  { url: "https://www.youtube-nocookie.com/embed/qnStVGoIgBA?si=B-ZwGRqjE5sDic8a", title: "Relaxing Lofi Beats" },
];

//starting at 1 so we can go to the second channel
let currentIndex = 1;


function changeIframeSource() {
  iframe.src = lofiChannels[currentIndex].url;
  currentIndex = (currentIndex + 1) % lofiChannels.length;
}

function parseChannelURL(url) {
  const match =
    url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/(?:https?:\/\/)?youtu\.be\/([^?&]+)/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}

//Adds title to channel

function addTitle() {
    const title= titleInput.value;
    const trimmedTitle= title.trim();
    if(!trimmedTitle){
      alert("Please enter title")
      return null
    }
    return trimmedTitle
  }

//  Adds channel to channel list
function addChannel(e) {
  
  e.preventDefault();
  const userURL = channelInput.value.trim();
  const embedURL = parseChannelURL(userURL);

  if (!embedURL) {
    alert("Invalid URL. Please try again.");
    return;
  }

  const newTitle = addTitle()

  lofiChannels.push({
    url: embedURL,
    title: newTitle
  });

  channelInput.value = "";
  savePlaylist();
  renderPlaylist();
}

//Keeps channel list in local storage
function savePlaylist() {
  localStorage.setItem("lofiChannels", JSON.stringify(lofiChannels));
}

function renderPlaylist() {
  channelList.innerHTML = "";
  lofiChannels.forEach((video, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("playlist-item");

    listItem.innerHTML = `
      <span class=' lg:text-3xl text-base flex flex-col gap-4  border-blue-500 border-8'> 
         <button type='button' class='channelButton hover:bg-blue-300 dark:hover:bg-indigo-700 ' data-index='${index}' >${video.title || `Video ${index + 1}`}  </button>        <button class='remove-button bg-red-300 hover:bg-red-700  text-black font-semibold hover:text-white  border-fuchsia-900 ' data-index="${index}">
        Remove
      </button>
      

      </span>
  
    `;

    channelList.appendChild(listItem);
  });

//To click for new channel from channel list
  const channelClick = document.querySelectorAll(".channelButton");
  channelClick.forEach((button) =>
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      playChannel(index);
    })
  );


  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeVideo(index);
    })
  );
  
}

function playChannel(index){
  iframe.src =lofiChannels[index].url;
  currentIndex=index
}

function removeVideo(index) {
  lofiChannels.splice(index, 1);
  savePlaylist();
  renderPlaylist();
}

button.addEventListener("click", changeIframeSource);
addChannelForm.addEventListener("submit", addChannel);

renderPlaylist();

document.getElementById('resetChannels').addEventListener('click', () => {
  const defaultPlaylist = [
    { url: "https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?si=RTPb4tYeWK15lZeV", title: "Lofi Girl – Chill Beats" },
    { url: "https://www.youtube-nocookie.com/embed/rPjez8z61rI?si=Nyna9kFGtDVp1dxW", title: "Lofi Chillhop Radio" },
    { url: "https://www.youtube-nocookie.com/embed/4xDzrJKXOOY?si=sBstVPROJm7d-if2", title: "Night Vibes Lofi Mix" },
    { url: "https://www.youtube-nocookie.com/embed/qnStVGoIgBA?si=B-ZwGRqjE5sDic8a", title: "Relaxing Lofi Beats" }
  ];

  // Reset the playlist in localStorage
  localStorage.setItem("lofiChannels", JSON.stringify(defaultPlaylist));

  // Update the in-memory playlist array
  lofiChannels.length = 0; // Clear the current array
  lofiChannels.push(...defaultPlaylist);

  // Dynamically re-render the playlist
  renderPlaylist();
});
// Light-Dark Mode
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  if (systemSettingDark.matches) {
    return 'dark';
  }
  return 'light';
}
function updateButton({ buttonEl, isDark }) {
  const themeIcon = buttonEl.querySelector("#darkLightTheme");
  const newSrc = isDark ? sunIcon : moonIcon;
  const newAlt = isDark ? "Sun Icon" : "Moon Icon";

  themeIcon.src = newSrc;
  themeIcon.alt = newAlt;
  buttonEl.setAttribute(
    "aria-label",
    isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
  );
}

const themeButton = document.getElementById('toggle');
const localStorageTheme = localStorage.getItem('theme');
const systemSettingDark = window.matchMedia("(prefers-color-scheme:dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

document.documentElement.classList.add(currentThemeSetting);


themeButton.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;

  updateButton({
    buttonEl: themeButton,
    isDark: newTheme === "dark",
  });

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(newTheme);
});


updateButton({
  buttonEl: themeButton,
  isDark: currentThemeSetting === "dark",
});

document.getElementById('footerDate').innerHTML = new Date().getFullYear();
