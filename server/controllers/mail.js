var nodemailer = require('nodemailer');
const errorHandler = require('./errors')

module.exports = {
sendMail(req, res) {
    console.log('in mailer',req.body)
//   var transporter = nodemailer.createTransport('smtps://contact@veteransresourceproject.com.com:password@smtp.gmail.com');
  let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hwstqldhdc4qywze@ethereal.email',
            pass: 'vQAVC6brTzmQeKKt3r'
        }
    });
  var data = req.body;
  var mailOptions = {
    from: data.contactEmail,
    to: 'matthewjamesfleming@gmail.com',
    subject: 'Email sent by ' + data.contactName,
    text: data.contactMessage
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
