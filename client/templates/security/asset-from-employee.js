Session.set("employeeHasAssets",false);

Template.assetFromEmployee.helpers({
  "assetsOfEmployee" : function(){
    return [{
      "type":"Laptop",
      "make":"Dell",
      "model":"L501X XPS",
      "serialno":"PBMY1243"
    },{
      "type":"Laptop",
      "make":"HP",
      "model":"HPL17P",
      "serialno":"HP0837"
    }];
  },
  "employeeHasAssets" : function(){
    return Session.get("employeeHasAssets");
  }

});

Template.assetFromEmployee.events({
  "click .search-employee": function(event){
    console.log("haha");
    if($("#searchEmployee").val() === "12306"){
      console.log("hahahehe");
      Session.set("employeeHasAssets", true);

    }
  }
});
