(function () {
  let model = new window.app.Model();
  let view = new window.app.View();

  let Controller = window.app.Controller;
  let controller = new Controller(model, view);

  controller.init();
})();
