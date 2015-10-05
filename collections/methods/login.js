Meteor.methods({
    findRole:function(ldapId) {
     console.log("ldapId: " + ldapId);
        if (ldapId) {
            var rollmapping = Roles.findOne({ldapId: ldapId});
            if (rollmapping != undefined) {
                console.log(rollmapping.role);
                //role.push(rollmapping.role);
                return rollmapping.role;
            }
        }
    }
})