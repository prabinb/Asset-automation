Template.adminHome.onCreated(function () {
    Meteor.subscribe("assetsProcured");
    Meteor.subscribe("assetsDetails");
    Meteor.subscribe("inventory");
});

Template.adminHome.helpers({
    tabs: [{
        header: "Stock",
        url: "#stockTab",
        class: "active"
    },{
        header: "Verify Asset",
        url: "#verifyAssetTab",
        class: ""
    },{
        header: "Verify Asset Allocation",
        url: "#verifyAssetAllocationTab",
        class: ""
    },{
        header: "Asset in use",
        url: "#assetUsageTab",
        class: ""
    },{
        header: "Decomission Asset",
        url: "#decomissionAssetTab",
        class: ""
    }]
});
