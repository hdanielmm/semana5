
$(document).ready(function () {
  getData();
})

function getData() {
  fetch("http://makeitreal.s3.amazonaws.com/chats/users.json")
    .then(function (response) {
      return response.json()
    })
    .then(myJson => {
      console.log(myJson);
      myJson.map(user => {
        showUser(user);
      });
    })
    .catch(error => console.log(error));
}

function getChat(url) {
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      json.map(chat => {
        showChat(chat);
      });
    })
    .catch(reject => console.log(reject));
}

function showUser(user) {
  if(user.connected) {
    $(".user").append("<div><li id=" + user.url + " class='pointer'><i class='fas fa-circle'></i>  " + user.name + "</li></div>");
  } else {
    $(".user").append("<div><li id=" + user.url + " class='pointer'><i class='far fa-circle'></i>  " + user.name + "</li></div>");
  }
}

$(".user").on("click", "li", e => {
  const url = $(e.currentTarget).attr("id");
  $(".message").empty(); // Delete previous chat to put new one
  getChat(url);
});

function showChat(chat) {
  $(".message").append("<div><ul><li><strong>" + chat.name + "</strong><span> " + chat.date + "</span></li><li>" + chat.body + "</li></ul></div>");
}

