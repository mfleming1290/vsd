var nodemailer = require('nodemailer');
const errorHandler = require('./errors')

module.exports = {
sendMail(req, res) {
    console.log('in mailer',req.body)
//   var transporter = nodemailer.createTransport('smtps://contact@veteransresourceproject.com.com:password@smtp.gmail.com');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 443,
    options: {
      debug: true,
    },
    auth: {
        user: 'veteranserviceform@gmail.com',
        pass: 'Keystone9021!'
    }
  });
  var data = req.body;
  var mailOptions = {
    from: data.contactEmail,
    to: 'contact@veteransresourceproject.com',
    subject: 'Email sent by ' + data.contactName,
    text: data.contactName + data.contactEmail + data.contactMessage
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    console.log('Data:' + data.contactName);
  });
  res.json(data);

}
}
