import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";

import {Link as LinkModel} from "./models/link.model";
import {Node as NodeModel} from "./models/node.model";

/**
 * express configuration
 */

class App{
    public app: express.Application;
    public routes: Routes;

    constructor(){
        this.app = express.default();
        this.routes = new Routes(this.app);

        this.expressConfig();

        this.sequelizeConfig();

        this.routes.define();
    }

    expressConfig(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    async sequelizeConfig(){
        await NodeModel.sync({force:true});
        await LinkModel.sync({force:true});
    }
}

export default new App().app;
