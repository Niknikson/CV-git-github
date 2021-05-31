var currentStep = 0;
showTab(currentStep);

function showStep(n) {
  let step = document.getElementsByClassName("step");
  step[n].classList.add("active");
  StepIndicator(n);
}

function nextPrev(n) {
  let navStep = document.getElementsByClassName("nav__step");
  let step = document.getElementsByClassName("step");
  if (n == 1 && !validate()) return false;
  step[currentStep].classList.remove("active");
  navStep[currentStep].classList.remove("active");
  currentStep = currentStep + n;
  showStep(currentStep);
}

function validate() {
  let step,
    input,
    i,
    valid = true;
  step = document.getElementsByClassName("step");
  input = step[currentStep].getElementsByTagName("input");
  for (i = 0; i < input.length; i++) {
    if (input[i].value == "") {
      input[i].style.borderBottomColor = "#e74c3c";
      valid = false;
    }
  }
  return valid;
}

function requiredField(input) {
  if (input.value.length < 1) {
    input.style.borderBottomColor = "red";
  } else if (input.type == "email") {
    console.log("email");
    if (input.value.indexOf("@") != -1 && input.value.indexOf(".") != -1) {
      input.style.borderBottomColor = "#3580aa";
    } else {
      input.style.borderBottomColor = "red";
    }
  } else {
    input.style.borderBottomColor = "#3580aa";
  }
}

function StepIndicator(n) {
  let navStep = document.getElementsByClassName("nav__step");
  navStep[n].classList.add("active");
}



function createInput(element) {
  let addInput = document.getElementById("afterAddInput");
  let removeInput = document.getElementById("removeInput");

  element.value >= 1 ? addanother(addInput) : addUkrain(addInput);

  remove(removeInput);

  function remove(removeInput) {
    if (removeInput.parentNode) {
      removeInput.parentNode.removeChild(removeInput);
    }
  }
  function addanother(addInput) {
    addInput.insertAdjacentHTML(
      "afterend",
      `<div class="input__top" id="removeInput" data-top="City">
        <input type="text" placeholder="" onblur="requiredField(this)" required/>
      </div>`
    );
  }
  function addUkrain(addInput) {
    addInput.insertAdjacentHTML(
      "afterend",
      `<div autocomplete="off" id="removeInput">
        <div class="autocomplete" >
           <div class="input__top" data-top="City of Ukrain"  >
              <input id="myInput" type="text" name="myCountry" placeholder="" onblur="requiredField(this)" required/>
            </div> 
        </div>
      </div>`
    );
  }
}


function updateName() {
  document.getElementById("nameHolderText").innerText =
    document.getElementById("nameInput").value;
}

function updateNumber() {
  if (document.getElementById("namberInput").value.length <= 16) {
    document.getElementById("namberHolderText").innerText =
      document.getElementById("namberInput").value;
  } else {
    document.getElementById("namberInput").style.borderBottomColor = "red";
  }
  // document.getElementById("namberHolderText").innerText =
  //   document.getElementById("namberInput").value;
}

function updateDate() {
  document.getElementById("dateHolderText").innerText =
    document.getElementById("dateInput").value;
}



// autocomplete
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
var countries = [
  "Вінницька",
  "Волинська",
  "Дніпропетровська",
  "Донецька",
  "Житомирська",
  "Закарпатська",
  "Запорізька",
  "Івано-Франківськ",
  "Київська",
  "Кіровоградська",
  "Луганська",
  "Львівська",
  "Миколаївська",
  "Одеська",
  "Полтавська",
  "Рівненська",
  "Сумська",
  "Тернопільська",
  "Харківська",
  "Херсонська",
  "Хмельницька",
  "Черкаська",
  "Чернівецька",
  "Чернігівська",
  "Київ",
  "Севастополь",
];
autocomplete(document.getElementById("myInput"), countries);


