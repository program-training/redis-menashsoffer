"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
const routes_1 = require("./home/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, dotenv_1.config)();
const { REDIS_PASSWORD, REDIS_PORT, EXPRESS_BASE_URL, EXPRESS_PORT } = process.env;
exports.client = (0, redis_1.createClient)({
    password: REDIS_PASSWORD,
    socket: {
        host: "redis-11875.c323.us-east-1-2.ec2.cloud.redislabs.com",
        port: Number(REDIS_PORT),
    },
});
app.listen(EXPRESS_PORT, () => {
    console.log(`listening on: ${EXPRESS_BASE_URL}${EXPRESS_PORT}`);
    exports.client
        .connect()
        .then(() => console.log("connected successfully to Redis client!!! "))
        .catch((error) => {
        if (error instanceof Error)
            console.log(error.message);
    });
});
app.get("/", (req, res) => {
    (0, routes_1.handlePropsRequest)(req, res);
});
app.get("/user", (req, res) => {
    (0, routes_1.handleGetUser)(res);
});
app.post("/registerUser", (req, res) => {
    (0, routes_1.handleRegisterUser)(req, res);
});
app.get("/returnPassword", (req, res) => {
    (0, routes_1.handleReturnPassword)(req, res);
});
app.post("/registerUsers", (req, res) => {
    (0, routes_1.handleRegisterUsers)(req, res);
});
app.get("/receiveArrayReturnsObject", (req, res) => {
    (0, routes_1.receiveArrayReturnsObject)(req, res);
});
