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

  this.route('login', {
    path: '/login',
    name: 'login'
  });

  //just for testing -- remove it after development
  this.route('admin', {
    template: "adminHome",
    name:'admin'
  });
  this.route('security', {
    template: "securityHome",
    name: 'security'
  });
  this.route('employee', {
    template: "employeeHome",
    name: 'employee'
  });
  this.route('projectmanager', {
    template: "projectManagerHome",
    name: 'manager'
  });
});
