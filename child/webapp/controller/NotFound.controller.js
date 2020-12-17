sap.ui.define(['app/example/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.example.controller.NotFound', {
    /**
     * Navigates to the masterPR when the link is pressed
     * @public
     */
    onLinkPressed: function() {
      this.getRouter().navTo('StartPage');
    },
  });
});
