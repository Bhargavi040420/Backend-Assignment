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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.deleteUserById = exports.deleteAllUsers = exports.loadUsersWithPostsAndComments = exports.fetchUsersFromAPI = void 0;
const userModel_1 = require("../models/userModel");
const postModel_1 = require("../models/postModel");
const fetchUsersFromAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch users from API');
    }
    return response.json();
});
exports.fetchUsersFromAPI = fetchUsersFromAPI;
const loadUsersWithPostsAndComments = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, exports.fetchUsersFromAPI)();
    const userCollection = (0, userModel_1.getUserCollection)();
    const postCollection = (0, postModel_1.getPostCollection)();
    for (const user of users.slice(0, 10)) {
        // Fetch posts for each user
        const postsResponse = yield fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        const posts = yield postsResponse.json();
        // Fetch comments for each post
        for (const post of posts) {
            const commentsResponse = yield fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
            const comments = yield commentsResponse.json();
            post.comments = comments;
        }
        user.posts = posts;
        // Insert user with posts into MongoDB
        yield userCollection.insertOne(user);
        // Also insert posts separately for easier querying
        for (const post of posts) {
            yield postCollection.insertOne(Object.assign(Object.assign({}, post), { userId: user.id }));
        }
    }
});
exports.loadUsersWithPostsAndComments = loadUsersWithPostsAndComments;
const deleteAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userCollection = (0, userModel_1.getUserCollection)();
    yield userCollection.deleteMany({});
});
exports.deleteAllUsers = deleteAllUsers;
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCollection = (0, userModel_1.getUserCollection)();
    const result = yield userCollection.deleteOne({ id: userId });
    return result.deletedCount > 0;
});
exports.deleteUserById = deleteUserById;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCollection = (0, userModel_1.getUserCollection)();
    const postCollection = (0, postModel_1.getPostCollection)();
    const user = yield userCollection.findOne({ id: userId });
    if (!user)
        return null;
    const posts = yield postCollection.find({ userId: user.id }).toArray();
    user.posts = posts;
    return user;
});
exports.getUserById = getUserById;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userCollection = (0, userModel_1.getUserCollection)();
    const existingUser = yield userCollection.findOne({ id: user.id });
    if (existingUser) {
        throw new Error('User already exists.');
    }
    yield userCollection.insertOne(user);
    return user;
});
exports.createUser = createUser;
