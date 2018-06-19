var $inputMessage = $('#messageInput');
var $sender = $('#sender');

$sender.on('click', function () {
    var message = $inputMessage.val();
    $('.chatting-zone').append(`
        <div class="chatting-bar send-text">
            <div class="chatting-bar-time-zone">
                <div class="chatting-bar-time">오후 12:28</div>
            </div>
            <div class="chatting-bar-text-zone">
                <div class="chatting-bar-message-zone">
                    <div class="chatting-bar-message">${message}</div>
                </div>
            </div>
        </div>
    `)
    $inputMessage.val('');
});