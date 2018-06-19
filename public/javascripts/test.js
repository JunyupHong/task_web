// 자바스크립트는 계속 돌아가면서 실행 -> 새로고침이 필요없음

// System.out.println("hello");
// console.log('hello');
// console.warn('warn');
// console.error('error');


// 변수

var a = 10;
var b = 'a';
var c = null;
var d = undefined;
var e = [1, 2, 3, 4];
var f = { a: 10 };
var g = [1, 2, 3, 4, 'a', 'n', { a: [2, 3, 4] }];
var h = function() {			// 함수선언
    console.log('함수');
}
// h();							// 함수 호출



// selector == $({option})

console.log($);

// $ (jQuery), vanilla js의 근본적인 목적은 dom을 제어하는 것
//                              데이터를 받아와서 그 데이터를 재구성하는것




// console.log($('.kakaotalk-login-button'));

// 한칸 띄고 쓰면 그 내부를 말함
// console.log($('a .kakaotalk-login-button'));

// console.log($('#login-button'));



$('#login-button').text('asd');




var $input = $('#messageInput');    // 포인터랑 유사... #messageInput을 가르키고 있음
                                    // 한번만 사용해야함! 따라서 함수 안에 넣으면 안
// 메세지를 치는곳에서 메세지를 받아옴
// 변수이름앞에 $를 붙이는거는 jquery변수라는 의미를 나타냄!! 필수는 아님...

var $sender = $('#sender');

$sender.on('click', function () {   // 익명함수 -> 한번만 사용
    // alert($input.val());       // alert는 알림창을 띄워준다

    var message = $input.val();
    $('.chatting-zone').append('<h1>' + message + '</h1>')   // js에서는 html만을 써야함
                                // append는 부모에 자식을 붙인다(뒤에다 붙임)
                                // prepend는 부모의 맨앞에 자식을 붙인다
    // template string: ``을 하면 엔터를 쳐도 +가 붙지않아도 인식한다
    // 내부에 message를 붙이고 싶으면 + 대신 ${message}를 넣어준다
    // $('.chatting-zone').append(`<h1> ${message} </h1>`)
    $input.val(''); // 빈칸으로 만들어주기

    // $input.val();    // ==getter
    // $input.val('');  // ==setter
    // $input.text();   // ==getter
    // $input.text(''); // ==setter
    // 값을 주면 setter, 안주면 getter
});

//
// var sendMessage = function () {}     // 함수를 만듬
// $sender.on('click', sendMessage);    // 익명함수를 나눠서 !




// a태그의 href와 유사
// window.location = 'http://naver.com';
