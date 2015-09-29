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

      //update in history
      History.insert({
        "asset_id": assetId,
        "date": new Date(),
        "owner": "admin",
        "emp_id": null,
        "comments": "verified asset"
      });

    });
  },
  verifyAssetAllocationRequests: function(inventoryIds){
    inventoryIds.forEach(function(inventoryId){
      Inventory.update({_id: inventoryId},{$set: {
        assetstate: "Allocated"
      }});


      var asset = Inventory.findOne({_id:inventoryId});
      var assetId = asset._id;
      //update in history
      History.insert({
        "asset_id": assetId,
        "date": new Date(),
        "owner": "admin",
        "emp_id": asset.empid,
        "comments": "verified asset allocation"
      });

    });
  },
  assetDecommission: function(inventoryId){
    Inventory.update({_id: inventoryId},{$set: {
      assetstate: "Decommissioned"
    }});

    var asset = Inventory.findOne({_id:inventoryId});
    var assetId = asset.id;
    //update in history
    History.insert({
      "asset_id": assetId,
      "date": new Date(),
      "owner": "admin",
      "emp_id": null,
      "comments": "decommissioned asset"
    });
  }
});
