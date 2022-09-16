import express from "express";
import cron from "node-cron";
import {
  sendEmailParcelDeliveryReceiver,
  sendEmailParcelDeliverySender,
    sendEmailParcelReceiver,
  sendEmailParcelSender,
  sendUserRegistrationEmails,
} from "./EmailService/emailService";
import sendMail from "./Helpers/Email";

const app = express();

const run = () => {
  cron.schedule("*/5 * * * * *", async () => {
    sendUserRegistrationEmails();
    sendEmailParcelSender();
    sendEmailParcelReceiver();
    sendEmailParcelDeliveryReceiver();
    sendEmailParcelDeliverySender();
    console.log("=============================================");
    
  });
};

run();

app.listen(1400, () => {
  console.log("App is listening to port 1400");
});
