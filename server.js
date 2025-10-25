import express from "express";
import cors from "cors";
import AppRouter from "./Routes/index.js";
import { connectdb } from "./db/db.js";
import jsonserver from "json-server";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const server = express();
const middlewares = jsonserver.defaults();

// #Middlewere's Region
server.use(express.json());
server.use(cors());
server.use(cookieParser());

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

server.use(express.urlencoded({ extended: false }))
server.use(middlewares);
server.use("/uplay", AppRouter);
// #EndRegion

connectdb()
    .then(() => {
        server.listen(9000, () => console.log(`server is running on http://localhost:${process.env.PORT}`));
    })
    .catch((error) => {
        console.log("database connection error occured,", error)
        process.exit()
    });
