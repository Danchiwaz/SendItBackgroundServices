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
exports.sendUserRegistrationEmails = void 0;
const config_1 = __importDefault(require("../config/config"));
const helpers_1 = require("../Helpers/helpers");
const ejs_1 = __importDefault(require("ejs"));
const Email_1 = __importDefault(require("../Helpers/Email"));
const sendUserRegistrationEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield config_1.default.query(`SELECT public.GetAllUsersToSendEmail()`);
    users = (0, helpers_1.parseDatabaseData)(users, "getalluserstosendemail");
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
});
exports.sendUserRegistrationEmails = sendUserRegistrationEmails;
