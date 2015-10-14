(function(){
  var searchCriteriaObj  = new SearchCriteria(
      {
        state: "addedforverification"
      },
      {
        ponumber: "search-ponumber",
        supplier: "search-supplier",
        deliverychallan: "search-deliverychallan",
        serialno: "search-serialno"
      });

  Template.verifyAsset.onCreated(function() {
    this.searchCriteria = new ReactiveVar(searchCriteriaObj.buildSearchCriteria());
    this.returnedAssets = new ReactiveVar([]);
    
    this.returnedAssets = getReturnedAssets();
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
    },
    returnedAssets: function(){
    	return getReturnedAssets();
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
    },
    'click #return-btn' :function(event){
      event.preventDefault();
      var comment = $('.open textarea#comment').val();
      if(!comment){
        alert('Comment cannot be empty!');
      }else{
        Meteor.call("returnAssetToVendor", this._id, null, comment);
      }
    },
    "click .verify-returned-asset": function(event,template){
    	var user = Meteor.user();
    	Meteor.call("finalizeReturn",this.inventory_id,user.profile.empId,function(err,result){
    		getReturnedAssets();
    	});
    }
  });
  
  function getReturnedAssets(){
	  var returnedRequests = [];
      Inventory.find({"assetstate":"giventosecurity"}).forEach(function(inventory,index){
        var asset = AssetsDetails.findOne({"_id":inventory.asset_id});
        var AssetsProcuredItem = AssetsProcured.findOne({"asset_id":inventory.asset_id});
        
        
    	  returnedRequests.push({
    		inventory_id: inventory._id,
          srno: index + 1,
          ponumber: AssetsProcuredItem.ponumber,
          supplier: AssetsProcuredItem.supplier,
          deliverychallan: AssetsProcuredItem.deliverychallan,
          serialno: asset.serialno,
          description: asset.make + " " + asset.model
    	  });
      });
      
      return returnedRequests;
  }
})();
