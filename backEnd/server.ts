//import
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config";
import ErrorHandler from "./MiddleWare/route-not-found";
import router from "./Routes/SimpleRouter";
import userRouter from "./Routes/userRouter";
import wordsRouter from "./Routes/wordsRouter";

//create server
const server = express();

//OUR MIDDLE WARE

//cors = cross origin resource sharing...
server.use(cors());

//how we send the data back (JSON,XML,RAW,string)
server.use(express.json());

//where i  will save my files from upload
server.use(express.static("upload"));

//enable file uploading, and create a path for the files if it not exists
server.use(fileUpload({ createParentPath: true }));

//using routes => localhost:4000/api/v1/test/checkOK
server.use("/api/v1/test", router);
server.use("/api/v1/user", userRouter);
server.use("/api/v1/words", wordsRouter);

//handle errors(Route Not Found);
server.use("*", ErrorHandler);

//start the server
server.listen(config.webPort, () => {
  console.log(`listing on http://localhost:${config.webPort}`);
  console.log(
    `for testing use the path http://localhost:${config.webPort}/api/v1/test/checkOK`
  );
  console.log(
    `for testing use the path http://localhost:${config.webPort}/api/v1/test/checkBad`
  );
});
