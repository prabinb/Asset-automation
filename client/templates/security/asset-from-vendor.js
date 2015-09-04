var items = new Mongo.Collection(null);

if (Meteor.isClient) {

  Meteor.startup(function () {
    Session.set('showPOItem',false);
    Session.set('addToAsset',false);
    Session.set('newItemAdded',false);
  });

  Template.assetFromVendor.helpers({
    "items":function(){
      return Session.get("items");
    },
    "newItems": function(){
      return [{
        "sNo":"1",
        "Description":"Dell Latitude 3450",
        "serialNo":"LAP001",
        "deliveryChallan":"1001"
      },{
        "sNo":"2",
        "Description":"Dell Latitude 3450",
        "serialNo":"LAP002",
        "deliveryChallan":"1002"
      }];
    },
    "showPO": function(){
      console.log(Session.get('showPOItem'));
      return Session.get('showPOItem');
    },
    "addToAsset": function(){
      console.log(Session.get('addToAsset'));
      return Session.get('addToAsset');
    },
    "newItemAdded": function(){
      console.log(Session.get('newItemAdded'));
      return Session.get('newItemAdded');
    },
    "suggestions": function(){
      return Session.get("suggestions");
    }

  });

Template.assetFromVendor.events({
  "keyup #searchPO": function(event){
    var val = $("#searchPO").val();

    Meteor.call("searchPO",val,function(error,result){
      Session.set("suggestions",result);
    });
  },
  "click .search-po" : function(event){
    var value = $("#searchPO").val();

    Meteor.call("getByPOnumber",value,function(error, result){
      Session.set('showPOItem',true);
      Session.set("items",result);
    });
    
  },
  "click .add-new-item" : function(event){

    event.preventDefault();

    var ii = items.find({ });
    console.log("ii"+ii);

    var newObj = {};
    itemsCount=ii.length  ;
    newObj.serialNo = document.getElementById("serialNumber").value;
    newObj.deliveryChallan = document.getElementById("deliveryChallan").value;
    newObj.desciption = "Dell Latitude 3450";
    newObj.sNo = itemsCount;
    items.insert(newObj);

    Session.set("newItemAdded", true);


  },
  "click .suggestedPO": function(event){
    $("#searchPO").val(event.target.getAttribute('id'));
  }
});

Template.poItem.events({
  "click .add-to-asset": function(){
    Session.set("addToAsset",true);
    console.log("called poitem event");
  }
});

}
