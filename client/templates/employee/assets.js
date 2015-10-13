Template.assets.helpers({
	"assets": function(){
		return Template.instance().assets.get();
	}
});

Template.assets.onCreated(function() {
  var template = this;
  this.assets = new ReactiveVar([]);
  var user = Meteor.user();
  Meteor.call("getAssetsOfEmployee",user.profile.empId,function(err,result){
	  console.log(result);
	  template.assets.set(result);
	  
  })
});