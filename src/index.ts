import  express  from "express";
import { PrismaClient } from "../generated/prisma";
import { account, UpdateBalance } from "./transaction";

const app = express();
const client = new PrismaClient();//create the instance of the PrismaClient

app.use(express.json());

app.get("/users/findall",async (req,res)=>{

    const count = await client.user.count();

    const users = await client.user.findMany({
        include:{
            todo:true
        }
    });

    console.log(users);

    res.json({users,count:count});
})

app.listen(3000);

account();
UpdateBalance();

/*
async function createUser() {
    const user = await client.user.findFirst({
        where: {
            id:1
        },
        include:{
            todo:true
        }
    });

    //user can be null also since the user with specific might also not exist in the db.

    console.log(`username ${user?.username}`);
    console.log(user);
}

createUser();
*/