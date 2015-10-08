//Meteor.subscribe("roles");
Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout',
  // the pageNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'pageNotFound'
});

var waitOnUserData = function(){
  return Meteor.subscribe('userData', Meteor.userId())
}

Router.waitOn(waitOnUserData, {except:['home']});

Router.map(function()
{
  this.route('/', {
    template: 'home',
    name: 'home'
  });
  this.route('/notauthorized',{
    template: 'notauthorized',
    name:'notauthorized'
  })
  this.route('/admin', {
    template: "adminHome",
    name:'admin',
    onBeforeAction:function() {
      var currentUser = Meteor.user();
      var routerNext=this.next;
      var emailId = (currentUser) ? currentUser.profile.emailId : '';
      Meteor.call('findRole',  emailId, function(err, result){
        var role = result;
        console.log('role'+role);
        if (currentUser &&  (role === 'admin' || role === 'developer' )) {
          routerNext();
        }else{
          if(Meteor.userId()){
            Router.go('notauthorized');
          }else {
            Router.go('home');
          }
        }
      });
    },
    action: function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/security', {
    template: "securityHome",
    name: 'security',
    onBeforeAction:function() {
      var currentUser = Meteor.user();
      var routerNext=this.next;
      var emailId = (currentUser) ? currentUser.profile.emailId : '';
      Meteor.call('findRole',  emailId, function(err, result){
        var role = result;
        console.log('role'+role);
        if (currentUser &&  (role === 'security' || role === 'developer' )) {
          routerNext();
        }else{
          if(Meteor.userId()){
            Router.go('notauthorized');
          }else {
            Router.go('home');
          }
        }
      });
    },
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/employee', {
    template: "employeeHome",
    name: 'employee',
    onBeforeAction:function() {
      var currentUser = Meteor.user();
      var routerNext=this.next;
      var emailId = (currentUser) ? currentUser.profile.emailId : '';
      Meteor.call('findRole',  emailId, function(err, result){
        var role = result;
        console.log('role'+role);
        if (currentUser &&  (role === 'employee' || role === 'developer' )) {
          routerNext();
        }else{
          Meteor.logout();
          Router.go('home');
        }
      });
    },
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/projectmanager', {
    template: "projectManagerHome",
    name: 'projectmanager',
    onBeforeAction:function() {
      var currentUser = Meteor.user();
      var routerNext=this.next;
      var emailId = (currentUser) ? currentUser.profile.emailId : '';
      Meteor.call('findRole',  emailId, function(err, result){
        var role = result;
        console.log('role'+role);
        if (currentUser &&  (role === 'projectmanager' || role === 'developer' )) {
          routerNext();
        }else{
          Meteor.logout();
          Router.go('home');
        }
      });
    },
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  //should be removed after development phase
  this.route('/developer', {
    template: "developer",
    name:'developer',
    onBeforeAction:function() {
      var currentUser = Meteor.user();
      var routerNext=this.next;
      var emailId = (currentUser) ? currentUser.profile.emailId : '';
      Meteor.call('findRole',  emailId, function(err, result){
        var role = result;
        console.log('role'+role);
        if (currentUser &&  role === 'developer' ) {
          routerNext();
        }else{
          Meteor.logout();
          Router.go('home');
        }
      });
    },
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
});
