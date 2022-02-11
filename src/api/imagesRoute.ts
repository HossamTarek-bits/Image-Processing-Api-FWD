import express from 'express';
import log from '../utilities/log/log';
import LogType from '../utilities/log/LogTypes';
import { checkThumbExists, createThumb, getThumb } from '../utilities/imageManager';

const imagesRoute = express.Router();

imagesRoute.use((_req, _res, next) => {
    log(LogType.timeLog, 'Accessed /api/images');
    next();
});

imagesRoute.get('/', (req, res) => {
    const filename = req.query.filename ? req.query.filename as string : 'palmtunnel';
    const width = req.query.width ? parseInt(req.query.width as string, 10) : 100;
    const height = req.query.height ? parseInt(req.query.height as string, 10) : 100;

    if (checkThumbExists(filename, width, height)) {
        res.sendFile(getThumb(filename, width, height));
    } else {
        createThumb(filename, width, height).then((successful) => {
            if (successful) res.sendFile(getThumb(filename, width, height));
            else res.status(500).send('Try again later');
        });
    }
});

export default imagesRoute;
