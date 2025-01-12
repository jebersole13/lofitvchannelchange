import sunIcon from './assets/sun.png';
import moonIcon from './assets/moon.png';

const iframe = document.getElementById("dyanoFrame");
const button = document.getElementById("changeChannel");
const addChannelForm = document.getElementById("addChannelForm");
const channelInput = document.getElementById("channelInput");
const titleInput = document.getElementById("titleInput")
const channelList = document.getElementById("channelList");


const lofiChannels = JSON.parse(localStorage.getItem("lofiChannels")) || [
  { url: "https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?si=RTPb4tYeWK15lZeV", title: "Lofi Girl – Chill Beats" },
  { url: "https://www.youtube-nocookie.com/embed/rPjez8z61rI?si=Nyna9kFGtDVp1dxW", title: "Lofi Chillhop Radio" },
  { url: "https://www.youtube-nocookie.com/embed/4xDzrJKXOOY?si=sBstVPROJm7d-if2", title: "Night Vibes Lofi Mix" },
  { url: "https://www.youtube-nocookie.com/embed/qnStVGoIgBA?si=B-ZwGRqjE5sDic8a", title: "Relaxing Lofi Beats" },
];

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

  function addTitle() {
    const title= titleInput.value;
    const trimmedTitle= title.trim();
    if(!trimmedTitle){
      alert("Please enter title")
      return null
    }
    return trimmedTitle
  }

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





function savePlaylist() {
  localStorage.setItem("lofiChannels", JSON.stringify(lofiChannels));
}

function renderPlaylist() {
  channelList.innerHTML = "";
  lofiChannels.forEach((video, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("playlist-item");

    listItem.innerHTML = `
      <span class='bg-background-light dark:bg-background-dark'>
        ${video.title || `Video ${index + 1}`}
      </span>
      <button class='remove-button bg-red-700 text-white' data-index="${index}">
        Remove
      </button>
    `;

    channelList.appendChild(listItem);
  });

  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeVideo(index);
    })
  );
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
  location.reload();
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
