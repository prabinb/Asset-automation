(function () {

  /* Imports */
  var Meteor = Package.meteor.Meteor;
  var RoutePolicy = Package.routepolicy.RoutePolicy;
  var WebApp = Package.webapp.WebApp;
  var main = Package.webapp.main;
  var WebAppInternals = Package.webapp.WebAppInternals;
  var Accounts = Package['accounts-base'].Accounts;
  var _ = Package.underscore._;

  /* Package-scope variables */
  var middleware;

  (function () {

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/atoy40:accounts-cas/cas_server.js                                        //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
    //
    var Fiber = Npm.require('fibers');                                                   // 1
    var url = Npm.require('url');                                                        // 2
    var CAS = Npm.require('cas');                                                        // 3
                                                                                         // 4
    var _casCredentialTokens = {};                                                       // 5
                                                                                         // 6
    RoutePolicy.declare('/_cas/', 'network');                                            // 7
                                                                                         // 8
// Listen to incoming OAuth http requests                                            // 9
    WebApp.connectHandlers.use(function(req, res, next) {                                // 10
      // Need to create a Fiber since we're using synchronous http calls and nothing     // 11
      // else is wrapping this in a fiber automatically                                  // 12
      Fiber(function () {                                                                // 13
        middleware(req, res, next);                                                      // 14
      }).run();                                                                          // 15
    });                                                                                  // 16
                                                                                         // 17
    middleware = function (req, res, next) {                                             // 18
      // Make sure to catch any exceptions because otherwise we'd crash                  // 19
      // the runner                                                                      // 20
      try {                                                                              // 21
//    console.log("Middleware called here.")
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
        //console.log("Middleware, credentialToken is: "+credentialToken);
        if (!credentialToken) {                                                          // 34
          closePopup(res);                                                               // 35
          return;                                                                        // 36
        }                                                                                // 37
                                                                                         // 38
        // validate ticket                                                               // 39
        casTicket(req, credentialToken, function() {                                     // 40
          closePopup(res);                                                               // 41
        });                                                                              // 42
                                                                                         // 43
      } catch (err) {                                                                    // 44
        //console.log("account-cas: unexpected error : " + err.message);                   // 45
        closePopup(res);                                                                 // 46
      }                                                                                  // 47
    };                                                                                   // 48
                                                                                         // 49
    var casTicket = function (req, token, callback) {                                    // 50
      // get configuration                                                               // 51
      if (!Meteor.settings.cas && !Meteor.settings.cas.validate) {                       // 52
        //console.log("accounts-cas: unable to get configuration");                        // 53
        callback();                                                                      // 54
      }                                                                                  // 55

      //console.log("Inside casTicket function");                 // 56

      // get ticket and validate.                                                        // 57
      var parsedUrl = url.parse(req.url, true);                                          // 58
      //console.log("parsedurl: "+parsedUrl);
      var ticketId = parsedUrl.query.ticket;                                             // 59

      //console.log("ticketId: "+ticketId);
      // 60
      var cas = new CAS({                                                                // 61
        base_url: Meteor.settings.cas.baseUrl,                                           // 62
        service: Meteor.absoluteUrl() + "_cas/" + token                                  // 63
      });
      //console.log(cas.hostname);// 64
      //cas.hostname =url.parse(Meteor.settings.cas.baseUrl).hostname;                                                                                     // 65
      //console.log(cas.hostname);
      cas.validate(ticketId, function(err, status, username) {
        console.log("Inside casvalidate callback");
// 66
        if (err) {                                                                       // 67
          console.log("accounts-cas: error when trying to validate " + err);             // 68
        } else {                                                                         // 69
          if (status) {                                                                  // 70
            console.log("accounts-cas: user validated " + username);                     // 71
            _casCredentialTokens[token] = { id: username };                              // 72
          } else {                                                                       // 73
            console.log("accounts-cas: unable to validate " + ticketId);                 // 74
          }                                                                              // 75
        }                                                                                // 76
                                                                                         // 77
        callback();                                                                      // 78
      });                                                                                // 79
                                                                                         // 80
      return;                                                                            // 81
    };                                                                                   // 82
                                                                                         // 83
    /*                                                                                   // 84
     * Register a server-side login handle.                                              // 85
     * It is call after Accounts.callLoginMethod() is call from client.                  // 86
     *                                                                                   // 87
     */                                                                                  // 88
    Accounts.registerLoginHandler(function (options) {                                  // 89
      // 90
      if (!options.cas)                                                                  // 91
        return undefined;

      //console.log(options);// 92
      // 93
      if (!_hasCredential(options.cas.credentialToken)) {                                // 94
        throw new Meteor.Error(Accounts.LoginCancelledError.numericError,                // 95
            'no matching login attempt found');                                            // 96
      }                                                                                 // 97
      // 98
      var result = _retrieveCredential(options.cas.credentialToken);                     // 99
      var options = { profile: { name: result.id } };                                    // 100
      var user = Accounts.updateOrCreateUserFromExternalService("cas", result, options); // 101
                                                                                         // 102
      return user;                                                                       // 103
    });                                                                                  // 104
                                                                                         // 105
    var _hasCredential = function(credentialToken) {                                     // 106
      return _.has(_casCredentialTokens, credentialToken);                               // 107
    }                                                                                    // 108
                                                                                         // 109
    /*                                                                                   // 110
     * Retrieve token and delete it to avoid replaying it.                               // 111
     */                                                                                  // 112
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
    }                                                                                    // 123
                                                                                         // 124
///////////////////////////////////////////////////////////////////////////////////////

  }).call(this);


  /* Exports */
  if (typeof Package === 'undefined') Package = {};
  Package['atoy40:accounts-cas'] = {};

})();

//# sourceMappingURL=atoy40_accounts-cas.js.map
