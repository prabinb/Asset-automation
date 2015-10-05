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
    name: 'login'
  });

  //just for testing -- remove it after development
  this.route('/admin', {
    template: "adminHome",
    name:'admin',
    onBeforeAction:function(){
      var currentUser=Meteor.userId();
      if(currentUser){
        this.next();
      }else{
        Router.go('home');
      }
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
    }
  });
});
