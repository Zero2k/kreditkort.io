const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
});

const send = ({ email, name, text }: any) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`;
  const message = {
    from,
    to: 'info@kreditkarma.se',
    subject: `Nytt meddelande från ${from} | kreditkarma.se`,
    text,
    replyTo: from,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(
      message,
      (error: any, info: any) => (error ? reject(error) : resolve(info)),
    );
  });
};

export default send;