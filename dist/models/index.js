"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentCollection = exports.initCommentCollection = exports.getPostCollection = exports.initPostCollection = exports.getUserCollection = exports.initUserCollection = void 0;
// src/models/index.ts
var userModel_1 = require("./userModel");
Object.defineProperty(exports, "initUserCollection", { enumerable: true, get: function () { return userModel_1.initUserCollection; } });
Object.defineProperty(exports, "getUserCollection", { enumerable: true, get: function () { return userModel_1.getUserCollection; } });
var postModel_1 = require("./postModel");
Object.defineProperty(exports, "initPostCollection", { enumerable: true, get: function () { return postModel_1.initPostCollection; } });
Object.defineProperty(exports, "getPostCollection", { enumerable: true, get: function () { return postModel_1.getPostCollection; } });
var commentModel_1 = require("./commentModel");
Object.defineProperty(exports, "initCommentCollection", { enumerable: true, get: function () { return commentModel_1.initCommentCollection; } });
Object.defineProperty(exports, "getCommentCollection", { enumerable: true, get: function () { return commentModel_1.getCommentCollection; } });
