Template.assetFromEmployee.onCreated(function() {
  this.assetsOfEmployee = new ReactiveVar([]);
  this.currentEmployee = new ReactiveVar(null);
  this.selectedInventoryId = new ReactiveVar(null);
});

Template.assetFromEmployee.helpers({
  "assetsOfEmployee" : function(){
    return Template.instance().assetsOfEmployee.get();
  },
  "currentEmployee" : function(){
    return Template.instance().currentEmployee.get();
  },
  "selectedInventoryId": function(){
    return Template.instance().selectedInventoryId.get();
  }
});

Template.assetFromEmployee.events({
  "click .search-employee": function(event,template){
    searchEmployee(event, template);
  },
  "keyup #searchEmployee": function(event,template){
    if(event.which === 13){
      searchEmployee(event, template);
    }
  },
  "click #return-asset": function(event, template){
    template.selectedInventoryId.set(this.inventory_id);
  },
  "click #return-asset-confirm": function(event,template){
    var inventory_id = template.selectedInventoryId.get();
    Meteor.call("returnToSecurity",inventory_id,function(error,result){
      console.log(result);
      searchEmployee(event,template);
    });
    Meteor.call("sendEmail", user.profile.emailId, "admin", "Received asset from employee" ,
        "Received an asset from employee, id: "+templates.currentEmployee.get());
  }
});

function searchEmployee(event, template){
  var value = $("#searchEmployee").val();
  //set the current Employee value
  template.currentEmployee.set(value);
  Meteor.call("getAssetsOfEmployee",value,function(error, result){
     console.log(result);
     template.assetsOfEmployee.set(result);
  });
}
