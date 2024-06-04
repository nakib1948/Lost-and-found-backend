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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const jwtToken_1 = require("../../utils/jwtToken");
const config_1 = __importDefault(require("../../config"));
const prisma = new client_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile } = data, userData = __rest(data, ["profile"]);
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createuser = yield transactionClient.user.create({
            data: userData,
        });
        const createUserProfile = yield transactionClient.userProfile.create({
            data: Object.assign({ userId: createuser.id }, profile),
        });
        const user = Object.assign(Object.assign({}, createuser), { profile: createUserProfile });
        return user;
    }));
    return result;
});
const getAllUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
            role: "ADMIN"
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const result = yield prisma.user.findMany({});
    return result;
});
const updateUserStatus = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const result = yield prisma.user.update({
        where: {
            id: data.id,
        },
        data: { isDeleted: data.status },
    });
    return result;
});
const getAllStatistics = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const totalFoundItem = yield prisma.foundItem.count({});
    const totalLostItem = yield prisma.lostItem.count({});
    const totalUser = yield prisma.user.count({});
    const totalBlockUser = yield prisma.user.count({
        where: {
            isDeleted: "block"
        }
    });
    const ownerFound = yield prisma.foundItem.count({
        where: {
            status: "Found"
        }
    });
    const result = { totalFoundItem, totalLostItem, totalUser, totalBlockUser, ownerFound };
    return result;
});
exports.userService = {
    createUser,
    getAllUser,
    updateUserStatus,
    getAllStatistics
};
