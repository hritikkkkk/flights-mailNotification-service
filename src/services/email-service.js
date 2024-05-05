const { TicketRepository } = require("../repositories");
const { MAILER } = require("../config");
const AppError = require("../utils/errors/app-error");

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
    throw error;
  }
};

const createTicket = async (data) => {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPendingEmails = async () => {
  try {
    const response = await ticketRepository.pendingTickets();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  createTicket,
  getPendingEmails,
};
