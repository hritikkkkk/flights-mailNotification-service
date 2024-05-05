const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
  QUEUE: process.env.QUEUE,
  FLIGHT_EMAIL: process.env.FLIGHT_EMAIL,
};
