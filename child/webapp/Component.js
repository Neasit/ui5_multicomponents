sap.ui.define(['sap/ui/core/UIComponent'], function(UIComponent) {
  'use strict';

  return UIComponent.extend('app.child.Component', {
    metadata: {
      manifest: 'json',
      properties: {
        number: { type: 'string', defaultValue: null },
        showDetails: { type: 'boolean', defaultValue: false },
        parentArguments: { type: 'object', defaultValue: {} },
      },
      events: {
        insideNavigation: {
          parameters: {
            name: { type: 'string' },
          },
        },
      },
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

      if (sap.ui.core.Component.getOwnerComponentFor(this)) {
        this.bStandAlone = false;
      } else {
        this.bStandAlone = true;
      }

      if (oData.parentArguments) {
        this.setParentArguments(oData.parentArguments);
      }
      if (oData.number) {
        this.setNumber(oData.number);
      }
      if (oData.showDetails) {
        this.setShowDetails(oData.showDetails);
      }

      this.getRouter().initialize();

      if (!this.bStandAlone) {
        this.getRouter()
          .getRoute('StartPage')
          .attachPatternMatched(
            function() {
              this.navigate();
            }.bind(this)
          );
      }

      this.navigate();
    },

    createRouteArguments: function(oArguments) {
      if (this.bStandAlone) {
        return oArguments;
      }
      return $.extend(true, this.getParentArguments(), oArguments);
    },

    navigate: function() {
      if (this.getShowDetails()) {
        this.getRouter().navTo('Details', this.createRouteArguments(this.getNumber()));
        this.setShowDetails(false);
      }
    },
  });
});
