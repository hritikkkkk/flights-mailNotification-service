const { StatusCodes } = require("http-status-codes");
const { EmailService } = require("../services");

const createTicket = async (req, res) => {
  try {
    const response = await EmailService.createTicket({
      subject: req.body.subject,
      content: req.body.content,
      recepientEmail: req.body.recepientEmail,
    });
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  createTicket,
};
