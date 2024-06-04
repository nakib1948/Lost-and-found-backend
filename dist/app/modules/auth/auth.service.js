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
exports.authService = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const jwtToken_1 = require("../../utils/jwtToken");
const prisma = new client_1.PrismaClient();
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const userExist = yield prisma.user.findUniqueOrThrow({
        where: { email, isDeleted: "unblock" },
    });
    if (userExist.password !== password)
        throw new Error("Password don't matched");
    const accessToken = jwtToken_1.jwtToken.generateToken({
        email: userExist.email,
        role: userExist.role,
    }, config_1.default.jwt_secret, config_1.default.expires_in);
    return {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        token: accessToken,
    };
});
exports.authService = {
    login,
};
