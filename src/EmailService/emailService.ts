import pool from "../config/config";
import { parseDatabaseData } from "../Helpers/helpers";
import ejs from "ejs";
import sendMail from "../Helpers/Email";

export const sendUserRegistrationEmails = async () => {
  let users = await pool.query(`SELECT public.GetAllUsersToSendEmail()`);

  
  users = parseDatabaseData(users, "getalluserstosendemail");
  if(users){
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
};

export const sendEmailParcelSender = async () => {
  let parcels = await pool.query(`SELECT public.getAllParcels()`);

  parcels = parseDatabaseData(parcels, "getallparcels");

  let senderEmail = await pool.query(
    `SELECT public.GetSenderEmail('Danchiwaz')`
  );  

  if(parcels.length > 0){
    await Promise.all(
      parcels.map(async (parcel: any, i: number) => {
        let senderEmail = await pool.query(
          `SELECT public.GetSenderEmail('${parcel.sender}')`
        );

        senderEmail = parseDatabaseData(senderEmail, "getsenderemail");
        const tosenderEmail = senderEmail[0].email;

        // senderEmail = parseDatabaseData(senderEmail, "getsenderemail");
        ejs.renderFile(
          __dirname + "/../../templates/send.ejs",
          {
            sender: parcel.sender,
            receiver: parcel.receiver,
            trackingno: parcel.trackingno,
          },
          async (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            let messageoption = {
              from: process.env.EMAIL_SENDER,
              to: tosenderEmail,
              subject: "Parcel Has been Dispatched",
              html: data,
            };

            try {
              await sendMail(messageoption);
              await pool.query(`CALL public.IsSentTrue('${parcel.id}')`);
              console.log("Email is Sent");
            } catch (error: any) {
              console.log(error.message);
            }
          }
        );
      })
    );
  }

  // for (let parcel of parcels) {

  //   let senderEmail = await pool.query(`SELECT public.GetSenderEmail('${parcel.sender}')`);

  //   senderEmail = parseDatabaseData(senderEmail, "getsenderemail");
  //   const tosenderEmail = senderEmail[0].email

  //   // senderEmail = parseDatabaseData(senderEmail, "getsenderemail");
  //   ejs.renderFile(
  //     __dirname + "/../../templates/send.ejs",
  //     { sender: parcel.sender, receiver:parcel.receiver },
  //     async (error, data) => {
  //       if (error) {
  //         console.log(error);
  //         return;
  //       }
  //       let messageoption = {
  //         from: process.env.EMAIL_SENDER,
  //         to: tosenderEmail,
  //         subject: "Registration Successfull",
  //         html: data,
  //       };

  //       try {
  //         await sendMail(messageoption);
  //         await pool.query(
  //           `CALL public.IsSentTrue('${parcel.id}')`
  //         );
  //         console.log("Email is Sent");
  //       } catch (error: any) {
  //         console.log(error.message);
  //       }
  //     }
  //   );
  // }
};


export const sendEmailParcelReceiver = async () => {
  let parcels = await pool.query(`SELECT public.getAllParcels()`);

  parcels = parseDatabaseData(parcels, "getallparcels");

  let senderEmail = await pool.query(
    `SELECT public.GetSenderEmail('Danchiwaz')`
  );

  if (parcels.length > 0) {
    await Promise.all(
      parcels.map(async (parcel: any, i: number) => {
        let senderEmail = await pool.query(
          `SELECT public.GetReceiverEmail('${parcel.receiver}')`
        );

        senderEmail = parseDatabaseData(senderEmail, "getreceiveremail");
        const toreciverEmail = senderEmail[0].email;

        // senderEmail = parseDatabaseData(senderEmail, "getsenderemail");
        ejs.renderFile(
          __dirname + "/../../templates/receive.ejs",
          { sender: parcel.sender, receiver: parcel.receiver, trackingno:parcel.trackingno },
          async (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            let messageoption = {
              from: process.env.EMAIL_SENDER,
              to: toreciverEmail,
              subject: "You have been sent a parcels",
              html: data,
            };

            try {
              await sendMail(messageoption);
              await pool.query(`CALL public.IsSentTrue('${parcel.id}')`);
              console.log("Email is Sent");
            } catch (error: any) {
              console.log(error.message);
            }
          }
        );
      })
    );
  }

  // for (let parcel of parcels) {

  //   let senderEmail = await pool.query(`SELECT public.GetSenderEmail('${parcel.sender}')`);

  //   senderEmail = parseDatabaseData(senderEmail, "getsenderemail");
  //   const tosenderEmail = senderEmail[0].email

  //   // senderEmail = parseDatabaseData(senderEmail, "getsenderemail");
  //   ejs.renderFile(
  //     __dirname + "/../../templates/send.ejs",
  //     { sender: parcel.sender, receiver:parcel.receiver },
  //     async (error, data) => {
  //       if (error) {
  //         console.log(error);
  //         return;
  //       }
  //       let messageoption = {
  //         from: process.env.EMAIL_SENDER,
  //         to: tosenderEmail,
  //         subject: "Registration Successfull",
  //         html: data,
  //       };

  //       try {
  //         await sendMail(messageoption);
  //         await pool.query(
  //           `CALL public.IsSentTrue('${parcel.id}')`
  //         );
  //         console.log("Email is Sent");
  //       } catch (error: any) {
  //         console.log(error.message);
  //       }
  //     }
  //   );
  // }
};