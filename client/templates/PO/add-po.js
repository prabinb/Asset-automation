Template.PO.helpers({
  "type": function(){
      return ["Laptop", "Headset", "Mouse", "Keyboard","LCD"];
  }
});

Template.PO.events({
  "submit #addPOForm": function(event){

    event.preventDefault();
    var form = event.target;

    var POobject = {
      "ponumber": form.ponumber.value,
      "supplier": form.supplier.value,
      "type": form.type.value,
      "make": form.make.value,
      "model": form.model.value,
      "qty": form.qty.value
    };

    Meteor.call("addPO", POobject, function(error, result){

      if(error){
        console.log("error", error);
      }
      if(result){
        console.log("Added Successfully");
        console.log(result);
      }
    });
  }
});
