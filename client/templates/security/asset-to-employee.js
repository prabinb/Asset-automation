Template.assetToEmployee.onCreated(function() {
  var template = this;

  this.markedAssets = new ReactiveVar([]);
  this.selected = new ReactiveVar(null);

  Meteor.call("getMarkedAssets",function(error, result){
    template.markedAssets.set(result);
    console.log(result);
  });
});

Template.assetToEmployee.helpers({
  "serialNumberList" : function(){
    return Template.instance().serialNumberList.get();
  },
  "markedAssets": function(){
	return Template.instance().markedAssets.get();
  }
});

Template.assetToEmployee.events({
  "click .security-assign": function(event, template){
    template.selected.set(this.inventory_id);
  },
  "click #give-asset-to-emp": function(event, template){
	var selectedItem = template.selected.get();
	console.log(selectedItem);
	var user = Meteor.user();
	Meteor.call("assignAssetBySecurity",selectedItem,user.profile.empId,function(err,result){
		Meteor.call("getMarkedAssets",function(error, result){
		    template.markedAssets.set(result);
		    console.log(result);
		});
	});
  }
});
