const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');

let raf;
let baf;

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
        this.size = 12;
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

    destroy() {

        if (burst < 20) {
            this.flameShadowBlur += 4;
            this.color.splice(0, 5, '#FF6600');
        }

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
        this.power = 0;
    }
    update(x, y) {
        if (this.x > innerWidth) {

            this.x = x;
            this.y = y;
            this.radius = 10;

        }
        this.x += 2 * Math.random() + 50;

    }

    powerUpdate(x, y) {
        if (this.power < 100) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            return;
        }
        if (this.x > innerWidth && this.power == 100) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.power = 0;

        }
        this.x += 8;
        this.radius++;
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
        this.speed = 4;
        this.radius = 0;
        this.color = ['#FF00FF', '#FFFF00', '#FF3300', '#A5D8F3'];
        this.shadowBlur = 0;

    }
    update() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = innerWidth;
            this.radius = 40 * Math.random() + 5;

        }
        if (this.x == innerWidth) {
            this.y = Math.random() * canvas.height;
            this.shadowBlur = Math.random() * 5 + this.radius / 2;
        }
        if (this.y <= 400)
            this.y += Math.random() * 0.5;
        if (this.y >= 1200)
            this.y -= Math.random() * 0.5;


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
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = "#FF6600";
        ctx.closePath();
    }
}

let spaceCraft = new SpaceCraft();
let laser = new Laser(spaceCraft.x, spaceCraft.y);
let laserPower = new Laser(spaceCraft.x, spaceCraft.y);
let numberOfParticles = 50;
let obstaclesArray = [];

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        obstaclesArray.push(new Obstacle());
    }
}


init();

let burst = 0;

function beforeAnimate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    spaceCraft.draw();
    spaceCraft.update();
    baf = requestAnimationFrame(beforeAnimate);
}

beforeAnimate();

function animateAfterCollision() {

    spaceCraft.draw();
    spaceCraft.destroy();
    burst++;
    requestAnimationFrame(animateAfterCollision);
}


function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    spaceCraft.draw();
    spaceCraft.update();
    laserSound.play();
    laserSound.volume = 0.1;
    laser.draw();
    laser.update(spaceCraft.x, spaceCraft.y);
    laserPower.draw();
    laserPower.powerUpdate(spaceCraft.x, spaceCraft.y, power);
    for (let i = 0; i < obstaclesArray.length; i++) {

        obstaclesArray[i].draw();
        obstaclesArray[i].update();
    }

    collision();

    if (obstaclesArray.length === 0) {
        let resetBtn = document.createElement("button");
        resetBtn.id = "reload";
        document.body.appendChild(resetBtn);
        resetBtn.innerHTML = "Click <br> to <br> Reload!";
        resetBtn.addEventListener("click", () => {
            document.location.reload();
        });

        playBtn.remove();

        backgroundMusic.pause();

        destroySound.play();

        animateAfterCollision();

        return;
    }

    raf = requestAnimationFrame(animate);
}

let points = 0;
let power = 0;

function collision() {

    for (let i = 0; i < obstaclesArray.length; i++) {
        let dx1 = laser.x - obstaclesArray[i].x;
        let dy1 = laser.y - obstaclesArray[i].y;
        let dx2 = laserPower.x - obstaclesArray[i].x;
        let dy2 = laserPower.y - obstaclesArray[i].y;
        let dx3 = spaceCraft.x - obstaclesArray[i].x;
        let dy3 = spaceCraft.y - obstaclesArray[i].y;
        let distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        let distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        let distance3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
        if (distance1 < laser.radius + obstaclesArray[i].radius || distance2 < laserPower.radius + obstaclesArray[i].radius) {
            if (obstaclesArray[i].radius >= 20) {

                points += Math.floor(obstaclesArray[i].radius);
                document.getElementById("points").innerHTML = points;
                obstaclesArray[i].radius = 0;
                laser.x = spaceCraft.x;
                obstaclesDestroySound.play();

            }
        }
        if (distance3 < spaceCraft.size + obstaclesArray[i].radius) {
            if (obstaclesArray[i].radius >= 20) {
                obstaclesArray = [];
                laser = null;
                return;
            }
        }
        if (laserPower.power != 100) {

            if (distance3 < spaceCraft.radius * 25 + obstaclesArray[i].radius) {
                if (obstaclesArray[i].radius >= 8 && obstaclesArray[i].radius < 20) {


                    if (power <= 100) {
                        power += Math.floor(obstaclesArray[i].radius);
                        if (power >= 70) {
                            spaceCraft.color.splice(0, 2, '#FFFF00', '#FFFF00');
                        }
                        if (power > 100) {
                            power = 100;
                        }

                        document.getElementById("power").innerHTML = Math.round(power) + " %";
                        document.getElementById("power").style.boxShadow = "inset 0 0 " + power + "px #FFFF00";
                        obstaclesArray[i].radius = null;
                    }
                    powerSound.play();

                }
            }
        }
        if (power == 100) {
            spaceCraft.color.splice(0, 2, '#00FF66', '#00FF00');
            power = 0;
            laserPower.power = 100;
            document.getElementById("power").innerHTML = Math.round(power) + " %";
            document.getElementById("power").style.boxShadow = "inset 0 0 " + power + 5 + "px #FFFF00";
            laserPowerSound.play();
        }



    }
}

let laserPowerStatus = 0;

// key controls;

window.addEventListener('keydown', (e) => {
    if (obstaclesArray !== undefined && obstaclesArray.length > 0)
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

        }

});


window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

// touch controls

let touchStart;
let touchmove;
let sensitivity = 50;
let xDown = null;
let yDown = null;

function touchControls() {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', e => {
        clearInterval(touchStart);
        clearInterval(touchmove);
    });

    function getTouches(e) {
        return e.touches;
    }

    function handleTouchStart(e) {
        const firstTouch = getTouches(e)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;

        if (obstaclesArray !== undefined && obstaclesArray.length > 0)
            touchStart = setInterval(() => {
                if (xDown > 100)
                    spaceCraft.left();
                if (xDown < innerWidth - 100)
                    spaceCraft.right();
            }, sensitivity);

    }

    function handleTouchMove(e) {
        if (!xDown || !yDown) {
            return;
        }

        let xUp = e.touches[0].clientX;
        let yUp = e.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
            if (xDiff > 0) {
                /* left swipe */
            } else {
                /* right swipe */
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
                if (obstaclesArray !== undefined && obstaclesArray.length > 0)

                    touchmove = setInterval(() => {
                    spaceCraft.up();
                }, sensitivity);

            } else {
                /* down swipe */
                if (obstaclesArray !== undefined && obstaclesArray.length > 0)

                    touchmove = setInterval(() => {
                    spaceCraft.down();
                }, sensitivity);
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
}

touchControls();







const playBtn = document.getElementById("play");
let playStatus = 0;

let src = "Progress.mp3";
let backgroundMusic = new Audio(src);

src = "destroy.mp3";
let destroySound = new Audio(src);

src = "laser.mp3";
let laserSound = new Audio(src);

src = "laserpower.mp3";
let laserPowerSound = new Audio(src);

src = "obstacledestroy.mp3";
let obstaclesDestroySound = new Audio(src);

src = "power.mp3";
let powerSound = new Audio(src);

playBtn.addEventListener("click", (e) => {
    if (playStatus == 0) {
        animate();
        playStatus = 1;
        playBtn.innerHTML = "Pause";
        backgroundMusic.play();
        cancelAnimationFrame(baf);
    } else {
        playStatus = 0;
        cancelAnimationFrame(raf);
        backgroundMusic.pause();
        playBtn.innerHTML = "Play";
    }

});