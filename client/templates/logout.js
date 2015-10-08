Template.logout.events({
    'click #logoutLink':function(event){
        event.preventDefault();
        Meteor.logout(function(){
            console.log('Logged out successfully');
            Session.set("displayName","");
        });
    }
})
