import express from "express";
import cors from "cors";
import { connectdb } from "./db/db.js";
import jsonserver from "json-server";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AppRouter from "./Routes/AllRoutes.Routes.js";
dotenv.config();

const server = express();
const middlewares = jsonserver.defaults();

// #Middlewere's Region
server.use(express.json());
server.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
server.use(cookieParser());
app.use("/images", express.static("public/images"));
app.use("/videos", express.static("public/videos"));

server.use(express.urlencoded({ extended: false }))
server.use(middlewares);
server.use("/uplay", AppRouter);
// #EndRegion

connectdb()
    .then(() => {
        server.listen(9900, () => console.log(`server is running on http://localhost:${process.env.PORT}`));
    })
    .catch((error) => {
        console.log("database connection error occured,", error.message);
        process.exit()
    });
