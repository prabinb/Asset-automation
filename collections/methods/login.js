Meteor.methods({
    findRole:function(email){
        //var role = [];
        var rollmapping = Roles.findOne({email:email});
        if (rollmapping!=undefined){
            console.log(rollmapping.role);
            //role.push(rollmapping.role);
            return rollmapping.role;
        }
    }
})