Meteor.methods({
    sendEmail:function(from, to, subject, text){
        check([from, to, subject, text], [String]);
        this.unblock();
        var toList=[];
        if (to == 'admin'){
            var adminUsers = Roles.find({role:'admin'}, {emailId:1, _id:0}).fetch();
            toList = adminUsers.map(function(user){
                return user.emailId;
            });
        }else if(to == "security"){
            var securityUsers = Roles.find({role:'security'}, {emailId:1, _id:0}).fetch();
            toList = securityUsers.map(function(user){
                return user.emailId;
            });
        }else if(to == "employee"){
            //ToDo: this will be implemented once we have the API to access basic employee information.
        }
        Email.send({
            to: toList,
            from: from,
            subject: subject,
            text: text
        })
    }
});