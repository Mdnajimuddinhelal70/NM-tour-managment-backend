import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://najimuddinhelal96_db_user:HsJyKMv65XXhucC1@cluster0.mzgzbpf.mongodb.net/nm-tour-management?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to DB!!");

    server = app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
