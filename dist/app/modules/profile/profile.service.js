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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileServices = void 0;
const jwtToken_1 = require("./../../utils/jwtToken");
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const prisma = new client_1.PrismaClient();
const getProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const result = yield prisma.userProfile.findFirstOrThrow({
        where: {
            userId: getUser.id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });
    return result;
});
const updateProfile = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const { name, email } = data, rest = __rest(data, ["name", "email"]);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const getUserProfile = yield prisma.userProfile.findFirstOrThrow({
        where: {
            userId: getUser.id,
        },
    });
    yield prisma.user.update({
        where: {
            id: getUser.id,
        },
        data: { name, email },
    });
    const result = yield prisma.userProfile.update({
        where: {
            id: getUserProfile.id,
        },
        data: rest,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });
    const accessToken = jwtToken_1.jwtToken.generateToken({
        email: result.user.email,
        role: result.user.role,
    }, config_1.default.jwt_secret, config_1.default.expires_in);
    return { result, token: accessToken };
});
const updatePassword = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    if (data.oldpassword !== getUser.password) {
        throw new Error("Old password don't matched! Try Again");
    }
    const result = yield prisma.user.update({
        where: {
            id: getUser.id,
        },
        data: { password: data.newpassword },
    });
    return result;
});
exports.profileServices = {
    getProfile,
    updateProfile,
    updatePassword
};
