"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    let allErrorMessage = "";
    err.issues.forEach((issue) => (allErrorMessage += issue.message + "."));
    return {
        message: allErrorMessage,
    };
};
exports.default = handleZodError;
