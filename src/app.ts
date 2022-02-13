import express from "express";
import apiRoute from "./api/apiRoute";

const app = express();

app.use("/api", apiRoute);

export default app;
