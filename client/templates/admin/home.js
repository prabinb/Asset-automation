Template.adminHome.onCreated(function () {
  Meteor.subscribe("assetsProcured");
  Meteor.subscribe("assetsDetails");
  Meteor.subscribe("inventory");
});

Template.adminHome.helpers({
    tabs: [{
      header: "Stock",
      url: "#stockTab"
    },{
      header: "Verify Asset",
      url: "#verifyAssetTab"
    },{
      header: "Verify Asset Allocation",
      url: "#verifyAssetAllocationTab"
    },{
      header: "Asset in use",
      url: "#assetUsageTab"
    },{
      header: "Decomission Asset",
      url: "#decomissionAssetTab"
    }]
});
