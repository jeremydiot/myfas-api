import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";


// defeult variables in docker
const app = express.default();
const PORT = 8080;
const HOST = "0.0.0.0";
const DB_PORT = 5432;


class App {
    public app: express.Application;
    public routePrv: Routes;

    constructor(){
        this.app = express.default();
        this.routePrv = new Routes();
        
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
    
export default new App().app;