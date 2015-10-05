Meteor.subscribe("roles");
Template.caslogin.events({
    "click #loginButton" :function(event){
        event.preventDefault();
        Meteor.loginWithCas(function(err){

            console.log(err);
            
        })
    }
})
Accounts.onLogin(function() {
    var user = Meteor.user();
    var emailId = user.emails[0].address;
//    console.log(emailId);
     var role = Meteor.call('findRole', emailId, function(err, result){
         if (result) {
             Router.go(result);
         }else{
             Router.go('home');
         }
    });

});
