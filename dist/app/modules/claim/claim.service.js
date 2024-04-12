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
exports.claimServices = void 0;
const jwtToken_1 = require("./../../utils/jwtToken");
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const prisma = new client_1.PrismaClient();
const createClaim = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    payload.userId = getUser.id;
    const result = yield prisma.claim.create({
        data: payload,
    });
    return result;
});
const getAllClaim = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const result = yield prisma.claim.findMany({
        include: {
            foundItem: {
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
                    category: true,
                },
            },
        },
    });
    return result;
});
const updateClaimStatus = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const result = yield prisma.claim.update({
        where: {
            id: data.id,
        },
        data: {
            status: data.status,
        },
    });
    return result;
});
exports.claimServices = {
    createClaim,
    getAllClaim,
    updateClaimStatus,
};
