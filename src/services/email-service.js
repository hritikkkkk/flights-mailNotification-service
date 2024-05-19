const { TicketRepository } = require("../repositories");
const { MAILER } = require("../config");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const ticketRepository = new TicketRepository();

const sendEmail = async (sender, receiver, subject, text) => {
  try {
    const response = await MAILER.sendMail({
      from: sender,
      to: receiver,
      subject: subject,
      text: text,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot send Mails at this moment",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    p;
  }
};

const createTicket = async (data) => {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot create a new ticket object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getPendingEmails = async () => {
  try {
    const response = await ticketRepository.pendingTickets();
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  sendEmail,
  createTicket,
  getPendingEmails,
};
