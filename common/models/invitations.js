'use strict';

module.exports = function (Invitations) {

  Invitations.afterRemote("create", function (context, userInstance, next) {
    console.log('after remote is called', userInstance.email)

    Invitations.app.models.Email.send({
      to: userInstance.email,
      from: 'info@tesseractdev.xyz',
      subject: 'Invitation email',
      text: 'my text',
      html: '<h1>Thank You</h1><p>Thanks for registering.Please follow the link below to complete your registration.</p><p><a href="http://localhost:4200/earlyaccess">Click here to verify email</a></p>'
    }, function (err, mail) {
      context.res.status(200).send(userInstance)
      console.log('email sent!');
      if (err) {
        console.log(err);

      }
      ;
    })

  });

};
