Session.set("type","");
Template.assetToEmployee.helpers({
    "type": function(){
        return ["Laptop", "Headset", "Mouse", "Keyboard","LCD"];
    },
    "serialNumber" : function(){
      var type = Session.get("type");
      var arr = new Array();
      for(var i=0;i<10;i++){
        arr.push(type.toString() + i.toString());
      }
      return arr;
    },
    "apple": function(){
      if(Session.get("type") !== ""){
        return false;
      }
      else{
        return true;
      }
    }
});

Template.assetToEmployee.events({
    "change #type-select": function (event, template) {
        var type = $(event.currentTarget).val();
        Session.set("type",type);
        console.log("type of asset : " + type);
        // additional code to do what you want with the category
    },
    "change #serial-number-select": function (event, template) {
        var type = $(event.currentTarget).val();
        console.log("type of asset : " + type);
        // additional code to do what you want with the category
    }
});
