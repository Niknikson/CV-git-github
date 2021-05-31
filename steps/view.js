
(function () {
class View {
  constructor() {
    this.navBtnLights = document.querySelectorAll(".navbtn__step");
    this.allInputsOrder = document.querySelectorAll(".inputs__ditails");
    this.allInputsPayment = document.querySelectorAll(".inputs__payment");
    // card
    this.cvvInput = document.querySelector("#cvvInput");
    this.holderNameText = document.querySelector("#holderNameText");
    this.cardNumberText = document.querySelector("#cardNumberText");
    this.cardValidText = document.querySelector("#cardValidText");
    this.masterLogo = document.querySelector("#masterLogo");
    this.visaLogo = document.querySelector("#visaLogo");
    this.btnPay = document.querySelector("#btnPay");
    //
    this.nextBtn = document.querySelector("#next");
    this.contentBody = document.querySelector("#content_body");
    this.prevtBtn = document.querySelector("#back");
    this.selectCountry = document.querySelector("#selectCountry");
    this.inputAutocomplited = document.querySelector("#inputAutocomplited");
    this.listItems = document.querySelector("#listItems");
    // step
    this.steps = document.querySelectorAll(".step");
    this.navSteps = document.querySelectorAll(".navbtn__step");
    this.curentStep = 0;
  }
  displayListItems(items) {
    let list = this.listItems;
    items.forEach((item) => {
      list.insertAdjacentHTML(
        "afterend",
        `<div class="items__content">
            <div class="order__img">${item.img}</div>
            <div class="order__text">${item.about}</div>
            <div class="order__quantity">${item.qun}</div>
            <div class="order__price">${item.price}</div>
          </div>`
      );
    });
  }
  getAllInputs(id) {
    let res = id.getElementsByTagName("input");
    return res;
  }
  hideNavStepsLight() {
    this.navSteps.forEach((navStep) => {
      navStep.classList.remove("active");
    });
  }
  hideSteps() {
    this.steps.forEach((step) => {
      step.classList.remove("active");
    });
  }
  setNavStepLigth(curentStep) {
    this.navSteps[curentStep].removeAttribute("disabled");
    this.navSteps[curentStep].classList.add("active");
  }
  showStep(curentStep) {
    this.steps[curentStep].classList.add("active");
  }
  showBtn(curentStep) {
    this.prevtBtn.style.visibility = "hidden";
    this.nextBtn.style.visibility = "hidden";
    if (curentStep === 0) {
      this.nextBtn.style.visibility = "visible";
    } else if (curentStep === 1) {
      this.prevtBtn.style.visibility = "visible";
      this.nextBtn.style.visibility = "visible";
    } else if (curentStep === 2) {
      this.prevtBtn.style.visibility = "visible";
    }
  }
  showLogoCard(firsNumber) {
    this.visaLogo.style.display = "none";
    this.masterLogo.style.display = "none";
    if (firsNumber === "5") {
      this.masterLogo.style.display = "block";
    } else if (firsNumber === "4") {
      this.visaLogo.style.display = "block";
    }
  }
  disablAllNav() {
    this.navSteps.forEach((step) => step.setAttribute("disabled", "disabled"));
  }
  showTextONCard(id, value) {
    if (id === "holderNameInput") {
      this.holderNameText.innerText = value;
    } else if (id === "cardNumerInput") {
      this.showLogoCard(value[0]);
      this.cardNumberText.innerText = value
        .replace(/\d{4}(?=.)/g, "$& ")
        .substring(0, 19);
    } else if (id === "dateInput") {
      this.cardValidText.innerText = value
        .replace(/\d{2}(?=.)/g, "$&/")
        .substring(0, 5);
    }
  }
  validation(input) {
    let valid = true;
    if (input.value == "") {
      input.style.borderBottomColor = "#e74c3c";
      valid = false;
    } else {
      input.style.borderBottomColor = "#3081ac";
    }
    return valid;
  }
  createInputCountry(value) {
    let inputCityOfUkrain = `<div autocomplete="off" class="autocomplete" >
                                                <input id="myInput" type="text" name="myCountry" placeholder="Ukrain" >
                                            </div>`;
    let inputCityOfCountry = `<input id="myInput" type="text" name="myCountry" />`;
    this.inputAutocomplited.firstElementChild.remove();

    value === "Ukrain"
      ? this.inputAutocomplited.insertAdjacentHTML(
          "afterBegin",
          inputCityOfUkrain
        )
      : this.inputAutocomplited.insertAdjacentHTML(
          "afterBegin",
          inputCityOfCountry
        );

     value === "Ukrain"
      ? autocomplete()
      : null;
  }
}

  window.app = window.app || {};
  window.app.View = View;
})();