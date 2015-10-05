Meteor.subscribe("roles");
Template.caslogin.events({
    "click #loginButton" :function(event){
        event.preventDefault();
        Meteor.loginWithCas(function(err){
            console.log(err);
        })
    }
})
