
const $inputMessage = $('#messageInput');
const $chattingZone = $('#chattingZone');

const myId = '홍준엽';

let inputMessage = '';

$inputMessage.keydown(function (event) {
    if(event.keyCode === 13)
        inputMessage = $inputMessage.val();
});
$inputMessage.keyup(function(event) {
    if(event.keyCode === 13) {
        chatApi.sendMessage(myId, inputMessage);
        $inputMessage.val('');
    }
});


// 메세지 추가 이벤트
chatApi.on('child_added', function (d) {
// { messageId : { id : , message : , date: }}

    const selectedMessageId = Object.keys(d)[0];
    const selectedMessage = d[selectedMessageId];
    const time = new Date(selectedMessage.date);
    let amPm = '';

    console.log(selectedMessage);


    if(time.getHours() >= 12) {
        amPm = '오후';
    }else {
        amPm = '오전';
    }
    if(selectedMessage.id === '홍준엽') {
        $('.chatting-zone').append(`
        <div class="chatting-bar send-text">
            <div class="delete-button">
                <i class="fas fa-times" type="deleteButton" messageId="${selectedMessageId}"></i>
            </div>
            <div class="chatting-bar-time-zone">
                <div class="chatting-bar-time">${amPm + ' '+ time.getHours() % 12 + ':' + time.getMinutes()}</div>
            </div>
            <div class="chatting-bar-text-zone">
                <div class="chatting-bar-message-zone">
                    <div class="chatting-bar-message">${selectedMessage.message}</div>
                </div>
            </div>
        </div>
        `)
    }
    else {
        if(true) {
            $('.chatting-zone').append(`
            <div class="chatting-bar">
                <div class="chatting-bar-image-zone">
                    <div class="chatting-bar-image-circle-zone">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <div class="chatting-bar-text-zone">
                    <div class="chatting-bar-name-zone">
                        <div class="chatting-bar-name">${selectedMessage.id}</div>
                    </div>
                    <div class="chatting-bar-message-zone">
                        <div class="chatting-bar-message">${selectedMessage.message}</div>
                    </div>
                </div>
                <div class="chatting-bar-time-zone">
                    <div class="chatting-bar-time">${amPm + ' '+ time.getHours() % 12 + ':' + time.getMinutes()}</div>
                </div>
            </div>
            `)
        }
        else {
            $('.chatting-zone').append(`
            <div class="chatting-bar">
                <div class="chatting-bar-image-zone no-image"></div>
                <div class="chatting-bar-text-zone">
                    <div class="chatting-bar-message-zone">
                        <div class="chatting-bar-message">${selectedMessage.message}</div>
                    </div>
                </div>
                <div class="chatting-bar-time-zone">
                    <div class="chatting-bar-time">${selectedMessage.date}</div>
                </div>
                
            </div>
            `)
        }
    }
    $chattingZone.scrollTop($chattingZone[0].scrollHeight);
});


var clickedBar;

$chattingZone.delegate('i.fas.fa-times', 'click', function () {
    // chatApi.deleteMessage({messageId});
    var messageId = $(this).attr('messageId');
    console.log(messageId);
    chatApi.deleteMessage(messageId);
    clickedBar = $(this);
    console.log('clickbar', clickedBar);
});

// const deleteButton = $('i.fas.fa-times');
//
// deleteButton.on('click', type='deleteButton', function () {
//     // chatApi.deleteMessage({messageId});
//     console.log($(this));
//     console.log('click');
//     var messageId = $(this).attr('messageId');
//     console.log(messageId);
//     chatApi.deleteMessage(messageId);
// });


// 메세지 삭제 이벤트
chatApi.on('child_removed', function (d) {
// { messageId : { id : , message : , date: }}

    console.log('delete');
    const deleteMessageId = Object.keys(d)[0];
    const deleteButton = $('.delete-button');
    deleteButton.find(`i.fas.fa-times[messageId="${deleteMessageId}"]`).parent().parent().remove();



});