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

      this.oChildComponents = {};
      this.getRouter()
        .getViews()
        .attachEvent('created', this.onViewCreated, this);
      this.getRouter().attachBeforeRouteMatched(this.onBeforeAllMatched, this);
    },

    onBeforeAllMatched: function(oEvent) {
      const sName = oEvent.getParameter('name');
      const oArguments = oEvent.getParameter('arguments');
      let oComponent;
      switch (sName) {
        case 'Child':
          oComponent = this.getChildComponent('app.child');
          break;
        default:
        // nothing
      }
      if (oComponent && oArguments.page === 'Details') {
        oComponent.setShowDetails(true);
        oComponent.setNumber(1001);
      } else if (oArguments.page === 'Details' && !oComponent) {
        this.bDetails = true;
      }
    },

    onViewCreated: function(oEvent) {
      let sType = oEvent.getParameter('type');
      if (sType === 'Component') {
        let oOptions = oEvent.getParameter('viewOptions');
        let sName = oOptions ? oOptions.name : null;
        if (sName) {
          let oComponent = oEvent.getParameter('view');
          this.setChildComponent(sName, oComponent);
          switch (sName) {
            case 'app.child':
              oComponent.attachEvent('insideNavigation', this.onInsideNavigation.bind(this));
              if (this.bDetails) {
                this.bDetails = false;
                oComponent.setNumber(1001);
                oComponent.navigateDetails();
              }
              break;
            default:
            // oComponent.setLogger(this.getLogger());
          }
        }
      }
    },

    setChildComponent: function(sName, oComponent) {
      this.oChildComponents[sName] = oComponent;
    },

    getChildComponent: function(sName) {
      return this.oChildComponents[sName];
    },

    onInsideNavigation: function(oEvent) {
      const sPage = oEvent.getParameter('name');
      this.getModel('appModel').setCurrentPosition(sPage === 'Main' ? 'Child' : 'ChildDetails');
    },
  });
});
