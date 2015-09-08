if (Meteor.isClient) {

  Template.assetFromVendor.onCreated(function() {
    this.items = new ReactiveVar([]);
    this.newItems = new ReactiveVar([]);
    this.addToAsset = new ReactiveVar(false);
    this.disableAddNewItem = new ReactiveVar(true);
    this.disabledAddToAsset = new ReactiveVar(false);
    this.checkNotEmpty = new ReactiveVar(true);
    this.suggestions = new ReactiveVar([]);
    this.currentPO = new ReactiveVar(null);
  });

  Template.assetFromVendor.helpers({
    "items":function(){
      return Template.instance().items.get();
    },
    "newItems": function(){
      return Template.instance().newItems.get();
    },
    "addToAsset": function(){
      return Template.instance().addToAsset.get();
    },
    "newItemAdded": function(){
      return Template.instance().newItemAdded.get();
    },
    "suggestions": function(){
      return Template.instance().suggestions.get();
    },
    "checkNotEmpty": function(){
      return Template.instance().checkNotEmpty.get();
    },
    "currentPO":function(){
      return Template.instance().currentPO.get();
    },
    "disableAddNewItem": function(){
      return Template.instance().disableAddNewItem.get();
    },
    "disabledAddToAsset": function(){
      return Template.instance().disabledAddToAsset.get();
    }

  });

Template.assetFromVendor.events({
  "keyup #searchPO": function(event,template){
    var val = $("#searchPO").val();

    Meteor.call("searchPO",val,function(error,result){
      template.suggestions.set(result);
    });
  },
  "click .search-po" : function(event,template){
    var value = $("#searchPO").val();
    if(template.currentPO.get() !== value){

      //reset the state of the page
      template.addToAsset.set(false);
      template.newItems.set([]);

      //set the value of current Procurement order
      template.currentPO.set(value);

      Meteor.call("getByPOnumber",value,function(error, result){
        template.items.set(result);

        //change the disabled property of add-to-asset button based on remaining quantity
        if(result[0].remaining_qty > 0){
          template.disabledAddToAsset.set(false);
        }else{
          template.disabledAddToAsset.set(true);
        }
      });
    }
  },
  "click .add-new-item" : function(event,template){

    event.preventDefault();

    var newObj = {};
    newObj.serialno = $("#serialNumber").val();
    newObj.deliverychallan = $("#deliveryChallan").val();


    var items = template.newItems.get();
    var itemsCount = items.length;

    newObj.sNo = itemsCount+1;

    var itemSelected = template.items.get()[0];
    var remaining_qty = itemSelected.remaining_qty;
    newObj.description = itemSelected.make + " " +itemSelected.model;

    items.push(newObj);

    var assetObj = {
      "type": itemSelected.type,
      "make": itemSelected.make,
      "model": itemSelected.model,
      "serialno": newObj.serialno
    };

    var procuredAssetObj = {
      "ponumber" : itemSelected.ponumber,
      "supplier": itemSelected.supplier,
      "deliverychallan": newObj.deliverychallan,
      "comment": "",
      "verified": false
    }

    Meteor.call("addInAsset", assetObj, procuredAssetObj,remaining_qty-1, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log(result);
      }
    });
    template.newItems.set(items);

    $("#serialNumber").val("");
    $("#deliveryChallan").val("");

    var value = $("#searchPO").val();
    
    Meteor.call("getByPOnumber",value,function(error, result){
      template.items.set(result);
      //change the disabled property of add-to-asset button based on remaining quantity
      if(result[0].remaining_qty > 0){
        template.disabledAddToAsset.set(false);
      }else{
        template.disabledAddToAsset.set(true);
        template.addToAsset.set(false);
      }
    });
  },
  "click .suggestedPO": function(event){
    $("#searchPO").val(event.target.getAttribute('id'));
  },
  "click .add-to-asset": function(event,template){
    template.addToAsset.set(true);
  },
  "keyup #serialNumber, keyup #deliveryChallan": function(event, template){
    if($("#serialNumber").val() && $("#deliveryChallan").val()){
      template.disableAddNewItem.set(false);
    }
    else{
      template.disableAddNewItem.set(true);
    }
  }
});

}
