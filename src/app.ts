import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import database from "./config/database";
import * as dotenv from 'dotenv';

dotenv.config();



// import {Link as LinkModel} from "./models/link.model";
// import {Node as NodeModel} from "./models/node.model";

/**
 * express configuration
 */

export default class App{
    static PORT: number;
    public app: express.Application;
    public routes: Routes;

    constructor(port: number = 3000){
        App.PORT = port;
        this.app = express.default();
        this.routes = new Routes(this.app);

        this.expressConfig();

        this.routes.define();
    }

    expressConfig(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    start(){
        database.sync({force:true})
            .then(()=>{
                this.app.listen(App.PORT,()=>{
                    console.log("Running on localhost:"+process.env.PORT);
                });
            });
    }
}
