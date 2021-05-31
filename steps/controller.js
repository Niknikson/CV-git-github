
(function () {

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    

    this.onItemsListChanged(this.model.items);
  }
  onItemsListChanged = (items) => {
    this.view.displayListItems(items);
  };

  switchClikedBtnNav(id) {
    if (id == "navStep1") {
      this.getStep(0);
      this.view.curentStep = 0;
    } else if (id == "navStep2") {
      this.getStep(1);
      this.view.curentStep = 1;
    } else if (id == "navStep3") {
      this.getStep(2);
      this.view.curentStep = 2;
    } else if (id == "navStep4") {
      this.getStep(3);
      this.view.curentStep = 3;
    }
  }
  getStep(curentStep) {
    this.view.hideNavStepsLight();
    this.view.hideSteps();
    this.view.setNavStepLigth(curentStep);
    this.view.showStep(curentStep);
    this.view.showBtn(curentStep);
  }
  getPrevStep() {
    let curentStep =
      this.view.curentStep > 0 ? --this.view.curentStep : this.view.curentStep;
    if (curentStep >= 0) {
      this.getStep(curentStep);
    }
  }
  getNextStep() {
    if (this.isValidateStep(this.view.curentStep)) {
      let curentStep =
        this.view.curentStep < 4
          ? ++this.view.curentStep
          : this.view.curentStep;
      if (curentStep <= 4) {
        this.getStep(curentStep);
      }
    }
    return false;
  }
  isValidateStep(curentStep) {
    let inputs = this.view.getAllInputs(this.view.steps[curentStep]);
    let valid = true;
    let input;
    for (input of inputs) {
      if (this.view.validation(input) == false) {
        valid = false;
      }
    }

    return valid;
  }

  bindEvents() {
    this.view.selectCountry.addEventListener("change", (e) => {
      let value = e.target.value;
      this.view.createInputCountry(value);
    });
    this.view.btnPay.addEventListener("click", (e) => {
      e.preventDefault();
      this.getNextStep() ? this.view.disablAllNav() : null;
    });
    this.view.nextBtn.addEventListener("click", () => {
      this.getNextStep();
    });
    this.view.prevtBtn.addEventListener("click", () => {
      this.getPrevStep();
    });

    this.view.allInputsOrder.forEach((item) =>
      item.addEventListener("blur", (e) => {
        this.view.validation(e.target);
      })
    );
    this.view.allInputsPayment.forEach((item) =>
      item.addEventListener("blur", (e) => {
        this.view.validation(e.target);
      })
    );
    this.view.navBtnLights.forEach((item) =>
      item.addEventListener("click", (e) => {
        let id = item.id;
        this.switchClikedBtnNav(id);
      })
    );
    this.view.allInputsPayment.forEach((item) =>
      item.addEventListener("input", (e) => {
        let value = e.target.value;
        let id = item.id;
        this.view.validation(e.target);
        this.view.showTextONCard(id, value);
      })
    );
  }

  init() {
    this.bindEvents();
  }
}

  window.app = window.app || {};
  window.app.Controller = Controller;
})();