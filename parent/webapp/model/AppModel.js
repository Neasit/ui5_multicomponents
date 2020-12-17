/**
 * @module app.parent.model.AppModel
 * @description Model wich preset the state of application
 * @augments sap.ui.model.json.JSONModel
 * @todo Write the documentation.
 */
sap.ui.define(['sap/ui/model/json/JSONModel'], function(JSONModel) {
  'use strict';

  return JSONModel.extend('app.parent.model.AppModel', {
    constructor: function(oi18n) {
      JSONModel.prototype.constructor.apply(this, arguments);
      this.oi18n = oi18n;
      this.initData();
    },

    initData: function() {
      var oData = {
        currentPosition: null,
        path: [],
        navigationItems: [
          {
            key: 'StartPage',
            route: 'StartPage',
            arguments: {},
            title: this.oi18n.getText('welcome'),
            icon: 'sap-icon://building',
            enabled: true,
            expanded: false,
            items: [],
          },
          {
            key: 'Child',
            title: this.oi18n.getText('child'),
            route: 'Child',
            arguments: {
              page: 'Main',
            },
            icon: 'sap-icon://employee',
            enabled: true,
            expanded: true,
            items: [
              {
                key: 'ChildDetails',
                route: 'Child',
                arguments: {
                  page: 'Details',
                  number: 1000,
                },
                title: this.oi18n.getText('childDetails'),
                icon: 'sap-icon://account',
                enabled: true,
                expanded: false,
              },
            ],
          },
        ],
      };
      this.setData(oData);
    },

    setCurrentPosition: function(sKey) {
      var oData = this.findItemByKey(
        {
          key: 'root',
          items: this.getProperty('/navigationItems'),
        },
        sKey
      );
      this.setProperty('/path', oData.stack);
      this.setProperty('/currentPosition', $.extend(true, {}, oData.object));
    },

    findItemByKey: function(oData, sKey) {
      var oResult = {
        stack: [],
        object: null,
      };
      if (oData.key === sKey) {
        oResult.object = oData;
        return oResult;
      }
      if (oData.items && oData.items.length) {
        oData.items.some(
          function(item) {
            var oRes = this.findItemByKey(item, sKey);
            if (oRes.object) {
              oResult.object = oRes.object;
              oResult.stack = oRes.stack.concat(oResult.stack);
              return true;
            }
            return false;
          }.bind(this)
        );
      }

      return oResult;
    },
  });
});
