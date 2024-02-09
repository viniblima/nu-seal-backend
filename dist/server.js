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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const routes_1 = __importDefault(require("./api/routes"));
const init_1 = __importDefault(require("./db/init"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json({ limit: "50mb" }));
const isProduction = process.env.NODE_ENV === "production";
dotenv_1.default.config(); //Reads .env file and makes it accessible via process.env
const pool = new pg_1.Pool({
    connectionString: isProduction
        ? process.env.HEROKU_POSTGRESQL_CRIMSON_URL
        : process.env.DATABASE_URL,
    // ssl: isProduction,
    ssl: isProduction
        ? {
            rejectUnauthorized: false,
        }
        : false,
});
app.use(express_1.default.json());
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
        (0, init_1.default)();
    }
    catch (err) {
        console.log(err);
    }
});
connectToDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
    console.log(new Date());
});
//app.use("/upload", validateJwt, express.static("upload"));
app.use("/api/v1", routes_1.default);
