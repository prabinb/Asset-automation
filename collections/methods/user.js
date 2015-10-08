Meteor.methods({
  getUserInfo: function(id){
    var user = Meteor.users.findOne({"_id":id});

console.log(user);
return user;
  }
});
