sap.ui.define(['app/parent/controller/BaseController'], function(BaseController) {
  'use strict';

  return BaseController.extend('app.parent.controller.ChildContent', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
      this.oRouter.getRoute('Child').attachPatternMatched(this.handleRouteMatched, this);
      this.oChildComponents = {};
    },

    handleRouteMatched: function() {
      this.getView().setBusy(true);
      this.getChildComponent(this.arguments)
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

    getChildComponent: function(oArguments) {
      return new Promise(
        function(resolve, reject) {
          const oParameters = this.getChildComponentParameters(oArguments);
          if (this.oChildComponents[oParameters.name]) {
            this.setComponentProperties(this.oChildComponents[oParameters.name], this.getComponentData(oArguments));
            resolve(this.oChildComponents[oParameters.name]);
          } else {
            this.getOwnerComponent().runAsOwner(() => {
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
            });
          }
        }.bind(this)
      );
    },

    getChildComponentParameters: function(oArguments) {
      return {
        name: 'app.child',
        manifest: true,
        async: true,
        componentData: this.getComponentData(oArguments),
        settings: {},
      };
    },

    getComponentData: function(oArguments) {
      let oData = {};
      if (oArguments.page === 'Details') {
        oData.showDetails = true;
      }
      if (oArguments.number) {
        oData.number = oArguments.number;
      }
      oData.parentArguments = oArguments;
      return oData;
    },

    setComponentProperties: function(oComp, oData) {
      Object.keys(oData).forEach(function(sKey) {
        const sSetter = `set${sKey[0].toUpperCase()}${sKey.slice(1)}`;
        if (sSetter) {
          oComp[sSetter].apply(oComp, [oData[sKey]]);
        }
      });
    },
  });
});
