var value = 0;

var resultNumber = $('.result-number');

var $number = $('.click-box.number');
var $command = $('.click-box.command');
var $exec = $('.click-box.exec');
var $clear = $('.clear');
var $Minus = $('.plus-minus');

$number.on('click', function () {
    if (resultNumber.text() === '0') {
        value += Number($(this).text());
        resultNumber.text(value);
    }
    else {
        value = resultNumber.text();
        value += $(this).text();
        resultNumber.text(value);
    }
    if(resultNumber.text().length < 20)
        resultNumber.css('font-size', 40 - resultNumber.text().length / 6 * 8 + 'px');
});

$command.on('click', function () {
    var attribute = $(this).attr('command');
    var temp;
    if(resultNumber.text() !== '0' && !isNaN(resultNumber.text()[resultNumber.text().length - 1])) {
        temp = resultNumber.text() + attribute;
        resultNumber.text(temp);
    }
    if(resultNumber.text().length < 24)
        resultNumber.css('font-size', 40-resultNumber.text().length/10 * 10 + 'px');
        // resultNumber.css('font-size', (resultNumber.text().length / 6 * 5) + 'px');
});


$clear.on('click', function () {
    resultNumber.text(0);
    value = 0;
});

$Minus.on('click', function () {
    if(!isNaN(resultNumber.text())) {
        var temp;
        temp = Number(resultNumber.text()) * -1;
        resultNumber.text(temp);
    }
});


$exec.on('click', function () {
    if(!isNaN(resultNumber.text()[resultNumber.text().length - 1])) {
        var result = eval(resultNumber.text());
        resultNumber.text(result);
    }
});


