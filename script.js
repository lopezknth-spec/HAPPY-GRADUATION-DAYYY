const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function openEnvelope() {
  document.getElementById("envelope-screen").style.display = "none";
  document.getElementById("content").classList.remove("hidden");
  startConfetti();
  
  document.querySelector(".pixel-walker").style.display = "block";

  startMythicalMusic();
}

function startConfetti() {
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
      color: ["#f4b6c2", "#fcd5ce", "#ffc8dd"][Math.floor(Math.random()*3)]
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -10;
  });
  requestAnimationFrame(animateConfetti);
}

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

let audioCtx;
let isMusicPlaying = false;

function startMythicalMusic() {
  if (isMusicPlaying) return;
  isMusicPlaying = true;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playNote(freq, time, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle"; // harp / fairy-like
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.05, time + 0.3);
    gain.gain.linearRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  function playFairytalePhrase(startTime) {
    // C MAJOR scale (happy & romantic)
    const notes = [
      523.25, // C
      659.25, // E
      783.99, // G
      1046.5, // High C
      783.99,
      659.25
    ];

    notes.forEach((freq, i) => {
      playNote(freq, startTime + i * 0.6, 1.2);
    });
  }

  function loopMusic() {
    if (!isMusicPlaying) return;

    const now = audioCtx.currentTime;
    playFairytalePhrase(now);
    playFairytalePhrase(now + 4);

    setTimeout(loopMusic, 8000);
  }

  loopMusic();
}


