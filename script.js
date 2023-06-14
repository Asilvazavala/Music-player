const songList = [
  {
    title: "Pokemon",
    file: "pokemon.mp3",
    cover: "pokemon.png"
  },
  {
    title: "Everlong",
    file: "everlong.mp3",
    cover: "everlong.jpg"
  },
  {
    title: "She bangs the drums",
    file: "sheBangsThedrums.mp3",
    cover: "shebangsthedrums.jpg"
  }
]

let actualSong = null

const songs = document.getElementById('songs')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const play = document.getElementById('play')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progressContainer')
const durationCurrent = document.getElementById('durationCurrent')

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('timeupdate', startProgress)
audio.addEventListener('ended', () => nextSong())

play.addEventListener('click', () => {
  if (audio.paused) {
    playSong()
  } else {
      pauseSong()
    }
})

prev.addEventListener('click', () => {
  prevSong()
})

next.addEventListener('click', () => {
  nextSong()
})

function loadSongs() {
  songList.forEach((song, index) => {
    const li = document.createElement('li')
    const link = document.createElement('a')
    link.textContent = song.title

    link.addEventListener('click', () => loadSong(index))
    li.appendChild(link)
    songs.appendChild(li)
  })
}

function loadSong(index) {
  if (actualSong === index) return
  changeActiveClass(index)
  actualSong = index

  loadAudio(index)
  loadCover(index)
  loadTitle(index)
}

function setDuration(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;

  let minutosFormateados = minutos < 10 ? "0" + minutos : minutos;
  let segundosFormateados = segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes;
  
  if (isNaN(minutosFormateados) || isNaN(segundosFormateados)) {
    return '0:00'
  } else {
      return minutosFormateados + ":" + segundosFormateados;
    }
}

function startProgress(event) {
  const { duration, currentTime } = event.srcElement
  const percent = (currentTime / duration) * 100
  progress.style.width = percent + "%"

  durationCurrent.textContent = 
  `${setDuration(Math.floor(currentTime))} / ${setDuration(Math.floor(duration))}`
}

function setProgress(event) {
  const totalWidth = this.offsetWidth
  const progressWidth = event.offsetX
  const current = (progressWidth / totalWidth) * audio.duration
  audio.currentTime = current
}

function updateControls() {
  if (audio.paused) {
    play.classList.replace('bx-pause', 'bx-play')
  } else {
      play.classList.replace('bx-play', 'bx-pause')
    }
}

function playSong() {
  if (actualSong === null) return
  audio.play()
  updateControls()
}

function pauseSong() {
  audio.pause()
  updateControls()
}

function loadAudio(index) {
  audio.src = './audio/' + songList[index].file
  play.classList.replace('bx-play', 'bx-pause')
  audio.play()
}

function changeActiveClass(index) {
  const links = document.querySelectorAll('a')
  links.forEach(el => {
    el.classList.remove('active')
  })
  links[index].classList.toggle('active')
}

function loadCover(index) {
  cover.src = './images/' + songList[index].cover
}

function loadTitle(index) {
  title.innerText = songList[index].title
}

function prevSong() {
  if (actualSong === null) return
  actualSong === 0
    ? loadSong(songList.length - 1)
    : loadSong(actualSong - 1)
}

function nextSong() {
  if (actualSong === null) return
  actualSong === songList.length - 1
    ? loadSong(0)
    : loadSong(actualSong + 1)
}

loadSongs()


