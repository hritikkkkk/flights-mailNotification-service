const { StatusCodes } = require("http-status-codes");
const { EmailService } = require("../services");
const amqplib = require("amqplib");
const { ServerConfig } = require("../config");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createTicket = async (req, res) => {
  try {
    const response = await EmailService.createTicket({
      subject: req.body.subject,
      content: req.body.content,
      recepientEmail: req.body.recepientEmail,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const connectQueue = async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("flights-notiQueue");
    channel.consume("flights-notiQueue", async (data) => {
      console.log(`${Buffer.from(data.content)}`);
      const object = JSON.parse(`${Buffer.from(data.content)}`);

      await EmailService.sendEmail(
        ServerConfig.FLIGHT_EMAIL,
        object.recepientEmail,
        object.subject,
        object.text
      );
      channel.ack(data);
    });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createTicket,
  connectQueue,
};
