Meteor.publish("assetsProcured", function () {
  return AssetsProcured.find({});
});

Meteor.publish("assetsDetails", function () {
  return AssetsDetails.find({});
});

Meteor.publish("inventory", function () {
  return Inventory.find({});
});

Meteor.publish("roles", function() {
  if (!this.userId) return this.ready();
  var currentUser = Meteor.users.find({_id:this.userId}, {fields:{'profile.emailId':1}}).fetch();
  if (currentUser[0]) {
    return Roles.find({emailId: currentUser[0].profile.emailId})
  }else{
    return this.ready();
  }

});

Meteor.publish("userData", function(){
  if (!this.userId) return this.ready();
  return Meteor.users.find({_id:this.userId}, {fields:{'profile.firstName':1, 'profile.lastName':1, 'profile.emailId':1}})
});
