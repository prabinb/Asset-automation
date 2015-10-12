Meteor.methods({
  getUserInfo: function(id){
    var user = Meteor.users.findOne({"_id":id});
    return user;
  }
});
