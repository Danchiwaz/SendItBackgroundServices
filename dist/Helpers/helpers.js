"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDatabaseData = void 0;
const parseDatabaseData = (data, name) => {
    const datareturned = data.rows[0][name];
    return datareturned !== null && datareturned !== void 0 ? datareturned : [];
    // console.log(users.rows[0]["getalluserstosendemail"]);
};
exports.parseDatabaseData = parseDatabaseData;
