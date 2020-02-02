import * as express from "express";
import * as https from "https";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import database from "./config/database";
import * as dotenv from "dotenv";
import helmet from "helmet";
import fs from "fs";

dotenv.config();

/**
 * express configuration
 */

export default class App{
    static PORT: number;
    public app: express.Application;
    public routes: Routes;


    constructor(port: number = 443){
        App.PORT = port;

        this.app = express.default();
        this.routes = new Routes(this.app);

        this.expressConfig();

        this.routes.define();
    }

    expressConfig(){
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    start(){
        database.sync({force:true})
            .then(()=>{


            const cert = "";

            

            const key = "";
                

                https.createServer({
                    key: key,
                    cert: cert
                },this.app).listen(App.PORT,()=>{
                    console.log("Running on localhost:"+process.env.PORT);
                });
            });
    }
}
