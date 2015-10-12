Template.logout.events({
    'click #logoutLink':function(event){
        event.preventDefault();
        Meteor.logout(function(){
            Object.keys(Session.keys).forEach(function(key){
                Session.set(key, undefined);
            });
            Session.set("displayName","");
            Router.go('home');
            console.log('Logged out successfully');

        });
    }
})
