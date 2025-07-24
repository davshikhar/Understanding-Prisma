import  express  from "express";
import { PrismaClient } from "../generated/prisma";

const app = express();
const client = new PrismaClient();//create the instance of the PrismaClient

app.use(express.json());

app.get("/users",async (req,res)=>{

    const users = await client.user.findMany({
        include:{
            todo:true
        }
    });

    console.log(users);

    res.json({message:"check the console for the logs.",users});
})

app.listen(3000);

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