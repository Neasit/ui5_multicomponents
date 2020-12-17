sap.ui.define(['app/child/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.child.controller.NotFound', {
    /**
     * Navigates to the masterPR when the link is pressed
     * @public
     */
    onLinkPressed: function() {
      this.getRouter().navTo('StartPage');
    },
  });
});
