/*
    $chattingZone.scrollTop($chattingZone[0].scrollHeight);

    chatApi.sendMessage({Id}, {Message});
    chatApi.deleteMessage({MessageId});

    // 메세지 추가 이벤트
    chatApi.on('child_added', function (d) {
    // { messageId : { id : , message : , date: }}

    });

    // 메세지 삭제 이벤트
    chatApi.on('child_removed', function (d) {
    // { messageId : { id : , message : , date: }}

    });

 */


const $chattingZone = $('.chatting-zone');

const template = `<div class="chatting-bar">
                        <div class="chatting-bar-image-zone">
                            <div class="chatting-bar-image-circle-zone">
                            <div class="fas fa-user"></div>
                            </div>
                        </div>
                        <div class="chatting-bar-text-zone">
                            <div class="chatting-bar-name-zone">
                                <div class="chatting-bar-name">홍준엽</div>
                            </div>
                            <div class="chatting-bar-message-zone">
                                <div class="chatting-bar-message">가나다</div>
                            </div>
                            </div>
                        <div class="chatting-bar-time-zone">
                            <div class="chatting-bar-time">오후 12:28</div>
                            </div>
                        <div class="delete-button"><i class="fas fa-times"></i></div>
                        <div class="empty-zone"></div>
                    </div>`;

// const sendTemplate = `<div class="chatting-bar send-text">
//                          <div class="chatting-bar-image-zone">
//                             <div class="chatting-bar-image-circle-zone">
//                                 <div class="fas fa-user"></div>
//                             </div>
//                          </div>
//                          <div class="chatting-bar-text-zone">
//                             <div class="chatting-bar-name-zone">
//                                 <div class="chatting-bar-name">홍준엽</div>
//                             </div>
//                             <div class="chatting-bar-message-zone">
//                                 <div class="chatting-bar-message">가나다</div>
//                             </div>
//                          </div>
//                          <div class="chatting-bar-time-zone">
//                            <div class="chatting-bar-time">오후 12:28</div>
//                          </div>
//                          <div class="delete-button"><i class="fas fa-times"></i></div>
//                          <div class="empty-zone"></div>
//                      </div>`;



const $modal = $('.modal-background');

const $yesButton = $('.modal-button[id = "yes"]');
const $noButton = $('.modal-button[id = "no"]');


$yesButton.on('click', function () {
    chatApi.deleteMessage($('.modal').attr('id'));
    $modal.css('display', 'none');
});
$noButton.on('click', function () {
    $modal.css('display', 'none');
});


function Element(messageId, isMine) {
    const that = this;
    const $template = $(template);
    $template.attr('id', messageId);

    if (isMine) {
        $template.find('.chatting-bar-image-zone').remove();
        $template.find('.chatting-bar-name-zone').remove();

        $template.find('i.fas.fa-times').on('click', function () {
            //chatApi.deleteMessage(messageId);
            $modal.css('display', 'block');
            $('.modal').attr('id', messageId);

        });

    } else {
        $template.find('.delete-button').remove();
    }

    if (isMine !== undefined && isMine) {
        $template.addClass('send-text');
    }


    let elementData = {};

    this.setMessage = function (data) {
        elementData = data;
        $template.find('.chatting-bar-name').text(data.id);
        $template.find('.chatting-bar-message').text(data.message);
        $template.find('.chatting-bar-time').text(data.date);
    };

    this.getTime = function () {
        return elementData.date;
    };

    this.getName = function () {
        return elementData.id;
    };


    this.setVisibleTime = function (bool) {
        $template.find('.chatting-bar-time-zone').css('visibility', bool ? 'visible' : 'hidden');
    };

    this.setVisibleName = function (bool) {
        $template.find('.chatting-bar-name-zone').css('display', bool ? 'block' : 'none');
    };

    this.setVisibleImage = function (bool) {
        $template.find('.chatting-bar-image-zone').css('visibility', bool ? 'visible' : 'hidden');
        if(bool === false) {
            $template.find('.chatting-bar-image-zone').css('height', '20px');
        }
    };

    let prev = null;
    this.prev = function (element) {
        if (element === undefined) {
            return prev;
        }
        prev = element;
        that.update();
    };

    let next = null;
    this.next = function (element) {
        if (element === undefined) {
            return next;
        }
        next = element;
        that.update();
    };


    this.update = function () {
        if (prev !== null
            && prev.getName() === that.getName()
            && prev.getTime() === that.getTime()) {
            that.setVisibleImage(false);
            that.setVisibleName(false);
        }
        else {
            that.setVisibleImage(true);
            that.setVisibleName(true);
        }

        if (next !== null
            && next.getName() === that.getName()
            & next.getTime() === that.getTime()) {
            that.setVisibleTime(false);
        }
        else {
            that.setVisibleTime(true);
        }
    };


    this.remove = function () {
        $template.remove();

        const prev = that.prev();
        const next = that.next();
        if (prev !== null)
            prev.next(next);

        if (next !== null)
            next.prev(prev);
    };


    $template.appendTo($chattingZone);
    return this;

}




const myId = '홍준엽';
const elements = {};

let lastElement = null;


const $textarea = $('textarea');

$textarea.on('keyup', function () {
    const message = $textarea.val().replace(/\n/g, "");
    if (event.keyCode === 13) {

        $textarea.val('');
        if (message !== '') {
            chatApi.sendMessage(myId, message);
        }
    }
});


chatApi.on('child_added', function (d) {
    // { messageId : { id : , message : , date: }}

    const id = Object.keys(d)[0];
    const data = d[id];
    const date = new Date(data.date);
    const dateString = `${date.getHours() > 11 ? '오후' : '오전'} ${date.getHours() % 13}:${date.getMinutes()}`;
    data.date = dateString;
    const ele = new Element(id, myId === data.id);
    ele.setMessage(data);

    if (lastElement !== null) {
        lastElement.next(ele);
        ele.prev(lastElement);
    }
    elements[id] = ele;
    lastElement = ele;

    $chattingZone.scrollTop($chattingZone[0].scrollHeight);


});


chatApi.on('child_removed', function (d) {
    // { messageId : { id : , message : , date: }}
    const id = Object.keys(d)[0];
    const ele = elements[id];
    ele.remove();
    delete elements[id];

});

