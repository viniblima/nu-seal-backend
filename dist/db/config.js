"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
const sequelizeConnection = new sequelize_1.Sequelize((_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "postgres://user_admin_church_backend:bewrhuioogri12378tgyeoub@postgres:5432/database_name_church_backend", {
    dialectModule: pg_1.default,
});
exports.default = sequelizeConnection;
