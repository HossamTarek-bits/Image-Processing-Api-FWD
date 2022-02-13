import express, { Request, Response, NextFunction } from "express";
import log from "../utilities/log/log";
import LogType from "../utilities/log/LogTypes";
import {
  checkThumbExists,
  checkFullExists,
  createThumb,
  getThumb,
  fullImagesList,
} from "../utilities/imageManager";

const imagesRoute = express.Router();

imagesRoute.use((_req: Request, _res: Response, next: NextFunction): void => {
  log(LogType.timeLog, "Accessed /api/images");
  next();
});

imagesRoute.get(
  "/",
  async (req: Request, res: Response): Promise<Response | void> => {
    if (!req.query.filename) {
      return res
        .status(400)
        .send("Please add to the url a valid filename parameter");
    }
    if (
      !req.query.width ||
      Number.isNaN(parseInt(req.query.width as string, 10))
    ) {
      return res.status(400).send("Please add a valid width parameter");
    }
    if (
      !req.query.height ||
      Number.isNaN(parseInt(req.query.height as string, 10))
    ) {
      return res.status(400).send("Please add a valid height parameter");
    }
    if (!(await checkFullExists(req.query.filename as string))) {
      const body = `<p>Please choose an image that we provide here is a list of the images that we have:</p>
        <ol>
            <li>${fullImagesList.join("</li><li>")}</li>
        </ol>`;
      return res.status(400).send(body);
    }
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);

    if (await checkThumbExists(filename, width, height)) {
      return res.status(200).sendFile(getThumb(filename, width, height));
    }
    const thumbCreated = await createThumb(filename, width, height);
    if (thumbCreated) {
      return res.status(200).sendFile(getThumb(filename, width, height));
    }
    return res.status(500).send("Try again later");
  }
);

export default imagesRoute;
