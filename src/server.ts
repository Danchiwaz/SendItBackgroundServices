import express from "express";
import cron from 'node-cron';
import { sendUserRegistrationEmails } from "./EmailService/emailService";
import sendMail from "./Helpers/Email";

const app = express();

const run = () =>{
    cron.schedule("*/5 * * * * *", async () =>{
        console.log("Backgroundservice is running after every 5 sec");
        await sendUserRegistrationEmails();
    });
}

run();

app.listen(1400,() =>{
    console.log("App is listening to port 1400")
})