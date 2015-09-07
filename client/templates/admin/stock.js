Template.stock.helpers({
  assets: function(){
    var stock = [];
    Inventory.find({assetstate: 'Inventory'}).forEach(function(inventoryItem, index){
      var asset = AssetsDetails.findOne({_id: inventoryItem.asset_id});
      stock.push({
        srno: index + 1,
        type: asset.type,
        make: asset.make,
        model:asset.model,
        serialno: asset.serialno,
        assetdetails: inventoryItem.assetdetails
      });
    });
    return stock;
  }
});

Template.stock.events = {

};
