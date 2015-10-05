/*
if(Meteor.isClient){
    Meteor.methods({
        casAuthentication:function casAuthentication() {
            Meteor.call('casAuthentication');
        }
    })
}



Template.home.helpers({
    getUser: function(req){
        var user = '';
        if (req.session.cas && req.session.cas.user) {
            user = req.session.cas.user;
        }
        return user;
    },
    getAttributes: function(req) {
        var attributes = '';
        if (req.session.cas && req.session.cas.attributes) {
            attributes = JSON.stringify(req.session.cas.attributes);
        }
        return attributes;
    }
});

*/