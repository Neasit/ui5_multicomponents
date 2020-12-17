sap.ui.define(['app/parent/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.parent.controller.StartPage', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
    },
  });
});
