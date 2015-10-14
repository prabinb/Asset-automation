(function(){
  var searchCriteriaObj  = new SearchCriteria(
    {
      assetstate: 'Inventory'
    },
    {
      type: "stock-search-type",
      make: "stock-search-make",
      model: "stock-search-model",
      serialno: "stock-search-serialno"
    });

    Template.stock.onCreated(function() {
      this.searchCriteria = new ReactiveVar(searchCriteriaObj.buildSearchCriteria());
      this.disableConfirmAllocate = new ReactiveVar(true);
      this.selectedInventoryId = new ReactiveVar(null);
      this.showHistory = new ReactiveVar(false);
    });

    Template.stock.helpers({
      assets: function(){
        var stock = [];
        var searchCriteria = Template.instance().searchCriteria.get();
        var options = {
          limit: itemsPerPage
        };
        Inventory.find(searchCriteria.inventory, options).forEach(function(inventoryItem, index){
          searchCriteria.assets["_id"] = inventoryItem.asset_id;
          var asset = AssetsDetails.findOne(searchCriteria.assets);
          if(asset){
            stock.push({
              _id: inventoryItem._id,
              srno: index + 1,
              type: asset.type,
              make: asset.make,
              model:asset.model,
              serialno: asset.serialno,
              assetdetails: inventoryItem.assetdetails,
              asset_id: inventoryItem.asset_id
            });
          }
        });
        return stock;
      },
      disableConfirmAllocate: function(){
    	  return Template.instance().disableConfirmAllocate.get();
      },
      selectedInventoryId: function(){
    	  return Template.instance().selectedInventoryId.get();
      },
      showHistory: function(){
    	  return Template.instance().showHistory.get();
      }
    });

    Template.stock.events = {
      'input .search-text': function(){
        Template.instance().searchCriteria.set(searchCriteriaObj.buildSearchCriteria());
      },
      'click .btn-decommission': function(){
    	var user = Meteor.user();
        Meteor.call("assetDecommission", this._id,user.profile.empId);
      },
      'click .btn-allocate': function(event,template){
        var user = Meteor.user();
        var allocatedToUser = $("#allocateEmpId").val();
        console.log(allocatedToUser);
    	Meteor.call("assetAllocationToEmp",template.selectedInventoryId.get(),allocatedToUser, user.profile.empId,function(err,result){
    		console.log(result);
    	});
      },
      'keyup #allocateEmpId': function(event,template){
    	  if(event.target.value){
    		  template.disableConfirmAllocate.set(false);
    	  }else{
    		  template.disableConfirmAllocate.set(true);
    	  }
      },
      "click .open-allocate-modal": function(event,template){
    	  template.selectedInventoryId.set(this._id);
      },
      "click .open-history": function(event, template){
    	  var assetId = this.asset_id;
    	  Session.set("assetForHistory",assetId);
    	  template.showHistory.set(true);
    	  
    	  console.log(assetId);
      }
    };
  })();
