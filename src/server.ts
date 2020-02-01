import app from "./app";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 8080;
const HOST = "0.0.0.0";

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);