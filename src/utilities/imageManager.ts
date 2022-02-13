import fs, { promises as fsPromises } from "fs";
import sharp from "sharp";
import path from "path";
import log from "./log/log";
import LogType from "./log/LogTypes";

const thumbDirPath = path.join(__dirname, "..", "..", "images", "thumb");
const fullDirPath = path.join(__dirname, "..", "..", "images", "full");
const format = "jpg";
const fullImagesList = [
  "encenadaport",
  "fjord",
  "icelandwaterfall",
  "palmtunnel",
  "santamonica",
];

const imagePathFormat = (
  dir: string,
  filename: string,
  width?: number,
  height?: number
): string => {
  if (dir === thumbDirPath)
    return path.join(thumbDirPath, `${filename}-${width}x${height}.${format}`);
  if (dir === fullDirPath)
    return path.join(fullDirPath, `${filename}.${format}`);
  throw Error("Dir provided is incorrect");
};

const checkThumbExists = async (
  filename: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    await fsPromises.access(
      imagePathFormat(thumbDirPath, filename, width, height),
      fs.constants.F_OK
    );
    return true;
  } catch (Error) {
    return false;
  }
};

const checkFullExists = async (filename: string): Promise<boolean> => {
  try {
    await fsPromises.access(
      imagePathFormat(fullDirPath, filename),
      fs.constants.F_OK
    );
    return true;
  } catch (Error) {
    return false;
  }
};

const createThumb = async (
  filename: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    await sharp(imagePathFormat(fullDirPath, filename))
      .resize(width, height)
      .toFile(imagePathFormat(thumbDirPath, filename, width, height));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      log(LogType.errorLog, error.message as string);
    } else {
      log(LogType.errorLog, error as string);
    }
    return false;
  }
};

const getThumb = (filename: string, width: number, height: number): string =>
  imagePathFormat(thumbDirPath, filename, width, height);

export {
  imagePathFormat,
  checkThumbExists,
  checkFullExists,
  createThumb,
  getThumb,
  thumbDirPath,
  fullDirPath,
  fullImagesList,
};
