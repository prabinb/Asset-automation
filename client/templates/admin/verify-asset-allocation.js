Template.verifyAssetAllocation.helpers({
  assets: function(){
    var allocationRequests = [];
    Inventory.find({assetstate: 'Security'}).forEach(function(inventoryItem, index){
      var asset = AssetsDetails.findOne({_id: inventoryItem.asset_id});
      allocationRequests.push({
        _id: inventoryItem._id,
        srno: index + 1,
        type: asset.type,
        make: asset.make,
        model:asset.model,
        serialno: asset.serialno,
        assetdetails: inventoryItem.assetdetails,
        empid: inventoryItem.empid,
        project: "LDAP",
        manager: "LDAP"
      });
    });
    return allocationRequests;
  }
});

Template.verifyAssetAllocation.events({
  'click #btn-verify-allocation': function(event, template){
    var assetAllocationRequests = template.view.template.__helpers[" assets"]();
    var verifyIds = [];
    assetAllocationRequests.forEach(function(assetAllocationRequest){
      verifyIds.push(assetAllocationRequest._id);
    });
    Meteor.call("verifyAssetAllocationRequests", verifyIds);
  },
  'click .verify-allocation-btn' : function(){
    Meteor.call("verifyAssetAllocationRequests", [this._id]);
  }
});
