function calculateMoonPhase() {
    const dateInput = document.getElementById('event-date').value;
    // const timeInput = document.getElementById('Time').value;

    if (!dateInput) {
        alert("Please select a date");
        return;
    }

    // Combine date and time
    let dateTimeString = dateInput;
    // if (timeInput) {
    //     dateTimeString += "T" + timeInput;
    // }
    const date = new Date(dateTimeString);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Conway's Moon Phase Algorithm
    let r = year % 100;
    r %= 19;
    if (r > 9) r -= 19;

    let t = (11 * r + month + day) % 30;
    if (month < 3) t += 2;
    t -= Math.floor((year / 100) - Math.floor(year / 400) + 8) / 25;

    let moonAge = t % 30;
    if (moonAge < 0) moonAge += 30;

    let phase = "";
    if (moonAge === 0) phase = "New Moon";
    else if (moonAge < 7.4) phase = "Waxing Crescent";
    else if (moonAge < 7.4 + 1) phase = "First Quarter";
    else if (moonAge < 14.8) phase = "Waxing Gibbous";
    else if (moonAge < 14.8 + 1) phase = "Full Moon";
    else if (moonAge < 22.1) phase = "Waning Gibbous";
    else if (moonAge < 22.1 + 1) phase = "Last Quarter";
    else phase = "Waning Crescent";

    document.getElementById("moonPhase").innerHTML = `
        <strong>Date:</strong> ${date.toDateString()}<br>
        <strong>Moon Age:</strong> ${moonAge.toFixed(2)} days<br>
        <strong>Phase:</strong> ${phase}
    `;

    drawMoonPhase(moonAge);
    showFunFact();
}

function drawMoonPhase(age) {
    const canvas = document.getElementById("moonCanvas");
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2 - 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw full moon background
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Draw shadow to simulate phase
    ctx.beginPath();
    let phase = (age / 29.53) * 2 * Math.PI;
    let k = Math.cos(phase); 
    ctx.arc(canvas.width / 2 + k * radius / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}

function showFunFact() {
    const facts = [
        "The Moon is slowly moving away from Earth by 3.8 cm per year!",
        "You always see the same side of the Moon from Earth.",
        "There are moonquakes on the Moon caused by Earth's gravity!",
        "Footprints on the Moon can last for millions of years — there’s no wind!",
        "The Moon’s gravity controls Earth’s tides.",
        "The far side of the Moon wasn’t seen until 1959!",
        "The Moon is about one-quarter the size of Earth.",
        "Lunar eclipses only happen during a full moon.",
        "The Moon has no atmosphere, so the sky is always black.",
        "There’s frozen water at the Moon’s poles!",
        "It's the fifth largest natural satellite in the Solar System.",
        "Our Moon is massive—about a quarter the size of Earth. This planet-to-moon size ratio is unusual in the Solar System.",
        "It has extreme temperatures: up to 260∘F (127∘C) in the sun and down to −280∘F (−173∘C) in the dark.",
        "All the visible matter—stars, planets, and galaxies—makes up only about 5% of the universe. The rest is dark matter (27%) and dark energy (68%).",
        "Space is a vacuum, so sound waves have no medium to travel through; it's completely silent.",
        "Astronauts who return from spacewalks report that space has a distinct smell, often described as like hot metal or burnt steak.",
        "The largest known reservoir of water in the universe is a cloud of water vapor 12 billion light-years away, holding 140 trillion times the water in Earth's oceans.",
        "There are more stars in the observable universe than there are grains of sand on all the beaches of Earth.",
        "Our galaxy, the Milky Way, is on a collision course with our neighbor, the Andromeda Galaxy, though this won't happen for about 4.5 billion years.",
        "Being near an object with extreme gravity like a black hole can literally bend time. An hour there could be decades on Earth.",
        "The Sun makes up over 99.8% of the entire mass of our Solar System.",
        "Jupiter is so massive that it actually orbits a point in space just outside the Sun (a point called the barycenter), not the Sun's center.",
        "A single day on Venus is longer than its year; it rotates slower than it orbits the Sun.",
        "It is scientifically plausible that it rains diamonds on the gas giants Jupiter and Saturn.",
        " If two pieces of the same type of metal touch in the vacuum of space, they will permanently fuse together (a process called cold welding).",
        "Jupiter's Great Red Spot is a hurricane that has raged for at least 300 years and is bigger than Earth.",
        "The asteroid belt between Mars and Jupiter is so vast that you could easily fly a spaceship through it without hitting anything.",
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("funFact").innerHTML = `<em>🌙 Fun Fact: ${randomFact}</em>`;
}

const starContainer = document.querySelector(".stars");

for (let i = 0; i < 150; i++) {  // Number of stars
  let star = document.createElement("div");
  star.classList.add("star");

  let size = Math.random() * 3 + 1; // Star size between 1px and 4px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`; // blink speed variation

  starContainer.appendChild(star);
}


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const numParticles = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseSize = Math.random() * 2 + 1;
    this.size = this.baseSize;
    this.twinkleSpeed = Math.random() * 0.05 + 0.01; // twinkle speed
    this.angle = Math.random() * Math.PI * 2;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.twinkleSpeed;

    // Twinkle (sin wave size change)
    this.size = this.baseSize + Math.sin(this.angle) * 0.5;

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    const alpha = 0.5 + Math.sin(this.angle) * 0.3; // brightness flicker
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.shadowBlur = 8; // glow amount
    ctx.shadowColor = "white";
    ctx.arc(this.x, this.y, Math.max(this.size, 0), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset for next frame
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  // Completely clear with full transparency each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save(); // Save default settings

  for (let particle of particlesArray) {
    particle.update();
    particle.draw();
  }

  ctx.restore(); // Reset to default to avoid ghost shadows
  requestAnimationFrame(animateParticles);
}


initParticles();
animateParticles();
