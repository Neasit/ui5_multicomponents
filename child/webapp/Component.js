sap.ui.define(['sap/ui/core/UIComponent'], function(UIComponent) {
  'use strict';

  return UIComponent.extend('app.child.Component', {
    metadata: {
      manifest: 'json',
      properties: {
        number: { type: 'string', defaultValue: null },
        showDetails: { type: 'boolean', defaultValue: false },
        standAlone: { type: 'boolean', defaultValue: true },
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

      if (oData.number) {
        this.setNumber(oData.number);
      }
      if (oData.showDetails) {
        this.setShowDetails(oData.showDetails);
      }
      if (typeof oData.standAlone === 'boolean') {
        this.setStandAlone(oData.standAlone);
      }

      this.getRouter().initialize();

      if (!this.bStandAlone) {
        this.getRouter()
          .getRoute('StartPage')
          .attachPatternMatched(
            function() {
              if (this.getShowDetails()) {
                this.navigateDetails();
                this.setShowDetails(false);
              }
            }.bind(this)
          );
      }
      if (this.getShowDetails()) {
        this.navigateDetails();
        this.setShowDetails(false);
      }
    },

    navigateDetails: function() {
      this.getRouter().navTo('Details', { number: this.getNumber() });
    },
  });
});
