// Picas y Fijas

const start = () => {
  const generatedNumber = generateNumber();
  askQuestion(generatedNumber);
}

function generateNumber() {
  const number = [];
  let random = 0;
  while (number.length < 4) {
    random = Math.floor(Math.random() * 10).toString()
    if(number.indexOf(random) == -1){
      number.push(random);
    }
  }
  return number;
}

function userNumber(number) {
  return number.split("");
}

const askQuestion = (number) => {
  $("input").on("keypress", function(e) {
    if(e.which == 13){
      let inputVal = $("input").val();
      $("input").val("");
      if(winner(userNumber(inputVal), number, compareNumbers)){
        console.log("You won!!!\n");
        alert("You won!!!");
      }
    }
  });
}

const winner = (userNumber, generatedNumber, callback) => {
  const [picas, fijas] = callback(userNumber, generatedNumber);
  console.log(`Picas: ${picas}, Fijas: ${fijas} `);
  if (fijas === 4) {
    return true;
  }
  $("tbody").append("<tr><td>" + userNumber.join("") + "</td><td class='picas'>" + `${picas}` + "</td><td class='fijas'>" + `${fijas}` + "</td></tr>");
  
}

const compareNumbers = (userNumber, generatedNumber) => {
  let fijas = 0;
  let picas = 0;
  console.log(generatedNumber.join(""));
  for (let i = 0; i < userNumber.length; i++) {
    if (generatedNumber.includes(userNumber[i])) {
      if (userNumber[i] === generatedNumber[i]) {
        fijas += 1;
      } else {
        picas += 1;
      }
    }
  }
  return [picas, fijas];
}

start();


