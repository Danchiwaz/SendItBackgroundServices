"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
});
exports.default = pool;
