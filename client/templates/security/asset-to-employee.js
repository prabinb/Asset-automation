Template.assetToEmployee.onCreated(function() {
  var template = this;

  this.serialNumberList = new ReactiveVar([]);
  this.typeList = new ReactiveVar([]);
  this.selected = new ReactiveVar(null);
  this.disableAssign = new ReactiveVar(true);
  Meteor.call("getAssetTypes",function(error, result){
    template.typeList.set(result);
  });
});

Template.assetToEmployee.helpers({
  "type": function(){
    return Template.instance().typeList.get();
  },
  "serialNumberList" : function(){
    return Template.instance().serialNumberList.get();
  },
  "disableAssign": function(){
    return Template.instance().disableAssign.get();
  }
});

function checkAssign(){
  if($("#type-select").val() && $("#serial-number-select").val() && ($("#empid").val() && $("#empid").val()!== "")) {
    return true;
  }
  else {
    return false;
  }
}
Template.assetToEmployee.events({
  "change #type-select": function (event, template) {
    var type = $(event.currentTarget).val();

    Meteor.call("findAvailableAssetsByType", type, function(error, result){
      if(result){
        console.log(result);
        template.serialNumberList.set(result);
      }
    });

    if(checkAssign()){
      template.disableAssign.set(false);
    }
    else{
      template.disableAssign.set(true);
    }
  },
  "change #serial-number-select": function (event, template) {
    var obj = $(event.currentTarget).val();
    template.selected.set(obj);
    if(checkAssign()){
      template.disableAssign.set(false);
    }
    else{
      template.disableAssign.set(true);
    }
  },
  "click #assign-asset-to-emp": function(event, template){
    var obj = template.selected.get();
    var foundObj;
    var list = template.serialNumberList.get();
    list.forEach(function(l,i){
      if(l.serialno === obj){
        foundObj = l;
      }
    });

    var inventory_id = foundObj.inventory_id;
    var empid = $("#empid").val();

    console.log(inventory_id);
    Meteor.call("assignAssetToEmployee", empid, inventory_id, function(error, result){
      console.log(result);
      if(result.statusCode === 200){
        $('#type-select').get(0).selectedIndex = 0;
        $('#serial-number-select').get(0).selectedIndex = 0;
        $("#empid").val("");
      }
    });
  },
  "keyup #empid": function(event, template) {
    if(checkAssign()){
      template.disableAssign.set(false);
    }
    else{
      template.disableAssign.set(true);
    }
  }
});
