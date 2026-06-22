import 'dotenv/config'
import app from "./app"
import { prisma } from "./lib/prisma";
import port from "./config/index"
import config from './config/index';

// const PORT = port.port
const PORT = config.port

async function main(){
    try{
    await prisma.$connect()
     app.listen(PORT, () =>{
        console.log(`Server is running on port: ${PORT}`);
     })
    }

    catch(error){
        console.error(`Error in starting the server`, error)
        process.exit(1)

    }
}

main()