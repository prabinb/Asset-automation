Template.layout.helpers({
  "displayName" : function(){
    return Session.get("displayName");
  }
});

Template.layout.onCreated(function(){
	if(Meteor.userId()){
	   Meteor.call("getUserInfo",Meteor.userId(),function(e,r){
	     Session.set("displayName", r.profile.firstName +" "+r.profile.lastName);
	   });
	}
});
