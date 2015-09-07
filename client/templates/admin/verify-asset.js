Template.verifyAsset.helpers({
  assets: function(){
    var verificationRequests = [];
    AssetsProcured.find({verified: false}).forEach(function(AssetsProcuredItem, index){
      //Get Asset Details
      var asset = AssetsDetails.findOne({_id: AssetsProcuredItem.asset_id});
      verificationRequests.push({
        _id: AssetsProcuredItem._id,
        srno: index + 1,
        ponumber: AssetsProcuredItem.ponumber,
        supplier: AssetsProcuredItem.supplier,
        deliverychallan: AssetsProcuredItem.deliverychallan,
        serialno: asset.serialno,
        description: asset.make + " " + asset.model
      });
    });
    return verificationRequests;
  }
});

Template.verifyAsset.events({
  'click #btn-verify-assets': function(event, template){
    var assetRequests = template.view.template.__helpers[" assets"]();
    var verifyIds = [];
    assetRequests.forEach(function(assetRequest){
      verifyIds.push(assetRequest._id);
    });
    Meteor.call("verifyAssetVerificationRequests", verifyIds);
  },
  'click .verify-btn' : function(event){
    Meteor.call("verifyAssetVerificationRequests", [this._id]);
  }
});
