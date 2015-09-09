(function(){
  var searchCriteriaObj  = new SearchCriteria(
    {
      verified: false
    },
    {
      ponumber: "search-ponumber",
      supplier: "search-supplier",
      deliverychallan: "search-deliverychallan",
      serialno: "search-serialno"
    });

    Template.verifyAsset.onCreated(function() {
      this.searchCriteria = new ReactiveVar(searchCriteriaObj.buildSearchCriteria());
    });

    Template.verifyAsset.helpers({
      assets: function(){
        var verificationRequests = [];
        var searchCriteria = Template.instance().searchCriteria.get();
        var options = {
          limit: itemsPerPage
        };
        AssetsProcured.find(searchCriteria.assets_procured, options).forEach(function(AssetsProcuredItem, index){
          //Get Asset Details
          searchCriteria.assets["_id"] = AssetsProcuredItem.asset_id;
          var asset = AssetsDetails.findOne(searchCriteria.assets);
          if(asset){
            verificationRequests.push({
              _id: AssetsProcuredItem._id,
              srno: index + 1,
              ponumber: AssetsProcuredItem.ponumber,
              supplier: AssetsProcuredItem.supplier,
              deliverychallan: AssetsProcuredItem.deliverychallan,
              serialno: asset.serialno,
              description: asset.make + " " + asset.model
            });
          }
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
      },
      'input .search-text': function(){
        Template.instance().searchCriteria.set(searchCriteriaObj.buildSearchCriteria());
      }
    });
  })();
