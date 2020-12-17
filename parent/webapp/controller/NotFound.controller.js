sap.ui.define(['app/parent/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.parent.controller.NotFound', {
    /**
     * Navigates to the masterPR when the link is pressed
     * @public
     */
    onLinkPressed: function() {
      this.getRouter().navTo('StartPage');
    },
  });
});
