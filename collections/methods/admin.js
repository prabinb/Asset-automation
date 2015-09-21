Meteor.methods({
  verifyAssetVerificationRequests: function (assetProcuredIds) {
    assetProcuredIds.forEach(function(procuredId){
      var assetProcuredItem = AssetsProcured.findOne({_id: procuredId});
      var assetId = assetProcuredItem.asset_id;
      var inventory = {
        "asset_id": assetId,
        "assetdetails": null,
        "empid": null,
        "assetstate": "Inventory"
      };
      Inventory.insert(inventory);
      // update approve status
      AssetsProcured.update({_id: procuredId},{$set: {"verified": true}});
    });
  },
  verifyAssetAllocationRequests: function(inventoryIds){
    inventoryIds.forEach(function(inventoryId){
      Inventory.update({_id: inventoryId},{$set: {
        assetstate: "Allocated"
      }});
    });
  },
  assetDecommission: function(inventoryId){
    Inventory.update({_id: inventoryId},{$set: {
      assetstate: "Decommissioned"
    }});
  }
});
