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
  }
});
