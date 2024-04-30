import { app } from "./src/app.js";
import connectDb from "./src/db/index.js";
import dotenv from "dotenv";
import express from "express";

const PRT = process.env.PORT || 8000;
dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    app.listen(PRT, () => {
      console.log(`server is running on poort ${PRT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection error", err);
  });
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("ERRR ", error);
//       throw error;
//     });

//     app.listen(PRT, () => {
//       console.log(`server is running on port ${PRT}`);
//     });
//   } catch (error) {
//     console.log("ERROR", error);
//     throw error;
//   }
// })();
