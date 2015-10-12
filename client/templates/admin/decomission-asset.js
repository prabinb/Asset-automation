(function(){
  var searchCriteriaObj  = new SearchCriteria(
    {
      assetstate: 'Decommissioned'
    },
    {
      type: "decommissioned-search-type",
      make: "decommissioned-search-make",
      model: "decommissioned-search-model",
      serialno: "decommissioned-search-serialno"
    });

    Template.decomissionAsset.onCreated(function() {
      this.searchCriteria = new ReactiveVar(searchCriteriaObj.buildSearchCriteria());
    });

    Template.decomissionAsset.helpers({
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
              serialno: asset.serialno
             // assetdetails: inventoryItem.assetdetails
            });
          }
        });
        return stock;
      }
    });

    Template.decomissionAsset.events = {
      'input .search-text': function(){
        Template.instance().searchCriteria.set(searchCriteriaObj.buildSearchCriteria());
      }
    };
  })();
