import { PrismaClient } from "../generated/prisma";

const client = new PrismaClient();

//this file is to seed some data into the db to show some data to the user 
// when they maybe clone the repo

//this file adds some dummy data to the db for user's convenience
// so that when new user clones this codebase they see some data in db
async function createDummyUser() {
    try{
    await client.user.create({
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
    catch(e){
        console.log("Error sending the data: "+e);
        throw e;
    }
}

createDummyUser();