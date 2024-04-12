"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const zodError_1 = __importDefault(require("../errors/zodError"));
const globalErrorHandler = (err, req, res, next) => {
    let message = err.message || "Something went wrong!";
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodError_1.default)(err);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message,
        errorDetails: err,
    });
};
exports.default = globalErrorHandler;
