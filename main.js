const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');

let raf;

class SpaceCraft {
    constructor() {
        this.x = 180;
        this.y = 75;
        this.radius = 2;
        this.strokeSize1 = 2;
        this.strokeSize2 = 8;
        this.gas = 0;
        this.spaceShipShadowBlur = 7;
        this.color = ['#00FF66', '#00FF00', '#8A2BE2', '#FF6600', '#8A2BE2', '#FFFF00'];
        this.flameShadowAlpha = 5;
        this.flameShadowBlur = 25;
        this.thrust = 0;
    }
    update() {
        this.flameShadowBlur = 40 * Math.random() + 25;
        this.gas = Math.random() * 20 - 10;

    }
    left() {
        if (this.x < innerWidth - 200) {
            this.x += 10;
            if (this.strokeSize2 <= 50)
                this.strokeSize2++;


        }
        if (this.x < 400) {
            this.thrust--;
        }
    }
    right() {
        if (this.x > 180) {
            this.x -= 10;
            if (this.strokeSize2 > 8)
                this.strokeSize2--;

        }
        if (this.x >= 1200) {
            this.thrust++;
        }
        if (this.x < 500) {
            this.thrust = 0;
        }
    }
    up() {
        if (this.y > 100)
            this.y -= 10;
    }
    down() {
        if (this.y < innerHeight - 200)
            this.y += 10;
    }

    draw() {

        ctx.beginPath();
        ctx.arc((this.x - 100) + this.thrust, this.y, this.radius + 28, (Math.PI / 180) * 80, (Math.PI / 180) * 280, true);
        ctx.lineTo(this.x - (70 * 2) + this.thrust + this.gas, this.y + 5);
        ctx.arc((this.x - 100) + this.thrust, this.y, this.radius + 28, (Math.PI / 180) * 80, (Math.PI / 180) * 280, true);
        ctx.lineWidth = this.strokeSize2;
        ctx.shadowAlpha = this.flameShadowAlpha;
        ctx.shadowBlur = this.flameShadowBlur;
        ctx.shadowColor = this.color[3];
        ctx.strokeStyle = this.color[3];
        ctx.fillStyle = this.color[4];
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(this.x - 60, this.y - 35);
        ctx.lineTo(this.x + 15, this.y - 10);
        ctx.lineTo(this.x + 15, this.y);
        ctx.lineTo(this.x - 60, this.y + 35);
        ctx.closePath();
        ctx.shadowBlur = this.spaceShipShadowBlur;
        ctx.shadowColor = this.color[0];
        ctx.lineWidth = this.strokeSize1;
        ctx.fillStyle = this.color[1];
        ctx.strokeStyle = this.color[2];
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(this.x - 55, this.y - 25);
        ctx.lineTo(this.x + 15, this.y - 10);
        ctx.lineTo(this.x + 15, this.y);
        ctx.lineTo(this.x - 55, this.y + 25);
        ctx.closePath();
        ctx.shadowBlur = this.spaceShipShadowBlur;
        ctx.shadowColor = this.color[0];
        ctx.lineWidth = this.strokeSize1;
        ctx.fillStyle = this.color[1];
        ctx.strokeStyle = this.color[2];
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(this.x - 50, this.y - 15);
        ctx.lineTo(this.x + 15, this.y - 10);
        ctx.lineTo(this.x + 15, this.y);
        ctx.lineTo(this.x - 50, this.y + 15);
        ctx.closePath();
        ctx.shadowBlur = this.spaceShipShadowBlur;
        ctx.shadowColor = this.color[0];
        ctx.lineWidth = this.strokeSize1;
        ctx.fillStyle = this.color[1];
        ctx.strokeStyle = this.color[2];
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x + 32, this.y - 4, this.radius + 5, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color[Math.floor(Math.random() * 5)];
        ctx.fill();
        ctx.closePath();


    }
}

class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.spaceShipShadowBlur = 7;
        this.color = ['#00FF66', '#00FF00', '#8A2BE2', '#FF6600', '#8A2BE2', '#FFFF00'];
    }
    update(x, y) {
        if (this.x > innerWidth) {

            this.x = x + 40;
            this.y = y;

        }
        this.x += 40;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color[Math.floor(Math.random() * 5)];
        ctx.fill();
    }
}

class Obstacle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = 2;
        this.radius = 40 * Math.random();
        this.color = ['#FF00FF', '#FFFF00', '#FF3300', '#A5D8F3'];

    }
    update() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = innerWidth;
            this.radius = 40 * Math.random();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color[2];
        if (this.radius < 20) {
            ctx.fillStyle = this.color[1];
        }
        if (this.radius < 8) {
            ctx.fillStyle = this.color[3];
        }

        if (this.radius < 5) {
            ctx.fillStyle = this.color[0];
        }
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#FF6600";
        ctx.closePath();
    }
}

let spaceCraft = new SpaceCraft();
let laser = new Laser(spaceCraft.x, spaceCraft.y);
let numberOfParticles = 20;
let obstaclesArray = [];

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        obstaclesArray.push(new Obstacle());
    }
}


init();

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    spaceCraft.draw();
    spaceCraft.update();
    laser.draw();
    laser.update(spaceCraft.x, spaceCraft.y);
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].draw();
        obstaclesArray[i].update();
    }

    raf = requestAnimationFrame(animate);
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "d":
            {
                spaceCraft.left();
                break;
            }
        case "a":
            {
                spaceCraft.right();
                break;
            }
        case "w":
            {
                spaceCraft.up();
                break;
            }
        case "s":
            {
                spaceCraft.down();
                break;
            }
        case "q":
            {

            }
    }

});


const playBtn = document.getElementById("play");
let playStatus = 0;
playBtn.addEventListener("click", (e) => {
    if (playStatus == 0) {
        animate();
        playStatus = 1;
        playBtn.innerHTML = "Play";
    } else {
        playStatus = 0;
        cancelAnimationFrame(raf);
        playBtn.innerHTML = "Stop";
    }

});