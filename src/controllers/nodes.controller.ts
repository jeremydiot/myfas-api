import { Request, Response } from "express";

export class NodesController {
  public index(req: Request, res: Response) {
    res.json({
      message: "Hello index"
    });
  }

  public node(req: Request, res: Response) {
    res.json({
      message: "Hello node"
    });
  }
}