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

// #Middlewere's
server.use(express.json());
server.use(cors({
    origin: [process.env.PROD_URL, process.env.DEV_URL], // frontend
    credentials: true
}));

server.use(cookieParser());
// --- Serve images ---
server.use("/images", express.static("public/images"));
// --- Serve videos ---
server.use("/videos", express.static("public/videos"));

server.use(express.urlencoded({ extended: false }))
server.use(middlewares);
server.use("/uplay", AppRouter);
// #EndRegion

connectdb()
    .then(() => {
        server.listen(process.env.PORT, () => console.log(`server is running on http://localhost:${process.env.PORT}`));
    })
    .catch((error) => {
        console.log("database connection error occured,", error.message);
        process.exit()
    });
