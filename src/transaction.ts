import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function account() {
    const user1 = await prisma.account.create({
        data: {
            email: "aditya@gmail.com",
            balance: 200
        }
    })
    const user2 = await prisma.account.create({
        data: {
            email: "shikhar@gmail.com",
            balance: 100,
        }
    });
    const totalEntries = await prisma.account.count();

    if (totalEntries > 1) {
        try {
            const [user1account, user2account] = await prisma.$transaction([
                prisma.account.update({
                    data: {
                        balance: {
                            decrement: 100,
                        }
                    },
                    where: {
                        email: "aditya@gmail.com",
                    },
                }),
                prisma.account.update({
                    data: {
                        balance: {
                            increment: 100,
                        }
                    },
                    where: {
                        email: "shikhar@gmail.com",
                    },
                }),
            ]);
            console.log("user1account:- "+user1account);
            console.log("user2account:- "+user2account);

        } catch (error) {
            console.log("Error running the transaction:-" + error);
        }
    }
}