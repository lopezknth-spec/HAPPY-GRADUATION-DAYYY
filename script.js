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

  startFairytaleMusic();
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

let fairytaleCtx;
let fairytaleStarted = false;

function startFairytaleMusic() {
  if (fairytaleStarted) return;
  fairytaleStarted = true;

  fairytaleCtx = new (window.AudioContext || window.webkitAudioContext)();

  function fairyNote(freq, start, duration) {
    const osc = fairytaleCtx.createOscillator();
    const gain = fairytaleCtx.createGain();

    osc.type = "sine"; // PURE, soft, non-scary
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.00001, start);
    gain.gain.linearRampToValueAtTime(0.04, start + 0.4);
    gain.gain.linearRampToValueAtTime(0.00001, start + duration);

    osc.connect(gain);
    gain.connect(fairytaleCtx.destination);

    osc.start(start);
    osc.stop(start + duration);
  }

  function playFairytaleMelody(time) {
    // HIGH, HAPPY DISNEY-LIKE NOTES (G MAJOR)
    const melody = [
      784.0,  // G
      880.0,  // A
      987.8,  // B
      1174.7, // D
      1318.5, // E
      1174.7,
      987.8,
      880.0
    ];

    melody.forEach((freq, i) => {
      fairyNote(freq, time + i * 0.45, 1.2);
    });
  }

  function loopFairytale() {
    const now = fairytaleCtx.currentTime;
    playFairytaleMelody(now);
    setTimeout(loopFairytale, 7000);
  }

  loopFairytale();
}



