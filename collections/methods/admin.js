Meteor.methods({
  getAssetVerificationRequests: function(){
    var verificationRequests = [];
    AssetsProcured.find({verified: false}).forEach(function(AssetsProcuredItem){
      //Get Asset Details
      var asset = AssetsDetails.findOne({_id: AssetsProcuredItem.asset_id});

      verificationRequests.push({
        id: AssetsProcuredItem._id,
        ponumber: AssetsProcuredItem.ponumber,
        supplier: AssetsProcuredItem.supplier,
        deliverychallan: AssetsProcuredItem.deliverychallan,
        serialno: asset.serialno,
        description: asset.make + " " + asset.model
      });
    });
    return verificationRequests;
  },
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
  getAssetsAllocationRequests: function(){
    //var allocationRequests = [];
  }
});
