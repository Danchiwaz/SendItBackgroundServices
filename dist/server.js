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
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const emailService_1 = require("./EmailService/emailService");
const app = (0, express_1.default)();
const run = () => {
    node_cron_1.default.schedule("*/5 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, emailService_1.sendUserRegistrationEmails)();
        (0, emailService_1.sendEmailParcelSender)();
        (0, emailService_1.sendEmailParcelReceiver)();
    }));
};
run();
app.listen(1400, () => {
    console.log("App is listening to port 1400");
});
