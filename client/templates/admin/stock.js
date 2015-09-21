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
              assetdetails: inventoryItem.assetdetails
            });
          }
        });
        return stock;
      }
    });

    Template.stock.events = {
      'input .search-text': function(){
        Template.instance().searchCriteria.set(searchCriteriaObj.buildSearchCriteria());
      },
      'click .btn-decommission': function(){
        Meteor.call("assetDecommission", this._id);
      }
    };
  })();
