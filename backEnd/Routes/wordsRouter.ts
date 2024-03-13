import express, { NextFunction, Request, Response } from "express";
import * as wordsLogic from "../Logic/wordsLogic";

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

router.get(
  "/getMyWords/:id/:lang",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    const lang = request.params.lang;
    response.status(200).json(await wordsLogic.getMyWords(id, lang));
  }
);
router.get(
  "/getLangListById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    response.status(200).json(await wordsLogic.getLangListById(id));
  }
);
router.post(
  "/uploadWords/:id/:lang",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    const lang = request.params.lang;
    const words = request.body;
    response.status(200).json(await wordsLogic.uploadWords(id, words, lang));
  }
);

router.delete(
  "/deleteWord/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;

    response.status(200).json(await wordsLogic.deleteWord(+id));
  }
);

export default router;
