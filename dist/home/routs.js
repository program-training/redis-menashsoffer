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
exports.handleRequest = void 0;
const __1 = require("..");
const handleRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { test } = req.query;
        if (test) {
            yield __1.client.set('test', String(test));
        }
        const data = yield __1.client.get('test');
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }
});
exports.handleRequest = handleRequest;
