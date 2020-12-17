sap.ui.define(
  [
    'app/example/controller/BaseController'
  ],
  function(BaseController) {
    'use strict';

    return BaseController.extend('app.example.controller.StartPage', {
      onInit: function() {
        BaseController.prototype.init.apply(this, arguments);
      },
    });
  }
);
