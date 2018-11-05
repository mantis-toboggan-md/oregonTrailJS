var characters = {
  banker: {
    money: 200,
    pointMulti: 1
  },
  farmer: {
    money: 0,
    pointMulti: 1.5
  },
  carpenter: {
    money: 100,
    pointMulti: 1.25
  }
}

var userCharacter = {
  role: "none",
  groupNames: ["group member 2", "group member 3", "group member 4"],
  groupHealth: ["Good", "Good", "Good"],
  money: 1000,
  pointMulti: 1,
  oxen: 0,
  winterClothes: 0,
  summerClothes: 0,
  food: 0,
  ammo: 0,
  spareParts: 0
}

var oxenPrice = 50;
var foodPrice = 1;
var winterClothesPrice = 50;
var summerClothesPrice = 50;
var ammoPrice = 50;
var sparePartsPrice = 50;
var totalSpent = 0;
var oxenSpent = 0;
var foodSpent = 0;
var clothesSpent = 0;
var ammoSpent = 0;
var sparePartsSpent = 0;

//generic error message, displays content in string as text
function errMsg(str){
  var errMsg = document.createElement("p");
  errMsg.classList.add("message");
  errMsg.innerText = str
  gameScreen.insertBefore(errMsg, gameScreen.childNodes[0]);
}

//remove all messages
function removeErrMsgs(){
   var allMsgs = document.querySelectorAll(".message");
   for(var i = 0; i < allMsgs.length; i++){
     allMsgs[i].parentNode.removeChild(allMsgs[i])
   }
}

var userInputEl = document.querySelector("#userInputEl")

