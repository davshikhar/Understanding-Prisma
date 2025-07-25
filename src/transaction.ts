import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

//sequential transactions.
export async function account() {
    const accountCount = await prisma.account.count();
    if(accountCount>0){
        await prisma.account.deleteMany({});
    }

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


//Interactive transactions.
//here we must use "tx" since it is scoped to the specific transaction 
// and if we use the normal "prisma" client it will have no effect
export async function UpdateBalance(){
    const accountCount = await prisma.account.count();
    if(accountCount>0){
        await prisma.account.deleteMany({});
    }

    const user1 = await prisma.account.create({
        data:{
            email:"abc@gmail.com",
            balance:50
        }
    });
    const user2 = await prisma.account.create({
        data:{
            email:"xyz@gmail.com",
            balance:300
        }
    })

    try{
        await prisma.$transaction(async(tx)=>{
        
        const sender = await tx.account.update({
            data:{
                balance:{
                    decrement:100,
                }
            },
            where:{
                email:"abc@gmail.com"
            }
        });

        //this is an operation performed in between the queries.
        if(sender.balance<0){
            throw new Error(`${user1} has insufficient balance`);
        }

        const receiver = await tx.account.update({
            data:{
                balance:{
                    increment:100
                }
            },
            where:{
                email:"xyz@gmail.com"
            }
        });

    })
    }catch(e){
        console.log("Error sending requests to db :-"+e);
    }
}