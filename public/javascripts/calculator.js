var value = 0;

var resultNumber = $('.result-number');

var $number = $('.click-box.number');
var $command = $('.click-box.command');
var $exec = $('.click-box.exec');


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

var addCommand = function(attribute) {
    return resultNumber.text() + attribute;
};

$command.on('click', function () {
    var attribute = $(this).attr('command');
    var temp;
    if(resultNumber.text() !== '0') {
        switch (attribute) {
            case "clear":
                resultNumber.text(0);
                value = 0;
                break;
            case "plus-minus":
                temp = Number(resultNumber.text()) * -1;
                resultNumber.text(temp);
                break;
            case ".":
                temp = resultNumber.text() + '.';
                resultNumber.text(temp);
                break;
            case "%":
                temp = addCommand(attribute);
                resultNumber.text(temp);
                break;
            case "/":
                temp = addCommand(attribute);
                resultNumber.text(temp);
                break;
            case "*":
                temp = addCommand(attribute);
                resultNumber.text(temp);
                break;
            case "-":
                temp = addCommand(attribute);
                resultNumber.text(temp);
                break;
            case "+":
                temp = addCommand(attribute);
                resultNumber.text(temp);
                break;
        }
    }
    if(resultNumber.text().length < 24)
        resultNumber.css('font-size', 40-resultNumber.text().length/10 * 10 + 'px');
        // resultNumber.css('font-size', (resultNumber.text().length / 6 * 5) + 'px');
});


$exec.on('click', function () {
    var result = eval(resultNumber.text());
    resultNumber.text(result);
});


