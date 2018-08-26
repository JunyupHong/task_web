const ClientManager = new function () {


// 웹소켓 전역 객체 생성
  var ws = new WebSocket("ws://127.0.0.1:8080");

  const $input = $('input');
  const $clientResultZone = $('.client-zone > .result-zone');

// 연결이 수립되면 서버에 메시지를 전송한다
  ws.onopen = function (event) {
    // ws.send("Client message: Hi!");
  };

// 서버로 부터 메시지를 수신한다
  ws.onmessage = function (event) {
    console.log("Server message: ", event.data);
    $clientResultZone.append(`<div class="result">${event.data}</div>`);
    $input.val('');

  };

// error event handler
  ws.onerror = function (event) {
    console.log("Server error message: ", event.data);
  };

// input이 눌리면 서버에 메세지를 전송
  $input.on('change', function () {
    const $this = $(this);
    ws.send(`${$this.val()}`);
  });

};

