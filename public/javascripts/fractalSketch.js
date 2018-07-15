
function setup(){
    const $root = $('body');
    const canvas = createCanvas($root.width(), $root.height());
    canvas.parent('canvas');
    background(0);
}


const inputs = $('input');
const data = {};


$('#exec').on('click', () => {
    background(0);


    fractal.setTickZero();

    for(let i = 0; i < inputs.length; i++) {
        const $input = $(inputs[i]);
        const key = $input.attr('name');
        const value = $input.val();
        data[key] = value;
    }
    fractal.pause();
    fractal.generateFractal(data);

});

let isPause = false;

const $pauseButton = $('#pause');

$pauseButton.on('click', () => {
    if(!isPause) {
        isPause = true;
        fractal.pause();
        $pauseButton.text('play');
    }
    else {
        isPause = false;
        fractal.pause();
        $pauseButton.text('pause');
    }
});






















// const $sketchZone = $('.sketch-zone');
//
//
// function root(startX, startY, length, depth, colorFrom, colorTo, rootCount) {
//
//     if (depth === 0) {
//         return;
//     }
//     stroke(255);
//     let endX;
//     let endY;
//
//     const branch = function (startX, startY, length, depth, colorFrom, colorTo, degree, angle) {
//         if (depth === 0) {
//             return;
//         }
//         stroke(255);
//
//
//         let endX1;
//         let endY1;
//         const degree1 = degree + angle * 1;
//
//         let endX2;
//         let endY2;
//         const degree2 = degree - angle * 1;
//
//         endX1 = startX + length * cos(radians(degree1));
//         endY1 = startY + length * sin(radians(degree1));
//         endX2 = startX + length * cos(radians(degree2));
//         endY2 = startY + length * sin(radians(degree2));
//         line(startX, startY, endX1, endY1);
//         line(startX, startY, endX2, endY2);
//
//         branch(endX1, endY1, length - 10, depth - 1, colorFrom, colorTo, degree1, option['angle']);
//         branch(endX2, endY2, length - 10, depth - 1, colorFrom, colorTo, degree2, option['angle']);
//     };
//
//     for (let i = 0; i < rootCount; i++) {
//         endX = (startX + length * cos(radians(i * 360 / rootCount)));
//         endY = (startY + length * sin(radians(i * 360 / rootCount)));
//
//         line(startX, startY, endX, endY);
//
//         branch(endX, endY, length - 10, depth - 1, colorFrom, colorTo, (i * 360 / rootCount), option['angle']);
//         branch(endX, endY, length - 10, depth - 1, colorFrom, colorTo, (i * 360 / rootCount), option['angle']);
//     }
//
// }
//
//
// const option = [];
//
// const $input = $('input');
//
// const $drawButton = $('.draw-button');
// $drawButton.on('click', function () {
//     updateOption();
// });
//
// const updateOption = function () {
//     for (var i = 0; i < $input.length; i++) {
//
//         if ($input[i].value === '') {
//             console.log($input[i]);
//         }
//         else {
//             console.log($input[i].id);
//             option[$input[i].id] = $input[i].value;
//
//         }
//     }
//
// };
//
// const $optionBar = $('.option-bar');
// console.log($input.parent().next().children().children());
//
// const updateBar = function() {
//
//     for(var i = 0; i < $input.length; i++) {
//         switch(option[$input[i].id]) {
//
//             case 'root' :
//                 if($input[i].value < 10) {
//
//                 }
//                 break;
//             case 'angle':
//                 break;
//             case 'length':
//                 break;
//             case 'Depth':
//                 break;
//         }
//     }
// };
//
// function setup() {
//     // put setup code here
//     const canvas = createCanvas($sketchZone.innerWidth(), $sketchZone.innerHeight());
//     canvas.parent('sketch-holder');
//
//     colorMode(HSB, 255);
//
//     background(50);
//
//     option['length'] = 0;
//     option['depth'] = 0;
//     option['colorFrom'] = 0;
//     option['colorTo'] = 0;
//     option['root'] = 0;
//     option['angle'] = 0;
//
// }
//
// function draw() {
//     // put drawing code here
//     background(50);
//     root($sketchZone.innerWidth() / 2, $sketchZone.innerHeight() / 2, option['length'], option['depth'], option['colorFrom'], option['colorTo'], option['root']);
// }