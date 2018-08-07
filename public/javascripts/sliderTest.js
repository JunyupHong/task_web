$("#ex12c")
    .slider({id: "slider12c", min: 0, max: 25, range: true, value: [3, 25]});

$("#ex13c")
    .slider({id: "slider13c", min: 0, max: 10, range: true, value: [3, 7]});






const Slider = function ($root, min, max) {
    const temp = $root.append(`
        <div class="slider-zone">
            <div class="bar">
                <div class="circle left"></div>
                <div class="circle right"></div>
            </div>

        </div>`);

    const points = [];
    let count;

    const $bar = $(temp.find('.bar'));


    const setPoints = function () {
        count = max - min + 1;
        for(let i = 0; i < count; i++) {
            points.push($bar.position().left + ($bar.width()/count)*i);
        }

    };
    setPoints();

    for(let i = 0; i< points.length; i++) {
        $('body').append(`<div class="line" style="left:${points[i]}px"></div>`);
    }

    // this.getLeftValue = function () {
    //     const $left = $('.circle:first');
    //     for(let i = 0; i < points.length; i++) {
    //         if($left.position().left + $bar.position().left - points[i] < 0) {
    //             return i-1;
    //         }
    //     }
    //     return points.length-1;
    // };
    // this.getRightValue = () => {
    //     const $right = $('.circle:last');
    //     for(let i = 0; i < points.length; i++) {
    //         if($right.position().left + $bar.position().left - points[i] < 0) {
    //             return i-1;
    //         }
    //     }
    //     return points.length-1;
    //
    // };
    const getLeftValue = function () {
        const $left = $('.circle:first');
        for(let i = 0; i < points.length; i++) {
            if($left.position().left + $bar.position().left - points[i] < 0) {
                return i-1;
            }
        }
        return points.length-1;
    };
    const getRightValue = () => {
        const $right = $('.circle:last');
        for(let i = 0; i < points.length; i++) {
            if($right.position().left + $bar.position().left - points[i] < 0) {
                return i-1;
            }
        }
        return points.length-1;

    };

    const $circle = $(temp.find('.circle'));
    $circle.on('mousedown', function (event) {
        const dragItem = $(this);
        dragItem.attr('id', 'drag');


        dragItem.on('mousemove', function (event) {
            if(event.clientX > $bar.position().left && event.clientX < $bar.position().left + $bar.width()) {
                $(this).css('left', `${event.clientX - $circle.width()/2 - $bar.position().left}px`);
            }
        });

    });



    $(document).on('mouseup', function (event) {
        const $drag = $('#drag');
        $drag.off('mousemove');
        $drag.attr('id', '');

        const mouseX = event.clientX;

        if(mouseX < points[0]) {
            $drag.css('left', `${points[0] - $bar.position().left + $bar.width()/(count*2) -$circle.width()/2}px`);
        }

        else if(mouseX > points[0] && mouseX < points[points.length-1]) {
            for(let i = 0; i< points.length-1; i++) {
                if(mouseX > points[i] && mouseX < points[i+1]) {
                    $drag.css('left', `${points[i] - $bar.position().left + $bar.width()/(count*2) -$circle.width()/2}px`);

                }
            }
        }
        else {
            $drag.css('left', `${points[points.length-1] - $bar.position().left + $bar.width()/(count*2) -$circle.width()/2}px`);
        }
        console.log(getLeftValue());
        console.log(getRightValue());

    });


    return this;
};

const $a = $('body');
const a = new Slider($a , 0, 10);

//
// console.log(a.getLeftValue());
// console.log(a.getRightValue());