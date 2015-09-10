var Asset = new Mongo.Collection("asset");

var AssetObj = function(options){
  this._id = options._id;
  this.type = options.type;
  this.make = options.make;
  this.model = options.model;
  this.serialno = options.serialno;
}

Meteor.methods({
  addInAsset:function(assetObj,assetProcuredObj,remaining_qty){
     // adding the asset object in DB
     var assetId = AssetsDetails.insert(assetObj);

     //asset Id is taken and a reference is made in the assetProcured object
     assetProcuredObj.asset_id =  assetId;

     // insert the assetProcured
     var assetProcuredId = AssetsProcured.insert(assetProcuredObj);

     // update the remaining quantity in po
     var updatePO = ProcurementOrder.update({"ponumber":assetProcuredObj.ponumber},{"$set":{"remaining_qty":remaining_qty}});

     console.log("updatePO"+updatePO);

     var result = {
       "statusMsg" : "Added in asset with id "+assetId+ " Added in asset procured with id "+assetProcuredId
     }

     return result;
  },
  findAvailableAssetsByType: function(type){
    var results = [];
    AssetsDetails.find({"type":type}).forEach(function(asset,index){
      console.log(index,asset);
      var inventoryAsset = Inventory.findOne({"asset_id":asset._id,"assetstate":"Inventory"})
      console.log(inventoryAsset);
      if(inventoryAsset){
        results.push({"serialno":asset.serialno,"inventory_id":inventoryAsset._id});
      }
    });

    return results;
  },
  getAssetTypes: function(){
    var results = _.uniq(AssetsDetails.find({}, {
                   sort: {"type": 1}, fields: {"type": true}
                   }).fetch().map(function(x) {
                       return x.type;
                   }), true);
    return results;
  },
  assignAssetToEmployee: function(empid,inventory_id){
    var assigned = Inventory.update({"_id": inventory_id}, {"$set": {"empid": empid,"assetstate": "Security"}});
    if(assigned){
      return {"statusMsg":"Assigned asset to employee "+empid+" successfully","statusCode":200}
    }else{
      return {"statusMsg":"there is some error. Please try again","statusCode":500}
    }
  }
});
