Meteor.methods({
  verifyAssetVerificationRequests: function (assetProcuredIds,userId) {
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
      AssetsProcured.update({_id: procuredId},{$set: {"state": "addedtoinventory"}});
      
      //update in history
      History.insert({
        "asset_id": assetId,
        "date": new Date(),
        "action_taken_by": "admin",
        "emp_id": userId,
        "comments": "verified asset"
      });

    });
  },
  returnAssetToVendor:function(assetProcuredId, userId, comment){
    var assetProcuredItem = AssetsProcured.findOne({_id: assetProcuredId});
    AssetsProcured.update({_id: assetProcuredId}, {$set:{"state":"markedforreturn", "comment":comment}});
  },
  verifyAssetAllocationRequests: function(inventoryIds,userId){
    inventoryIds.forEach(function(inventoryId){
      Inventory.update({_id: inventoryId},{$set: {
        assetstate: "Allocated"
      }});


      var asset = Inventory.findOne({_id:inventoryId});
      var assetId = asset.asset_id;
      //update in history
      History.insert({
        "asset_id": assetId,
        "date": new Date(),
        "action_taken_by": "admin",
        "emp_id": userId,
        "comments": "verified asset allocation"
      });

    });
  },
  assetDecommission: function(inventoryId,userId){
    Inventory.update({_id: inventoryId},{$set: {
      assetstate: "Decommissioned"
    }});

    var asset = Inventory.findOne({_id:inventoryId});
    var assetId = asset.asset_id;
    //update in history
    History.insert({
      "asset_id": assetId,
      "date": new Date(),
      "action_taken_by": "admin",
      "emp_id": userId,
      "comments": "decommissioned asset"
    });
  }
});
