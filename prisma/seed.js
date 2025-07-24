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
const prisma_1 = require("../generated/prisma");
const client = new prisma_1.PrismaClient();
//this file is to seed some data into the db to show some data to the user 
// when they maybe clone the repo
//this file adds some dummy data to the db for user's convenience
// so that when new user clones this codebase they see some data in db
function createDummyUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.user.create({
                data: {
                    username: "xyz",
                    age: 10,
                    city: "abc",
                    password: "def123",
                    todo: {
                        create: {
                            description: "Go gym",
                            title: "Gym",
                            done: false
                        }
                    }
                }
            });
        }
        catch (e) {
            console.log("Error sending the data: " + e);
            throw e;
        }
    });
}
createDummyUser();
