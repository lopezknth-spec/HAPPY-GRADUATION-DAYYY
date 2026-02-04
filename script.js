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

  function playTone(freq, startTime, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine"; // soft, dreamy
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.08, startTime + 1);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  function playChord(baseFreq) {
    const now = audioCtx.currentTime;
    playTone(baseFreq, now, 6);
    playTone(baseFreq * 1.25, now, 6);
    playTone(baseFreq * 1.5, now, 6);
  }

  function loopMusic() {
    if (!isMusicPlaying) return;

    playChord(220); // A
    setTimeout(() => playChord(196), 6000); // G
    setTimeout(() => playChord(247), 12000); // B
    setTimeout(() => playChord(220), 18000); // A

    setTimeout(loopMusic, 24000);
  }

  loopMusic();
}

