const $sketchZone = $('.sketch-zone');




function root(startX, startY, length, depth, colorFrom, colorTo, rootCount) {

    if (depth === 0) {
        return;
    }
    stroke(255);
    let endX;
    let endY;

    const branch = function (startX, startY, length, depth, colorFrom, colorTo, degree) {
        if(depth === 0) {
            return;
        }
        stroke(255);


        let endX1;
        let endY1;
        const degree1 = degree + 30;

        let endX2;
        let endY2;
        const degree2 = degree - 30;

        endX1 = startX + length * cos(radians(degree1));
        endY1 = startY + length * sin(radians(degree1));
        endX2 = startX + length * cos(radians(degree2));
        endY2 = startY + length * sin(radians(degree2));
        line(startX, startY, endX1, endY1);
        line(startX, startY, endX2, endY2);

        branch(endX1, endY1, length -10, depth -1, colorFrom, colorTo, degree1);
        branch(endX2, endY2, length -10, depth -1, colorFrom, colorTo, degree2);
    };

    for (let i = 0; i < rootCount; i++) {
        endX = (startX + length * cos(radians(i * 360 / rootCount)));
        endY = (startY + length * sin(radians(i * 360 / rootCount)));

        line(startX, startY, endX, endY);

        branch(endX, endY, length - 10, depth - 1, colorFrom, colorTo, (i * 360 / rootCount));
        branch(endX, endY, length - 10, depth - 1, colorFrom, colorTo, (i * 360 / rootCount));
    }

}


const option = [];


const $input = $('input');
$input.on('change', function() {
    const $this = $(this);
    option[$this.attr('id')] = $this.val();
});


const $drawButton = $('.draw-button');
$drawButton.on('click', function () {
    updateOption();
});
console.log($input);

const updateOption = function () {
    for(var i = 0; i < $input.length; i++) {

        console.log($input[i]);
    }


};


function setup() {
    // put setup code here
    console.log($sketchZone.innerWidth(), $sketchZone.innerHeight());
    const canvas = createCanvas($sketchZone.innerWidth(), $sketchZone.innerHeight());
    canvas.parent('sketch-holder');
    background(50);

}

function draw() {
    // put drawing code here
    background(50);
    root($sketchZone.innerWidth()/2, $sketchZone.innerHeight()/2, 100, 10, 0, 0, 6);
}