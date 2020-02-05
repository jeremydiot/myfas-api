import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import database from "./config/database";
import * as dotenv from "dotenv";
import helmet from "helmet";


dotenv.config();

/**
 * express configuration
 */

export default class App{
    public port: number;
    public app: express.Application;
    public routes: Routes;


    constructor(port: number = 3000){
        this.port = port;

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
                this.app.listen(this.port,()=>{
                    console.log("Running on localhost:"+process.env.PORT);
                    
                });
            });
    }
}
