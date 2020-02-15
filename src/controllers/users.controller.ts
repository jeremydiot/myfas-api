import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { strict } from "assert";

export class UsersController {
    public create(req: Request, res: Response){
        const params: UserInterface = req.body;

        User.create<User>(params)
            .then((user: User) => {res.status(201).json(user)})
            .catch((err: Error) => {res.status(500).json(err)});
    }

    public checkPassword(req: Request, res: Response){

    }

    public update(req: Request, res: Response){

    }

    public delete(req: Request, res: Response){

    }

    public readAll(req: Request, res: Response){
        User.findAll<User>({})
        .then((user: Array<User>) => res.json(user))
        .catch((err: Error) => res.status(500).json(err));
    }

    public readOne(req: Request, res: Response){

        const userUuid :string = req.params.uuid;

        User.findOne<User>({where:{uuid:userUuid}})
        .then((user: User | null) => res.json(user))
        .catch((err: Error) => res.status(500).json(err));
    }

//   public index(_req: Request, res: Response) {
//     Link.findAll<Link>({})
//       .then((links: Array<Link>) => res.json(links))
//       .catch((err: Error) => res.status(500).json(err));
//   }

//   public create(req: Request, res: Response) {
//     const params: LinkInterface = req.body;

//     Link.create<Link>(params)
//       .then((link: Link) => res.status(201).json(link))
//       .catch((err: Error) => res.status(500).json(err));
//   }

//   public show(req: Request, res: Response) {
//     const linkId: number = parseInt(req.params.id,10);

//     Link.findByPk<Link>(linkId)
//       .then((link: Link | null) => {
//         if (link) {
//           res.json(link);
//         } else {
//           res.status(404).json({ errors: ["Link not found"] });
//         }
//       })
//       .catch((err: Error) => res.status(500).json(err));
//   }

//   public update(req: Request, res: Response) {
//     const linkId: number = parseInt(req.params.id,10);
//     const params: LinkInterface = req.body;

//     const options: UpdateOptions = {
//       where: { id: linkId },
//       limit: 1
//     };

//     Link.update(params, options)
//       .then(() => res.status(202).json({ data: "success" }))
//       .catch((err: Error) => res.status(500).json(err));
//   }

//   public delete(req: Request, res: Response) {
//     const linkId: number = parseInt(req.params.id,10);
//     const options: DestroyOptions = {
//       where: { id: linkId },
//       limit: 1
//     };

//     Link.destroy(options)
//       .then(() => res.status(204).json({ data: "success" }))
//       .catch((err: Error) => res.status(500).json(err));
//   }
}