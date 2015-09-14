SearchCriteria = (function(){
  var assetProperties = ["type", "make", "model", "serialno"],
      assetProcuredProperties = ["ponumber", "supplier", "deliverychallan", "verified"],
      inventoryProperties = ["assetstate"];
  var obj = function(defaultCriteria, searchMapping){
    function addProperty(object, property, value){
        if(assetProperties.indexOf(property) !== -1){
           object.assets[property] = value;
        }
        else if(assetProcuredProperties.indexOf(property) !== -1){
            object.assets_procured[property] = value;
        }
        else if(inventoryProperties.indexOf(property) !== -1){
            object.inventory[property] = value;
        }
    }
    this.buildSearchCriteria = function (){
      var searchCriteria = {
        assets: {},
        assets_procured: {},
        inventory: {}
      };
      for (var defaultProperty in defaultCriteria) {
        if (defaultCriteria.hasOwnProperty(defaultProperty)) {
           addProperty(searchCriteria, defaultProperty, defaultCriteria[defaultProperty]);
        }
      }
      for (var property in searchMapping) {
        if (searchMapping.hasOwnProperty(property)) {
          var element = document.getElementById(searchMapping[property]);
          if(element && element.value){
            addProperty(searchCriteria, property, new RegExp(element.value));
          }
        }
      }
      return searchCriteria;
    }
  }
  return obj;
})();
