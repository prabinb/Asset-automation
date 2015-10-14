Template.history.onCreated(function () {
	var template = this;
	this.history = new ReactiveVar([]);
	
	Meteor.call("fetchHistory",Session.get("assetForHistory"),function(err, result){
		template.history.set(result);
		console.log(result);
	});
});

Template.history.helpers({
	"history": function(){
		return Template.instance().history.get();
	}
});