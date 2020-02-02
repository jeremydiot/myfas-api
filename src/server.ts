import app from "./app";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(<string>process.env.PORT,10);
const HOST = "0.0.0.0";

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);