"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailParcelDeliverySender = exports.sendEmailParcelDeliveryReceiver = exports.sendEmailParcelReceiver = exports.sendEmailParcelSender = exports.sendUserRegistrationEmails = void 0;
const config_1 = __importDefault(require("../config/config"));
const helpers_1 = require("../Helpers/helpers");
const ejs_1 = __importDefault(require("ejs"));
const Email_1 = __importDefault(require("../Helpers/Email"));
const sendUserRegistrationEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield config_1.default.query(`SELECT public.GetAllUsersToSendEmail()`);
    users = (0, helpers_1.parseDatabaseData)(users, "getalluserstosendemail");
    if (users) {
        for (let user of users) {
            ejs_1.default.renderFile(__dirname + "/../../templates/registration.ejs", { username: user.username }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield (0, Email_1.default)(messageoption);
                    yield config_1.default.query(`CALL public.IsRegisterTrue('${user.username}')`);
                    console.log("Email is Sent");
                }
                catch (error) {
                    console.log(error);
                }
            }));
        }
    }
});
exports.sendUserRegistrationEmails = sendUserRegistrationEmails;
const sendEmailParcelSender = () => __awaiter(void 0, void 0, void 0, function* () {
    let parcels = yield config_1.default.query(`SELECT public.getAllParcels()`);
    parcels = (0, helpers_1.parseDatabaseData)(parcels, "getallparcels");
    // let senderEmail = await pool.query(
    //   `SELECT public.GetSenderEmail('Danchiwaz')`
    // );
    if (parcels.length > 0) {
        yield Promise.all(parcels.map((parcel, i) => __awaiter(void 0, void 0, void 0, function* () {
            let senderEmail = yield config_1.default.query(`SELECT public.GetSenderEmail('${parcel.sender}')`);
            senderEmail = (0, helpers_1.parseDatabaseData)(senderEmail, "getsenderemail");
            const tosenderEmail = senderEmail[0].email;
            ejs_1.default.renderFile(__dirname + "/../../templates/send.ejs", {
                sender: parcel.sender,
                receiver: parcel.receiver,
                trackingno: parcel.trackingno,
            }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield (0, Email_1.default)(messageoption);
                    yield config_1.default.query(`CALL public.IsSentTrue('${parcel.id}')`);
                    console.log("Email is Sent");
                }
                catch (error) {
                    console.log(error.message);
                }
            }));
        })));
    }
});
exports.sendEmailParcelSender = sendEmailParcelSender;
const sendEmailParcelReceiver = () => __awaiter(void 0, void 0, void 0, function* () {
    let parcels = yield config_1.default.query(`SELECT public.getAllParcels()`);
    parcels = (0, helpers_1.parseDatabaseData)(parcels, "getallparcels");
    let senderEmail = yield config_1.default.query(`SELECT public.GetSenderEmail('Danchiwaz')`);
    if (parcels.length > 0) {
        yield Promise.all(parcels.map((parcel, i) => __awaiter(void 0, void 0, void 0, function* () {
            let receiverEmail = yield config_1.default.query(`SELECT public.GetReceiverEmail('${parcel.receiver}')`);
            receiverEmail = (0, helpers_1.parseDatabaseData)(receiverEmail, "getreceiveremail");
            const toreciverEmail = receiverEmail[0].email;
            ejs_1.default.renderFile(__dirname + "/../../templates/receive.ejs", {
                sender: parcel.sender,
                receiver: parcel.receiver,
                trackingno: parcel.trackingno,
            }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield (0, Email_1.default)(messageoption);
                    yield config_1.default.query(`CALL public.IsSentTrue('${parcel.id}')`);
                    console.log("Email is Sent");
                }
                catch (error) {
                    console.log(error.message);
                }
            }));
        })));
    }
});
exports.sendEmailParcelReceiver = sendEmailParcelReceiver;
const sendEmailParcelDeliveryReceiver = () => __awaiter(void 0, void 0, void 0, function* () {
    let parcels = yield config_1.default.query(`SELECT public.GetAllDeliveredParcels()`);
    parcels = (0, helpers_1.parseDatabaseData)(parcels, "getalldeliveredparcels");
    let senderEmail = yield config_1.default.query(`SELECT public.GetSenderEmail('Danchiwaz')`);
    if (parcels.length > 0) {
        yield Promise.all(parcels.map((parcel, i) => __awaiter(void 0, void 0, void 0, function* () {
            let receiverEmail = yield config_1.default.query(`SELECT public.GetReceiverEmail('${parcel.receiver}')`);
            receiverEmail = (0, helpers_1.parseDatabaseData)(receiverEmail, "getreceiveremail");
            const toreciverEmail = receiverEmail[0].email;
            console.log(toreciverEmail);
            ejs_1.default.renderFile(__dirname + "/../../templates/receiverConfirm.ejs", {
                sender: parcel.sender,
                receiver: parcel.receiver,
                trackingno: parcel.trackingno,
            }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    return;
                }
                let messageoption = {
                    from: process.env.EMAIL_SENDER,
                    to: toreciverEmail,
                    subject: "Your Parcel Has Arrived",
                    html: data,
                };
                try {
                    yield (0, Email_1.default)(messageoption);
                    yield config_1.default.query(`  
             CALL public.UpdateParcelChecker('${parcel.id}')`);
                }
                catch (error) {
                    console.log(error.message);
                }
            }));
        })));
    }
});
exports.sendEmailParcelDeliveryReceiver = sendEmailParcelDeliveryReceiver;
const sendEmailParcelDeliverySender = () => __awaiter(void 0, void 0, void 0, function* () {
    let parcels = yield config_1.default.query(`SELECT public.GetAllDeliveredParcels()`);
    parcels = (0, helpers_1.parseDatabaseData)(parcels, "getalldeliveredparcels");
    let senderEmail = yield config_1.default.query(`SELECT public.GetSenderEmail('Danchiwaz')`);
    if (parcels.length > 0) {
        yield Promise.all(parcels.map((parcel, i) => __awaiter(void 0, void 0, void 0, function* () {
            let senderEmail = yield config_1.default.query(`SELECT public.GetSenderEmail('${parcel.sender}')`);
            senderEmail = (0, helpers_1.parseDatabaseData)(senderEmail, "getsenderemail");
            const tosenderEmail = senderEmail[0].email;
            ejs_1.default.renderFile(__dirname + "/../../templates/senderConfirm.ejs", {
                sender: parcel.sender,
                receiver: parcel.receiver,
                trackingno: parcel.trackingno,
            }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    return;
                }
                let messageoption = {
                    from: process.env.EMAIL_SENDER,
                    to: tosenderEmail,
                    subject: "Parcel Delivered ",
                    html: data,
                };
                try {
                    yield (0, Email_1.default)(messageoption);
                    yield config_1.default.query(`  
             CALL public.UpdateParcelChecker('${parcel.id}')`);
                }
                catch (error) {
                    console.log(error.message);
                }
            }));
        })));
    }
});
exports.sendEmailParcelDeliverySender = sendEmailParcelDeliverySender;
