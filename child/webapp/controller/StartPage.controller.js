sap.ui.define(['app/child/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.child.controller.StartPage', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('StartPage').attachPatternMatched(this.handleRouteMatched, this);
    },

    handleRouteMatched: function(oEvent) {},

    onDetails: function() {
      this.goToPage('Details', { page: 'Details' });
      this.getOwnerComponent().fireInsideNavigation({ name: 'Details' });
    },
  });
});
