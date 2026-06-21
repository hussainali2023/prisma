import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient({
accelerateUrl:`${process.env.DB_URL}`
})



async function main(){
    const result = prisma.user.findFirst
    console.log(result);
}

main()