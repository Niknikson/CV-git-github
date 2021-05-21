var currentStep = 2;
showTab(currentStep);
function funSelected(selected1, selected2, element) {
  document.getElementById(selected1).style.display = "none";
  document.getElementById(selected2).style.display = "none";
  document.getElementById(selected1).style.display =
    element.value == 0 ? "block" : "none";
  document.getElementById(selected2).style.display =
    element.value > 0 ? "block" : "none";
}
function showTab(n) {
  var step = document.getElementsByClassName("step");
  step[n].classList.add("active");
  StepIndicator(n);
}
function nextPrev(n) {
  var navStep = document.getElementsByClassName("nav__step");
  var step = document.getElementsByClassName("step");
  if (n == 1 && !validate()) return false;
  step[currentStep].classList.remove("active");
  navStep[currentStep].classList.remove("active");
  currentStep = currentStep + n;
  showTab(currentStep);
}
function validate() {
  var step,
    y,
    i,
    valid = true;
  step = document.getElementsByClassName("step");
  input = step[currentStep].getElementsByTagName("input");
  for (i = 0; i < input.length; i++) {
    if (input[i].value == "") {
      input[i].style.borderBottomColor = "red";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentStep].className += " finish";
  }
  return valid;
}
function StepIndicator(n) {
  var navStep = document.getElementsByClassName("nav__step");
  navStep[n].classList.add("active");
}
