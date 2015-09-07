var Asset = new Mongo.Collection("asset");

var AssetObj = function(options){
  this._id = options._id;
  this.type = options.type;
  this.make = options.make;
  this.model = options.model;
  this.serialno = options.serialno;
}

Meteor.methods({
  addInAsset:function(obj,serialnumber){
     var id = AssetsDetails.insert(obj);

     var result = {
       statusMsg : "Asset added successfully",
       asset_id : id
     };
     return result;
  },
  addInAssetProcured: function(obj){
    var id = AssetsProcured.insert(obj);

    return {
      "statusMsg": "Added in procured assets successfully",
      "procured_asset_id":id
    }

    console.log(id);
  }
});