document.addEventListener('DOMContentLoaded', function () {
  var gameScreen = document.querySelector("#gameScreen");
  var startButton = document.querySelector("#startButton")

  //when the start button is pressed
  startButton.addEventListener("click", function(){
    startButton.parentNode.removeChild(startButton);
    document.querySelector("#userInput").focus();
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

      //make sure the input box is selected, then add listener for submittal
      document.querySelector("#userInput").focus();
      document.querySelector("form").addEventListener("submit", function(event){
        //when something is submitted, remove all currently displayed messages
        removeErrMsgs()
        //prevent submittal to server, grab in JS and set to userInput
        event.preventDefault();
        var userInput = document.querySelector("#userInput").value;
        document.querySelector("#userInput").value = '';
        //make sure user has selected valid option
        if(userInput > 4 || userInput < 0 || userInput.length>1){
          console.log("false userInput: " + userInput.length)
          errMsg("Enter a number to choose the corresponding option")
        }
        else{
          console.log("userInput: " + userInput)
          //set character role
          switch(userInput){
            case "1":
              userCharacter["role"] = "banker"
              userCharacter["money"] += 300
              userCharacter["pointMulti"] += 0
              break;
            case "2":
              userCharacter["role"] = "carpenter"
              userCharacter["money"] += 200
              userCharacter["pointMulti"] += 0.15
              break;
            case "3":
              userCharacter["role"] = "farmer"
              userCharacter["money"] += 0
              userCharacter["pointMulti"] += 0.3
              console.log(userCharacter);
              break;
            case "4":
              characterInfo();
          }
        }

        //if the user has chosen a character, move on to naming screen
        if(userCharacter["role"]!== "none"){
          //remove the character options
          document.querySelector("ol").parentNode.removeChild(document.querySelector("ol"));
          pickName();
        }

      })
  }

  //bring up a screen with info on stats of different character choices; return to pickCharacter screen on enter
  function characterInfo(){
    var characterInfoEl = document.createElement("p");
    characterInfoEl.innerHTML = "Traveling to Oregon isn't easy! But if you're a banker, you'll have more money for supplies and services than a carpenter or a farmer. <br> <br> However, the harder you have to try, the more points you deserve! Therefore, the farmer earns the greatest number of points and the banker earns the least."
    //remove the character options
    document.querySelector("ol").parentNode.removeChild(document.querySelector("ol"));
    //display the character info paragraphs
    gameScreen.insertBefore(characterInfoEl, gameScreen.childNodes[0]);
    //remove other event listeners on submittal
      var old_element = document.querySelector("form");
      var new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);
    //add listener to go back to character select screen on submittal
    document.querySelector("#userInput").focus();
    document.querySelector("form").addEventListener("submit", function(event){
      removeErrMsgs()
      event.preventDefault();
      characterInfoEl.parentNode.removeChild(characterInfoEl);
      pickCharacter()
    });
  }

  //bring up naming screen
  function pickName(){
    var askNameLabelEl = document.createElement("label");
    askNameLabelEl.setAttribute("for", "userInput");
    askNameLabelEl.innerText = "What is the name of the wagon leader?";
    gameScreen.insertBefore(askNameLabelEl, gameScreen.childNodes[0]);

    //remove other event listeners on submittal
    var old_element = document.querySelector("form");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    document.querySelector("#userInput").focus();
    //add listener to grab chosen name and continue to other naming screen
    document.querySelector("form").addEventListener("submit", function(event){
      removeErrMsgs()
      event.preventDefault();
      userCharacter["name"] = document.querySelector("#userInput").value;
      document.querySelector("#userInput").value = '';
      askNameLabelEl.parentNode.removeChild(askNameLabelEl);
      removeErrMsgs();
      pickGroupNames();

    });
  }

  //bring up screen to choose group names
  function pickGroupNames(){
    var askGroupNamesEl = document.createElement("p");
    askGroupNamesEl.innerHTML = "What are the names of the other members of your group?"
    askGroupNamesEl.style.width = "100%"
    var groupNamesEl = document.createElement("ol");
    groupNamesEl.setAttribute("id", "nameList")
    var nameOneEl = document.createElement("li");
    nameOneEl.innerHTML = userCharacter["name"];
    var nameTwoEl = document.createElement("li");
    nameTwoEl.innerHTML = "<input id = 'nameTwoInput' type = 'text' placeholder = '_____'></input>"
    var nameThreeEl = document.createElement("li");
    nameThreeEl.innerHTML = "<input id = 'nameThreeInput' type = 'text' placeholder = '_____'></input>"
    var nameFourEl = document.createElement("li");
    nameFourEl.innerHTML = "<input id = 'nameFourInput' type = 'text' placeholder = '_____'></input>"
    groupNamesEl.appendChild(nameOneEl);
    groupNamesEl.appendChild(nameTwoEl);
    groupNamesEl.appendChild(nameThreeEl);
    groupNamesEl.appendChild(nameFourEl);
    gameScreen.insertBefore(groupNamesEl, gameScreen.childNodes[0])
    gameScreen.insertBefore(askGroupNamesEl, gameScreen.childNodes[0]);
    document.querySelector("#userInput").parentNode.removeChild(document.querySelector("#userInput"));
    userInputEl = document.createElement("button");
    userInputEl.setAttribute("id", "userInput");
    userInputEl.classList.add("message")
    userInputEl.innerText = "Continue"
    gameScreen.appendChild(userInputEl)

    //add listener for continue button to save names and move to character summary screen
    document.querySelector("#userInput").focus();
    userInputEl.addEventListener("click", function(event){
      if(nameTwoInput.value){
        console.log(nameTwoEl.value)
        userCharacter["groupNames"][0] = nameTwoInput.value
      }
      if(nameThreeInput.value){
        userCharacter["groupNames"][1] = nameThreeInput.value
      }
      if(nameFourInput.value){
        userCharacter["groupNames"][2] = nameFourInput.value
      }
      askGroupNamesEl.parentNode.removeChild(askGroupNamesEl);
      groupNamesEl.parentNode.removeChild(groupNamesEl);

      characterSummary();
    })
  }

  //bring up an initial summary of the group names
  function characterSummary(){
    //remove event listener from continue button
    var old_element = userInputEl;
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    userInputEl = new_element;

    userInputEl.addEventListener("click", function(){
      if(summaryBox){
        summaryBox.parentNode.removeChild(summaryBox);
      }
      shoppingInfo()
    })

    var summaryBox = document.createElement("section");
    summaryBox.classList.add("message");
    summaryBox.innerHTML = `
      Wagon leader: ${userCharacter["name"]}<br>
      Group Members: <br>
      <ul>
        <li>${userCharacter["groupNames"][0]} Health: ${userCharacter["groupHealth"][0]}</li>
        <li>${userCharacter["groupNames"][1]} Health: ${userCharacter["groupHealth"][1]}</li>
        <li>${userCharacter["groupNames"][2]} Health: ${userCharacter["groupHealth"][2]}</li>
      </ul>
      Money: ${userCharacter["money"]}
      `
    gameScreen.insertBefore(summaryBox, gameScreen.childNodes[0])
  }

  //bring up info on items to purchase
  function shoppingInfo(){
    var shoppingIntroTextEl = document.createElement("section");
    shoppingIntroTextEl.innerHTML = `
      <p>Hello, I'm Matt. So you're going to Oregon? I can fix you up with what you need:
        <ul>
          <li>- a team of oxen to pull your wagon</li>
          <li>- clothing for both winter and summer</li>
          <li>- plenty of food for the trip</li>
          <li>- ammunition for your rifles</li>
          <li>- spare parts for your wagon</li>
        </ul>
      </p>
    `
    gameScreen.insertBefore(shoppingIntroTextEl, gameScreen.childNodes[0])

    //remove event listener from continue button
    var old_element = userInputEl;
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    userInputEl = new_element;
    //move on to purchase screen when user clicks continue button
    userInputEl.addEventListener("click", function(event){
      shoppingIntroTextEl.parentNode.removeChild(shoppingIntroTextEl);
        purchaseFirst()
    })
  }

  //bring up general store bill screen
  function purchaseFirst(){
    var storeTitle = document.createElement("section")
    storeTitle.setAttribute("class", "location-header")
    storeTitle.innerHTML = `
      <h2>Matt's General Store</h2>
      <h3>Independence, Missouri: March 1, 1848</h3>
    `
    // oxenSpent = (userCharacter["oxen"] * oxenPrice);
    // foodSpent = (userCharacter["food"] * foodPrice);
    // clothesSpent = (userCharacter["winterClothes"] * winterClothesPrice + userCharacter["summerClothes"] * summerClothesPrice)
    // ammoSpent = (userCharacter["ammo"] * ammoPrice)
    // sparePartsSpent = (userCharacter["spareParts"] * sparePartsPrice)
    totalSpent = (oxenSpent + foodSpent + clothesSpent + ammoSpent + sparePartsSpent);

    var storeInv = document.createElement("table")
    storeInv.innerHTML = `
      <tr>
        <td>1. Oxen</td>
        <td>${oxenSpent.toFixed(2)}</td>
      </tr>
      <tr>
        <td>2. Food</td>
        <td>${foodSpent.toFixed(2)}</td>
      </tr>
      <tr>
        <td>3. Clothing</td>
        <td>${clothesSpent.toFixed(2)}</td>
      </tr>
      <tr>
        <td>4. Ammunition</td>
        <td>${ammoSpent.toFixed(2)}</td>
      </tr>
      <tr>
        <td>5. Spare parts</td>
        <td>${sparePartsSpent.toFixed(2)}</td>
      </tr>
    `
    gameScreen.insertBefore(storeInv, gameScreen.childNodes[0])
    gameScreen.insertBefore(storeTitle, gameScreen.childNodes[0])
    var billEl = document.createElement("p")
    billEl.setAttribute("id", "bill")
    billEl.innerHTML = `Bill: ${totalSpent.toFixed(2)}`
    gameScreen.insertBefore(billEl, document.querySelector("form"))

    //get rid of continue button and bring back input box
    gameScreen.removeChild(userInputEl)
    userInputEl = document.createElement("input")
    userInputEl.setAttribute("type", "text");
    userInputEl.setAttribute("placeholder", "_");
    userInputEl.setAttribute("id", "userInput");
    userInputEl.setAttribute("autocomplete", "off");
    document.querySelector("form").insertBefore(userInputEl, document.querySelector("form").childNodes[0])

    //remove other event listeners attached to submittal
    var old_element = document.querySelector("form");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    //make sure the input box is selected, then add listener for submittal
    document.querySelector("#userInput").focus();
    document.querySelector("form").addEventListener("submit", function(event){
      //when something is submitted, remove all currently displayed messages
      removeErrMsgs()
      //prevent submittal to server, grab in JS and set to userInput
      event.preventDefault();
      var userInput = document.querySelector("#userInput").value;
      document.querySelector("#userInput").value = '';
      //make sure user has selected valid option
      if(userInput > 5 || userInput < 0 || userInput.length>1){
        console.log("false userInput: " + userInput.length)
        errMsg("Enter a number to choose the corresponding option")
      }
      else{
        console.log("userInput: " + userInput)
        //bring up corresponding purchase screen
        switch(userInput){
          case "1":
            buyOxen()
            break;
          case "2":
            buyFood()
            break;
          case "3":
            buyClothing()
            break;
          case "4":
            buyAmmo()
            break;
          case "5":
            buySpareParts()
            break;
        }
      }
    })

  }

  function buyOxen(){
    //remove bill screen
    gameScreen.removeChild(document.querySelector("section"))
    gameScreen.removeChild(document.querySelector("table"))
    gameScreen.removeChild(document.querySelector("p"))
    var oxenAdviceEl = document.createElement("p")
    oxenAdviceEl.innerHTML = `There are two oxen in a yoke; I recommend at least 3 yoke. I charge $${oxenPrice} a yoke. How many would you like?`
    gameScreen.insertBefore(oxenAdviceEl, gameScreen.childNodes[0])

    //remove other event listeners attached to submittal
    var old_element = document.querySelector("form");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    //make sure the input box is selected, then add listener for submittal
    document.querySelector("#userInput").focus();
    document.querySelector("form").addEventListener("submit", function(event){
      //when something is submitted, remove all currently displayed messages
      removeErrMsgs()
      //prevent submittal to server, grab in JS and set to userInput
      event.preventDefault();
      var userInput = document.querySelector("#userInput").value;
      document.querySelector("#userInput").value = '';

      //make sure user entered a number for purchase quantity
      if(!/[0123456789]/.test(userInput)){
        errMsg("Enter a number to continue")
        console.log(typeof userInput)
      }
      else{
        //increment bill and return to purchase screen
        oxenSpent = userInput * oxenPrice;
        removeErrMsgs();
        oxenAdviceEl.parentNode.removeChild(oxenAdviceEl);
        purchaseFirst();
      }
    })
  }
  function buyFood(){
    //remove bill screen
    gameScreen.removeChild(document.querySelector("section"))
    gameScreen.removeChild(document.querySelector("table"))
    gameScreen.removeChild(document.querySelector("p"))
    var foodAdviceEl = document.createElement("p")
    foodAdviceEl.innerHTML = `I recommend you take at least 200 pounds of food for each person in your family. You'll want flour, sugar, bacon, and coffe. I charge $${foodPrice} a pound. <br> How many pounds of food do you want?`
    gameScreen.insertBefore(foodAdviceEl, gameScreen.childNodes[0])

    //remove other event listeners attached to submittal
    var old_element = document.querySelector("form");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    //make sure the input box is selected, then add listener for submittal
    document.querySelector("#userInput").focus();
    document.querySelector("form").addEventListener("submit", function(event){
      //when something is submitted, remove all currently displayed messages
      removeErrMsgs()
      //prevent submittal to server, grab in JS and set to userInput
      event.preventDefault();
      var userInput = document.querySelector("#userInput").value;
      document.querySelector("#userInput").value = '';

      //make sure user entered a number for purchase quantity
      if(!/[0123456789]/.test(userInput)){
        errMsg("Enter a number to continue")
        console.log(typeof userInput)
      }
      else{
        //increment bill and return to purchase screen
        foodSpent = userInput * foodPrice;
        removeErrMsgs();
        foodAdviceEl.parentNode.removeChild(foodAdviceEl);
        purchaseFirst();
      }
    })
  }
  function buyClothing(){
    //remove bill screen
    gameScreen.removeChild(document.querySelector("section"))
    gameScreen.removeChild(document.querySelector("table"))
    gameScreen.removeChild(document.querySelector("p"))
    var clothesAdviceEl = document.createElement("p")
    clothesAdviceEl.innerHTML = ``
    gameScreen.insertBefore(clothesAdviceEl, gameScreen.childNodes[0])

    //remove other event listeners attached to submittal
    var old_element = document.querySelector("form");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    //make sure the input box is selected, then add listener for submittal
    document.querySelector("#userInput").focus();
    document.querySelector("form").addEventListener("submit", function(event){
      //when something is submitted, remove all currently displayed messages
      removeErrMsgs()
      //prevent submittal to server, grab in JS and set to userInput
      event.preventDefault();
      var userInput = document.querySelector("#userInput").value;
      document.querySelector("#userInput").value = '';

      //make sure user entered a number for purchase quantity
      if(!/[0123456789]/.test(userInput)){
        errMsg("Enter a number to continue")
        console.log(typeof userInput)
      }
      else{
        //increment bill and return to purchase screen
        clothesSpent = userInput * clothesPrice;
        removeErrMsgs();
        clothesAdviceEl.parentNode.removeChild(clothesAdviceEl);
        purchaseFirst();
      }
    })
  }
  function buyAmmo(){
    //remove bill screen
    gameScreen.removeChild(document.querySelector("section"))
    gameScreen.removeChild(document.querySelector("table"))
    gameScreen.removeChild(document.querySelector("p"))
    var ammoAdviceEl = document.createElement("p")
    ammoAdviceEl.innerHTML = ``
    gameScreen.insertBefore(ammoAdviceEl, gameScreen.childNodes[0])

    //remove other event listeners attached to submittal
    var old_element = document.querySelector("form");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    //make sure the input box is selected, then add listener for submittal
    document.querySelector("#userInput").focus();
    document.querySelector("form").addEventListener("submit", function(event){
      //when something is submitted, remove all currently displayed messages
      removeErrMsgs()
      //prevent submittal to server, grab in JS and set to userInput
      event.preventDefault();
      var userInput = document.querySelector("#userInput").value;
      document.querySelector("#userInput").value = '';

      //make sure user entered a number for purchase quantity
      if(!/[0123456789]/.test(userInput)){
        errMsg("Enter a number to continue")
        console.log(typeof userInput)
      }
      else{
        //increment bill and return to purchase screen
        ammoSpent = userInput * ammoPrice;
        removeErrMsgs();
        ammoAdviceEl.parentNode.removeChild(ammoAdviceEl);
        purchaseFirst();
      }
    })
  }
  function buySpareParts(){
    //remove bill screen
    gameScreen.removeChild(document.querySelector("section"))
    gameScreen.removeChild(document.querySelector("table"))
    gameScreen.removeChild(document.querySelector("p"))
    var sparePartsAdviceEl = document.createElement("p")
    sparePartsAdviceEl.innerHTML = ``
    gameScreen.insertBefore(sparePartsAdviceEl, gameScreen.childNodes[0])

    //remove other event listeners attached to submittal
    var old_element = document.querySelector("form");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    //make sure the input box is selected, then add listener for submittal
    document.querySelector("#userInput").focus();
    document.querySelector("form").addEventListener("submit", function(event){
      //when something is submitted, remove all currently displayed messages
      removeErrMsgs()
      //prevent submittal to server, grab in JS and set to userInput
      event.preventDefault();
      var userInput = document.querySelector("#userInput").value;
      document.querySelector("#userInput").value = '';

      //make sure user entered a number for purchase quantity
      if(!/[0123456789]/.test(userInput)){
        errMsg("Enter a number to continue")
        console.log(typeof userInput)
      }
      else{
        //increment bill and return to purchase screen
        sparePartsSpent = userInput * sparePartsPrice;
        removeErrMsgs();
        sparePartsAdviceEl.parentNode.removeChild(sparePartsAdviceEl);
        purchaseFirst();
      }
    })
  }


  //end of DOMContentLoaded
})
