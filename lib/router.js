Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout',
  // the pageNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'pageNotFound'
});

var waitOnUserData = function(){
  return [Meteor.subscribe('roles'), Meteor.subscribe('userData')]
}

var onBeforeActions = function(){
  var currentUser = Meteor.user(),
      emailId = (currentUser) ? currentUser.profile.emailId : '',
      userRole = Roles.findOne({emailId: emailId}),
      role = (userRole)?userRole.role :'employee',
      currentRoute=Router.current().route.getName();
  if (currentUser && (role === currentRoute || role === 'developer')) {
    this.next();
  }else if(currentUser){
    Router.go('notauthorized');
  }else {
    Router.go('home');
  }
}

Router.waitOn(waitOnUserData, {except:['home','notauthorized']});
Router.onBeforeAction(onBeforeActions, {except:['home','notauthorized']});

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
    action: function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/security', {
    template: "securityHome",
    name: 'security',
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/employee', {
    template: "employeeHome",
    name: 'employee',
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/projectmanager', {
    template: "projectManagerHome",
    name: 'projectmanager',
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  //should be removed after development phase
  this.route('/developer', {
    template: "developer",
    name:'developer',
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
});
