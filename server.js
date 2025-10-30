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

// ✅ Improved CORS setup
const allowedOrigins = [process.env.PROD_URL, process.env.DEV_URL];
server.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("❌ Blocked by CORS:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

// ✅ Preflight support
server.options("*", cors());

// Optional debug log
server.use((req, res, next) => {
    console.log("Origin:", req.headers.origin);
    next();
});

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
