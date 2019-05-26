'use strict';

module.exports = function (Invitations) {
  Invitations.validatesUniquenessOf('email', { message: 'Email already exists' });

  Invitations.afterRemote("create", function (context, userInstance, next) {
    console.log('after remote is called', userInstance.email)

    let res = context.res;


    Invitations.app.models.Email.send({
      to: userInstance.email,
      from: 'shah.khokhar@hotmail.com',
      subject: 'Invitation email',
      text: 'my text',
      html: `<h1>Thank You</h1><p>Thanks for registering.Please follow the link below to complete your registration.</p><p><a href="http://localhost:4200/earlyaccess?id=${userInstance.id}">Click here to verify email </a></p>`
    }, function (err, mail) {
      if (!err) {
        context.res.status(200).send(userInstance)
        console.log('email sent!' + mail);
      }
      if (err) {
        console.log('error is', err);

      }
      ;
    })

  });

};
