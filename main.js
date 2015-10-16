if(Meteor.isServer) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    process.env.MAIL_URL="smtp://pamt.notifications:pramatipamt@smtp.gmail.com:587/";
}
