Meteor.subscribe("roles");
Template.home.events({
    "click #loginButton" :function(event){
        event.preventDefault();
        Meteor.loginWithCas(function(err){
            console.log('err');
        });
    }
})
Accounts.onLogin(function() {
    var user = Meteor.user();
    var ldapId = user.profile.name;
    //console.log(user);
    var role = Meteor.call('findRole', ldapId, function(err, result){
        if (result) {
            Router.go(result);
        }else{
            Router.go('home');
        }
    });


    if(Meteor.userId()){
  	   Meteor.call("getUserInfo",Meteor.userId(),function(e,r){
  	     Session.set("displayName", r.services.cas.firstName +" "+r.services.cas.lastName);
  	   });
  	}
});
