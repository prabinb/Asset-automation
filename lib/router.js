// Needs to change
var roles = {Admin: 1, Security: 2, Employee: 3, ProjectManager: 4}
var role = roles.ProjectManager;

// home template
var homeTemplate = "";

if(role === roles.Admin){
  homeTemplate = "adminHome";
}
else if(role === roles.Security){
  homeTemplate = "securityHome";
}
else if(role === roles.Employee){
  homeTemplate = "employeeHome";
}
else if(role === roles.ProjectManager){
  homeTemplate = "projectManagerHome";
}

Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout',

  // the pageNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'pageNotFound'
});

Router.map(function()
{
  this.route('/', {
    template: homeTemplate
  });

  this.route('login', {
    path: '/login'
  });

});
