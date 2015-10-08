Meteor.methods({
    findRole:function(email) {
     //console.log("emailId: " + email);
        if (email) {
            var rollmapping = Roles.findOne({emailId: email});
            if (rollmapping != undefined) {
                console.log(rollmapping.role);
                //role.push(rollmapping.role);
                return rollmapping.role;
            }
        }
    }
})