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
exports.validateFields = exports.validateJwt = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJwt = (req, res, next) => {
    next();
    return;
    if (!req.headers.authorization) {
        res.status(403).send({
            message: "No auth was sended",
        });
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            res.status(403).send({ message: err.message });
            return;
        }
        req.body.user = user;
        next();
    });
};
exports.validateJwt = validateJwt;
const validateFields = (validations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        for (const validation of validations) {
            const result = yield validation.run(req);
            if (result.errors.length)
                break;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else {
            next();
        }
    });
};
exports.validateFields = validateFields;
