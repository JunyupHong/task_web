const fractal = new function () {

    let fractalData = {};

    let lineData = {};

    const initialLineData = () => {
        for (let i = 1; i < (fractalData.depth + 1) / 10; i++) {           // 여기서 fractalData.depth + 1을 하면 10배가 들어감....뭐지?
            lineData[i] = [];
        }
    };

    const setLineData = (x1, y1, degree, depth) => {
        if (depth > fractalData.depth) return;

        const length = Math.pow(fractalData.childBranchLength, depth) * fractalData.firstBranchLength;
        const radian = degree * Math.PI / 180;

        const x2 = x1 + length * Math.cos(radian);
        const y2 = y1 + length * Math.sin(radian);
        const c = lerpHexColor(depth / fractalData.depth);

        lineData[depth].push({'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2, 'c':c, 'opacity': 255 - depth / fractalData.depth * 255});


        let startAngle = -(fractalData.childBranchCount - 1)
            * fractalData.childBranchAngle / 2 + degree * 1;


        for (let i = 0; i < fractalData.childBranchCount; i++) {
            setLineData(x2, y2, startAngle, depth + 1);
            startAngle += fractalData.childBranchAngle * 1;
        }

    };


    const lerpHexColor = (ratio) => {
        const r1 = Number('0x' + fractalData.startColor[1] + fractalData.startColor[2]);
        const g1 = Number('0x' + fractalData.startColor[3] + fractalData.startColor[4]);
        const b1 = Number('0x' + fractalData.startColor[5] + fractalData.startColor[6]);
        const r2 = Number('0x' + fractalData.endColor[1] + fractalData.endColor[2]);
        const g2 = Number('0x' + fractalData.endColor[3] + fractalData.endColor[4]);
        const b2 = Number('0x' + fractalData.endColor[5] + fractalData.endColor[6]);
        const r = r1 * (1 - ratio) + r2 * ratio;
        const g = g1 * (1 - ratio) + g2 * ratio;
        const b = b1 * (1 - ratio) + b2 * ratio;
        return {
            r,
            g,
            b,
        }
    };




    const drawLineByDepth = (lineSameDepth) => {
        console.log(lineSameDepth);

        for(let i = 0; i < lineSameDepth.length; i++) {
            stroke(lineSameDepth[i].c.r,lineSameDepth[i].c.g,lineSameDepth[i].c.b, lineSameDepth[i].opacity/100);
            line(lineSameDepth[i].x1, lineSameDepth[i].y1, lineSameDepth[i].x2, lineSameDepth[i].y2);
        }
    };

    this.generateFractal = function (data) {
        fractalData = data;
        lineData = {};
        blendMode(BLEND);
        blendMode(ADD);
        background(0);

        const cx = width / 2;
        const cy = height / 2;

        const dAngle = 360 / data.firstBranchCount;
        let currentAngle = 0;

        initialLineData();

        for (let i = 0; i < data.firstBranchCount; i++) {
            setLineData(cx, cy, currentAngle, 1);
            currentAngle += dAngle;
        }


    };


    let tick = 0;
    let isPause = true;

    this.setTickZero = () => {
        tick = 0;
    };

    this.pause = () => {
        isPause = !isPause;
    };

    this.update = () => {
        if(isPause) return;

        tick++;
        let depth = Math.floor(tick / 100) + 1;
        if(depth > fractalData.depth) return;
        drawLineByDepth(lineData[depth]);
    };



    return this;
};


function draw() {
    fractal.update();
}

