Meteor.publish("assetsProcured", function () {
  return AssetsProcured.find({});
});

Meteor.publish("assetsDetails", function () {
  return AssetsDetails.find({});
});

Meteor.publish("inventory", function () {
  return Inventory.find({});
});

Meteor.publish("roles", function(){
  return Roles.find({});
})

Meteor.publish("userData", function(id){
  if (!this.userId) return this.ready();
  return Meteor.users.find({_id:id}, {fields:{'profile.firstName':1, 'profile.lastName':1, 'profile.emailId':1}});
})
