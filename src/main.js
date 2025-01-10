import './style.css'
// Video toggle logic
const lofiVideos = [
"https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?si=RTPb4tYeWK15lZeV",
"https://www.youtube-nocookie.com/embed/rPjez8z61rI?si=Nyna9kFGtDVp1dxW",
"https://www.youtube-nocookie.com/embed/4xDzrJKXOOY?si=sBstVPROJm7d-if2",
"https://www.youtube-nocookie.com/embed/qnStVGoIgBA?si=B-ZwGRqjE5sDic8a"
    
];

const iframe = document.getElementById("dyanoFrame");
const button = document.getElementById("changeVideo");

let currentIndex = 1;

function changeIframeSource(){
    iframe.src = lofiVideos[currentIndex];
    currentIndex = (currentIndex + 1) % lofiVideos.length;
}

button.addEventListener("click", changeIframeSource)


// Light-Dark Mode
function calculateSettingAsThemeString({localStorageTheme,systemSettingDark}){
    if(localStorageTheme !== null){
        return localStorageTheme
    }
    if(systemSettingDark.matches){
        return 'light';
    }
    return 'dark';
}
const themeButton = document.getElementById('toggle')

const localStorageTheme =localStorage.getItem('theme');
const systemSettingDark = window.matchMedia("(prefers-color-scheme:dark)")

let currentThemeSetting = calculateSettingAsThemeString({localStorageTheme,systemSettingDark})

document.documentElement.classList.add(currentThemeSetting)

themeButton.addEventListener('click', ()=>{
    const newTheme = currentThemeSetting ==="dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme)
    currentThemeSetting=newTheme;

    document.documentElement.classList.remove("light","dark");
    document.documentElement.classList.add(newTheme)
})


document.getElementById('footerDate').innerHTML= new Date().getFullYear();