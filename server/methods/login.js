Meteor.methods({
    findRole:function(email) {
        if (email) {
            var rollmapping = Roles.findOne({emailId: email});
            if (rollmapping != undefined) {
                return rollmapping.role;
            }
            // this is the default mapping,
            // ToDo: if any corridor API provides manager to employee mapping then this could be enhanced to return to projectmanager page
            return 'employee';
        }
    }
})
