var Meteor = Package.meteor.Meteor;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;


var middleware;

var Fiber = Npm.require('fibers');
var url = Npm.require('url');
//var CAS = Npm.require('xcas');

var _casCredentialTokens = {};

RoutePolicy.declare('/_cas/', 'network');

// Listen to incoming OAuth http requests
WebApp.connectHandlers.use(function(req, res, next) {
  // Need to create a Fiber since we're using synchronous http calls and nothing
  // else is wrapping this in a fiber automatically
  Fiber(function () {
    middleware(req, res, next);
  }).run();                                                                          // 15
});                                                                                  // 16
                                                                                     // 17
middleware = function (req, res, next) {                                             // 18
  // Make sure to catch any exceptions because otherwise we'd crash                  // 19
  // the runner                                                                      // 20
  try {                                                                              // 21
    var barePath = req.url.substring(0, req.url.indexOf('?'));                       // 22
    var splitPath = barePath.split('/');                                             // 23
                                                                                     // 24
    // Any non-cas request will continue down the default                            // 25
    // middlewares.                                                                  // 26
    if (splitPath[1] !== '_cas') {                                                   // 27
      next();                                                                        // 28
      return;                                                                        // 29
    }                                                                                // 30
                                                                                     // 31
    // get auth token                                                                // 32
    var credentialToken = splitPath[2];                                              // 33
    if (!credentialToken) {                                                          // 34
      closePopup(res);                                                               // 35
      return;                                                                        // 36
    }                                                                                // 37
    // validate ticket                                                               // 39
    casTicket(req, credentialToken, function() {                                     // 40
      closePopup(res);                                                               // 41
    });                                                                              // 42
                                                                                     // 43
  } catch (err) {                                                                    // 44
    console.log("account-cas: unexpected error : " + err.message);                   // 45
    closePopup(res);                                                                 // 46
  }                                                                                  // 47
};                                                                                   // 48
/*var auth = function(req, res){
  cas.authenticate(req, res, function(err, status, username, extended) {
    if (err) {
      // Handle the error
      res.send({error: err});
    } else {
      // Log the user in
      res.send({status: status, username: username, attributes: extended.attributes});
    }
  });
}   ;*/                                                                             // 49
var casTicket = function (req, token, callback) {                                    // 50
  // get configuration                                                               // 51
  if (!Meteor.settings.cas && !Meteor.settings.cas.validate) {                       // 52
    console.log("accounts-cas: unable to get configuration");                        // 53
    callback();                                                                      // 54
  }                                                                                  // 55
                                                                                     // 56
  // get ticket and validate.                                                        // 57
  var parsedUrl = url.parse(req.url, true);                                          // 58
  var ticketId = parsedUrl.query.ticket;                                             // 59
                                                                                     // 60
  var cas = new CAS({                                                                // 61
    base_url: Meteor.settings.cas.baseUrl,                                           // 62
    service: Meteor.absoluteUrl() + "_cas/" + token,
    version: 2.0,
    proxyValidate: '/p3/proxyValidate'
  });                                                                                // 64
                                                                                     // 65
  cas.validate(ticketId, function(err, status, username, extended) {                           // 66
    if (err) {                                                                       // 67
      console.log("accounts-cas: error when trying to validate " + err);             // 68
    } else {                                                                         // 69
      if (status) {                                                                  // 70

        _casCredentialTokens[token] = { id: username,
          firstName: extended.attributes[0]['cas:firstname'][0],
          lastName: extended.attributes[0]['cas:lastname'][0],
          empId: extended.attributes[0]['cas:employeenumber'][0],
          emailId: extended.attributes[0]['cas:mail'][0],
          jobTitle: extended.attributes[0]['cas:jobtitle'][0],
          workLocation: extended.attributes[0]['cas:worklocation'][0]
        };
        //console.log('extended: '+extended.attributes);
        //for(i in extended.attributes){
         // console.log(extended.attributes[i]);
        //}
      } else {                                                                       // 73
        console.log("accounts-cas: unable to validate " + ticketId);                 // 74
      }                                                                              // 75
    }                                                                                // 76     // 77
    callback();                                                                      // 78
  });                                                                                // 79

  return;                                                                            // 81
};                                                                                   // 82

Accounts.registerLoginHandler(function (options) {                                  // 89
  // 90
  if (!options.cas)                                                                  // 91
    return undefined;                                                                // 92
                                                                                     // 93
  if (!_hasCredential(options.cas.credentialToken)) {                                // 94
    throw new Meteor.Error(Accounts.LoginCancelledError.numericError,                // 95
        'no matching login attempt found');                                            // 96
  }                                                                                  // 97
   // 98
  var result = _retrieveCredential(options.cas.credentialToken);                     // 99
  var serviceData = {id: result.id};
  var options = { profile: result };
  var user = Accounts.updateOrCreateUserFromExternalService("cas", serviceData, options); // 101
                                                                                     // 102
  return user;                                                                       // 103
});                                                                                  // 104
                                                                                     // 105
var _hasCredential = function(credentialToken) {                                     // 106
  return _.has(_casCredentialTokens, credentialToken);                               // 107
}                                                                                    // 108
                                                                                     // 109

var _retrieveCredential = function(credentialToken) {                                // 113
  var result = _casCredentialTokens[credentialToken];                                // 114
  delete _casCredentialTokens[credentialToken];                                      // 115
  return result;                                                                     // 116
}                                                                                    // 117
                                                                                     // 118
var closePopup = function(res) {                                                     // 119
  res.writeHead(200, {'Content-Type': 'text/html'});                                 // 120
  var content = '<html><head><script>window.close()</script></head></html>';         // 121
  res.end(content, 'utf-8');                                                         // 122
}
