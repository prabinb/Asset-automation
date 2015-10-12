Template.home.events({
    "click #loginButton" :function(event){
        event.preventDefault();
        Meteor.loginWithCas(function(err){
            if (err) console.log(err);
        });
    }
})
Accounts.onLogin(function() {
    var user = Meteor.user();
    var email = user.profile.emailId;
    Meteor.call('findRole', email, function(err, result){
        if (result) {
            Router.go(result);
        }else{
            Router.go('home');
        }
    });
    if(Meteor.userId()){
        Meteor.call("getUserInfo",Meteor.userId(),function(e,r){
            Session.set("displayName", r.profile.firstName +" "+r.profile.lastName);
        });
    }
});
