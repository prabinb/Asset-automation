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
    console.log(user);
    var email = user.profile.emailId;
    //console.log(user);
    var role = Meteor.call('findRole', email, function(err, result){
        if (result) {
            Router.go(result);
        }else{
            Router.go('home');
        }
    });
});
