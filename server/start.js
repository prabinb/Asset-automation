// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  /* Add default entries */
  if(ProcurementOrder.find().count() === 0)
  {
    var order = {
      "ponumber":"1618",
      "supplier":"DD ComputerLand",
      "type": "Laptop",
      "make": "Dell",
      "model": "Latitude 3450",
      "quantity": "10",
      "remainingQuanity": "3"
    };

    var _orderId = ProcurementOrder.insert(order);

    var asset = {
      "type":"Laptop",
      "make":"Dell",
      "model":"Lattitude 3450",
      "serialno":"LAP001"
    };

    var _assetId = AssetsDetails.insert(asset);

    var assetsProcured = {
      "ponumber":"1618",
      "supplier":"DD ComputerLand",
      "deliverychallan": "1001",
      "asset_id": _assetId,
      "verified": false,
      "comment": "This asset is not verified"
    }

    var _assetProcuredId = AssetsProcured.insert(assetsProcured);

    var inventory = {
      "asset_id": _assetId,
      "assetdetails": {
        "oem": "with windows" ,
        "os": "windows 10",
        "cpu": "2401",
        "cputype": "i5-4210U CPU @ 1.70GHz [2 core(s) x64]" ,
        "memory": "8192",
        "disk": " 476937"
      },
      "empid": 12635,
      "assetstate": "Inventory"
    }

    Inventory.insert(inventory);
  }
});
