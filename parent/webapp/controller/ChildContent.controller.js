sap.ui.define(['app/parent/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.parent.controller.ChildContent', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('ChildComponent').attachPatternMatched(this.handleRouteMatched, this);
    },

    handleRouteMatched: function() {
      this.getView().setBusy(true);
      this.getChildComponent(this.arguments.page)
        .then(
          function(oComponent) {
            const oContainer = this.byId('idChildContainer');
            oContainer.setComponent(oComponent);
            this.getView().setBusy(false);
          }.bind(this)
        )
        .catch(error => {
          this.showMessage(error && error.message ? error.message : 'JS Error: Create child component');
          this.getView().setBusy(false);
          // this.goToPage();
        });
    },

    getChildComponent: function(sPage) {
      return new Promise(
        function(resolve, reject) {
          const oParameters = this.getChildComponentParameters(sPage);
          if (!this.oChildComponents[oParameters.name]) {
            this.setComponentProperties(this.oChildComponents[oParameters.name], this.getComponentData(sPage));
            resolve(this.oChildComponents[oParameters.name]);
          } else {
            sap.ui
              .component(oParameters)
              .then(
                function(oComponent) {
                  this.oChildComponents[oParameters.name] = oComponent;
                  resolve(oComponent);
                }.bind(this)
              )
              .catch(function(oError) {
                reject(oError);
              });
          }
        }.bind(this)
      );
    },

    getChildComponentParameters: function(sPage) {
      return {
        name: 'app.child',
        manifest: true,
        async: true,
        componentData: this.getComponentData(sPage),
        settings: {},
      };
    },

    getComponentData: function(sPage) {
      let oData = {};
      if (sPage === 'Details') {
        oData.showDetails = true;
      }
      return oData;
    },

    setComponentProperties: function(oComp, oData) {
      Object.keys(oData).forEach(function(sKey) {
        const sSetter = `set${sKey[0].toUpperCase()}${sKey.slice(1)}`;
        if (sSetter) {
          oComp.apply(oComp, oData[sKey]);
        }
      });
    },
  });
});
