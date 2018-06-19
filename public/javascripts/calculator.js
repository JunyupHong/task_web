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
                alert(resultNumber.length);
                resultNumber.text(0);
                value = 0;
                break;
            case "plus-minus":
                var plusminusNumber = Number(resultNumber.text()) * -1;
                resultNumber.text(plusminusNumber);
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
        resultNumber.css('font-size', 40 - ( resultNumber.text().length / 8 * 10) + 'px');
});


$exec.on('click', function () {
    var result = eval(resultNumber.text());
    resultNumber.text(result);
});


