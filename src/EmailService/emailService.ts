import pool from "../config/config"
import { parseDatabaseData } from "../Helpers/helpers";
import ejs from "ejs";
import sendMail from "../Helpers/Email";


export const sendUserRegistrationEmails = async() =>{
    let users = await pool.query(`SELECT public.GetAllUsersToSendEmail()`);
     users = parseDatabaseData(users, "getalluserstosendemail");
    for (let user of users) {
      ejs.renderFile(
        __dirname + "/../../templates/registration.ejs",
        { username: user.username },
        async (error, data) => {
          if (error) {
            console.log(error);
            return;
          }
          let messageoption = {
            from: process.env.EMAIL_SENDER,
            to: user.email,
            subject: "Registration Successfull",
            html: data,
          };

          try {
            await sendMail(messageoption);
            await pool.query(`CALL public.IsRegisterTrue('${user.username}')`);
            console.log("Email is Sent");
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
    
}