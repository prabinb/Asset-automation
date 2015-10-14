Template.assetUsage.helpers({
  assets: function(){
    var allocationRequests = [];
    Inventory.find({assetstate: 'acknowledgedbyemployee'}).forEach(function(inventoryItem, index){
      var asset = AssetsDetails.findOne({_id: inventoryItem.asset_id});
      if(asset){
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
      }
    });
    return allocationRequests;
  }
});

Template.assetUsage.events({
});
