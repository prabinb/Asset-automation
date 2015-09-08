if (Meteor.isClient) {

  Template.assetFromVendor.onCreated(function() {
    this.items = new ReactiveVar([]);
    this.newItems = new ReactiveVar([]);
    this.showPOItem = new ReactiveVar(false);
    this.addToAsset = new ReactiveVar(false);
    this.newItemAdded = new ReactiveVar(false);
    this.checkNotEmpty = new ReactiveVar(true);
    this.suggestions = new ReactiveVar([]);
  });

  Template.assetFromVendor.helpers({
    "items":function(){
      return Template.instance().items.get();
    },
    "newItems": function(){
      return Template.instance().newItems.get();
    },
    "showPO": function(){
      return Template.instance().showPOItem.get();
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

    Meteor.call("getByPOnumber",value,function(error, result){
      template.showPOItem.set(true);
      template.items.set(result);

      console.log(result);
    });

  },
  "click .add-new-item" : function(event,template){

    event.preventDefault();

    var newObj = {};
    newObj.serialno = document.getElementById("serialNumber").value;
    newObj.deliverychallan = document.getElementById("deliveryChallan").value;


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

    template.newItemAdded.set(true);

    $("#serialNumber").val("");
    $("#deliveryChallan").val("");
    $("#addItemButton").attr('disabled', 'disabled');

    var value = $("#searchPO").val();
    Meteor.call("getByPOnumber",value,function(error, result){
      template.showPOItem.set(true);
      template.items.set(result);

      console.log(result);
    });
  },
  "click .suggestedPO": function(event){
    $("#searchPO").val(event.target.getAttribute('id'));
  },
  "click .add-to-asset": function(event,template){
    template.addToAsset.set(true);
    console.log("called poitem event");
  },
  "keyup #serialNumber, keyup #deliveryChallan": function(event, template){
    var filled = false;
    if($("#serialNumber").val() && $("#deliveryChallan").val()){
      filled = true;
    }

    if(filled){
      $("#addItemButton").removeAttr('disabled');
    }else{
      $("#addItemButton").attr('disabled', 'disabled');
    }
  }
});

}
