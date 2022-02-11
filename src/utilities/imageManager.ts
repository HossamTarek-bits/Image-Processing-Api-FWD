import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import log from './log/log';
import LogType from './log/LogTypes';

const thumbDirPath = path.join(__dirname, '..', '..', 'images', 'thumb');
const fullDirPath = path.join(__dirname, '..', '..', 'images', 'full');
const format = 'jpg';

const imagePathFormat = (dir:string, filename:string, width?:number, height?:number):string => {
    if (dir === thumbDirPath) return path.join(thumbDirPath, `${filename}-${width}x${height}.${format}`);
    if (dir === fullDirPath) return path.join(fullDirPath, `${filename}.${format}`);
    throw (Error('Dir provided is incorrect'));
};

const checkThumbExists = (filename: string, width:number, height:number):boolean => fs.existsSync(
    imagePathFormat(thumbDirPath, filename, width, height),
);

const createThumb = async (filename:string, width:number, height:number):Promise<boolean> => {
    try {
        await sharp(imagePathFormat(fullDirPath, filename)).resize(width, height).toFile(
            imagePathFormat(thumbDirPath, filename, width, height),
        );
        return true;
    } catch (error) {
        if (error instanceof Error) {
            log(LogType.errorLog, error.message as string);
        } else { log(LogType.errorLog, error as string); }
        return false;
    }
};

const getThumb = (filename:string, width:number, height:number):string => imagePathFormat(
    thumbDirPath,
    filename,
    width,
    height,
);

export {
    imagePathFormat, checkThumbExists, createThumb, getThumb, thumbDirPath, fullDirPath,
};
