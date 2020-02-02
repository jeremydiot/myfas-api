import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";

/**
 * express configuration
 */
let app: express.Application =  express.default();
let routes: Routes = new Routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.define();


export default app;
