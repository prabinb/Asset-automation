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
      url: "#assetFromVendorTab"
    },{
      header: "Asset from employee",
      url: "#assetFromEmployeeTab"
    },{
      header: "Asset to employee",
      url: "#assetToEmployeeTab"
    },{
      header: "Move to other location",
      url: "#moveToOtherLocationTab"
    }]});

Template.poItem.events({
  "click .add-to-asset": function(){
    Session.set("addToAsset",true);
    console.log("called poitem event");
  }
});

}
