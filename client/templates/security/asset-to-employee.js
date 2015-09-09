Template.assetToEmployee.onCreated(function() {
  var template = this;

  this.serialNumberList = new ReactiveVar([]);
  this.typeList = new ReactiveVar([]);
  this.selected = new ReactiveVar(null);

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

});

Template.assetToEmployee.events({
  "change #type-select": function (event, template) {
    var type = $(event.currentTarget).val();

    Meteor.call("findAvailableAssetsByType", type, function(error, result){

      if(result){
        console.log(result);
      template.serialNumberList.set(result);
    }
    });
  },
  "change #serial-number-select": function (event, template) {
    var obj = $(event.currentTarget).val();
    template.selected.set(obj);
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
    Meteor.call("assignAssetToEmployee", empid, inventory_id, function(error, result){
      console.log(error,result);
      if(result){
        console.log("Successfully updated the inventory with empid"+empid)
      }
    });
  }
});
