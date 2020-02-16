import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import { database } from "./config/database";
import * as dotenv from "dotenv";
import helmet from "helmet";
import { ConfigDatabase } from "./config/config.database";



dotenv.config();

/**
 * express configuration
 */

export default class App{
    public port: number;
    public app: express.Application;
    public routes: Routes;


    constructor(){
        this.port = 3000;

        this.app = express.default();
        this.routes = new Routes(this.app);

        if(process.env.NODE_ENV === "development"){
            const swaggerUi = require("swagger-ui-express");
            const swaggerDocument = require("../swagger.json")

            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }

        // app configuration
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // define route to app
        this.routes.define();
    }

    async start(){
        let databaseSyncOptions={force:false};
        if(process.env.NODE_ENV === "test") databaseSyncOptions.force=true;

        await database.sync(databaseSyncOptions);

        await ConfigDatabase.up(database);
            
        this.app.listen(this.port,()=>{
            console.log("Running on localhost:"+process.env.PORT);
        });
    }
}
