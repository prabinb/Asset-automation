var Asset = new Mongo.Collection("asset");

var AssetObj = function(options){
  this._id = options._id;
  this.type = options.type;
  this.make = options.make;
  this.model = options.model;
  this.serialno = options.serialno;
}

Meteor.methods({
  addInAsset:function(assetObj,assetProcuredObj,remaining_qty,userId){
     // adding the asset object in DB
     var assetId = AssetsDetails.insert(assetObj);

     //asset Id is taken and a reference is made in the assetProcured object
     assetProcuredObj.asset_id =  assetId;

     // insert the assetProcured
     var assetProcuredId = AssetsProcured.insert(assetProcuredObj);

     // update the remaining quantity in po
     var updatePO = ProcurementOrder.update({"ponumber":assetProcuredObj.ponumber},{"$set":{"remaining_qty":remaining_qty}});

     //update in history
     History.insert({
       "asset_id": assetProcuredId,
       "date": new Date(),
       "action_taken_by": "security",
       "emp_id": userId,
       "comments": "added in asset by security"
     });

     console.log("updatePO"+updatePO);

     var result = {
       "statusMsg" : "Added in asset with id "+assetId+ " Added in asset procured with id "+assetProcuredId
     }

     return result;
  },
  findAvailableAssetsByType: function(type){
    var results = [];
    AssetsDetails.find({"type":type}).forEach(function(asset,index){
      //console.log(index,asset);
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
  assignAssetToEmployee: function(empid,inventory_id,userId){
	var asset = Inventory.findOne({_id:inventory_id});
    var assigned = Inventory.update({"_id": inventory_id}, {"$set": {"empid": empid,"assetstate": "Security"}});

     //update in history
     History.insert({
       "asset_id": asset.asset_id,
       "date": new Date(),
       "action_taken_by": "security",
       "emp_id": userId,
       "comments": "assigned asset to employee"
     });

    if(assigned){
      return {"statusMsg":"Assigned asset to employee "+empid+" successfully","statusCode":200}
    }else{
      return {"statusMsg":"there is some error. Please try again","statusCode":500}
    }
  },
  searchAssetsByEmployee: function(empid){
    var assetsOfEmployee = [];
    Inventory.find({"empid":empid,"assetstate":"Allocated"}).forEach(function(asset,index){
      var res = AssetsDetails.findOne({"_id":asset.asset_id});

      res.inventory_id = asset._id;
      if(res){
        assetsOfEmployee.push(res);
      }
    });

    return assetsOfEmployee;
  },
  deallocateAsset: function(inventory_id,userId){
	var asset = Inventory.find({"_id":inventory_id});
    var res = Inventory.update({"_id":inventory_id},{"$set": {"empid": null,"assetstate": "Inventory"}});
    if(res){
      return {"statusMsg":"Item deallocated successfully"};
    }else{
      return {"statusMsg":"There was some error. Please try again"};
    }
    
  //update in history
    History.insert({
      "asset_id": asset.asset_id,
      "date": new Date(),
      "action_taken_by": "security",
      "emp_id": userId,
      "comments": "asset taken from employee"
    });
  },
  getMarkedAssets: function(){
	  var markedAssets = [];
	  Inventory.find({"assetstate":"markedforallocation"}).forEach(function(asset,index){
	      var res = AssetsDetails.findOne({"_id":asset.asset_id});
	      res.inventory_id = asset._id;
	      res.empid = asset.empid;
	      if(res){
	    	  markedAssets.push(res);
	      }
	    });
	  return markedAssets;
  },
  assignAssetBySecurity: function(inventory_id,userId){
	  var asset = Inventory.findOne({_id:inventory_id});
	  var assetId = asset.asset_id;
	    
	  Inventory.update({_id:inventory_id},{$set:{
		assetstate: "giventoemployee"
	  }});
	
	
	
	//update in history
    History.insert({
      "asset_id": assetId,
      "date": new Date(),
      "action_taken_by": "security",
      "emp_id": userId,
      "comments": "asset given to employee"
    });
  },
  getAssetsToBeConfirmed : function(empid){
	  var toBeConfirmed = [];
	  Inventory.find({"assetstate":"giventoemployee","empid":empid}).forEach(function(asset,index){
		  var res = AssetsDetails.findOne({"_id":asset.asset_id});
	      res.inventory_id = asset._id;
	      if(res){
	    	  toBeConfirmed.push(res);
	      }
	  });
	  
	  return toBeConfirmed;
  },
  acknowledgeAsset : function(inventory_id,userId){
	  var asset = Inventory.findOne({_id:inventory_id});
	  var assetId = asset.asset_id;
	    
	  Inventory.update({_id:inventory_id},{$set:{
		assetstate: "acknowledgedbyemployee"
	  }});
	
	
	
	//update in history
    History.insert({
      "asset_id": assetId,
      "date": new Date(),
      "action_taken_by": "employee",
      "emp_id": userId,
      "comments": "asset acknowledged by employee"
    });
  },
  getAssetsOfEmployee: function(empid){
	  var assets = [];
	  Inventory.find({"assetstate":"acknowledgedbyemployee","empid":empid}).forEach(function(asset,index){
		  var res = AssetsDetails.findOne({"_id":asset.asset_id});
	      res.inventory_id = asset._id;
	      if(res){
	    	  assets.push(res);
	      }
	  });
	  
	  return assets;
  },
  fetchHistory: function(assetId){
	  var history = [];
	  History.find({"asset_id":assetId}).forEach(function(historyItem,index){
		  historyItem.index = index+1;
		  history.push(historyItem);
	  });
	  
	  return history;
  },
  returnToSecurity: function(inventory_id,userId){
	  var asset = Inventory.find({"_id":inventory_id});
	  Inventory.update({"_id":inventory_id},{"$set": {"assetstate": "giventosecurity"}});
	    
	  //update in history
	    History.insert({
	      "asset_id": asset.asset_id,
	      "date": new Date(),
	      "action_taken_by": "security",
	      "emp_id": userId,
	      "comments": "asset given to security"
	    });
  },
  finalizeReturn: function(inventory_id,userId){
	  var asset = Inventory.find({"_id":inventory_id});
	  Inventory.update({"_id":inventory_id},{"$set": {"assetstate": "Inventory","empid":null}});
	    
	  //update in history
	    History.insert({
	      "asset_id": asset.asset_id,
	      "date": new Date(),
	      "action_taken_by": "admin",
	      "emp_id": userId,
	      "comments": "asset returned to inventory"
	    });
  }
});
