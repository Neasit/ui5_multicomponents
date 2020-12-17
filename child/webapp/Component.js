sap.ui.define(['sap/ui/core/UIComponent', 'app/example/model/models'], function(
  UIComponent,
  models,
  KundeModel,
  FilterModel
) {
  'use strict';

  return UIComponent.extend('app.example.Component', {
    metadata: {
      manifest: 'json',
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and
     * calls the init method once.
     * @public
     * @override
     */
    init: function() {
      UIComponent.prototype.init.apply(this, arguments);

      var oData = this.getComponentData() || {};

      this.getRouter().initialize();
    }
  });
});
