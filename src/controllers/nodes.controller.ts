import { Request, Response } from "express";
import { Node } from "../models/node.model";

export class NodesController {
  
  public index(req: Request, res: Response) {
    Node.findAll<Node>({})
      .then((nodes: Array<Node>) => res.json(nodes))
      .catch((err: Error) => res.status(500).json(err));
  }

  // public index(req: Request, res: Response) {
  //   res.json({
  //     message: "Hello index"
  //   });
  // }

  // public node(req: Request, res: Response) {
  //   res.json({
  //     message: "Hello node"
  //   });
  // }
}