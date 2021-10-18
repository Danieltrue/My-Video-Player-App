const video = document.querySelector('.video-holder-inner video');
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const replay = document.querySelector('.replay');
const time = document.querySelector('.time');
const progress = document.querySelector('input[type=range]');
const playAgainBtn = document.querySelector('.play-again');
const button = [...document.querySelectorAll('.control-button button')];
//state management
const state = {
    playAgain: false
}

//event
play.addEventListener('click', playVideo);
stop.addEventListener('click', stopVideo);
replay.addEventListener('click', restartVideo);
playAgainBtn.addEventListener('click', playAgain);
video.addEventListener('timeupdate', loopSong);
video.addEventListener('timeupdate', progressUpdate);
progress.addEventListener('change',changeTrackCurrentDate);
button.forEach(function(btn,index) {
    btn.addEventListener('mouseenter',showToolTip);
    btn.addEventListener('mouseleave',hideToolTip);
});



//function
function playVideo() {
    if (video.paused) {
        //play video if the video is not playing
        video.play();
        play.innerHTML = "<i class='bx bx-pause' ></i>"
        this.dataset.msg = 'Pause Video';
    } else {
        //
        video.pause();
        play.innerHTML = "<i class='bx bx-play' ></i>"
        this.dataset.msg = 'Play Video';
    }

}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

function restartVideo() {
    video.currentTime = 0;
    video.play()
}

function playAgain() {
    if (state.playAgain) {
        state.playAgain = false;
    } else {
        state.playAgain = true;
    }
    //add class to button
    if (state.playAgain) {
        this.classList.add('true');
    } else {
        this.classList.remove('true')
    }
}

function loopSong() {
    const videoDuration = +this.duration;
    const videoCurrentTime = +this.currentTime;
    if (videoCurrentTime >= videoDuration) {
        if (state.playAgain) {
            this.currentTime = 0;
            this.play();
        }
    }
}

function progressUpdate() {
    const vCtime = +this.currentTime;
    const vDuration = +this.duration;
    progress.value = (vCtime * 100) / vDuration;
    
    let min = Math.floor(vCtime / 60 / 60);
    let sec = Math.floor(vCtime % 60);
    let s = sec < 10 ? '0'+ sec : sec
    let m = min < 10 ? '0'+ min : min
    
    time.innerHTML = `${m}:${s}`;
    
}

function changeTrackCurrentDate() {
    const vCurrentTime = +video.currentTime;
    video.currentTime = (+progress.value * video.duration) / 100;
    
}

function showToolTip(e) {
    const span = document.createElement('div');
    span.innerText = e.target.dataset.msg;
    this.appendChild(span);
    this.style.position = 'relative';
    
    const cy = e.clientY - 550;
    const cx = e.clientX - 100;
    
    span.classList.add('show');
    span.style.top = cy+'px';
}

function hideToolTip(e) {
    e.target.querySelector('.show').classList.remove('show')
}



