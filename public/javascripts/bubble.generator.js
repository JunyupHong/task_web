const bubbleGenerate = new function () {

    let tick = 0;

    let bubbles = [];

    const Bubble = function (size) {
        this.x = Math.random() * width;
        this.y = height + 100;
        this.size = size;
        this.time = 0;
        this.vx = Math.random() * 5 - 2.5;
        this.vy = Math.random() * 4 + 1;
        this.update = () => {
            if ((this.time + Math.random() * 5) % 50 < 25)
                this.x += this.vx;
            else {
                this.x -= this.vx;
            }
            this.y -= this.vy;
            // this.vx += Math.random() * 1 - 0.5;
            // this.vy += Math.random() * 1 - 0.5;

        };
        return this;
    };


    let sum = 0;
    this.generate = () => {
        const size = mic.getLevel() * 360 + 25;
        const count = Math.floor(mic.getLevel() * 30) + 1;

        if (tick % 4 === 0) {
            for (let i = 0; i < count; i++) {
                bubbles[sum] = new Bubble(size);
                sum++;
                // sum %= 500;
                sum %=1000;
            }
        }


    };

    this.update = (volume) => {
        tick++;
        console.log(bubbles.length);

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