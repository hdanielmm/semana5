
$(document).ready(function () {
  getData();
})

function getData() {
  fetch("https://makeitreal.s3.amazonaws.com/chats/users.json")
    .then(function (response) {
      return response.json()
    })
    .then(function (myJson) {
      console.log(myJson);
      showUser(myJson);
      
    })
    .catch(error => console.log(error));
}

function showUser(user) {
  user.forEach(element => {
    $(".user").append("<li class="+ element.url + ">" + element.name + "</li>")
  });
}


