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
exports.lostItemService = void 0;
const client_1 = require("@prisma/client");
const jwtToken_1 = require("../../utils/jwtToken");
const config_1 = __importDefault(require("../../config"));
const pagination_1 = require("../../utils/pagination");
const lostItem_constant_1 = require("./lostItem.constant");
const prisma = new client_1.PrismaClient();
const createLostItem = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma.lostItem.create({
        data: payload,
    });
    return result;
});
const getLostItem = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const result = yield prisma.lostItem.findMany({
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
const getAllLostItem = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const { limit, page, skip } = (0, pagination_1.calculatePagination)(options);
    const allQuery = [];
    if (query.searchTerm) {
        allQuery.push({
            OR: lostItem_constant_1.itemSearchAbleFields.map((properites) => ({
                [properites]: {
                    contains: query.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        allQuery.push({
            AND: Object.keys(filterData).map((properties) => ({
                [properties]: {
                    equals: filterData[properties],
                },
            })),
        });
    }
    const result = yield prisma.lostItem.findMany({
        where: {
            AND: allQuery,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { createdAt: "desc" },
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
    const total = yield prisma.lostItem.count({
        where: {
            AND: allQuery,
        },
    });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const updateLostItemStatus = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwtToken_1.jwtToken.verifyToken(token, config_1.default.jwt_secret);
    const getUser = yield prisma.user.findUniqueOrThrow({
        where: {
            email: decoded.email,
        },
    });
    if (!getUser) {
        throw new Error("User not found");
    }
    const result = yield prisma.lostItem.update({
        where: {
            id: data.id,
        },
        data: { foundStatus: "FOUND" },
    });
    return result;
});
exports.lostItemService = {
    createLostItem,
    getLostItem,
    getAllLostItem,
    updateLostItemStatus
};
