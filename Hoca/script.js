const fishImgs = ["ca.png", "ca2.png", "ca3.png"];
const fishContainer = document.getElementById("fish-container");
const bubbleContainer = document.getElementById("bubble-container");
let fishes = [];
for (let i = 0; i < 20; i++) createFish();
function createFish() {
    const fish = document.createElement("img");
    let img = fishImgs[Math.floor(Math.random() * fishImgs.length)];
    fish.src = img;
    let isShark = img === "ca3.png";
    let size = isShark ? 220 + Math.random() * 60 : 55 + Math.random() * 50;
    fish.style.width = size + "px";
    let speed = isShark ? 0.4 + Math.random() * 0.3 : 0.8 + Math.random() * 1.2;
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight * 0.8;
    let vx = Math.random() * 2 - 1;
    let vy = Math.random() * 2 - 1;
    if (Math.abs(vx) < 0.2) vx = vx < 0 ? -0.4 : 0.4;
    if (Math.abs(vy) < 0.2) vy = vy < 0 ? -0.4 : 0.4;
    let len = Math.sqrt(vx * vx + vy * vy);
    vx /= len;
    vy /= len;
    fishes.push({
        el: fish,
        x,
        y,
        w: size,
        h: size * 0.6,
        vx,
        vy,
        speed,
        isShark
    });
    fish.style.left = x + "px";
    fish.style.top = y + "px";
    fishContainer.appendChild(fish);
}
function animateFish() {
    fishes.forEach(f => {
        f.x += f.vx * f.speed * 2;
        f.y += f.vy * f.speed * 2;
        if (f.x < 0) {
            f.x = 0;
            f.vx *= -1;
        }
        if (f.x > window.innerWidth - f.w) {
            f.x = window.innerWidth - f.w;
            f.vx *= -1;
        }
        if (f.y < 0) {
            f.y = 0;
            f.vy *= -1;
        }
        if (f.y > window.innerHeight - f.h - 50) {
            f.y = window.innerHeight - f.h - 50;
            f.vy *= -1;
        }
        f.el.style.transform = f.vx > 0 ? "scaleX(1)" : "scaleX(-1)";
        f.el.style.left = f.x + "px";
        f.el.style.top = f.y + "px";
    });
    requestAnimationFrame(animateFish);
}
animateFish();
setInterval(() => {
    const b = document.createElement("div");
    b.className = "bubble";
    const size = 10 + Math.random() * 20;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = Math.random() * window.innerWidth + "px";
    b.style.bottom = "0px";
    const duration = 6 + Math.random() * 4;
    b.style.animationDuration = duration + "s";
    bubbleContainer.appendChild(b);
    setTimeout(() => b.remove(), duration * 1000);
}, 350);