Template.PO.helpers({
  "type": function(){
      return ["Laptop", "Headset", "Mouse", "Keyboard","LCD"];
  },
  "information": function(){
    return Template.instance().information.get();
  }
});

Template.PO.onCreated(function() {
  this.information = new ReactiveVar([]);
});

Template.PO.events({
  "submit #addPOForm": function(event,template){

    event.preventDefault();
    var form = event.target;

    var POobject = {
      "ponumber": form.ponumber.value,
      "supplier": form.supplier.value,
      "type": form.type.value,
      "make": form.make.value,
      "model": form.model.value,
      "qty": form.qty.value,
      "remaining_qty": form.qty.value
    };

    Meteor.call("addPO", POobject, function(error, result){
      template.information.set(["Purchase order placed Successfully"]);
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
