import { Request, Response, Application } from "express";
import { NodesController } from "../controllers/nodes.controller";
import { LinksController } from "../controllers/links.controller";


export class Routes {;
  public nodesController: NodesController;
  public linksController: LinksController;
  private app: Application;

  constructor(app: Application){
    this.app = app;

    this.nodesController = new NodesController();
    this.linksController = new LinksController();

  }

  public define(): void {
    
    this.app.route("/nodes")
      .get(this.nodesController.index)
      .post(this.nodesController.create);

    this.app.route("/nodes/:id")
      .get(this.nodesController.show)
      .put(this.nodesController.update)
      .delete(this.nodesController.delete);

    this.app
      .route("/links")
      .get(this.linksController.index)
      .post(this.linksController.create);

    this.app
      .route("/links/:id")
      .get(this.linksController.show)
      .put(this.linksController.update)
      .delete(this.linksController.delete);
  }
  
}