import express from "express";
import imagesRoute from "./imagesRoute";

const apiRoute = express.Router();

apiRoute.use("/images", imagesRoute);

export default apiRoute;
