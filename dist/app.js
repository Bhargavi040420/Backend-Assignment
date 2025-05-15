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
const db_1 = require("./config/db");
const api_1 = __importDefault(require("./routes/api"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Initialize database connection and collections
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.connectToDatabase)();
        (0, models_1.initUserCollection)(db);
        (0, models_1.initPostCollection)(db);
        (0, models_1.initCommentCollection)(db);
        console.log('Database connection established');
    }
    catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
}))();
// API routes
app.use('/api', api_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
exports.default = app;
