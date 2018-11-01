//generic error message if anything other than li number is entered
function errMsg(str){
  var errMsg = document.createElement("p");
  errMsg.classList.add("message");
  errMsg.innerText = str
  gameScreen.insertBefore(errMsg, gameScreen.childNodes[0]);
}

document.addEventListener('DOMContentLoaded', function () {
  var gameScreen = document.querySelector("#gameScreen");
  var startButton = document.querySelector("#startButton")


  //when the start button is pressed
  startButton.addEventListener("click", function(){
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

    //once the options have been added, listen for and return user input
    //remove other event listeners added by other getUserInput calls by cloning the node
      var old_element = document.querySelector("form");
      var new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);

      //add event listner for user submittal
      document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault();
        var userInput = document.querySelector("#userInput").value;
        document.querySelector("#userInput").value = '';
        //make sure user has selected valid option
        if(userInput > 4 || userInput < 0){
          errMsg("Enter a number to choose the corresponding option")
        }
        else{
          var displayChoice = document.createElement("p");
          displayChoice.innerText = document.querySelector(`li:nth-child(${userInput})`).innerText
          document.querySelector("ol").parentNode.removeChild(document.querySelector("ol"))
          document.querySelector("#gameScreen").appendChild(displayChoice);
        }
      })
  }
})
