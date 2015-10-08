// home template
var homeTemplate = "home";

Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout',

  // the pageNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'pageNotFound'
});

Router.map(function()
{
  this.route('/', {
    template: homeTemplate,
    name: 'home'
  });

  this.route('/login', {
    name: 'login',
    template: 'login'
  });

  this.route('/admin', {
    template: "adminHome",
    name:'admin',
    onBeforeAction:function() {
      var currentUser = Meteor.userId();
      if (currentUser) {
        this.next();
      } else {
        Router.go('home');
      }
    },
    action:function(){
        this.render('logout', {to:'logout'});
        this.render();
      }
  });
  this.route('/security', {
    template: "securityHome",
    name: 'security',
    onBeforeAction:function(){
      var currentUser=Meteor.userId();
      if(currentUser){
        this.next();
      }else{
        Router.go('home');
      }
    },
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/employee', {
    template: "employeeHome",
    name: 'employee',
    onBeforeAction:function(){
      var currentUser=Meteor.userId();
      if(currentUser){
        this.next();
      }else{
        Router.go('home');
      }
    },
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
  this.route('/projectmanager', {
    template: "projectManagerHome",
    name: 'manager',
    onBeforeAction:function(){
      var currentUser=Meteor.userId();
      if(currentUser){
        this.next();
      }else{
        Router.go('home');
      }
    },
    action:function(){
      this.render('logout', {to:'logout'});
      this.render();
    }
  });
});
