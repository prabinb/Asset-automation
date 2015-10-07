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
    template: 'login',
    action:function(){
      //console.log(this.request.url);
     //

      var credentialToken = Random.id();
      var settings = Meteor.settings.public.cas;

      var loginUrl = settings.loginUrl +
          "?" + (settings.service || "service") + "=" +
          Meteor.absoluteUrl('_cas/') +
          credentialToken;

      var width=600;
      var height=600;
      var screenX = typeof window.screenX !== 'undefined'                                   // 52
          ? window.screenX : window.screenLeft;                                                 // 53
      var screenY = typeof window.screenY !== 'undefined'                                   // 54
          ? window.screenY : window.screenTop;                                                  // 55
      var outerWidth = typeof window.outerWidth !== 'undefined'                             // 56
          ? window.outerWidth : document.body.clientWidth;                                      // 57
      var outerHeight = typeof window.outerHeight !== 'undefined'                           // 58
          ? window.outerHeight : (document.body.clientHeight - 22);                             // 59
      // XXX what is the 22?                                                                // 60
      // 61
      // Use `outerWidth - width` and `outerHeight - height` for help in                    // 62
      // positioning the popup centered relative to the current window                      // 63
      var left = screenX + (outerWidth - width) / 2;                                        // 64
      var top = screenY + (outerHeight - height) / 2;                                       // 65
      var features = ('width=' + width + ',height=' + height +                              // 66
      ',left=' + left + ',top=' + top + ',scrollbars=yes');



      var newwindow=window.open(loginUrl, 'Login', features);
      this.request.url = loginUrl;
      this.request.headers={'host':'http://localhost'};
      var request = this.request;
      var response = this.response;

      if (newwindow) {
        if (newwindow.focus) {
          newwindow.focus();


        }
        var timer = setInterval(function(){

          if(newwindow.closed){
            clearInterval(timer);
            //var returnvalue=newwindow.returnValue;
            //console.log(returnvalue);
            //Meteor.call('cas_login', request, response, credentialToken);
            Router.go('_cas');
          }
        }, 500);
      }else {
        this.render('pageNotFound');

      }
      this.next();

    }

  });
  //http://localhost:3000/_cas/9pSEuxfPaPyw5FGcq?ticket=ST-360-piRGLf924EO9X9md99Dg-cas01.example.org
  this.route('/_cas/:token',{
    name:'_cas',
    template:homeTemplate,
    action:function(){
      console.log('inside cas');
      console.log(this.request);
      console.log(this.params.query.ticket);
      Meteor.call('cas_login', this.request, this.responsem, this.params.token, this.params.query.ticket);
      //console.log(this.response);
    }
  });
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
