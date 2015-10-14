Template.assets.helpers({
	"assets": function(){
		return Template.instance().assets.get();
	},
	"toBeConfirmedAssets": function(){
		return Template.instance().toBeConfirmedAssets.get();
	}
});

Template.assets.onCreated(function() {
  var template = this;
  this.assets = new ReactiveVar([]);
  var user = Meteor.user();
  Meteor.call("getAssetsOfEmployee",user.profile.empId,function(err,result){
	  console.log(result);
	  template.assets.set(result);
	  
  });
  
  this.toBeConfirmedAssets = new ReactiveVar([]);
  this.selected = new ReactiveVar(null);
  var user = Meteor.user();
  Meteor.call("getAssetsToBeConfirmed",user.profile.empId,function(err,result){
	  console.log(result);
	  template.toBeConfirmedAssets.set(result);
	  
  });
});


Template.assets.events({
	"click .employee-acknowledge": function(event, template){
		template.selected.set(this.inventory_id);
	},
	"click #asset-acknowledgement-by-emp": function(event,template){
		var selected = template.selected.get();
		var user = Meteor.user();
		Meteor.call("acknowledgeAsset",selected,user.profile.empId,function(err,result){
			Meteor.call("getAssetsToBeConfirmed",user.profile.empId,function(err,result){
				  console.log(result);
				  template.toBeConfirmedAssets.set(result);
				  
			  });
			
			Meteor.call("getAssetsOfEmployee",user.profile.empId,function(err,result){
				  console.log(result);
				  template.assets.set(result);
				  
			  });
		})
	}
});