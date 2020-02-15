import { Request, Response, Application } from "express";
import { UsersController } from "../controllers/users.controller"
// import { NodesController } from "../controllers/nodes.controller";
// import { LinksController } from "../controllers/links.controller";


export class Routes {
  public userController: UsersController;
  // public nodesController: NodesController;
  // public linksController: LinksController;
  private app: Application;

  constructor(app: Application){
    this.app = app;

    this.userController = new UsersController();
    // this.nodesController = new NodesController();
    // this.linksController = new LinksController();

  }

  public define(): void {

    this.app.route("/users/:uuid")
      .get(this.userController.readOne);
    //   .put(this.userController.update)
    //   .delete(this.userController.delete);

    this.app.route("/users")
      .get(this.userController.readAll)
      .post(this.userController.create);

    // this.app.route("/media")
    //   .get() //show
    //   .post() //create
    //   .put() //update
    //   .delete(); //remove

    // this.app.route("/source")
    //   .get() //show
    //   .post() //create
    //   .put() //update
    //   .delete(); //remove
    
  //   this.app.route("/nodes")
  //     .get(this.nodesController.index)
  //     .post(this.nodesController.create);

  //   this.app.route("/nodes/:id")
  //     .get(this.nodesController.show)
  //     .put(this.nodesController.update)
  //     .delete(this.nodesController.delete);

  //   this.app
  //     .route("/links")
  //     .get(this.linksController.index)
  //     .post(this.linksController.create);

  //   this.app
  //     .route("/links/:id")
  //     .get(this.linksController.show)
  //     .put(this.linksController.update)
  //     .delete(this.linksController.delete);
  }
  
}