Template.verifyAsset.helpers({
  assets: [{
    "srno": 1,
    "ponumber":"14542",
    "supplier":"DD ComputerLand",
    "deliverychallan": "1001",
    "serialno": "LAP001",
    "description": "Dell Lattitude 3450"
  },
  {
    "srno": 2,
    "ponumber":"14542",
    "supplier":"DD ComputerLand",
    "deliverychallan": "1001",
    "serialno": "LAP002",
    "description": "Dell Lattitude 3450"
  },
  {
    "srno": 3,
    "ponumber":"14542",
    "supplier":"DD ComputerLand",
    "deliverychallan": "1001",
    "serialno": "LAP003",
    "description": "Dell Lattitude 3450"
  }]
});

Template.verifyAsset.events = {
  "change #header-checkbox": function(event){
        var headerCheckbox = event.target;
        var checkboxes = document.getElementById("verify-asset-assets").querySelectorAll(".data-grid-row .data-grid-checkbox input[type='checkbox']");
        var checkProperty = headerCheckbox.checked;
        for(var index = 0; index < checkboxes.length; index++){
          checkboxes[index].checked = checkProperty;
        }
  }
};
