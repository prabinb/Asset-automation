Meteor.publish("assetsProcured", function () {
  return AssetsProcured.find({});
});

Meteor.publish("assetsDetails", function () {
  return AssetsDetails.find({});
});

Meteor.publish("inventory", function () {
  return Inventory.find({});
});
