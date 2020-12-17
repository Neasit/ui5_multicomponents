sap.ui.define(['app/parent/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.parent.controller.App', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
    },

    onSideNavButtonPress: function() {
      var oToolPage = this.byId('idToolPageMain');
      oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
    },

    onItemSelect: function(oEvent) {
      var oItem = oEvent.getParameter('item');
      if (oItem) {
        var oBindingContext = oItem.getBindingContext('appModel');
        var oObject = oBindingContext ? oBindingContext.getObject() : null;
        if (oObject) {
          this.goToPage(oObject.key);
          this.oAppModel.setCurrentPosition(oObject.key);
        }
      }
    },

    onUserPress: function() {
      this.getUserDialog()
        .then(function(oDialog) {
          oDialog.open();
          return oDialog;
        })
        .catch(function(error) {
          this.showMessage(error && error.message ? error.message : 'JS Error!');
        });
    },
  });
});
