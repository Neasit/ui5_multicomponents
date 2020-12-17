sap.ui.define(['sap/ui/core/UIComponent', 'app/parent/model/models', 'app/parent/model/AppModel'], function(UIComponent, models, AppModel) {
  'use strict';

  return UIComponent.extend('app.parent.Component', {
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

      this.setModel(models.createDeviceModel(), 'device');

      this.setModel(new AppModel(this.getModel('i18n').getResourceBundle()), 'appModel');

      this.getRouter().initialize();
    },
  });
});
