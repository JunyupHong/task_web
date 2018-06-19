var $email = $('#email');
var $password = $('#password');

var $loginButton = $('#login-button');


$loginButton.on('click', function () {
    if ($email.val() === '') {
        alert("email을 입력해주세요");
        $email.val('');
    }
    else if ($password.val().length < 8) {
        alert("비밀번호는 8자리 이상입니다");
        $password.val('');
    }
    else {
        window.location = '/kakaotalk/friends';
    }
});
