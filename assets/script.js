//generic error message if anything other than li number is entered
function pickANum(start, end){
  var errMsg = document.createElement("p");
  errMsg.classList.add("message");
  errMsg.innerText = `Enter a number between ${start} and ${end} to continue`
  gameScreen.insertBefore(errMsg, gameScreen.childNodes[0]);
}

document.addEventListener('DOMContentLoaded', function () {
  var gameScreen = document.querySelector("#gameScreen");
  var startButton = document.querySelector("#startButton")

  //gather submittal data, check if it matches up
  function getUserInput(pattern){
    document.querySelector("form").removeEventListener("submit", getInput)
    document.querySelector("form").addEventListener("submit", getInput)
    if(pattern.test(userInput)){
      return userInput
    }
    else{
      userInput = '';
    }
  }
  function getInput(event){
    event.preventDefault();
    var userInput = document.querySelector("#userInput").value;
    console.log("userInput: " + userInput)
    document.querySelector("#userInput").value = '';
  }

  //when the start button is pressed
  startButton.addEventListener("click", function(){
    userInput = '';
    startButton.parentNode.removeChild(startButton)
    pickCharacter();
  });

  //bring up character selection screen
  function pickCharacter(){
    var ol = document.createElement("ol");
    var bankerEl = document.createElement("li")
    bankerEl.textContent = "Be a banker from Boston";
    var carpenterEl = document.createElement("li")
    carpenterEl.textContent = "Be a capenter from Ohio";
    var farmerEl = document.createElement("li")
    farmerEl.textContent = "Be a farmer from Illinois";
    var findDiff = document.createElement("li")
    findDiff.textContent = "Find out the difference between these choices";
    ol.appendChild(bankerEl);
    ol.appendChild(carpenterEl);
    ol.appendChild(farmerEl);
    ol.appendChild(findDiff);
    gameScreen.appendChild(ol);

    getUserInput(/[1234]/);

    // document.addEventListener("keyup", function(event){
    //   if(event.keyCode === 13){
    //     if(!/[1234]/.test(userInput)){
    //       pickANum(1,4);
    //     }
    //     else{
    //       errMsg.parentNode.removeChild(errMsg)
    //     }
    //   }
    // })
  }
})
