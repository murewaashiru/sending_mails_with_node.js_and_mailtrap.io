const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const { sendEmail } = require('./Utils/emailSender');
const { message } = require('./Utils/emailTemplate');

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.post('/', async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = await sendEmail({
      email,
      subject: 'Hello World!',
      message: await message(),
    });
    res.status(200).json({ status: 'Email sent', result });
  } catch (err) {
    res.send('Email not sent');
    // next(err);
  }
});

module.exports = { app };
