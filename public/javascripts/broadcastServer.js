var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 8080 });

const clients = [];

// 연결이 수립되면 클라이언트에 메시지를 전송하고 클라이언트로부터의 메시지를 수신한다
wss.on("connection", function connection(ws) {
  // ws.send("Hello! I am a server.");

  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  });

  // ws.on("message", function (message) {
  //   console.log("Received: %s", message);
  //
  //   ws.send(message);
  // });
});
