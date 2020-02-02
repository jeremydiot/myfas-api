import app from "./app";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

app.listen(PORT,()=>{
    console.log("Running on localhost:"+process.env.PORT);
});