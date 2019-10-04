
$(document).ready(function () {
  getData();
})

function getData() {
  fetch("https://makeitreal.s3.amazonaws.com/chats/users.json")
    .then(function (response) {
      return response.json()
    })
    .then(myJson => {
      console.log(myJson);
      return myJson.map(user => {
        showUser(user);
        return user;
      });
    })
    .then(users => {
      showChat(users);
    })
    .catch(error => console.log(error));
}

function showUser(user) {
  $(".user").append("<li class="+ user.url + ">" + user.name + "</li>");
  return user;
}

function showChat(users) {
  users.map(e => {
    console.log(e.url);
  });
  // (".user").on("click", "")
}

// function addElement(element) {
//   let newLi = $(document).createElement("li");
//   let newContent = $(document).createTextNode(element.name);
//   newLi.appendChild(newContent);
// }

