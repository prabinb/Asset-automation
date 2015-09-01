var items = new Mongo.Collection(null);

if (Meteor.isClient) {

  Meteor.startup(function () {
    Session.set('showPOItem',false);
    Session.set('addToAsset',false);
    Session.set('newItemAdded',false);
  });

  Template.assetFromVendor.helpers({
    "items":function(){
      return [{
        "poNumber":"14542",
        "supplier":"DD ComputerLand",
        "type": "Laptop",
        "make": "Dell",
        "model": "Latitude 3450",
        "quantity": "10",
        "remainingQuanity": "3",
        "action": "Add to Asset"
      }];
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
    }

  });

Template.securityHome.events({
  "click .search-po" : function(event){
    var value = $("#searchPO").val();

    if(value === "14542"){
      console.log(Session.get("showPOItem"));
      Session.set('showPOItem',true);
    }

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


  }
});

Template.poItem.events({
  "click .add-to-asset": function(){
    Session.set("addToAsset",true);
    console.log("called poitem event");
  }
});

}
