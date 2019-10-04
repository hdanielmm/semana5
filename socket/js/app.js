const ws = new WebSocket("wss://mir-chat.herokuapp.com");

ws.onopen = function () {
  console.log("Conectados!");
}

ws.onmessage = function (msg) {
  var obj = JSON.parse(msg.data);
  console.log(obj);
  showMessage(obj);
}

ws.onclose = function () {
  console.log("Desconectados!");
}

$("input").on("keypress", e => {
  if(e.which === 13) {
    sendMessage($("input").val())
    $("input").val("");
  }
})

function sendMessage(input) {
  ws.send(JSON.stringify({ sender: "Daniel", message: input }));
}

function showMessage(msg) {
  $(".mensaje").append("<li><strong>" + msg.sender + "</strong> - " + msg.message + "</li>\n");
}
