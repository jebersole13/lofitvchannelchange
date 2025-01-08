import './style.css'


const lofiVideos = [
"https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?si=RTPb4tYeWK15lZeV",
"https://www.youtube-nocookie.com/embed/rPjez8z61rI?si=Nyna9kFGtDVp1dxW",
"https://www.youtube-nocookie.com/embed/4xDzrJKXOOY?si=sBstVPROJm7d-if2",
"https://www.youtube-nocookie.com/embed/qnStVGoIgBA?si=B-ZwGRqjE5sDic8a"
    
];

const iframe = document.getElementById("dyanoFrame");
const button = document.getElementById("change-video");

let currentIndex = 1;

function changeIframeSource(){
    iframe.src = lofiVideos[currentIndex];
    currentIndex = (currentIndex + 1) % lofiVideos.length;
}

button.addEventListener("click", changeIframeSource)