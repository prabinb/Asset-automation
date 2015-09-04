Template.verifyAsset.created =  function () {
  var self = this;
  self.verificationRequests = new ReactiveVar([]);
  Meteor.call('getAssetVerificationRequests', function (error, results) {
    if (error){
      console.log(error);
    }
    else {
      self.verificationRequests.set(results);
    }
  });
}
Template.verifyAsset.helpers({
  assets: function(){
    return Template.instance().verificationRequests.get();
  }
});

Template.verifyAsset.events({
  "change #header-checkbox": function(event){
    var headerCheckbox = event.target;
    var checkboxes = document.getElementById("verify-asset-assets").querySelectorAll(".data-grid-row .data-grid-checkbox input[type='checkbox']");
    var checkProperty = headerCheckbox.checked;
    for(var index = 0; index < checkboxes.length; index++){
      checkboxes[index].checked = checkProperty;
    }
  },
  "click #btn-verify-assets": function(){
    var verifyIds = [];
    var self = Template.instance();
    var checkboxes = document.getElementById("verify-asset-assets").querySelectorAll(".data-grid-row .data-grid-checkbox input[type='checkbox']");
    for(var index = 0; index < checkboxes.length; index++){
      if(checkboxes[index].checked){
        verifyIds.push(self.verificationRequests.get()[index].id);
      }
    }
    Meteor.call("verifyAssetVerificationRequests", verifyIds);

    //Temporary added - needs to remove
    Meteor.call('getAssetVerificationRequests', function (error, results) {
      if (error){
        console.log(error);
      }
      else {
        self.verificationRequests.set(results);
      }
    });
  }
});
