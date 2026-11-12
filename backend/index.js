
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import websiteRouter from "./routes/website.routes.js";
import billingRouter from "./routes/billing.routes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js";

const app = express();
const port = process.env.PORT || 5000;

app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);
app.use("/api/billing", billingRouter);

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
