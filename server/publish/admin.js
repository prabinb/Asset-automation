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

Meteor.publish("role-per-user", function(email){
  return Roles.findOne({email:email}).role;
})