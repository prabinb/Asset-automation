// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  // var ProcurementOrder = Mongo.Collection("ProcurementOrder");
  // var Assets = Mongo.Collection("Assets");
  // var AssetsProcured = Mongo.Collection("AssetsProcured");
  // var Inventory = Mongo.Collection("Inventory");

  /* Add default entries */
  // if(ProcurementOrder.find().count === 0){
  //   var order = {
  //     "ponumber":"14542",
  //     "supplier":"DD ComputerLand",
  //     "type": "Laptop",
  //     "make": "Dell",
  //     "model": "Latitude 3450",
  //     "quantity": "10",
  //     "remainingQuanity": "3"
  //   };
  //
  //   var _orderId = ProcurementOrder.insert(order);
  //
  //   var asset = {
  //     "type":"Laptop",
  //     "make":"Dell",
  //     "model":"Lattitude 3450",
  //     "serialno":"LAP001"
  //   };
  //
  //   var _assetId = Assets.insert(asset);
  //
  //   var assetsProcured = {
  //     "ponumber":"14542",
  //     "supplier":"DD ComputerLand",
  //     "deliverychallan"
  //   }
  // }
});
