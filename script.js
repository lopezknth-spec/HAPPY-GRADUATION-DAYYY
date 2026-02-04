const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function openEnvelope() {
  document.querySelector(".envelope").classList.add("open");

  setTimeout(() => {
    document.querySelector(".roses").classList.remove("hidden");
  }, 600);

  setTimeout(() => {
    document.getElementById("envelope-screen").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
    startHearts();
  }, 3600);
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

function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 6 + Math.random() * 4 + "s";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
  }, 600);
}

