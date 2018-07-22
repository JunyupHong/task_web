const bubbleGenerate = new function () {
    let tick = 0;
    let bubbles = [];

    const Bubble = function (size) {
        this.x = Math.random() * width;
        this.y = height + size;
        this.size = size;
        this.time = 0;
        this.vy = Math.abs(Math.random() * 3) + 1;
        this.vx = 3 - this.vy / 2;
        this.update = () => {
            if ((this.time % 60) < 30) {

                if ((this.time % 60) < 15) {
                    this.vx += (3 - this.vy / 2) / 15;
                }
                else {
                    this.vx -= (3 - this.vy / 2) / 15;
                }
                this.x += this.vx;
            }
            else {
                if ((this.time % 60) < 45) {
                    this.vx += (3 - this.vy / 2) / 15;
                }
                else {
                    this.vx -= (3 - this.vy / 2) / 15;
                }
                this.x -= this.vx;
            }
            this.y -= this.vy;

        };
        return this;
    };


    let sum = 0;
    this.generate = () => {
        let size = mic.getLevel() * 360 + 15 + Math.random() * 10;
        if (size > 300) {
            size = 300;
        }

        const count = Math.floor(mic.getLevel() * 30) + 1;

        if (tick % 8 === 0) {
            for (let i = 0; i < count; i++) {
                bubbles[sum] = new Bubble(size);
                sum++;
                sum %= 1000;
            }
        }


    };

    this.update = (volume) => {
        tick++;

        const count = volume * 50;
        if (count === 0) {
            return;
        }


        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].update();
            bubbles[i].time++;

            noStroke();

            fill('rgba(0,255,120, 0.25)');
            ellipse(bubbles[i].x,
                bubbles[i].y,
                bubbles[i].size,
                bubbles[i].size);

        }


    };


};


let mic;

function setup() {
    const $root = $('body');
    const canvas = createCanvas($root.width(), $root.height());
    canvas.parent('canvas');
    background(100, 100, 100);

    mic = new p5.AudioIn();
    mic.start();

}

function draw() {
    background(255);
    bubbleGenerate.update(mic.getLevel());
    bubbleGenerate.generate();

}