sap.ui.define(['app/child/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.child.controller.Details', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('Details').attachPatternMatched(this.handleRouteMatched, this);
    },

    handleRouteMatched: function(oEvent) {},

    onBack: function() {
      this.goToPage('StartPage', { page: 'Main'});
      this.getOwnerComponent().fireInsideNavigation({ name: 'Main' });
    },
  });
});
