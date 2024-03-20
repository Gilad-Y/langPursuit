import express, { NextFunction, Request, Response } from "express";
import { checkNumAndEmail, logUser, register } from "../Logic/userLogic";

const router = express.Router();
// router.get(
//   "/getAll",
//   async (request: Request, response: Response, next: NextFunction) => {
//     response.status(200).json(await getAll());
//   }
// );
// router.get(
//   "/getOption",
//   async (request: Request, response: Response, next: NextFunction) => {
//     response.status(200).json(await getOption());
//   }
// );
// router.get(
//   "/getNameById/:id",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;
//     response.status(200).json(await getNameById(id));
//   }
// );

router.post(
  "/logUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email;
    const password = request.body._userPass;
    const data = await logUser(email, password);
    data.length > 0
      ? response.status(200).json(data)
      : response.status(403).json(data);
  }
);
router.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    const user = request.body;
    console.log(user)
    const data = await register(user);
    response.status(201).json(data);
    // data.length > 0
    //   ? response.status(200).json(data)
    //   : response.status(403).json(data);
  }
);
router.get(
  "/checkPhoneNumberAndEmail",
  async (request: Request, response: Response, next: NextFunction) => {
    const { phone, email } = request.query;
    console.log(phone, email);
    if (typeof phone === "string" && typeof email === "string") {
      // Here you can perform your logic to check the phone number and email
      // and respond accordingly
      response.status(200).json(await checkNumAndEmail(+phone,email));
    } else {
      response.status(400).json({ error: "Invalid parameters" });
    }
  }
);



export default router;
