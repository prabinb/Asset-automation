var items = new Mongo.Collection(null);

if (Meteor.isClient) {

  Meteor.startup(function () {
    Session.set('showPOItem',false);
    Session.set('addToAsset',false);
    Session.set('newItemAdded',false);
  });

  Template.securityHome.helpers({
    "tabs":[{
      header: "Asset from vendor",
      url: "#assetFromVendorTab",
      myclass:"active"
    },{
      header: "Asset from employee",
      url: "#assetFromEmployeeTab",
      myclass:""
    },{
      header: "Asset to employee",
      url: "#assetToEmployeeTab",
      myclass:""
    },{
      header: "Move to other location",
      url: "#moveToOtherLocationTab",
      myclass:""
    },
    {
      header: "Procurement Order",
      url: "#procurementOrder",
      myclass:""
    }
  ]});


}
