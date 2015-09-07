if (Meteor.isClient) {

  Template.assetFromVendor.onCreated(function() {
    this.items = new ReactiveVar([]);
    this.newItems = new ReactiveVar([]);
    this.showPOItem = new ReactiveVar(false);
    this.addToAsset = new ReactiveVar(false);
    this.newItemAdded = new ReactiveVar(false);
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
    });

  },
  "click .add-new-item" : function(event,template){

    event.preventDefault();

    var newObj = {};
    newObj.serialNo = document.getElementById("serialNumber").value;
    newObj.deliveryChallan = document.getElementById("deliveryChallan").value;
    newObj.desciption = "Dell Latitude 3450";

    var items = template.newItems.get();
    var itemsCount = items.length;

    newObj.sNo = itemsCount;
    items.push(newObj);

    template.newItems.set(items);

    template.newItemAdded.set(true);


  },
  "click .suggestedPO": function(event){
    $("#searchPO").val(event.target.getAttribute('id'));
  },
  "click .add-to-asset": function(event,template){
    template.addToAsset.set(true);
    console.log("called poitem event");
  }
});

}
