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
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveArrayReturnsObject = exports.handleRegisterUsers = exports.handleReturnPassword = exports.handleRegisterUser = exports.handleGetUser = exports.handlePropsRequest = void 0;
const __1 = require("..");
const handlePropsRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { test } = req.query;
        if (test) {
            yield __1.client.set("test", String(test));
        }
        const data = yield __1.client.get("test");
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
});
exports.handlePropsRequest = handlePropsRequest;
const handleGetUser = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const PASSWORD_PREFIX = "pwd:12345";
    const user = {
        name: "John Doe",
        password: "somePassword123",
    };
    try {
        yield __1.client.set(`${PASSWORD_PREFIX}${user.name}`, user.password);
        const password = yield __1.client.get(`${PASSWORD_PREFIX}${user.name}`);
        res.send(password);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
});
exports.handleGetUser = handleGetUser;
const handleRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, password } = req.body;
        yield __1.client.hSet(`user:${id}`, {
            name: name,
            password: password,
        });
        const regUser = yield __1.client.hGetAll(`user:${id}`);
        res.send(regUser);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
});
exports.handleRegisterUser = handleRegisterUser;
const handleReturnPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, password } = req.body;
        yield __1.client.hSet(`user:${id}`, {
            name: name,
            password: password,
        });
        const getPassword = yield __1.client.hGet(`user:${id}`, "password");
        res.send(getPassword);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
});
exports.handleReturnPassword = handleReturnPassword;
const handleRegisterUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = req.body;
        // users.forEach(async (user: User) => {
        //   await client.hSet(`user:${user.name}`, "password", user.password);
        // });
        const jsonArray = JSON.stringify(users);
        yield __1.client.set("users", jsonArray);
        res.send("Users saved to Redis successfully!");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
});
exports.handleRegisterUsers = handleRegisterUsers;
const receiveArrayReturnsObject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = req.body;
        res.send("Users saved to Redis successfully!");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
});
exports.receiveArrayReturnsObject = receiveArrayReturnsObject;
